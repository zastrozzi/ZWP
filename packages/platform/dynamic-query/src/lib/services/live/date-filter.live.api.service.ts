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
import { DateFilterAPIService } from '../abstract'
import { APIRoutes } from '../../api-routes'
import { DYNAMIC_QUERY_API_BASE_URL, DYNAMIC_QUERY_API_CONFIG } from '../../config'
import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'DateFilterLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class DateFilterLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements DateFilterAPIService
{
    private config = inject(DYNAMIC_QUERY_API_CONFIG)
    private baseUrl = inject(DYNAMIC_QUERY_API_BASE_URL)
    private dateFilterFacade = inject(Facades.DateFilterFacade)

    createDateFilter(
        parentId: string,
        parentType: 'query' | 'filterGroup',
        request: Model.CreateDateFilterRequest
    ): Observable<Model.DateFilterResponse> {
        let path: string
        switch (parentType) {
            case 'query': { 
                path = APIRoutes
                    .structuredQueryRoutes(this.baseUrl)
                    .dateFilterRoutesForStructuredQuery(parentId)
                    .createDateFilter()
                    break
            }
            case 'filterGroup': {
                path = APIRoutes
                    .filterGroupRoutes(this.baseUrl)
                    .dateFilterRoutesForFilterGroup(parentId)
                    .createDateFilter()
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

    getDateFilter(dateFilterId: string): Observable<Model.DateFilterResponse> {
        const path = APIRoutes.dateFilterRoutes(this.baseUrl).getDateFilter(
            dateFilterId
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

    listDateFilters(
        parentId: Nullable<string>,
        parentType: 'query' | 'filterGroup' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.DateFilterResponse>>>
    ): Observable<PaginatedResponse<Model.DateFilterResponse>> {
        let path: string
        switch (parentType) {
            case 'query': { 
                if (isNull(parentId)) { return throwError(
                    () => new Error('No parent ID provided for query parent type')
                )}
                path = APIRoutes
                    .structuredQueryRoutes(this.baseUrl)
                    .dateFilterRoutesForStructuredQuery(parentId)
                    .listDateFilters()
                    break
            }
            case 'filterGroup': {
                if (isNull(parentId)) { return throwError(
                    () => new Error('No parent ID provided for filterGroup parent type')
                )}
                path = APIRoutes
                    .filterGroupRoutes(this.baseUrl)
                    .dateFilterRoutesForFilterGroup(parentId)
                    .listDateFilters()
                    break
            }
            case 'none': {
                path = APIRoutes
                    .dateFilterRoutes(this.baseUrl)
                    .listDateFilters()
                    break
            }
        }
        const params = serialisePaginatedQueryParams(
            pagination,
            this.dateFilterFacade.dateFilterRemotePagination$
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

    updateDateFilter(
        dateFilterId: string,
        update: Model.UpdateDateFilterRequest
    ): Observable<Model.DateFilterResponse> {
        const path = APIRoutes.dateFilterRoutes(
            this.baseUrl
        ).updateDateFilter(dateFilterId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PATCH,
            url: path,
            body: update,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    deleteDateFilter(dateFilterId: string): Observable<void> {
        const path = APIRoutes.dateFilterRoutes(
            this.baseUrl
        ).deleteDateFilter(dateFilterId)
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