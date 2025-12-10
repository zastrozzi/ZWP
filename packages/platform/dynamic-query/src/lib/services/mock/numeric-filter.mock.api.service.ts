import { Injectable } from '@angular/core'
import { Model } from '../../model'
import {
  ZWPDebuggableInjectable,
  Nullable,
  PaginatedQueryParams,
  PaginatedResponse,
} from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { NumericFilterAPIService } from '../abstract'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
  serviceName: 'NumericFilterMockAPIService',
  options: { skipMethodDebugger: true },
})
export class NumericFilterMockAPIService implements NumericFilterAPIService {
  createNumericFilter(
    _parentId: string,
    _parentType: 'query' | 'filterGroup',
    _request: Model.CreateNumericFilterRequest
  ): Observable<Model.NumericFilterResponse> {
    return throwError(() => new Error('Method not implemented'))
  }

  getNumericFilter(_numericFilterId: string): Observable<Model.NumericFilterResponse> {
    return throwError(() => new Error('Method not implemented'))
  }

  listNumericFilters(
    _parentId: Nullable<string>,
    _parentType: 'query' | 'filterGroup' | 'none',
    _pagination: Nullable<Partial<PaginatedQueryParams<Model.NumericFilterResponse>>>
  ): Observable<PaginatedResponse<Model.NumericFilterResponse>> {
    return throwError(() => new Error('Method not implemented'))
  }

  updateNumericFilter(
    _numericFilterId: string,
    _update: Model.UpdateNumericFilterRequest
  ): Observable<Model.NumericFilterResponse> {
    return throwError(() => new Error('Method not implemented'))
  }

  deleteNumericFilter(_numericFilterId: string): Observable<void> {
    return throwError(() => new Error('Method not implemented'))
  }
}