import { Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { Model } from '../../model'
import {
    createHTTPParams,
    HTTPMethod,
    isNull,
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    serialisePaginatedQueryParams,
    upsertHTTPParam,
} from '@zwp/platform.common'
import { TinkMerchantAPIService } from '../abstract/merchant.api.service'
import { APIRoutes } from '../../api-routes'
import { TINK_API_CONFIG, TINK_API_BASE_URL } from '../../config'
import { PlatformAuth } from '@zwp/platform.auth'
import { State } from '../../+state'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'TinkMerchantLiveAPIService', options: { skipMethodDebugger: true } })
export class TinkMerchantLiveAPIService extends PlatformAuth.AuthedAPIService implements TinkMerchantAPIService {
    private config = inject(TINK_API_CONFIG)
    private baseUrl = inject(TINK_API_BASE_URL)
    private merchantFacade = inject(State.Facades.TinkMerchantFacade)

    createMerchant(
        request: Model.ServerAPIModel.Merchant.CreateTinkMerchantRequest
    ): Observable<Model.ServerAPIModel.Merchant.TinkMerchantResponse> {
        const path = APIRoutes.merchantRoutes(this.baseUrl).createMerchant()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.POST,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    getMerchant(merchantId: string): Observable<Model.ServerAPIModel.Merchant.TinkMerchantResponse> {
        const path = APIRoutes.merchantRoutes(this.baseUrl).getMerchant(merchantId)
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
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Merchant.TinkMerchantResponse>>> = null,
        filters: Nullable<Partial<Model.Filters.MerchantFilters>> = null
    ): Observable<PaginatedResponse<Model.ServerAPIModel.Merchant.TinkMerchantResponse>> {
        const path = APIRoutes.merchantRoutes(this.baseUrl).listMerchants()
        const params = serialisePaginatedQueryParams(pagination, this.merchantFacade.merchantRemotePagination$)
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

    deleteMerchant(merchantId: string): Observable<void> {
        const path = APIRoutes.merchantRoutes(this.baseUrl).deleteMerchant(merchantId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    refreshMerchants(limit: Nullable<number> =  null): Observable<void> {
        let params = createHTTPParams()
        if (!isNull(limit)) {
            params = upsertHTTPParam(params, 'limit', limit)
        }
        const path = APIRoutes.merchantRoutes(this.baseUrl).refreshMerchants()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PUT,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
            params: params,
        })
    }
}
