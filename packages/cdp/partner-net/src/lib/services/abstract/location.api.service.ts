import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class LocationAPIService {

    abstract createLocation(
        parentId: string,
        parentType: 'partner' | 'subgroup',
        request: Model.CreateLocationRequest
    ): Observable<Model.LocationResponse>

    abstract getLocation(locationId: string): Observable<Model.LocationResponse>

    abstract listLocations(
        parentId: Nullable<string>,
        parentType: 'partner' | 'subgroup' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.LocationResponse>>>,
        filters: Nullable<Partial<Model.LocationFilters>>
    ): Observable<PaginatedResponse<Model.LocationResponse>>

    abstract updateLocation(
        locationId: string,
        request: Model.UpdateLocationRequest
    ): Observable<Model.LocationResponse>

    abstract deleteLocation(locationId: string, force: boolean): Observable<void>

}

export const LOCATION_API_SERVICE = new InjectionToken<LocationAPIService>(
    'cdp.partner-net.location.api.service'
)