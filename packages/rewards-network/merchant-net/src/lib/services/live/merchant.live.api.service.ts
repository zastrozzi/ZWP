import { Injectable, inject } from '@angular/core'
import { Model } from '../../model'
import {
    HTTPMethod,
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    serialiseDateQueryFilter,
    serialiseEnumQueryFilter,
    serialisePaginatedQueryParams,
    serialiseStringQueryFilter,
    upsertHTTPParams,
} from '@zwp/platform.common'
import { Observable, map, take } from 'rxjs'
import { MerchantAPIService } from '../abstract'
import { APIRoutes } from '../../api-routes'
import { MERCHANT_NET_API_BASE_URL, MERCHANT_NET_API_CONFIG } from '../../config'
import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'MerchantLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class MerchantLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements MerchantAPIService
{
    private config = inject(MERCHANT_NET_API_CONFIG)
    private baseUrl = inject(MERCHANT_NET_API_BASE_URL)
    private merchantFacade = inject(Facades.MerchantFacade)

    createMerchant(
        request: Model.CreateMerchantRequest
    ): Observable<Model.MerchantResponse> {
        const path = APIRoutes.merchantRoutes(
            this.baseUrl
        ).createMerchant()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.POST,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    getMerchant(merchantId: string): Observable<Model.MerchantResponse> {
        const path = APIRoutes.merchantRoutes(this.baseUrl).getMerchant(
            merchantId
        )
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    listMerchants(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.MerchantResponse>>>,
        filters: Nullable<Partial<Model.Filters.MerchantFilters>>
    ): Observable<PaginatedResponse<Model.MerchantResponse>> {
        const path = APIRoutes.merchantRoutes(
            this.baseUrl
        ).listMerchants()
        let params = serialisePaginatedQueryParams(
            pagination,
            this.merchantFacade.merchantRemotePagination$
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
            if (filters.merchantName) {
                params = upsertHTTPParams(params, serialiseStringQueryFilter('merchant_name', filters.merchantName))
            }
            if (filters.status) {
                params = upsertHTTPParams(params, serialiseEnumQueryFilter('status', filters.status))
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

    updateMerchant(
        merchantId: string,
        request: Model.UpdateMerchantRequest
    ): Observable<Model.MerchantResponse> {
        const path = APIRoutes.merchantRoutes(
            this.baseUrl
        ).updateMerchant(merchantId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PUT,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    deleteMerchant(merchantId: string): Observable<void> {
        const path = APIRoutes.merchantRoutes(
            this.baseUrl
        ).deleteMerchant(merchantId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }
}
