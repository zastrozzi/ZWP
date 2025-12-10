import { Injectable, InjectionToken } from '@angular/core'
import { Observable } from 'rxjs'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { Model } from '../../model'

@Injectable({ providedIn: 'root' })
export abstract class TinkMerchantAPIService {
    abstract createMerchant(
        request: Model.ServerAPIModel.Merchant.CreateTinkMerchantRequest
    ): Observable<Model.ServerAPIModel.Merchant.TinkMerchantResponse>

    abstract getMerchant(merchantId: string): Observable<Model.ServerAPIModel.Merchant.TinkMerchantResponse>

    abstract listMerchants(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Merchant.TinkMerchantResponse>>>,
        filters: Nullable<Partial<Model.Filters.MerchantFilters>>
    ): Observable<PaginatedResponse<Model.ServerAPIModel.Merchant.TinkMerchantResponse>>

    abstract deleteMerchant(merchantId: string): Observable<void>

    abstract refreshMerchants(limit: Nullable<number>): Observable<void>
}

export const TINK_MERCHANT_API_SERVICE = new InjectionToken<TinkMerchantAPIService>('fsn.tink.merchant.api.service')
