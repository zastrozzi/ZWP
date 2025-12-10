import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class MerchantAPIService {
    abstract createMerchant(
        request: Model.CreateMerchantRequest
    ): Observable<Model.MerchantResponse>

    abstract getMerchant(merchantId: string): Observable<Model.MerchantResponse>

    abstract listMerchants(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.MerchantResponse>>>,
        filters: Nullable<Partial<Model.Filters.MerchantFilters>>
    ): Observable<PaginatedResponse<Model.MerchantResponse>>

    abstract updateMerchant(
        merchantId: string,
        request: Model.UpdateMerchantRequest
    ): Observable<Model.MerchantResponse>

    abstract deleteMerchant(merchantId: string): Observable<void>
}

export const MERCHANT_API_SERVICE = new InjectionToken<MerchantAPIService>(
    'rewards-network.merchant-net.merchant.api.service'
)
