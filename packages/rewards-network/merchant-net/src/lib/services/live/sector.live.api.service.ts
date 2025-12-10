import { Injectable, inject } from '@angular/core'
import { Model } from '../../model'
import {
    HTTPMethod,
    isNull,
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    serialiseDateQueryFilter,
    serialiseEnumQueryFilter,
    serialisePaginatedQueryParams,
    serialiseStringQueryFilter,
    upsertHTTPParam,
    upsertHTTPParams,
} from '@zwp/platform.common'
import { Observable, map, take } from 'rxjs'
import { SectorAPIService } from '../abstract'
import { APIRoutes } from '../../api-routes'
import { MERCHANT_NET_API_BASE_URL, MERCHANT_NET_API_CONFIG } from '../../config'
import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'SectorLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class SectorLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements SectorAPIService
{
    private config = inject(MERCHANT_NET_API_CONFIG)
    private baseUrl = inject(MERCHANT_NET_API_BASE_URL)
    private sectorFacade = inject(Facades.SectorFacade)

    createSector(
        sectorId: Nullable<string>,
        request: Model.CreateSectorRequest
    ): Observable<Model.SectorResponse> {
        let path: string
        if (!isNull(sectorId)) {
            path = APIRoutes.sectorRoutes(this.baseUrl)
                .subsectorRoutesForSector(sectorId)
                .createSubsector()
        }
        else {
            path = APIRoutes.sectorRoutes(this.baseUrl)
                .createSector()
        }
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.POST,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    getSector(sectorId: string): Observable<Model.SectorResponse> {
        const path = APIRoutes.sectorRoutes(this.baseUrl)
            .getSector(sectorId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    listSectors(
        parent: {
            sectorId: Nullable<string>
            brandId: Nullable<string>
        },
        pagination: Nullable<Partial<PaginatedQueryParams<Model.SectorResponse>>>,
        filters: Nullable<Partial<Model.Filters.SectorFilters>>
    ): Observable<PaginatedResponse<Model.SectorResponse>> {
        let path: string
        if (!isNull(parent.sectorId)) {
            path = APIRoutes.sectorRoutes(this.baseUrl)
                .subsectorRoutesForSector(parent.sectorId)
                .listSubsectors()
        }

        else if (!isNull(parent.brandId)) {
            path = APIRoutes.brandRoutes(this.baseUrl)
                .sectorRoutesForBrand(parent.brandId)
                .listSectors()
        }

        else {
            path = APIRoutes.sectorRoutes(this.baseUrl)
                .listSectors()
        }

        let params = serialisePaginatedQueryParams(
            pagination,
            this.sectorFacade.sectorRemotePagination$
        )

        if (filters) {
            if (filters.dbCreatedAt) {
                params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt))
            }
            if (filters.dbUpdatedAt) {
                params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt))
            }
            if (filters.dbDeletedAt) {
                params = upsertHTTPParams(params, serialiseDateQueryFilter('db_deleted_at', filters.dbDeletedAt))
            }
            if (filters.name) {
                params = upsertHTTPParams(params, serialiseStringQueryFilter('name', filters.name))
            }
        }

         if (isNull(parent.sectorId) && isNull(parent.brandId)) {
            params = upsertHTTPParam(params, 'top_level_only', true)
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

    listSubsectors(
        sectorId: string,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.SectorResponse>>>,
        filters: Nullable<Partial<Model.Filters.SectorFilters>>
    ): Observable<PaginatedResponse<Model.SectorResponse>> {
        const path = APIRoutes.sectorRoutes(this.baseUrl)
                .subsectorRoutesForSector(sectorId)
                .listSubsectors()

        let params = serialisePaginatedQueryParams(
            pagination,
            this.sectorFacade.subsectorRemotePagination$
        )

        if (filters) {
            if (filters.dbCreatedAt) {
                params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt))
            }
            if (filters.dbUpdatedAt) {
                params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt))
            }
            if (filters.dbDeletedAt) {
                params = upsertHTTPParams(params, serialiseDateQueryFilter('db_deleted_at', filters.dbDeletedAt))
            }
            if (filters.name) {
                params = upsertHTTPParams(params, serialiseStringQueryFilter('name', filters.name))
            }
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

    updateSector(
        sectorId: string,
        request: Model.UpdateSectorRequest
    ): Observable<Model.SectorResponse> {
        const path = APIRoutes.sectorRoutes(this.baseUrl)
            .updateSector(sectorId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PUT,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    deleteSector(sectorId: string): Observable<void> {
        const path = APIRoutes.sectorRoutes(this.baseUrl)
            .deleteSector(sectorId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }
}