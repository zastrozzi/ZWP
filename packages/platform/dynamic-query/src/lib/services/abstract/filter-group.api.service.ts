import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class FilterGroupAPIService {
    abstract createFilterGroup(
        parentId: string,
        parentType: 'query' | 'parentGroup',
        request: Model.CreateFilterGroupRequest
    ): Observable<Model.FilterGroupResponse>

    abstract getFilterGroup(filterGroupId: string): Observable<Model.FilterGroupResponse>

    abstract listFilterGroups(
        parentId: Nullable<string>,
        parentType: 'query' | 'parentGroup' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.FilterGroupResponse>>>
    ): Observable<PaginatedResponse<Model.FilterGroupResponse>>

    abstract updateFilterGroup(
        filterGroupId: string,
        update: Model.UpdateFilterGroupRequest
    ): Observable<Model.FilterGroupResponse>

    abstract deleteFilterGroup(filterGroupId: string): Observable<void>
}

export const FILTER_GROUP_API_SERVICE = new InjectionToken<FilterGroupAPIService>(
    'platform.dynamic-query.filter-group.api.service'
)