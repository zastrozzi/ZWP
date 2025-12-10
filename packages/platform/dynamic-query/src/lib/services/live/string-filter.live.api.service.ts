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
import { StringFilterAPIService } from '../abstract'
import { APIRoutes } from '../../api-routes'
import { DYNAMIC_QUERY_API_BASE_URL, DYNAMIC_QUERY_API_CONFIG } from '../../config'
import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'StringFilterLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class StringFilterLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements StringFilterAPIService
{
    private config = inject(DYNAMIC_QUERY_API_CONFIG)
    private baseUrl = inject(DYNAMIC_QUERY_API_BASE_URL)
    private stringFilterFacade = inject(Facades.StringFilterFacade)

    createStringFilter(
        parentId: string,
        parentType: 'query' | 'filterGroup',
        request: Model.CreateStringFilterRequest
    ): Observable<Model.StringFilterResponse> {
        let path: string
        switch (parentType) {
            case 'query': { 
                path = APIRoutes
                    .structuredQueryRoutes(this.baseUrl)
                    .stringFilterRoutesForStructuredQuery(parentId)
                    .createStringFilter()
                    break
            }
            case 'filterGroup': {
                path = APIRoutes
                    .filterGroupRoutes(this.baseUrl)
                    .stringFilterRoutesForFilterGroup(parentId)
                    .createStringFilter()
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

    getStringFilter(stringFilterId: string): Observable<Model.StringFilterResponse> {
        const path = APIRoutes.stringFilterRoutes(this.baseUrl).getStringFilter(
            stringFilterId
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

    listStringFilters(
        parentId: Nullable<string>,
        parentType: 'query' | 'filterGroup' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.StringFilterResponse>>>
    ): Observable<PaginatedResponse<Model.StringFilterResponse>> {
        let path: string
        switch (parentType) {
            case 'query': { 
                if (isNull(parentId)) { return throwError(
                    () => new Error('No parent ID provided for query parent type')
                )}
                path = APIRoutes
                    .structuredQueryRoutes(this.baseUrl)
                    .stringFilterRoutesForStructuredQuery(parentId)
                    .listStringFilters()
                    break
            }
            case 'filterGroup': {
                if (isNull(parentId)) { return throwError(
                    () => new Error('No parent ID provided for filterGroup parent type')
                )}
                path = APIRoutes
                    .filterGroupRoutes(this.baseUrl)
                    .stringFilterRoutesForFilterGroup(parentId)
                    .listStringFilters()
                    break
            }
            case 'none': {
                path = APIRoutes
                    .stringFilterRoutes(this.baseUrl)
                    .listStringFilters()
                    break
            }
        }
        const params = serialisePaginatedQueryParams(
            pagination,
            this.stringFilterFacade.stringFilterRemotePagination$
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

    updateStringFilter(
        stringFilterId: string,
        update: Model.UpdateStringFilterRequest
    ): Observable<Model.StringFilterResponse> {
        const path = APIRoutes.stringFilterRoutes(
            this.baseUrl
        ).updateStringFilter(stringFilterId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PATCH,
            url: path,
            body: update,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    deleteStringFilter(stringFilterId: string): Observable<void> {
        const path = APIRoutes.stringFilterRoutes(
            this.baseUrl
        ).deleteStringFilter(stringFilterId)
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