import { Injectable } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { StructuredQueryAPIService } from '../abstract/structured-query.api.service'
import { ZWPDebuggableInjectable } from '@zwp/platform.common'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'StructuredQueryMockAPIService',
    options: { skipMethodDebugger: true },
})
export class StructuredQueryMockAPIService implements StructuredQueryAPIService {
    createStructuredQuery(
        _request: Model.CreateStructuredQueryRequest
    ): Observable<Model.StructuredQueryResponse> {
        return throwError(() => new Error('Method not implemented'))
    }
    
    getStructuredQuery(
        _structuredQueryId: string
    ): Observable<Model.StructuredQueryResponse> {
        return throwError(() => new Error('Method not implemented'))
    }
    
    listStructuredQueries(
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.StructuredQueryResponse>>>
    ): Observable<PaginatedResponse<Model.StructuredQueryResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }
    
    updateStructuredQuery(
        _structuredQueryId: string,
        _request: Model.UpdateStructuredQueryRequest
    ): Observable<Model.StructuredQueryResponse> {
        return throwError(() => new Error('Method not implemented'))
    }
    
    deleteStructuredQuery(
        _structuredQueryId: string
    ): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }
}