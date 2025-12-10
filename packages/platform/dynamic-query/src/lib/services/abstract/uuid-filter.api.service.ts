import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class UUIDFilterAPIService {
    abstract createUUIDFilter(
        parentId: string,
        parentType: 'query' | 'filterGroup',
        request: Model.CreateUUIDFilterRequest
    ): Observable<Model.UUIDFilterResponse>

    abstract getUUIDFilter(uuidFilterId: string): Observable<Model.UUIDFilterResponse>

    abstract listUUIDFilters(
        parentId: Nullable<string>,
        parentType: 'query' | 'filterGroup' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.UUIDFilterResponse>>>
    ): Observable<PaginatedResponse<Model.UUIDFilterResponse>>

    abstract updateUUIDFilter(
        uuidFilterId: string,
        update: Model.UpdateUUIDFilterRequest
    ): Observable<Model.UUIDFilterResponse>

    abstract deleteUUIDFilter(uuidFilterId: string): Observable<void>
}

export const UUID_FILTER_API_SERVICE = new InjectionToken<UUIDFilterAPIService>(
    'platform.dynamic-query.uuid-filter.api.service'
)