import { Injectable } from '@angular/core'
import { Model } from '../../model'
import {
  ZWPDebuggableInjectable,
  Nullable,
  PaginatedQueryParams,
  PaginatedResponse,
} from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { StringFilterAPIService } from '../abstract'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
  serviceName: 'StringFilterMockAPIService',
  options: { skipMethodDebugger: true },
})
export class StringFilterMockAPIService implements StringFilterAPIService {
  createStringFilter(
    _parentId: string,
    _parentType: 'query' | 'filterGroup',
    _request: Model.CreateStringFilterRequest
  ): Observable<Model.StringFilterResponse> {
    return throwError(() => new Error('Method not implemented'))
  }

  getStringFilter(_stringFilterId: string): Observable<Model.StringFilterResponse> {
    return throwError(() => new Error('Method not implemented'))
  }

  listStringFilters(
    _parentId: Nullable<string>,
    _parentType: 'query' | 'filterGroup' | 'none',
    _pagination: Nullable<Partial<PaginatedQueryParams<Model.StringFilterResponse>>>
  ): Observable<PaginatedResponse<Model.StringFilterResponse>> {
    return throwError(() => new Error('Method not implemented'))
  }

  updateStringFilter(
    _stringFilterId: string,
    _update: Model.UpdateStringFilterRequest
  ): Observable<Model.StringFilterResponse> {
    return throwError(() => new Error('Method not implemented'))
  }

  deleteStringFilter(_stringFilterId: string): Observable<void> {
    return throwError(() => new Error('Method not implemented'))
  }
}