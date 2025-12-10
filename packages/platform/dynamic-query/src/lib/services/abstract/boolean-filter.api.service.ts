import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class BooleanFilterAPIService {
    abstract createBooleanFilter(
        parentId: string,
        parentType: 'query' | 'filterGroup',
        request: Model.CreateBooleanFilterRequest
    ): Observable<Model.BooleanFilterResponse>

    abstract getBooleanFilter(booleanFilterId: string): Observable<Model.BooleanFilterResponse>

    abstract listBooleanFilters(
        parentId: Nullable<string>,
        parentType: 'query' | 'filterGroup' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.BooleanFilterResponse>>>
    ): Observable<PaginatedResponse<Model.BooleanFilterResponse>>

    abstract updateBooleanFilter(
        booleanFilterId: string,
        update: Model.UpdateBooleanFilterRequest
    ): Observable<Model.BooleanFilterResponse>

    abstract deleteBooleanFilter(booleanFilterId: string): Observable<void>
}

export const BOOLEAN_FILTER_API_SERVICE = new InjectionToken<BooleanFilterAPIService>(
    'platform.dynamic-query.boolean-filter.api.service'
)