import { Injectable, inject } from '@angular/core'
import { Model } from '../../model'
import {
    HTTPMethod,
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    serialiseDateQueryFilter,
    serialiseEnumQueryFilter,
    serialiseNumberQueryFilter,
    serialisePaginatedQueryParams,
    serialiseStringQueryFilter,
    upsertHTTPParams,
} from '@zwp/platform.common'
import { Observable, map, take, throwError } from 'rxjs'
import { LocationAPIService } from '../abstract'
import { APIRoutes } from '../../api-routes'
import { MERCHANT_NET_API_BASE_URL, MERCHANT_NET_API_CONFIG } from '../../config'
import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'LocationLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class LocationLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements LocationAPIService
{
    private config = inject(MERCHANT_NET_API_CONFIG)
    private baseUrl = inject(MERCHANT_NET_API_BASE_URL)
    private locationFacade = inject(Facades.LocationFacade)

    createLocation(
        parent: { merchantId: Nullable<string>; brandId: Nullable<string> },
        request: Model.CreateLocationRequest
    ): Observable<Model.LocationResponse> {
        let path: string
        if (parent.merchantId) {
            path = APIRoutes.merchantRoutes(this.baseUrl)
                .locationRoutesForMerchant(parent.merchantId)
                .createLocation()
        } else if (parent.brandId) {
            path = APIRoutes.brandRoutes(this.baseUrl)
                .locationRoutesForBrand(parent.brandId)
                .createLocation()
        } else {
            return throwError(
                () => new Error('Invalid parent for location creation')
            )
        }
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.POST,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }

    getLocation(locationId: string): Observable<Model.LocationResponse> {
        const path = APIRoutes.locationRoutes(this.baseUrl).getLocation(
            locationId
        )
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    listLocations(
        parent: { merchantId: Nullable<string>; brandId: Nullable<string> },
        pagination: Nullable<Partial<PaginatedQueryParams<Model.LocationResponse>>>
    ): Observable<PaginatedResponse<Model.LocationResponse>> {
        let path: string
        console.log('parent', parent)
        if (parent.merchantId) {
            path = APIRoutes.merchantRoutes(this.baseUrl)
                .locationRoutesForMerchant(parent.merchantId)
                .listLocations()
        } else if (parent.brandId) {
            path = APIRoutes.brandRoutes(this.baseUrl)
                .locationRoutesForBrand(parent.brandId)
                .listLocations()
        } else {
            path = APIRoutes.locationRoutes(this.baseUrl).listLocations()
        }
        let params = serialisePaginatedQueryParams(
            pagination,
            this.locationFacade.locationRemotePagination$
        )
        this.locationFacade.locationFilters$
            .pipe(
                take(1),
                map((filters) => {
                    if (filters.dbCreatedAt) {
                        params = upsertHTTPParams(
                            params,
                            serialiseDateQueryFilter(
                                'db_created_at',
                                filters.dbCreatedAt
                            )
                        )
                    }
                    if (filters.dbUpdatedAt) {
                        params = upsertHTTPParams(
                            params,
                            serialiseDateQueryFilter(
                                'db_updated_at',
                                filters.dbUpdatedAt
                            )
                        )
                    }
                    if (filters.dbDeletedAt) {
                        params = upsertHTTPParams(
                            params,
                            serialiseDateQueryFilter(
                                'db_deleted_at',
                                filters.dbDeletedAt
                            )
                        )
                    }
                    if (filters.status) {
                        params = upsertHTTPParams(
                            params,
                            serialiseEnumQueryFilter('status', filters.status)
                        )
                    }
                    if (filters.name) {
                        params = upsertHTTPParams(
                            params,
                            serialiseStringQueryFilter('name', filters.name)
                        )
                    }
                    if (filters.lat) {
                        params = upsertHTTPParams(
                            params,
                            serialiseNumberQueryFilter('lat', filters.lat)
                        )
                    }
                    if (filters.lon) {
                        params = upsertHTTPParams(
                            params,
                            serialiseNumberQueryFilter('lon', filters.lon)
                        )
                    }
                    if (filters.addressRefinement) {
                        params = upsertHTTPParams(
                            params,
                            serialiseStringQueryFilter(
                                'address_refinement',
                                filters.addressRefinement
                            )
                        )
                    }
                    if (filters.addressNumber) {
                        params = upsertHTTPParams(
                            params,
                            serialiseStringQueryFilter(
                                'address_number',
                                filters.addressNumber
                            )
                        )
                    }
                    if (filters.addressStreet) {
                        params = upsertHTTPParams(
                            params,
                            serialiseStringQueryFilter(
                                'address_street',
                                filters.addressStreet
                            )
                        )
                    }
                    if (filters.addressCity) {
                        params = upsertHTTPParams(
                            params,
                            serialiseStringQueryFilter(
                                'address_city',
                                filters.addressCity
                            )
                        )
                    }
                    if (filters.addressRegion) {
                        params = upsertHTTPParams(
                            params,
                            serialiseStringQueryFilter(
                                'address_region',
                                filters.addressRegion
                            )
                        )
                    }
                    if (filters.addressPostalCode) {
                        params = upsertHTTPParams(
                            params,
                            serialiseStringQueryFilter(
                                'address_postal_code',
                                filters.addressPostalCode
                            )
                        )
                    }
                    if (filters.country) {
                        params = upsertHTTPParams(
                            params,
                            serialiseEnumQueryFilter('country', filters.country)
                        )
                    }
                })
            )
            .subscribe()
            .unsubscribe()
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader(),
            params
        )
    }

    updateLocation(
        locationId: string,
        request: Model.UpdateLocationRequest
    ): Observable<Model.LocationResponse> {
        const path = APIRoutes.locationRoutes(
            this.baseUrl
        ).updateLocation(locationId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.PUT,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }

    deleteLocation(locationId: string): Observable<void> {
        const path = APIRoutes.locationRoutes(
            this.baseUrl
        ).deleteLocation(locationId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.DELETE,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    createWebLocation(
        parent: { merchantId: Nullable<string>; brandId: Nullable<string> },
        request: Model.CreateWebLocationRequest
    ): Observable<Model.WebLocationResponse> {
        let path: string
        if (parent.merchantId) {
            path = APIRoutes.merchantRoutes(this.baseUrl)
                .webLocationRoutesForMerchant(parent.merchantId)
                .createWebLocation()
        } else if (parent.brandId) {
            path = APIRoutes.brandRoutes(this.baseUrl)
                .webLocationRoutesForBrand(parent.brandId)
                .createWebLocation()
        } else {
            return throwError(
                () => new Error('Invalid parent for web location creation')
            )
        }
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.POST,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }

    getWebLocation(
        webLocationId: string
    ): Observable<Model.WebLocationResponse> {
        const path = APIRoutes.webLocationRoutes(
            this.baseUrl
        ).getWebLocation(webLocationId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    listWebLocations(
        parent: { merchantId: Nullable<string>; brandId: Nullable<string> },
        pagination: Nullable<Partial<PaginatedQueryParams<Model.WebLocationResponse>>>
    ): Observable<PaginatedResponse<Model.WebLocationResponse>> {
        let path: string
        if (parent.merchantId) {
            path = APIRoutes.merchantRoutes(this.baseUrl)
                .webLocationRoutesForMerchant(parent.merchantId)
                .listWebLocations()
        } else if (parent.brandId) {
            path = APIRoutes.brandRoutes(this.baseUrl)
                .webLocationRoutesForBrand(parent.brandId)
                .listWebLocations()
        } else {
            path = APIRoutes.webLocationRoutes(
                this.baseUrl
            ).listWebLocations()
        }
        let params = serialisePaginatedQueryParams(
            pagination,
            this.locationFacade.webLocationRemotePagination$
        )
        this.locationFacade.webLocationFilters$
            .pipe(
                take(1),
                map((filters) => {
                    if (filters.dbCreatedAt) {
                        params = upsertHTTPParams(
                            params,
                            serialiseDateQueryFilter(
                                'db_created_at',
                                filters.dbCreatedAt
                            )
                        )
                    }
                    if (filters.dbUpdatedAt) {
                        params = upsertHTTPParams(
                            params,
                            serialiseDateQueryFilter(
                                'db_updated_at',
                                filters.dbUpdatedAt
                            )
                        )
                    }
                    if (filters.dbDeletedAt) {
                        params = upsertHTTPParams(
                            params,
                            serialiseDateQueryFilter(
                                'db_deleted_at',
                                filters.dbDeletedAt
                            )
                        )
                    }
                    if (filters.status) {
                        params = upsertHTTPParams(
                            params,
                            serialiseEnumQueryFilter('status', filters.status)
                        )
                    }
                    if (filters.name) {
                        params = upsertHTTPParams(
                            params,
                            serialiseStringQueryFilter('name', filters.name)
                        )
                    }
                    if (filters.baseUrl) {
                        params = upsertHTTPParams(
                            params,
                            serialiseStringQueryFilter(
                                'base_url',
                                filters.baseUrl
                            )
                        )
                    }
                })
            )
            .subscribe()
            .unsubscribe()
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader(),
            params
        )
    }

    updateWebLocation(
        webLocationId: string,
        request: Model.UpdateWebLocationRequest
    ): Observable<Model.WebLocationResponse> {
        const path = APIRoutes.webLocationRoutes(
            this.baseUrl
        ).updateWebLocation(webLocationId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.PUT,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }

    deleteWebLocation(webLocationId: string): Observable<void> {
        const path = APIRoutes.webLocationRoutes(
            this.baseUrl
        ).deleteWebLocation(webLocationId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.DELETE,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }
}
