import { Injectable, inject } from '@angular/core'
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
    serialiseEnumQueryFilter,
    serialisePaginatedQueryParams,
    serialiseStringQueryFilter,
    upsertHTTPParam,
    upsertHTTPParams,
} from '@zwp/platform.common'
import { Observable, map, take, throwError } from 'rxjs'
import { MerchantNetTilloBrandAPIService } from '../abstract'
import { APIRoutes } from '../../api-routes'
import { MERCHANT_NET_API_BASE_URL, MERCHANT_NET_API_CONFIG } from '../../config'
import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'
import { RewardsNetworkTillo } from '@zwp/rewards-network.tillo'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'MerchantNetTilloBrandLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class MerchantNetTilloBrandLiveAPIService extends PlatformAuth.AuthedAPIService implements MerchantNetTilloBrandAPIService {
    private config = inject(MERCHANT_NET_API_CONFIG)
    private baseUrl = inject(MERCHANT_NET_API_BASE_URL)
    private tilloBrandFacade = inject(RewardsNetworkTillo.State.Facades.TilloBrandFacade)
    private merchantNetTilloBrandFacade = inject(Facades.MerchantNetTilloBrandFacade)

    onboardTilloBrand(
        tilloBrandId: string,
        parent: { brandId: Nullable<string>; merchantId: Nullable<string> }
    ): Observable<Model.BrandTilloBrandResponse> {
        let path: string
        if (!isNull(parent.brandId)) {
            path = APIRoutes.brandRoutes(this.baseUrl)
                .tilloBrandRoutesForBrand(parent.brandId)
                .onboardTilloBrandForBrand(tilloBrandId)
        }
        else if (!isNull(parent.merchantId)) {
            path = APIRoutes.merchantRoutes(this.baseUrl)
                .tilloBrandRoutesForMerchant(parent.merchantId)
                .onboardTilloBrandForMerchant(tilloBrandId)
        }
        else {
            path = APIRoutes.tilloBrandRoutes(this.baseUrl).onboardTilloBrand(tilloBrandId)
        }
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.POST,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    getBrandTilloBrand(brandTilloBrandId: string): Observable<Model.BrandTilloBrandResponse> {
        const path = APIRoutes.brandTilloBrandRoutes(this.baseUrl).getBrandTilloBrand(brandTilloBrandId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    listBrandTilloBrands(
        parent: { brandId: Nullable<string>; merchantId: Nullable<string>; tilloBrandId: Nullable<string> },
        pagination: Nullable<Partial<PaginatedQueryParams<Model.BrandTilloBrandResponse>>>,
        filters: Nullable<Partial<Model.Filters.BrandTilloBrandFilters>>
    ): Observable<PaginatedResponse<Model.BrandTilloBrandResponse>> {
        let path: string
        if (!isNull(parent.brandId)) {
            path = APIRoutes.brandRoutes(this.baseUrl)
                .brandTilloBrandRoutesForBrand(parent.brandId)
                .listBrandTilloBrandsForBrand()
        }
        else if (!isNull(parent.tilloBrandId)) {
            path = APIRoutes.tilloBrandRoutes(this.baseUrl)
                .brandTilloBrandRoutesForTilloBrand(parent.tilloBrandId)
                .listBrandTilloBrandsForTilloBrand()
        }
        else if (!isNull(parent.merchantId)) {
            path = APIRoutes.merchantRoutes(this.baseUrl)
                .brandTilloBrandRoutesForMerchant(parent.merchantId)
                .listBrandTilloBrandsForMerchant()
        }
        else {
            path = APIRoutes.brandTilloBrandRoutes(this.baseUrl).listBrandTilloBrands()
        }

        let params = serialisePaginatedQueryParams(
            pagination,
            this.merchantNetTilloBrandFacade.brandTilloBrandRemotePagination$
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

    deleteBrandTilloBrand(brandTilloBrandId: string, force: boolean): Observable<void> {
        const path = APIRoutes.brandTilloBrandRoutes(this.baseUrl).deleteBrandTilloBrand(brandTilloBrandId)
        let params = createHTTPParams()
        params = upsertHTTPParam(params, 'force', force)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
            params: params
        })
    }

    listTilloBrands(
        parent: { brandId: Nullable<string>; brandTilloBrandId: Nullable<string>; merchantId: Nullable<string> },
        pagination: Nullable<Partial<PaginatedQueryParams<RewardsNetworkTillo.Model.BrandResponse>>>,
        filters: Nullable<Partial<RewardsNetworkTillo.Model.Filters.BrandFilters>>
    ): Observable<PaginatedResponse<RewardsNetworkTillo.Model.BrandResponse>> {
        let path: string
        if (!isNull(parent.brandId)) {
            path = APIRoutes.brandRoutes(this.baseUrl)
                .tilloBrandRoutesForBrand(parent.brandId)
                .listTilloBrandsForBrand()
        }
        else if (!isNull(parent.merchantId)) {
            path = APIRoutes.merchantRoutes(this.baseUrl)
                .tilloBrandRoutesForMerchant(parent.merchantId)
                .listTilloBrandsForMerchant()
        }
        else if (!isNull(parent.brandTilloBrandId)) {
            path = APIRoutes.brandTilloBrandRoutes(this.baseUrl)
                .listTilloBrandsForBrandTilloBrand(parent.brandTilloBrandId)
        }
        else {
            return throwError(() => new Error('No parent specified for listing Tillo Brands'))
        }

        let params = serialisePaginatedQueryParams(
            pagination,
            this.tilloBrandFacade.brandRemotePagination$
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
}