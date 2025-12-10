import { Injectable } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { QueryableSchemaAPIService } from '../abstract/queryable-schema.api.service'
import { ZWPDebuggableInjectable } from '@zwp/platform.common'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'QueryableSchemaMockAPIService',
    options: { skipMethodDebugger: true },
})
export class QueryableSchemaMockAPIService implements QueryableSchemaAPIService {
    getTable(_tableId: string): Observable<Model.QueryableSchemaTableResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listTables(
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.QueryableSchemaTableResponse>>>,
        _filters: Nullable<Partial<Model.QueryableSchemaTableFilters>>
    ): Observable<PaginatedResponse<Model.QueryableSchemaTableResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    getColumn(_columnId: string): Observable<Model.QueryableSchemaColumnResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listColumns(_tableId: Nullable<string>, _pagination: Nullable<Partial<PaginatedQueryParams<Model.QueryableSchemaColumnResponse>>>): Observable<PaginatedResponse<Model.QueryableSchemaColumnResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    getRelationship(_relationshipId: string): Observable<Model.QueryableSchemaRelationshipResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listRelationships(
        _tableId: Nullable<string>,
        _relationshipType: Nullable<Model.RelationshipType>,
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.QueryableSchemaRelationshipResponse>>>
    ): Observable<PaginatedResponse<Model.QueryableSchemaRelationshipResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }
}