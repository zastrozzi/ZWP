import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { TinkMerchantAPIService } from '../abstract/merchant.api.service'
import { Model } from '../../model'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { ZWPDebuggableInjectable } from '@zwp/platform.common'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'TinkMerchantMockAPIService', options: { skipMethodDebugger: true } })
export class TinkMerchantMockAPIService implements TinkMerchantAPIService {
    createMerchant(
        _request: Model.ServerAPIModel.Merchant.CreateTinkMerchantRequest
    ): Observable<Model.ServerAPIModel.Merchant.TinkMerchantResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    getMerchant(_merchantId: string): Observable<Model.ServerAPIModel.Merchant.TinkMerchantResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listMerchants(
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Merchant.TinkMerchantResponse>>>,
        _filters: Nullable<Partial<Model.Filters.MerchantFilters>>
    ): Observable<PaginatedResponse<Model.ServerAPIModel.Merchant.TinkMerchantResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteMerchant(_merchantId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }

    refreshMerchants(_limit: Nullable<number>): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }
}
