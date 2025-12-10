import { Injectable, inject } from '@angular/core'
import { LocationAPIService } from '../abstract/location.api.service'
import { Model } from '../../model'
import {
    createHTTPParams,
    HTTPMethod,
    isNull,
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    serialiseDateQueryFilter,
    serialiseNumberQueryFilter,
    serialisePaginatedQueryParams,
    serialiseStringQueryFilter,
    upsertHTTPParam,
    upsertHTTPParams,
} from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { PlatformAuth } from '@zwp/platform.auth'
import { APIRoutes } from '../../api-routes'
import { CDP_PARTNER_NET_API_BASE_URL, CDP_PARTNER_NET_API_CONFIG } from '../../config'
import { Facades } from '../../+state/facades'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'PartnerNetLocationLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class LocationLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements LocationAPIService
{
    private config = inject(CDP_PARTNER_NET_API_CONFIG)
    private baseUrl = inject(CDP_PARTNER_NET_API_BASE_URL)
    private locationFacade = inject(Facades.PartnerNetLocationFacade)

    createLocation(
        parentId: string,
        parentType: 'partner' | 'subgroup',
        request: Model.CreateLocationRequest
    ): Observable<Model.LocationResponse> {
        let path: string
        switch (parentType) {
            case 'partner': {
                path = APIRoutes.partnerRoutes(this.baseUrl)
                    .locationRoutesForPartner(parentId)
                    .createLocation()
                break
            }
            case 'subgroup': {
                path = APIRoutes.subgroupRoutes(this.baseUrl)
                    .locationRoutesForSubgroup(parentId)
                    .createLocation()
                break
            }
        }
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.POST,
            url: path,
            body: { parentId, parentType, ...request },
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    getLocation(locationId: string): Observable<Model.LocationResponse> {
        const path = APIRoutes.locationRoutes(this.baseUrl).getLocation(
            locationId
        )
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    listLocations(
        parentId: Nullable<string>,
        parentType: 'partner' | 'subgroup' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.LocationResponse>>>,
        filters: Nullable<Partial<Model.LocationFilters>>
    ): Observable<PaginatedResponse<Model.LocationResponse>> {
        let path: string
        switch (parentType) {
            case 'partner': {
                if (isNull(parentId)) {
                    return throwError(
                        () =>
                            new Error(
                                'Parent ID is required when parent type is partner'
                            )
                    )
                }
                path = APIRoutes.partnerRoutes(this.baseUrl)
                    .locationRoutesForPartner(parentId)
                    .listLocations()
                break
            }
            case 'subgroup': {
                if (isNull(parentId)) {
                    return throwError(
                        () =>
                            new Error(
                                'Parent ID is required when parent type is partner subgroup'
                            )
                    )
                }
                path = APIRoutes.subgroupRoutes(this.baseUrl)
                    .locationRoutesForSubgroup(parentId)
                    .listLocations()
                break
            }
            case 'none': {
                path = APIRoutes.locationRoutes(
                    this.baseUrl
                ).listLocations()
                break
            }
        }

        let params = serialisePaginatedQueryParams(
            pagination,
            this.locationFacade.locationRemotePagination$
        )
        if (filters) {
            if (filters.dbCreatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt)) }
            if (filters.dbUpdatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt)) }
            if (filters.name) { params = upsertHTTPParams(params, serialiseStringQueryFilter('name', filters.name)) }
            if (filters.geometry?.x) { params = upsertHTTPParams(params, serialiseNumberQueryFilter('geometry[x]', filters.geometry.x)) }
            if (filters.geometry?.y) { params = upsertHTTPParams(params, serialiseNumberQueryFilter('geometry[y]', filters.geometry.y)) }
        }
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
            params: params,
        })
    }

    updateLocation(
        locationId: string,
        request: Model.UpdateLocationRequest
    ): Observable<Model.LocationResponse> {
        const path = APIRoutes.locationRoutes(
            this.baseUrl
        ).updateLocation(locationId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PATCH,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    deleteLocation(locationId: string, force: boolean): Observable<void> {
        const path = APIRoutes.locationRoutes(
            this.baseUrl
        ).deleteLocation(locationId)
        let params = createHTTPParams()
        if (force) { params = upsertHTTPParam(params, 'force', force) }
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
            params: params,
        })
    }
}
