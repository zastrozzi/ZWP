import { Injectable } from '@angular/core'
// import { Model } from '../../model'
import {
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { MastercardMerchantAPIService } from '../abstract'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'MastercardMerchantMockAPIService',
    options: { skipMethodDebugger: true },
})
export class MastercardMerchantMockAPIService implements MastercardMerchantAPIService {
    
}