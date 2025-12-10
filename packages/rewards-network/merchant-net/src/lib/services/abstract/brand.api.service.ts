import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class BrandAPIService {
    abstract createBrand(
        merchantId: string,
        request: Model.CreateBrandRequest
    ): Observable<Model.BrandResponse>
    abstract getBrand(brandId: string): Observable<Model.BrandResponse>
    abstract listBrands(
        merchantId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.BrandResponse>>>,
        filters: Nullable<Partial<Model.Filters.BrandFilters>>
    ): Observable<PaginatedResponse<Model.BrandResponse>>
    abstract updateBrand(
        brandId: string,
        request: Model.UpdateBrandRequest
    ): Observable<Model.BrandResponse>
    abstract deleteBrand(brandId: string): Observable<void>
}

export const BRAND_API_SERVICE = new InjectionToken<BrandAPIService>(
    'rewards-network.merchant-net.brand.api.service'
)
