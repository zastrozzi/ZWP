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
import { TinkAccountConsentAPIService } from '../abstract/account-consent.api.service'
import { APIRoutes } from '../../api-routes'
import { TINK_API_CONFIG, TINK_API_BASE_URL } from '../../config'
import { PlatformAuth } from '@zwp/platform.auth'
import { State } from '../../+state'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'TinkAccountConsentLiveAPIService', options: { skipMethodDebugger: true } })
export class TinkAccountConsentLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements TinkAccountConsentAPIService
{
    private config = inject(TINK_API_CONFIG)
    private baseUrl = inject(TINK_API_BASE_URL)
    private accountConsentFacade = inject(State.Facades.TinkAccountConsentFacade)

    getAccountConsent(accountConsentId: string): Observable<Model.ServerAPIModel.Consent.TinkV1AccountConsentResponse> {
        const path = APIRoutes.consentRoutes(this.baseUrl).accountConsentRoutes().getAccountConsent(accountConsentId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    listAccountConsents(
        tinkUserId: Nullable<string> = null,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Consent.TinkV1AccountConsentResponse>>> = null,
        filters: Nullable<Partial<Model.Filters.AccountConsentFilters>> = null
    ): Observable<PaginatedResponse<Model.ServerAPIModel.Consent.TinkV1AccountConsentResponse>> {
        let path
        if (isNull(tinkUserId)) {
            path = APIRoutes.consentRoutes(this.baseUrl).accountConsentRoutes().listAccountConsents()
        } else {
            path = APIRoutes.tinkUserRoutes(this.baseUrl).consentRoutesForTinkUser(tinkUserId).accountConsentRoutes().listAccountConsents()
        }
        const params = serialisePaginatedQueryParams(pagination, this.accountConsentFacade.accountConsentRemotePagination$)
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

    deleteAccountConsent(accountConsentId: string): Observable<void> {
        const path = APIRoutes.consentRoutes(this.baseUrl).accountConsentRoutes().deleteAccountConsent(accountConsentId)
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
