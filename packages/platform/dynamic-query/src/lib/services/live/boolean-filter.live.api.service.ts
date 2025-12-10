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
import { BooleanFilterAPIService } from '../abstract'
import { APIRoutes } from '../../api-routes'
import { DYNAMIC_QUERY_API_BASE_URL, DYNAMIC_QUERY_API_CONFIG } from '../../config'
import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'BooleanFilterLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class BooleanFilterLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements BooleanFilterAPIService
{
    private config = inject(DYNAMIC_QUERY_API_CONFIG)
    private baseUrl = inject(DYNAMIC_QUERY_API_BASE_URL)
    private booleanFilterFacade = inject(Facades.BooleanFilterFacade)

    createBooleanFilter(
        parentId: string,
        parentType: 'query' | 'filterGroup',
        request: Model.CreateBooleanFilterRequest
    ): Observable<Model.BooleanFilterResponse> {
        let path: string
        switch (parentType) {
            case 'query': { 
                path = APIRoutes
                    .structuredQueryRoutes(this.baseUrl)
                    .booleanFilterRoutesForStructuredQuery(parentId)
                    .createBooleanFilter()
                    break
            }
            case 'filterGroup': {
                path = APIRoutes
                    .filterGroupRoutes(this.baseUrl)
                    .booleanFilterRoutesForFilterGroup(parentId)
                    .createBooleanFilter()
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

    getBooleanFilter(booleanFilterId: string): Observable<Model.BooleanFilterResponse> {
        const path = APIRoutes.booleanFilterRoutes(this.baseUrl).getBooleanFilter(
            booleanFilterId
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

    listBooleanFilters(
        parentId: Nullable<string>,
        parentType: 'query' | 'filterGroup' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.BooleanFilterResponse>>>
    ): Observable<PaginatedResponse<Model.BooleanFilterResponse>> {
        let path: string
        switch (parentType) {
            case 'query': { 
                if (isNull(parentId)) { return throwError(
                    () => new Error('No parent ID provided for query parent type')
                )}
                path = APIRoutes
                    .structuredQueryRoutes(this.baseUrl)
                    .booleanFilterRoutesForStructuredQuery(parentId)
                    .listBooleanFilters()
                    break
            }
            case 'filterGroup': {
                if (isNull(parentId)) { return throwError(
                    () => new Error('No parent ID provided for filterGroup parent type')
                )}
                path = APIRoutes
                    .filterGroupRoutes(this.baseUrl)
                    .booleanFilterRoutesForFilterGroup(parentId)
                    .listBooleanFilters()
                    break
            }
            case 'none': {
                path = APIRoutes
                    .booleanFilterRoutes(this.baseUrl)
                    .listBooleanFilters()
                    break
            }
        }
        const params = serialisePaginatedQueryParams(
            pagination,
            this.booleanFilterFacade.booleanFilterRemotePagination$
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

    updateBooleanFilter(
        booleanFilterId: string,
        update: Model.UpdateBooleanFilterRequest
    ): Observable<Model.BooleanFilterResponse> {
        const path = APIRoutes.booleanFilterRoutes(
            this.baseUrl
        ).updateBooleanFilter(booleanFilterId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PATCH,
            url: path,
            body: update,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    deleteBooleanFilter(booleanFilterId: string): Observable<void> {
        const path = APIRoutes.booleanFilterRoutes(
            this.baseUrl
        ).deleteBooleanFilter(booleanFilterId)
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