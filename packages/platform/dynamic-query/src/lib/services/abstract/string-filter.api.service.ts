import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class StringFilterAPIService {
    abstract createStringFilter(
        parentId: string,
        parentType: 'query' | 'filterGroup',
        request: Model.CreateStringFilterRequest
    ): Observable<Model.StringFilterResponse>

    abstract getStringFilter(stringFilterId: string): Observable<Model.StringFilterResponse>

    abstract listStringFilters(
        parentId: Nullable<string>,
        parentType: 'query' | 'filterGroup' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.StringFilterResponse>>>
    ): Observable<PaginatedResponse<Model.StringFilterResponse>>

    abstract updateStringFilter(
        stringFilterId: string,
        update: Model.UpdateStringFilterRequest
    ): Observable<Model.StringFilterResponse>

    abstract deleteStringFilter(stringFilterId: string): Observable<void>
}

export const STRING_FILTER_API_SERVICE = new InjectionToken<StringFilterAPIService>(
    'platform.dynamic-query.string-filter.api.service'
)