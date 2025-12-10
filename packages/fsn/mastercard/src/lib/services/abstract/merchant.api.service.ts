import { Injectable, InjectionToken } from '@angular/core'
// import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class MastercardMerchantAPIService {
    
}

export const MERCHANT_API_SERVICE = new InjectionToken<MastercardMerchantAPIService>(
    'fsn.mastercard.merchant.api.service'
)