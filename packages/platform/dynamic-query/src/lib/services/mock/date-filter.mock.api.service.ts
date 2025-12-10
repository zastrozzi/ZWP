import { Injectable } from '@angular/core'
import { Model } from '../../model'
import {
  ZWPDebuggableInjectable,
  Nullable,
  PaginatedQueryParams,
  PaginatedResponse,
} from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { DateFilterAPIService } from '../abstract'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
  serviceName: 'DateFilterMockAPIService',
  options: { skipMethodDebugger: true },
})
export class DateFilterMockAPIService implements DateFilterAPIService {
  createDateFilter(
    _parentId: string,
    _parentType: 'query' | 'filterGroup',
    _request: Model.CreateDateFilterRequest
  ): Observable<Model.DateFilterResponse> {
    return throwError(() => new Error('Method not implemented'))
  }

  getDateFilter(_dateFilterId: string): Observable<Model.DateFilterResponse> {
    return throwError(() => new Error('Method not implemented'))
  }

  listDateFilters(
    _parentId: Nullable<string>,
    _parentType: 'query' | 'filterGroup' | 'none',
    _pagination: Nullable<Partial<PaginatedQueryParams<Model.DateFilterResponse>>>
  ): Observable<PaginatedResponse<Model.DateFilterResponse>> {
    return throwError(() => new Error('Method not implemented'))
  }

  updateDateFilter(
    _dateFilterId: string,
    _update: Model.UpdateDateFilterRequest
  ): Observable<Model.DateFilterResponse> {
    return throwError(() => new Error('Method not implemented'))
  }

  deleteDateFilter(_dateFilterId: string): Observable<void> {
    return throwError(() => new Error('Method not implemented'))
  }
}