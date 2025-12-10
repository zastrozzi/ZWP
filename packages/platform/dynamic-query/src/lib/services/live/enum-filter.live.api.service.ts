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
import { EnumFilterAPIService } from '../abstract'
import { APIRoutes } from '../../api-routes'
import { DYNAMIC_QUERY_API_BASE_URL, DYNAMIC_QUERY_API_CONFIG } from '../../config'
import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'EnumFilterLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class EnumFilterLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements EnumFilterAPIService
{
    private config = inject(DYNAMIC_QUERY_API_CONFIG)
    private baseUrl = inject(DYNAMIC_QUERY_API_BASE_URL)
    private enumFilterFacade = inject(Facades.EnumFilterFacade)

    createEnumFilter(
        parentId: string,
        parentType: 'query' | 'filterGroup',
        request: Model.CreateEnumFilterRequest
    ): Observable<Model.EnumFilterResponse> {
        let path: string
        switch (parentType) {
            case 'query': { 
                path = APIRoutes
                    .structuredQueryRoutes(this.baseUrl)
                    .enumFilterRoutesForStructuredQuery(parentId)
                    .createEnumFilter()
                    break
            }
            case 'filterGroup': {
                path = APIRoutes
                    .filterGroupRoutes(this.baseUrl)
                    .enumFilterRoutesForFilterGroup(parentId)
                    .createEnumFilter()
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

    getEnumFilter(enumFilterId: string): Observable<Model.EnumFilterResponse> {
        const path = APIRoutes.enumFilterRoutes(this.baseUrl).getEnumFilter(
            enumFilterId
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

    listEnumFilters(
        parentId: Nullable<string>,
        parentType: 'query' | 'filterGroup' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.EnumFilterResponse>>>
    ): Observable<PaginatedResponse<Model.EnumFilterResponse>> {
        let path: string
        switch (parentType) {
            case 'query': { 
                if (isNull(parentId)) { return throwError(
                    () => new Error('No parent ID provided for query parent type')
                )}
                path = APIRoutes
                    .structuredQueryRoutes(this.baseUrl)
                    .enumFilterRoutesForStructuredQuery(parentId)
                    .listEnumFilters()
                    break
            }
            case 'filterGroup': {
                if (isNull(parentId)) { return throwError(
                    () => new Error('No parent ID provided for filterGroup parent type')
                )}
                path = APIRoutes
                    .filterGroupRoutes(this.baseUrl)
                    .enumFilterRoutesForFilterGroup(parentId)
                    .listEnumFilters()
                    break
            }
            case 'none': {
                path = APIRoutes
                    .enumFilterRoutes(this.baseUrl)
                    .listEnumFilters()
                    break
            }
        }
        const params = serialisePaginatedQueryParams(
            pagination,
            this.enumFilterFacade.enumFilterRemotePagination$
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

    updateEnumFilter(
        enumFilterId: string,
        update: Model.UpdateEnumFilterRequest
    ): Observable<Model.EnumFilterResponse> {
        const path = APIRoutes.enumFilterRoutes(
            this.baseUrl
        ).updateEnumFilter(enumFilterId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PATCH,
            url: path,
            body: update,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    deleteEnumFilter(enumFilterId: string): Observable<void> {
        const path = APIRoutes.enumFilterRoutes(
            this.baseUrl
        ).deleteEnumFilter(enumFilterId)
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