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
import { TinkCredentialAPIService } from '../abstract/credential.api.service'
import { APIRoutes } from '../../api-routes'
import { TINK_API_CONFIG, TINK_API_BASE_URL } from '../../config'
import { PlatformAuth } from '@zwp/platform.auth'
import { State } from '../../+state'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'TinkCredentialLiveAPIService', options: { skipMethodDebugger: true } })
export class TinkCredentialLiveAPIService extends PlatformAuth.AuthedAPIService implements TinkCredentialAPIService {
    private config = inject(TINK_API_CONFIG)
    private baseUrl = inject(TINK_API_BASE_URL)
    private credentialFacade = inject(State.Facades.TinkCredentialFacade)

    getCredential(credentialId: string): Observable<Model.ServerAPIModel.Credentials.TinkV1CredentialsResponse> {
        const path = APIRoutes.credentialRoutes(this.baseUrl).getCredential(credentialId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    listCredentials(
        tinkUserId: Nullable<string> = null,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Credentials.TinkV1CredentialsResponse>>> = null,
        filters: Nullable<Partial<Model.Filters.CredentialFilters>> = null
    ): Observable<PaginatedResponse<Model.ServerAPIModel.Credentials.TinkV1CredentialsResponse>> {
        let path
        if (isNull(tinkUserId)) {
            path = APIRoutes.credentialRoutes(this.baseUrl).listCredentials()
        } else {
            path = APIRoutes.tinkUserRoutes(this.baseUrl).credentialRoutesForTinkUser(tinkUserId).listCredentials()
        }
        const params = serialisePaginatedQueryParams(pagination, this.credentialFacade.credentialRemotePagination$)
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

    deleteCredential(credentialId: string): Observable<void> {
        const path = APIRoutes.credentialRoutes(this.baseUrl).deleteCredential(credentialId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    refreshCredentials(tinkUserId: string): Observable<void> {
        const path = APIRoutes.tinkUserRoutes(this.baseUrl).credentialRoutesForTinkUser(tinkUserId).refreshCredentials()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PUT,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    refreshCredential(credentialId: string): Observable<void> {
        const path = APIRoutes.credentialRoutes(this.baseUrl).refreshCredential(credentialId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PUT,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    forceRefreshCredential(credentialId: string): Observable<void> {
        const path = APIRoutes.credentialRoutes(this.baseUrl).forceRefreshCredential(credentialId)
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
