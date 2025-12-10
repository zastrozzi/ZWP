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
    serialiseStringQueryFilter,
    upsertHTTPParam,
    upsertHTTPParams,
} from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { QueryableSchemaAPIService } from '../abstract/queryable-schema.api.service'
import { APIRoutes } from '../../api-routes'
import { DYNAMIC_QUERY_API_BASE_URL, DYNAMIC_QUERY_API_CONFIG } from '../../config'
import { PlatformAuth } from '@zwp/platform.auth'
import { Facades } from '../../+state/facades'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'QueryableSchemaLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class QueryableSchemaLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements QueryableSchemaAPIService
{
    private config = inject(DYNAMIC_QUERY_API_CONFIG)
    private baseUrl = inject(DYNAMIC_QUERY_API_BASE_URL)
    private tableFacade = inject(Facades.QueryableSchemaTableFacade)
    private columnFacade = inject(Facades.QueryableSchemaColumnFacade)
    private relationshipFacade = inject(Facades.QueryableSchemaRelationshipFacade)

    getTable(tableId: string): Observable<Model.QueryableSchemaTableResponse> {
        const path = APIRoutes.queryableSchemaRoutes(this.baseUrl).tableRoutes().getTable(tableId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    listTables(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.QueryableSchemaTableResponse>>>,
        filters: Nullable<Partial<Model.QueryableSchemaTableFilters>>
    ): Observable<PaginatedResponse<Model.QueryableSchemaTableResponse>> {
        const path = APIRoutes.queryableSchemaRoutes(this.baseUrl).tableRoutes().listTables()
        let params = serialisePaginatedQueryParams(
            pagination,
            this.tableFacade.tableRemotePagination$
        )
        if (filters) {
            if (filters.displayName) { params = upsertHTTPParams(params, serialiseStringQueryFilter('display_name', filters.displayName)) }
            if (filters.schemaName) { params = upsertHTTPParams(params, serialiseStringQueryFilter('schema_name', filters.schemaName)) }
            if (filters.tableName) { params = upsertHTTPParams(params, serialiseStringQueryFilter('table_name', filters.tableName)) }
        }
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

    getColumn(columnId: string): Observable<Model.QueryableSchemaColumnResponse> {
        const path = APIRoutes.queryableSchemaRoutes(this.baseUrl).columnRoutes().getColumn(columnId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    listColumns(
        tableId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.QueryableSchemaColumnResponse>>>
    ): Observable<PaginatedResponse<Model.QueryableSchemaColumnResponse>> {
        let path: string
        if (tableId) {
            path = APIRoutes.queryableSchemaRoutes(this.baseUrl).tableRoutes().columnRoutesForTable(tableId).listColumns()
        } else {
            path = APIRoutes.queryableSchemaRoutes(this.baseUrl).columnRoutes().listColumns()
        }
        const params = serialisePaginatedQueryParams(
            pagination, 
            this.columnFacade.columnRemotePagination$
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

    getRelationship(relationshipId: string): Observable<Model.QueryableSchemaRelationshipResponse> {
        const path = APIRoutes.queryableSchemaRoutes(this.baseUrl).relationshipRoutes().getRelationship(relationshipId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    listRelationships(
        tableId: Nullable<string>,
        relationshipType: Nullable<Model.RelationshipType>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.QueryableSchemaRelationshipResponse>>>
    ): Observable<PaginatedResponse<Model.QueryableSchemaRelationshipResponse>> {
        let path: string
        if (tableId) {
            path = APIRoutes.queryableSchemaRoutes(this.baseUrl).tableRoutes()
            .relationshipRoutesForTable(tableId).listRelationships()
        } else {
            path = APIRoutes.queryableSchemaRoutes(this.baseUrl).relationshipRoutes().listRelationships()
        }

        let params = serialisePaginatedQueryParams(
            pagination, 
            this.relationshipFacade.relationshipRemotePagination$
        )
        if (relationshipType) {
            params = upsertHTTPParam(params, 'relationship_type', relationshipType)
        }
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
}