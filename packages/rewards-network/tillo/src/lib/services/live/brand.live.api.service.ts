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
    serialisePaginatedQueryParams,
    serialiseStringQueryFilter,
    upsertHTTPParams,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'
import { TilloBrandAPIService } from '../abstract'
import { APIRoutes } from '../../api-routes'
import { TILLO_API_BASE_URL, TILLO_API_CONFIG } from '../../config'
import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'TilloBrandLiveAPIService', options: { skipMethodDebugger: true } })
export class TilloBrandLiveAPIService extends PlatformAuth.AuthedAPIService implements TilloBrandAPIService {
    private config = inject(TILLO_API_CONFIG)
    private baseUrl = inject(TILLO_API_BASE_URL)
    private brandFacade = inject(Facades.TilloBrandFacade)

    listBrands(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.BrandResponse>>> = null,
        filters: Nullable<Partial<Model.Filters.BrandFilters>>
    ): Observable<PaginatedResponse<Model.BrandResponse>> {
        const path = APIRoutes.brandRoutes(this.baseUrl).listBrands()
        let params = serialisePaginatedQueryParams(pagination, this.brandFacade.brandRemotePagination$)
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
            if (filters.type) {
                params = upsertHTTPParams(params, serialiseEnumQueryFilter('product_type', filters.type))
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

    getBrand(brandId: string): Observable<Model.BrandResponse> {
        const path = APIRoutes.brandRoutes(this.baseUrl).getBrand(brandId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    refreshBrands(): Observable<Model.BrandResponse> {
        const path = APIRoutes.brandRoutes(this.baseUrl).refreshBrands()
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.PUT,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    restoreBrand(brandId: string): Observable<Model.BrandResponse> {
        const path = APIRoutes.brandRoutes(this.baseUrl).restoreBrand(brandId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.PUT,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    deleteBrand(brandId: string): Observable<void> {
        const path = APIRoutes.brandRoutes(this.baseUrl).deleteBrand(brandId)
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
