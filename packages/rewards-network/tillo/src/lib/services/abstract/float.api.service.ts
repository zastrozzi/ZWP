import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model';
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export abstract class TilloFloatAPIService {
    abstract getFloat(floatId: string): Observable<Model.FloatResponse>
    abstract refreshFloats(): Observable<Model.FloatResponse>
    abstract listFloats(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.FloatResponse>>>,
        filters: Nullable<Partial<Model.Filters.FloatFilters>>
    ): Observable<PaginatedResponse<Model.FloatResponse>>
    abstract deleteFloat(floatId: string): Observable<void>
    abstract assignFloatToBrand(floatId: Nullable<string>, brandId: Nullable<string>): Observable<Model.FloatResponse>
}

export const FLOAT_API_SERVICE = new InjectionToken<TilloFloatAPIService> (
    'rewards-network.tillo.float.api.service'
)