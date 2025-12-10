import { Injectable } from '@angular/core'
import { Model } from '../../model'
import { RewardsNetworkTillo } from '@zwp/rewards-network.tillo'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { MerchantNetTilloBrandAPIService } from '../abstract'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'MerchantNetTilloBrandMockAPIService', options: { skipMethodDebugger: true } })
export class MerchantNetTilloBrandMockAPIService implements MerchantNetTilloBrandAPIService {
    onboardTilloBrand(
        _tilloBrandId: string,
        _parent: { brandId: Nullable<string>; merchantId: Nullable<string> }
    ): Observable<Model.BrandTilloBrandResponse> {
        return throwError(() => new Error('Method not implemented.'))
    }

    getBrandTilloBrand(_brandTilloBrandId: string): Observable<Model.BrandTilloBrandResponse> {
        return throwError(() => new Error('Method not implemented.'))
    }

    listBrandTilloBrands(
        _parent: { brandId: Nullable<string>; merchantId: Nullable<string>; tilloBrandId: Nullable<string> },
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.BrandTilloBrandResponse>>>,
        _filters: Nullable<Partial<Model.Filters.BrandTilloBrandFilters>>
    ): Observable<PaginatedResponse<Model.BrandTilloBrandResponse>> {
        return throwError(() => new Error('Method not implemented.'))
    }

    deleteBrandTilloBrand(_brandTilloBrandId: string, _force: boolean): Observable<void> {
        return throwError(() => new Error('Method not implemented.'))
    }

    listTilloBrands(
        _parent: { brandId: Nullable<string>; brandTilloBrandId: Nullable<string>; merchantId: Nullable<string> },
        _pagination: Nullable<Partial<PaginatedQueryParams<RewardsNetworkTillo.Model.BrandResponse>>>,
        _filters: Nullable<Partial<RewardsNetworkTillo.Model.Filters.BrandFilters>>
    ): Observable<PaginatedResponse<RewardsNetworkTillo.Model.BrandResponse>> {
        return throwError(() => new Error('Method not implemented.'))
    }
}
