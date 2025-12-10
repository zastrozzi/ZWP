import { Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { Model } from '../../model'
import {
    createHTTPParams,
    HTTPMethod,
    isNull,
    ZWPDebuggableInjectable,
    ZWPISO3166Alpha2,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    serialisePaginatedQueryParams,
    upsertHTTPParam,
} from '@zwp/platform.common'
import { TinkProviderAPIService } from '../abstract/provider.api.service'
import { APIRoutes } from '../../api-routes'
import { TINK_API_CONFIG, TINK_API_BASE_URL } from '../../config'
import { PlatformAuth } from '@zwp/platform.auth'
import { State } from '../../+state'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'TinkProviderLiveAPIService', options: { skipMethodDebugger: true } })
export class TinkProviderLiveAPIService extends PlatformAuth.AuthedAPIService implements TinkProviderAPIService {
    private config = inject(TINK_API_CONFIG)
    private baseUrl = inject(TINK_API_BASE_URL)
    private providerFacade = inject(State.Facades.TinkProviderFacade)

    getProvider(providerId: string): Observable<Model.ServerAPIModel.Provider.TinkV1ProviderResponse> {
        const path = APIRoutes.providerRoutes(this.baseUrl).getProvider(providerId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    listProviders(
        tinkUserId: Nullable<string> = null,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Provider.TinkV1ProviderResponse>>> = null,
        filters: Nullable<Partial<Model.Filters.ProviderFilters>> = null
    ): Observable<PaginatedResponse<Model.ServerAPIModel.Provider.TinkV1ProviderResponse>> {
        let path
        if (isNull(tinkUserId)) {
            path = APIRoutes.providerRoutes(this.baseUrl).listProviders()
        } else {
            path = APIRoutes.tinkUserRoutes(this.baseUrl).providerRoutesForTinkUser(tinkUserId).listProviders()
        }
        const params = serialisePaginatedQueryParams(pagination, this.providerFacade.providerRemotePagination$)
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

    deleteProvider(providerId: string): Observable<void> {
        const path = APIRoutes.providerRoutes(this.baseUrl).deleteProvider(providerId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    refreshProviders(market: Nullable<ZWPISO3166Alpha2> = null): Observable<void> {
        const path = APIRoutes.providerRoutes(this.baseUrl).refreshProviders()
        let params = createHTTPParams()
        if (!isNull(market)) {
            params = upsertHTTPParam(params, 'market', market)
        }
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