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
import { NumericFilterAPIService } from '../abstract'
import { APIRoutes } from '../../api-routes'
import { DYNAMIC_QUERY_API_BASE_URL, DYNAMIC_QUERY_API_CONFIG } from '../../config'
import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'NumericFilterLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class NumericFilterLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements NumericFilterAPIService
{
    private config = inject(DYNAMIC_QUERY_API_CONFIG)
    private baseUrl = inject(DYNAMIC_QUERY_API_BASE_URL)
    private numericFilterFacade = inject(Facades.NumericFilterFacade)

    createNumericFilter(
        parentId: string,
        parentType: 'query' | 'filterGroup',
        request: Model.CreateNumericFilterRequest
    ): Observable<Model.NumericFilterResponse> {
        let path: string
        switch (parentType) {
            case 'query': { 
                path = APIRoutes
                    .structuredQueryRoutes(this.baseUrl)
                    .numericFilterRoutesForStructuredQuery(parentId)
                    .createNumericFilter()
                    break
            }
            case 'filterGroup': {
                path = APIRoutes
                    .filterGroupRoutes(this.baseUrl)
                    .numericFilterRoutesForFilterGroup(parentId)
                    .createNumericFilter()
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

    getNumericFilter(numericFilterId: string): Observable<Model.NumericFilterResponse> {
        const path = APIRoutes.numericFilterRoutes(this.baseUrl).getNumericFilter(
            numericFilterId
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

    listNumericFilters(
        parentId: Nullable<string>,
        parentType: 'query' | 'filterGroup' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.NumericFilterResponse>>>
    ): Observable<PaginatedResponse<Model.NumericFilterResponse>> {
        let path: string
        switch (parentType) {
            case 'query': { 
                if (isNull(parentId)) { return throwError(
                    () => new Error('No parent ID provided for query parent type')
                )}
                path = APIRoutes
                    .structuredQueryRoutes(this.baseUrl)
                    .numericFilterRoutesForStructuredQuery(parentId)
                    .listNumericFilters()
                    break
            }
            case 'filterGroup': {
                if (isNull(parentId)) { return throwError(
                    () => new Error('No parent ID provided for filterGroup parent type')
                )}
                path = APIRoutes
                    .filterGroupRoutes(this.baseUrl)
                    .numericFilterRoutesForFilterGroup(parentId)
                    .listNumericFilters()
                    break
            }
            case 'none': {
                path = APIRoutes
                    .numericFilterRoutes(this.baseUrl)
                    .listNumericFilters()
                    break
            }
        }
        const params = serialisePaginatedQueryParams(
            pagination,
            this.numericFilterFacade.numericFilterRemotePagination$
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

    updateNumericFilter(
        numericFilterId: string,
        update: Model.UpdateNumericFilterRequest
    ): Observable<Model.NumericFilterResponse> {
        const path = APIRoutes.numericFilterRoutes(
            this.baseUrl
        ).updateNumericFilter(numericFilterId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PATCH,
            url: path,
            body: update,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    deleteNumericFilter(numericFilterId: string): Observable<void> {
        const path = APIRoutes.numericFilterRoutes(
            this.baseUrl
        ).deleteNumericFilter(numericFilterId)
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