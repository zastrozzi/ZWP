import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import { RewardsNetworkTillo } from '@zwp/rewards-network.tillo'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class MerchantNetTilloBrandAPIService {
    abstract onboardTilloBrand(
        tilloBrandId: string,
        parent: {
            brandId: Nullable<string>,
            merchantId: Nullable<string>
        }
    ): Observable<Model.BrandTilloBrandResponse>
    abstract getBrandTilloBrand(brandTilloBrandId: string): Observable<Model.BrandTilloBrandResponse>
    abstract listBrandTilloBrands(
        parent: {
            brandId: Nullable<string>,
            merchantId: Nullable<string>,
            tilloBrandId: Nullable<string>
        },
        pagination: Nullable<Partial<PaginatedQueryParams<Model.BrandTilloBrandResponse>>>,
        filters: Nullable<Partial<Model.Filters.BrandTilloBrandFilters>>
    ): Observable<PaginatedResponse<Model.BrandTilloBrandResponse>>
    abstract deleteBrandTilloBrand(brandTilloBrandId: string, force: boolean): Observable<void>
    abstract listTilloBrands(
        parent: {
            brandId: Nullable<string>,
            brandTilloBrandId: Nullable<string>,
            merchantId: Nullable<string>
        },
        pagination: Nullable<Partial<PaginatedQueryParams<RewardsNetworkTillo.Model.BrandResponse>>>,
        filters: Nullable<Partial<RewardsNetworkTillo.Model.Filters.BrandFilters>>
    ): Observable<PaginatedResponse<RewardsNetworkTillo.Model.BrandResponse>>
}

export const MERCHANT_NET_TILLO_BRAND_API_SERVICE = new InjectionToken<MerchantNetTilloBrandAPIService>(
    'rewards-network.merchant-net.tillo.brand.api.service'
)
