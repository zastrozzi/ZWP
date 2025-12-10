import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class EnumFilterAPIService {
    abstract createEnumFilter(
        parentId: string,
        parentType: 'query' | 'filterGroup',
        request: Model.CreateEnumFilterRequest
    ): Observable<Model.EnumFilterResponse>

    abstract getEnumFilter(enumFilterId: string): Observable<Model.EnumFilterResponse>

    abstract listEnumFilters(
        parentId: Nullable<string>,
        parentType: 'query' | 'filterGroup' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.EnumFilterResponse>>>
    ): Observable<PaginatedResponse<Model.EnumFilterResponse>>

    abstract updateEnumFilter(
        enumFilterId: string,
        update: Model.UpdateEnumFilterRequest
    ): Observable<Model.EnumFilterResponse>

    abstract deleteEnumFilter(enumFilterId: string): Observable<void>
}

export const ENUM_FILTER_API_SERVICE = new InjectionToken<EnumFilterAPIService>(
    'platform.dynamic-query.enum-filter.api.service'
)