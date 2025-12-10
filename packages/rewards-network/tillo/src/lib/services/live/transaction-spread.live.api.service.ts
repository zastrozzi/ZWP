import { Injectable, inject } from '@angular/core'
import { Model } from '../../model'
import {
    HTTPMethod,
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    createHTTPParams,
    serialiseDateQueryFilter,
    serialiseEnumQueryFilter,
    serialiseNumberQueryFilter,
    serialisePaginatedQueryParams,
    serialiseStringQueryFilter,
    upsertHTTPParams,
} from '@zwp/platform.common'
import { Observable, map, take, throwError } from 'rxjs'
import { TilloStoreCardAPIService, TilloTransactionSpreadAPIService } from '../abstract'
import { APIRoutes } from '../../api-routes'
import { TILLO_API_BASE_URL, TILLO_API_CONFIG } from '../../config'
import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'TilloTransactionSpreadLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class TilloTransactionSpreadLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements TilloTransactionSpreadAPIService
{
    private baseUrl = inject(TILLO_API_BASE_URL)
    private transactionSpreadFacade = inject(Facades.TilloTransactionSpreadFacade)

    getTransactionSpread(transactionSpreadId: string): Observable<Model.TransactionSpreadResponse> {
        const path = APIRoutes.transactionSpreadRoutes(this.baseUrl).getTransactionSpread(transactionSpreadId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    updateTransactionSpread(
        transactionSpreadId: string,
        request: Model.UpdateTransactionSpreadRequest
    ): Observable<Model.TransactionSpreadResponse> {
        const path = APIRoutes.transactionSpreadRoutes(this.baseUrl).updateTransactionSpread(transactionSpreadId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PUT,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    deleteTransactionSpread(transactionSpreadId: string): Observable<Model.TransactionSpreadResponse> {
        const path = APIRoutes.transactionSpreadRoutes(this.baseUrl).deleteTransactionSpread(transactionSpreadId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    listTransactionSpreads(
        brandId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.TransactionSpreadResponse>>>,
        filters: Nullable<Partial<Model.Filters.TransactionSpreadFilters>>
    ): Observable<PaginatedResponse<Model.TransactionSpreadResponse>> {
        let path: string
        if (brandId) {
            path = APIRoutes.brandRoutes(this.baseUrl)
                .transactionSpreadRoutesForBrand(brandId)
                .listTransactionSpreadsForBrand()
        } else {
            path = APIRoutes.transactionSpreadRoutes(this.baseUrl).listTransactionSpreads()
        }
        let params = serialisePaginatedQueryParams(
            pagination,
            this.transactionSpreadFacade.transactionSpreadRemotePagination$
        )

        if (filters) {
            if (filters.dbCreatedAt) {
                params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt))
            }
            if (filters.dbUpdatedAt) {
                params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt))
            }
            if (filters.dbDeletedAt) {
                params = upsertHTTPParams(params, serialiseDateQueryFilter('db_deleted_at', filters.dbDeletedAt))
            }
            if (filters.fee) {
                params = upsertHTTPParams(params, serialiseStringQueryFilter('fee', filters.fee))
            }
            if (filters.brandId) {
                params = upsertHTTPParams(params, serialiseStringQueryFilter('brandId', filters.brandId))
            }
        }
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
            params: params,
        })
    }

    createTransactionSpreadForBrand(
        brandId: string,
        request: Model.CreateTransactionSpreadRequest
    ): Observable<Model.TransactionSpreadResponse> {
        const path = APIRoutes.brandRoutes(this.baseUrl)
            .transactionSpreadRoutesForBrand(brandId)
            .createTransactionSpreadForBrand()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.POST,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    setActiveTransactionSpreadForBrand(
        brandId: string,
        transactionSpreadId: string
    ): Observable<Model.TransactionSpreadResponse> {
        const path = APIRoutes.brandRoutes(this.baseUrl)
            .transactionSpreadRoutesForBrand(brandId)
            .setActiveTransactionSpreadForBrand(transactionSpreadId)

        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PUT,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }
}
