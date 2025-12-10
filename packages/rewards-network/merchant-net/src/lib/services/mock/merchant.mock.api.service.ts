import { Injectable } from '@angular/core'
import { Model } from '../../model'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { MerchantAPIService } from '../abstract'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'MerchantMockAPIService', options: { skipMethodDebugger: true } })
export class MerchantMockAPIService implements MerchantAPIService {
    createMerchant(_request: Model.CreateMerchantRequest): Observable<Model.MerchantResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    getMerchant(_merchantId: string): Observable<Model.MerchantResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listMerchants(
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.MerchantResponse>>>,
        _filters: Nullable<Partial<Model.Filters.MerchantFilters>>
    ): Observable<PaginatedResponse<Model.MerchantResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    updateMerchant(_merchantId: string, _request: Model.UpdateMerchantRequest): Observable<Model.MerchantResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteMerchant(_merchantId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }
}
