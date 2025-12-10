import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class NumericFilterAPIService {
    abstract createNumericFilter(
        parentId: string,
        parentType: 'query' | 'filterGroup',
        request: Model.CreateNumericFilterRequest
    ): Observable<Model.NumericFilterResponse>

    abstract getNumericFilter(numericFilterId: string): Observable<Model.NumericFilterResponse>

    abstract listNumericFilters(
        parentId: Nullable<string>,
        parentType: 'query' | 'filterGroup' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.NumericFilterResponse>>>
    ): Observable<PaginatedResponse<Model.NumericFilterResponse>>

    abstract updateNumericFilter(
        numericFilterId: string,
        update: Model.UpdateNumericFilterRequest
    ): Observable<Model.NumericFilterResponse>

    abstract deleteNumericFilter(numericFilterId: string): Observable<void>
}

export const NUMERIC_FILTER_API_SERVICE = new InjectionToken<NumericFilterAPIService>(
    'platform.dynamic-query.numeric-filter.api.service'
)