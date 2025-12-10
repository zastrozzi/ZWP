import { Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { Model } from '../../model'
import {
    HTTPMethod,
    isNull,
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    serialisePaginatedQueryParams,
} from '@zwp/platform.common'
import { TinkProviderConsentAPIService } from '../abstract/provider-consent.api.service'
import { APIRoutes } from '../../api-routes'
import { TINK_API_CONFIG, TINK_API_BASE_URL } from '../../config'
import { PlatformAuth } from '@zwp/platform.auth'
import { State } from '../../+state'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'TinkProviderConsentLiveAPIService', options: { skipMethodDebugger: true } })
export class TinkProviderConsentLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements TinkProviderConsentAPIService
{
    private config = inject(TINK_API_CONFIG)
    private baseUrl = inject(TINK_API_BASE_URL)
    private providerConsentFacade = inject(State.Facades.TinkProviderConsentFacade)

    getProviderConsent(
        providerConsentId: string
    ): Observable<Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse> {
        const path = APIRoutes.consentRoutes(this.baseUrl).providerConsentRoutes().getProviderConsent(providerConsentId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    listProviderConsents(
        tinkUserId: Nullable<string> = null,
        pagination: Nullable<
            Partial<PaginatedQueryParams<Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse>>
        > = null,
        filters: Nullable<Partial<Model.Filters.ProviderConsentFilters>> = null
    ): Observable<PaginatedResponse<Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse>> {
        let path
        if (isNull(tinkUserId)) {
            path = APIRoutes.consentRoutes(this.baseUrl).providerConsentRoutes().listProviderConsents()
        } else {
            path = APIRoutes.tinkUserRoutes(this.baseUrl)
                .consentRoutesForTinkUser(tinkUserId)
                .providerConsentRoutes()
                .listProviderConsents()
        }
        const params = serialisePaginatedQueryParams(
            pagination,
            this.providerConsentFacade.providerConsentRemotePagination$
        )
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

    deleteProviderConsent(providerConsentId: string): Observable<void> {
        const path = APIRoutes.consentRoutes(this.baseUrl)
            .providerConsentRoutes()
            .deleteProviderConsent(providerConsentId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    refreshProviderConsent(providerConsentId: string): Observable<void> {
        const path = APIRoutes.consentRoutes(this.baseUrl)
            .providerConsentRoutes()
            .refreshProviderConsent(providerConsentId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PUT,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    refreshProviderConsents(tinkUserId: string): Observable<void> {
        const path = APIRoutes.tinkUserRoutes(this.baseUrl)
            .consentRoutesForTinkUser(tinkUserId)
            .providerConsentRoutes()
            .refreshProviderConsents()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PUT,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    extendProviderConsent(
        providerConsentId: string
    ): Observable<Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse> {
        const path = APIRoutes.consentRoutes(this.baseUrl)
            .providerConsentRoutes()
            .extendProviderConsent(providerConsentId)
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
