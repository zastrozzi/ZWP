import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class DateFilterAPIService {
    abstract createDateFilter(
        parentId: string,
        parentType: 'query' | 'filterGroup',
        request: Model.CreateDateFilterRequest
    ): Observable<Model.DateFilterResponse>

    abstract getDateFilter(dateFilterId: string): Observable<Model.DateFilterResponse>

    abstract listDateFilters(
        parentId: Nullable<string>,
        parentType: 'query' | 'filterGroup' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.DateFilterResponse>>>
    ): Observable<PaginatedResponse<Model.DateFilterResponse>>

    abstract updateDateFilter(
        dateFilterId: string,
        update: Model.UpdateDateFilterRequest
    ): Observable<Model.DateFilterResponse>

    abstract deleteDateFilter(dateFilterId: string): Observable<void>
}

export const DATE_FILTER_API_SERVICE = new InjectionToken<DateFilterAPIService>(
    'platform.dynamic-query.date-filter.api.service'
)