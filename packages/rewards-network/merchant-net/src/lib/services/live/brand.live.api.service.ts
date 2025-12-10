import { Injectable, inject } from '@angular/core'
import { Model } from '../../model'
import {
    HTTPMethod,
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    createHTTPParams,
    serialiseDateQueryFilter,
    serialiseEnumQueryFilter,
    serialiseNumberQueryFilter,
    serialisePaginatedQueryParams,
    serialiseStringQueryFilter,
    upsertHTTPParams,
} from '@zwp/platform.common'
import { Observable, map, take, throwError } from 'rxjs'
import { BrandAPIService } from '../abstract'
import { APIRoutes } from '../../api-routes'
import { MERCHANT_NET_API_BASE_URL, MERCHANT_NET_API_CONFIG } from '../../config'
import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'BrandLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class BrandLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements BrandAPIService
{
    private config = inject(MERCHANT_NET_API_CONFIG)
    private baseUrl = inject(MERCHANT_NET_API_BASE_URL)
    private brandFacade = inject(Facades.BrandFacade)

    createBrand(
        merchantId: string,
        request: Model.CreateBrandRequest
    ): Observable<Model.BrandResponse> {
        const path = APIRoutes.merchantRoutes(this.baseUrl)
            .brandRoutesForMerchant(merchantId)
            .createBrand()
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.POST,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }

    getBrand(brandId: string): Observable<Model.BrandResponse> {
        const path = APIRoutes.brandRoutes(this.baseUrl).getBrand(
            brandId
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

    listBrands(
        merchantId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.BrandResponse>>>,
        filters: Nullable<Partial<Model.Filters.BrandFilters>>
    ): Observable<PaginatedResponse<Model.BrandResponse>> {
        let path: string
        if (merchantId) {
            path = APIRoutes.merchantRoutes(this.baseUrl)
                .brandRoutesForMerchant(merchantId)
                .listBrands()
        } else {
            path = APIRoutes.brandRoutes(this.baseUrl).listBrands()
        }
        let params = serialisePaginatedQueryParams(
            pagination,
            this.brandFacade.brandRemotePagination$
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
            if (filters.brandName) {
                params = upsertHTTPParams(params, serialiseStringQueryFilter('brand_name', filters.brandName))
            }
            if (filters.status) {
                params = upsertHTTPParams(params, serialiseEnumQueryFilter('status', filters.status))
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

    updateBrand(
        brandId: string,
        request: Model.UpdateBrandRequest
    ): Observable<Model.BrandResponse> {
        const path = APIRoutes.brandRoutes(this.baseUrl).updateBrand(
            brandId
        )
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.PUT,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }

    deleteBrand(brandId: string): Observable<void> {
        const path = APIRoutes.brandRoutes(this.baseUrl).deleteBrand(
            brandId
        )
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
