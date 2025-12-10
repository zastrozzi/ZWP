import { Injectable } from '@angular/core'
import { Model } from '../../model'
import {
  ZWPDebuggableInjectable,
  Nullable,
  PaginatedQueryParams,
  PaginatedResponse,
} from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { UUIDFilterAPIService } from '../abstract'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
  serviceName: 'UUIDFilterMockAPIService',
  options: { skipMethodDebugger: true },
})
export class UUIDFilterMockAPIService implements UUIDFilterAPIService {
  createUUIDFilter(
    _parentId: string,
    _parentType: 'query' | 'filterGroup',
    _request: Model.CreateUUIDFilterRequest
  ): Observable<Model.UUIDFilterResponse> {
    return throwError(() => new Error('Method not implemented'))
  }

  getUUIDFilter(_uuidFilterId: string): Observable<Model.UUIDFilterResponse> {
    return throwError(() => new Error('Method not implemented'))
  }

  listUUIDFilters(
    _parentId: Nullable<string>,
    _parentType: 'query' | 'filterGroup' | 'none',
    _pagination: Nullable<Partial<PaginatedQueryParams<Model.UUIDFilterResponse>>>
  ): Observable<PaginatedResponse<Model.UUIDFilterResponse>> {
    return throwError(() => new Error('Method not implemented'))
  }

  updateUUIDFilter(
    _uuidFilterId: string,
    _update: Model.UpdateUUIDFilterRequest
  ): Observable<Model.UUIDFilterResponse> {
    return throwError(() => new Error('Method not implemented'))
  }

  deleteUUIDFilter(_uuidFilterId: string): Observable<void> {
    return throwError(() => new Error('Method not implemented'))
  }
}