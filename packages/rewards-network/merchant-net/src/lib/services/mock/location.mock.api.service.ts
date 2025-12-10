import { Injectable } from '@angular/core'
import { Model } from '../../model'
import {
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { LocationAPIService } from '../abstract'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'LocationMockAPIService', options: { skipMethodDebugger: true } })
export class LocationMockAPIService implements LocationAPIService {
    createLocation(_parent: { merchantId: Nullable<string>, brandId: Nullable<string> }, _request: Model.CreateLocationRequest): Observable<Model.LocationResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    getLocation(_locationId: string): Observable<Model.LocationResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listLocations(_parent: { merchantId: Nullable<string>, brandId: Nullable<string> }, _pagination: Nullable<Partial<PaginatedQueryParams<Model.LocationResponse>>>): Observable<PaginatedResponse<Model.LocationResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    updateLocation(_locationId: string, _request: Model.UpdateLocationRequest): Observable<Model.LocationResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteLocation(_locationId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }

    createWebLocation(_parent: { merchantId: Nullable<string>, brandId: Nullable<string> }, _request: Model.CreateWebLocationRequest): Observable<Model.WebLocationResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    getWebLocation(_webLocationId: string): Observable<Model.WebLocationResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listWebLocations(_parent: { merchantId: Nullable<string>, brandId: Nullable<string> }, _pagination: Nullable<Partial<PaginatedQueryParams<Model.WebLocationResponse>>>): Observable<PaginatedResponse<Model.WebLocationResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    updateWebLocation(_webLocationId: string, _request: Model.UpdateWebLocationRequest): Observable<Model.WebLocationResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteWebLocation(_webLocationId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }
}