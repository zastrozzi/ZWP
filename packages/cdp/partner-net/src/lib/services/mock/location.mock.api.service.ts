import { Injectable } from '@angular/core'
import { LocationAPIService } from '../abstract/location.api.service'
import { Model } from '../../model'
import { Observable, throwError } from 'rxjs'
import {
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'PartnerNetLocationMockAPIService',
    options: { skipMethodDebugger: true },
})
export class LocationMockAPIService implements LocationAPIService {
    createLocation(
        _parentId: string,
        _parentType: 'partner' | 'subgroup',
        _request: Model.CreateLocationRequest
    ): Observable<Model.LocationResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    getLocation(_locationId: string): Observable<Model.LocationResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listLocations(
        _parentId: Nullable<string>,
        _parentType: 'partner' | 'subgroup' | 'none',
        _pagination: Nullable<
            Partial<PaginatedQueryParams<Model.LocationResponse>>
        >
    ): Observable<PaginatedResponse<Model.LocationResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    updateLocation(
        _locationId: string,
        _request: Model.UpdateLocationRequest
    ): Observable<Model.LocationResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteLocation(_locationId: string, _force: boolean): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }
}
