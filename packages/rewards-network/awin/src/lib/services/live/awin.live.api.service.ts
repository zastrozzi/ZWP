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
import { AWinAPIService } from '../abstract'
// import { APIRoutes } from '../../api-routes'
import { AFFILIATE_WINDOW_API_CONFIG } from '../../config'
// import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'AWinLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class AWinLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements AWinAPIService
{
    private config = inject(AFFILIATE_WINDOW_API_CONFIG)
}