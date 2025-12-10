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
import { TinkAccountAPIService } from '../abstract/account.api.service'
import { APIRoutes } from '../../api-routes'
import { TINK_API_CONFIG, TINK_API_BASE_URL } from '../../config'
import { PlatformAuth } from '@zwp/platform.auth'
import { State } from '../../+state'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'TinkAccountLiveAPIService', options: { skipMethodDebugger: true } })
export class TinkAccountLiveAPIService extends PlatformAuth.AuthedAPIService implements TinkAccountAPIService {
    private config = inject(TINK_API_CONFIG)
    private baseUrl = inject(TINK_API_BASE_URL)
    private accountFacade = inject(State.Facades.TinkAccountFacade)

    getAccount(accountId: string): Observable<Model.ServerAPIModel.Account.TinkV2AccountResponse> {
        const path = APIRoutes.accountRoutes(this.baseUrl).getAccount(accountId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    listAccounts(
        tinkUserId: Nullable<string> = null,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Account.TinkV2AccountResponse>>> = null,
        filters: Nullable<Partial<Model.Filters.AccountFilters>> = null
    ): Observable<PaginatedResponse<Model.ServerAPIModel.Account.TinkV2AccountResponse>> {
        let path
        if (isNull(tinkUserId)) {
            path = APIRoutes.accountRoutes(this.baseUrl).listAccounts()
        } else {
            path = APIRoutes.tinkUserRoutes(this.baseUrl).accountRoutesForTinkUser(tinkUserId).listAccounts()
        }
        const params = serialisePaginatedQueryParams(pagination, this.accountFacade.accountRemotePagination$)
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

    deleteAccount(accountId: string): Observable<void> {
        const path = APIRoutes.accountRoutes(this.baseUrl).deleteAccount(accountId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    refreshAccounts(tinkUserId: string): Observable<void> {
        const path = APIRoutes.tinkUserRoutes(this.baseUrl).accountRoutesForTinkUser(tinkUserId).refreshAccounts()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PUT,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    refreshAccount(accountId: string): Observable<void> {
        const path = APIRoutes.accountRoutes(this.baseUrl).refreshAccount(accountId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PUT,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    refreshAccountBalance(accountId: string): Observable<void> {
        const path = APIRoutes.accountRoutes(this.baseUrl).refreshAccountBalance(accountId)
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