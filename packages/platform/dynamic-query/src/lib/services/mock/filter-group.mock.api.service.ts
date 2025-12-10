import { Injectable } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { FilterGroupAPIService } from '../abstract/filter-group.api.service'
import { ZWPDebuggableInjectable } from '@zwp/platform.common'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'FilterGroupMockAPIService',
    options: { skipMethodDebugger: true },
})
export class FilterGroupMockAPIService implements FilterGroupAPIService {
    createFilterGroup(
        _parentId: string,
        _parentType: 'query' | 'parentGroup',
        _request: Model.CreateFilterGroupRequest
    ): Observable<Model.FilterGroupResponse> {
        return throwError(() => new Error('Method not implemented'))
    }
    
    getFilterGroup(
        _filterGroupId: string
    ): Observable<Model.FilterGroupResponse> {
        return throwError(() => new Error('Method not implemented'))
    }
    
    listFilterGroups(
        _parentId: Nullable<string>,
        _parentType: 'query' | 'parentGroup' | 'none',
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.FilterGroupResponse>>>
    ): Observable<PaginatedResponse<Model.FilterGroupResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }
    
    updateFilterGroup(
        _filterGroupId: string,
        _update: Model.UpdateFilterGroupRequest
    ): Observable<Model.FilterGroupResponse> {
        return throwError(() => new Error('Method not implemented'))
    }
    
    deleteFilterGroup(
        _filterGroupId: string
    ): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }
}