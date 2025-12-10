import { Injectable } from '@angular/core'
import { Model } from '../../model'
import {
  ZWPDebuggableInjectable,
  Nullable,
  PaginatedQueryParams,
  PaginatedResponse,
} from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { EnumFilterAPIService } from '../abstract'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
  serviceName: 'EnumFilterMockAPIService',
  options: { skipMethodDebugger: true },
})
export class EnumFilterMockAPIService implements EnumFilterAPIService {
  createEnumFilter(
    _parentId: string,
    _parentType: 'query' | 'filterGroup',
    _request: Model.CreateEnumFilterRequest
  ): Observable<Model.EnumFilterResponse> {
    return throwError(() => new Error('Method not implemented'))
  }

  getEnumFilter(_enumFilterId: string): Observable<Model.EnumFilterResponse> {
    return throwError(() => new Error('Method not implemented'))
  }

  listEnumFilters(
    _parentId: Nullable<string>,
    _parentType: 'query' | 'filterGroup' | 'none',
    _pagination: Nullable<Partial<PaginatedQueryParams<Model.EnumFilterResponse>>>
  ): Observable<PaginatedResponse<Model.EnumFilterResponse>> {
    return throwError(() => new Error('Method not implemented'))
  }

  updateEnumFilter(
    _enumFilterId: string,
    _update: Model.UpdateEnumFilterRequest
  ): Observable<Model.EnumFilterResponse> {
    return throwError(() => new Error('Method not implemented'))
  }

  deleteEnumFilter(_enumFilterId: string): Observable<void> {
    return throwError(() => new Error('Method not implemented'))
  }
}