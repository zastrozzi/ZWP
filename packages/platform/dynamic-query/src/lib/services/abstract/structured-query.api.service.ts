import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class StructuredQueryAPIService {
    abstract createStructuredQuery(
        request: Model.CreateStructuredQueryRequest
    ): Observable<Model.StructuredQueryResponse>

    abstract getStructuredQuery(structuredQueryId: string): Observable<Model.StructuredQueryResponse>

    abstract listStructuredQueries(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.StructuredQueryResponse>>>
    ): Observable<PaginatedResponse<Model.StructuredQueryResponse>>

    abstract updateStructuredQuery(
        structuredQueryId: string,
        request: Model.UpdateStructuredQueryRequest
    ): Observable<Model.StructuredQueryResponse>

    abstract deleteStructuredQuery(structuredQueryId: string): Observable<void>
}

export const STRUCTURED_QUERY_API_SERVICE = new InjectionToken<StructuredQueryAPIService>(
    'platform.dynamic-query.structured-query.api.service'
)