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
import { FilterGroupAPIService } from '../abstract'
import { APIRoutes } from '../../api-routes'
import { DYNAMIC_QUERY_API_BASE_URL, DYNAMIC_QUERY_API_CONFIG } from '../../config'
import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'FilterGroupLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class FilterGroupLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements FilterGroupAPIService
{
    private config = inject(DYNAMIC_QUERY_API_CONFIG)
    private baseUrl = inject(DYNAMIC_QUERY_API_BASE_URL)
    private filterGroupFacade = inject(Facades.FilterGroupFacade)

    createFilterGroup(
        parentId: string,
        parentType: 'query' | 'parentGroup',
        request: Model.CreateFilterGroupRequest
    ): Observable<Model.FilterGroupResponse> {
        let path: string
        switch (parentType) {
            case 'query': { 
                path = APIRoutes
                    .structuredQueryRoutes(this.baseUrl)
                    .filterGroupRoutesForStructuredQuery(parentId)
                    .createFilterGroup()
                    break
            }
            case 'parentGroup': {
                path = APIRoutes
                    .filterGroupRoutes(this.baseUrl)
                    .filterGroupRoutesForParentGroup(parentId)
                    .createFilterGroup()
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

    getFilterGroup(filterGroupId: string): Observable<Model.FilterGroupResponse> {
        const path = APIRoutes.filterGroupRoutes(this.baseUrl).getFilterGroup(
            filterGroupId
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

    listFilterGroups(
        parentId: Nullable<string>,
        parentType: 'query' | 'parentGroup' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.FilterGroupResponse>>>
    ): Observable<PaginatedResponse<Model.FilterGroupResponse>> {
        let path: string
        switch (parentType) {
            case 'query': { 
                if (isNull(parentId)) { return throwError(
                    () => new Error('No parent ID provided for query parent type')
                )}
                path = APIRoutes
                    .structuredQueryRoutes(this.baseUrl)
                    .filterGroupRoutesForStructuredQuery(parentId)
                    .listFilterGroups()
                    break
            }
            case 'parentGroup': {
                if (isNull(parentId)) { return throwError(
                    () => new Error('No parent ID provided for parentGroup parent type')
                )}
                path = APIRoutes
                    .filterGroupRoutes(this.baseUrl)
                    .filterGroupRoutesForParentGroup(parentId)
                    .listFilterGroups()
                    break
            }
            case 'none': {
                path = APIRoutes
                    .filterGroupRoutes(this.baseUrl)
                    .listFilterGroups()
                    break
            }
        }
        const params = serialisePaginatedQueryParams(
            pagination,
            this.filterGroupFacade.filterGroupRemotePagination$
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

    updateFilterGroup(
        filterGroupId: string,
        update: Model.UpdateFilterGroupRequest
    ): Observable<Model.FilterGroupResponse> {
        const path = APIRoutes.filterGroupRoutes(
            this.baseUrl
        ).updateFilterGroup(filterGroupId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PATCH,
            url: path,
            body: update,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    deleteFilterGroup(filterGroupId: string): Observable<void> {
        const path = APIRoutes.filterGroupRoutes(
            this.baseUrl
        ).deleteFilterGroup(filterGroupId)
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