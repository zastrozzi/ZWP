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
        parent: {
            merchantId: Nullable<string>,
            brandId: Nullable<string>
        },
        request: Model.CreateLocationRequest
    ): Observable<Model.LocationResponse>

    abstract getLocation(locationId: string): Observable<Model.LocationResponse>

    abstract listLocations(
        parent: {
            merchantId: Nullable<string>,
            brandId: Nullable<string>
        },
        pagination: Nullable<Partial<PaginatedQueryParams<Model.LocationResponse>>>
    ): Observable<PaginatedResponse<Model.LocationResponse>>

    abstract updateLocation(
        locationId: string,
        request: Model.UpdateLocationRequest
    ): Observable<Model.LocationResponse>

    abstract deleteLocation(locationId: string): Observable<void>

    abstract createWebLocation(
        parent: {
            merchantId: Nullable<string>,
            brandId: Nullable<string>
        },
        request: Model.CreateWebLocationRequest
    ): Observable<Model.WebLocationResponse>

    abstract getWebLocation(
        webLocationId: string
    ): Observable<Model.WebLocationResponse>

    abstract listWebLocations(
        parent: {
            merchantId: Nullable<string>,
            brandId: Nullable<string>
        },
        pagination: Nullable<Partial<PaginatedQueryParams<Model.WebLocationResponse>>>
    ): Observable<PaginatedResponse<Model.WebLocationResponse>>

    abstract updateWebLocation(
        webLocationId: string,
        request: Model.UpdateWebLocationRequest
    ): Observable<Model.WebLocationResponse>

    abstract deleteWebLocation(webLocationId: string): Observable<void>
}

export const LOCATION_API_SERVICE = new InjectionToken<LocationAPIService>(
    'rewards-network.merchant-net.location.api.service'
)
