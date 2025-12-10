import { Injectable, inject } from '@angular/core'
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
import { Observable, throwError } from 'rxjs'
import { UUIDFilterAPIService } from '../abstract'
import { APIRoutes } from '../../api-routes'
import { DYNAMIC_QUERY_API_BASE_URL, DYNAMIC_QUERY_API_CONFIG } from '../../config'
import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'UUIDFilterLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class UUIDFilterLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements UUIDFilterAPIService
{
    private config = inject(DYNAMIC_QUERY_API_CONFIG)
    private baseUrl = inject(DYNAMIC_QUERY_API_BASE_URL)
    private uuidFilterFacade = inject(Facades.UUIDFilterFacade)

    createUUIDFilter(
        parentId: string,
        parentType: 'query' | 'filterGroup',
        request: Model.CreateUUIDFilterRequest
    ): Observable<Model.UUIDFilterResponse> {
        let path: string
        switch (parentType) {
            case 'query': { 
                path = APIRoutes
                    .structuredQueryRoutes(this.baseUrl)
                    .uuidFilterRoutesForStructuredQuery(parentId)
                    .createUUIDFilter()
                    break
            }
            case 'filterGroup': {
                path = APIRoutes
                    .filterGroupRoutes(this.baseUrl)
                    .uuidFilterRoutesForFilterGroup(parentId)
                    .createUUIDFilter()
                    break
            }
        }
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.POST,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    getUUIDFilter(uuidFilterId: string): Observable<Model.UUIDFilterResponse> {
        const path = APIRoutes.uuidFilterRoutes(this.baseUrl).getUUIDFilter(
            uuidFilterId
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

    listUUIDFilters(
        parentId: Nullable<string>,
        parentType: 'query' | 'filterGroup' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.UUIDFilterResponse>>>
    ): Observable<PaginatedResponse<Model.UUIDFilterResponse>> {
        let path: string
        switch (parentType) {
            case 'query': { 
                if (isNull(parentId)) { return throwError(
                    () => new Error('No parent ID provided for query parent type')
                )}
                path = APIRoutes
                    .structuredQueryRoutes(this.baseUrl)
                    .uuidFilterRoutesForStructuredQuery(parentId)
                    .listUUIDFilters()
                    break
            }
            case 'filterGroup': {
                if (isNull(parentId)) { return throwError(
                    () => new Error('No parent ID provided for filterGroup parent type')
                )}
                path = APIRoutes
                    .filterGroupRoutes(this.baseUrl)
                    .uuidFilterRoutesForFilterGroup(parentId)
                    .listUUIDFilters()
                    break
            }
            case 'none': {
                path = APIRoutes
                    .uuidFilterRoutes(this.baseUrl)
                    .listUUIDFilters()
                    break
            }
        }
        const params = serialisePaginatedQueryParams(
            pagination,
            this.uuidFilterFacade.uuidFilterRemotePagination$
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

    updateUUIDFilter(
        uuidFilterId: string,
        update: Model.UpdateUUIDFilterRequest
    ): Observable<Model.UUIDFilterResponse> {
        const path = APIRoutes.uuidFilterRoutes(
            this.baseUrl
        ).updateUUIDFilter(uuidFilterId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PATCH,
            url: path,
            body: update,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    deleteUUIDFilter(uuidFilterId: string): Observable<void> {
        const path = APIRoutes.uuidFilterRoutes(
            this.baseUrl
        ).deleteUUIDFilter(uuidFilterId)
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