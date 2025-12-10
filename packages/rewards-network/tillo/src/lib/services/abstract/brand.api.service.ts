import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class TilloBrandAPIService {
    abstract listBrands(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.BrandResponse>>>,
        filters: Nullable<Partial<Model.Filters.BrandFilters>>
    ): Observable<PaginatedResponse<Model.BrandResponse>>
    abstract getBrand(brandId: string): Observable<Model.BrandResponse>
    abstract refreshBrands(): Observable<Model.BrandResponse>
    abstract deleteBrand(brandId: string): Observable<void>
    abstract restoreBrand(brandId: string): Observable<Model.BrandResponse>
}

export const BRAND_API_SERVICE = new InjectionToken<TilloBrandAPIService>('rewards-network.tillo.brand.api.service')
