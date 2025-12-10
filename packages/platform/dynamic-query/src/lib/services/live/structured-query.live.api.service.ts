import { Injectable, inject } from '@angular/core'
import { Model } from '../../model'
import {
    HTTPMethod,
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    serialisePaginatedQueryParams,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'
import { StructuredQueryAPIService } from '../abstract'
import { APIRoutes } from '../../api-routes'
import { DYNAMIC_QUERY_API_BASE_URL, DYNAMIC_QUERY_API_CONFIG } from '../../config'
import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'StructuredQueryLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class StructuredQueryLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements StructuredQueryAPIService
{
    private config = inject(DYNAMIC_QUERY_API_CONFIG)
    private baseUrl = inject(DYNAMIC_QUERY_API_BASE_URL)
    private structuredQueryFacade = inject(Facades.StructuredQueryFacade)

    createStructuredQuery(
        request: Model.CreateStructuredQueryRequest
    ): Observable<Model.StructuredQueryResponse> {
        const path = APIRoutes.structuredQueryRoutes(
            this.baseUrl
        ).createStructuredQuery()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.POST,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    getStructuredQuery(structuredQueryId: string): Observable<Model.StructuredQueryResponse> {
        const path = APIRoutes.structuredQueryRoutes(this.baseUrl).getStructuredQuery(
            structuredQueryId
        )
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    listStructuredQueries(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.StructuredQueryResponse>>>
    ): Observable<PaginatedResponse<Model.StructuredQueryResponse>> {
        const path = APIRoutes.structuredQueryRoutes(this.baseUrl).listStructuredQueries()
        const params = serialisePaginatedQueryParams(
            pagination,
            this.structuredQueryFacade.structuredQueryRemotePagination$
        )
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
            params: params
        })
    }

    updateStructuredQuery(
        structuredQueryId: string,
        update: Model.UpdateStructuredQueryRequest
    ): Observable<Model.StructuredQueryResponse> {
        const path = APIRoutes.structuredQueryRoutes(
            this.baseUrl
        ).updateStructuredQuery(structuredQueryId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PATCH,
            url: path,
            body: update,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    deleteStructuredQuery(structuredQueryId: string): Observable<void> {
        const path = APIRoutes.structuredQueryRoutes(
            this.baseUrl
        ).deleteStructuredQuery(structuredQueryId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }
}