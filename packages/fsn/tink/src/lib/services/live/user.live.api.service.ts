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
    upsertHTTPParams,
} from '@zwp/platform.common'
import { TinkUserAPIService } from '../abstract/user.api.service'
import { APIRoutes } from '../../api-routes'
import { TINK_API_CONFIG, TINK_API_BASE_URL } from '../../config'
import { PlatformAuth } from '@zwp/platform.auth'
import { State } from '../../+state'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'TinkUserLiveAPIService', options: { skipMethodDebugger: true } })
export class TinkUserLiveAPIService extends PlatformAuth.AuthedAPIService implements TinkUserAPIService {
    private userFacade = inject(State.Facades.TinkUserFacade)
    private config = inject(TINK_API_CONFIG)
    private baseUrl = inject(TINK_API_BASE_URL)

    createUser(enduserId: string, request: Model.ServerAPIModel.User.CreateTinkUserRequest): Observable<Model.ServerAPIModel.User.TinkUserResponse> {
        // Assume APIRoutes.userRoutes(this.baseUrl) provides a createUser(enduserId) method.
        const path = APIRoutes.enduserRoutes(this.baseUrl).tinkUserRoutesForEnduser(enduserId).createTinkUser()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.POST,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    getUser(tinkUserId: string): Observable<Model.ServerAPIModel.User.TinkUserResponse> {
        const path = APIRoutes.tinkUserRoutes(this.baseUrl).getTinkUser(tinkUserId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    listUsers(
        enduserId: Nullable<string> = null, 
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.User.TinkUserResponse>>> = null,
        filters: Nullable<Partial<Model.Filters.UserFilters>> = null
    ): Observable<PaginatedResponse<Model.ServerAPIModel.User.TinkUserResponse>> {
        let path
        if (isNull(enduserId)) {
            path = APIRoutes.tinkUserRoutes(this.baseUrl).listTinkUsers()
        } else {
            path = APIRoutes.enduserRoutes(this.baseUrl).tinkUserRoutesForEnduser(enduserId).listTinkUsers()
        }
        const params = serialisePaginatedQueryParams(
            pagination,
            this.userFacade.userRemotePagination$
        )
        // TODO: Add filters to params if they exist
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

    deleteUser(tinkUserId: string): Observable<void> {
        const path = APIRoutes.tinkUserRoutes(this.baseUrl).deleteTinkUser(tinkUserId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    refreshUser(tinkUserId: string): Observable<void> {
        const path = APIRoutes.tinkUserRoutes(this.baseUrl).refreshTinkUser(tinkUserId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PUT,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    relinkUser(enduserId: string): Observable<Model.ServerAPIModel.User.TinkUserResponse> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).tinkUserRoutesForEnduser(enduserId).relinkTinkUser()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.POST,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }
}