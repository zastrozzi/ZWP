import { Injectable, inject } from '@angular/core'
// import { Model } from '../../model'
import {
    HTTPMethod,
    isNull,
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    serialisePaginatedQueryParams,
} from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { MastercardMerchantAPIService } from '../abstract'
// import { APIRoutes } from '../../api-routes'
import { MASTERCARD_API_CONFIG } from '../../config'
// import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'MastercardMerchantLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class MastercardMerchantLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements MastercardMerchantAPIService
{
    private config = inject(MASTERCARD_API_CONFIG)
}