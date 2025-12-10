import { Injectable } from '@angular/core'
import { Model } from '../../model'
import {
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { BooleanFilterAPIService } from '../abstract'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'BooleanFilterMockAPIService',
    options: { skipMethodDebugger: true },
})
export class BooleanFilterMockAPIService implements BooleanFilterAPIService {
    createBooleanFilter(
        _parentId: string,
        _parentType: 'query' | 'filterGroup',
        _request: Model.CreateBooleanFilterRequest
    ): Observable<Model.BooleanFilterResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    getBooleanFilter(_booleanFilterId: string): Observable<Model.BooleanFilterResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listBooleanFilters(
        _parentId: Nullable<string>,
        _parentType: 'query' | 'filterGroup' | 'none',
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.BooleanFilterResponse>>>
    ): Observable<PaginatedResponse<Model.BooleanFilterResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    updateBooleanFilter(
        _booleanFilterId: string,
        _update: Model.UpdateBooleanFilterRequest
    ): Observable<Model.BooleanFilterResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteBooleanFilter(_booleanFilterId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }
}