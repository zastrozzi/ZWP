import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class QueryableSchemaAPIService {
    abstract getTable(tableId: string): Observable<Model.QueryableSchemaTableResponse>

    abstract listTables(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.QueryableSchemaTableResponse>>>,
        filters: Nullable<Partial<Model.QueryableSchemaTableFilters>>
    ): Observable<PaginatedResponse<Model.QueryableSchemaTableResponse>>

    abstract getColumn(columnId: string): Observable<Model.QueryableSchemaColumnResponse>

    abstract listColumns(
        tableId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.QueryableSchemaColumnResponse>>>
    ): Observable<PaginatedResponse<Model.QueryableSchemaColumnResponse>>

    abstract getRelationship(relationshipId: string): Observable<Model.QueryableSchemaRelationshipResponse>

    abstract listRelationships(
        tableId: Nullable<string>,
        relationshipType: Nullable<Model.RelationshipType>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.QueryableSchemaRelationshipResponse>>>
    ): Observable<PaginatedResponse<Model.QueryableSchemaRelationshipResponse>>
}

export const QUERYABLE_SCHEMA_API_SERVICE = new InjectionToken<QueryableSchemaAPIService>(
    'platform.dynamic-query.queryable-schema.api.service'
)