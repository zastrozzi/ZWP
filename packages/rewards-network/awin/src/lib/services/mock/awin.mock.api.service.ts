import { Injectable } from '@angular/core'
// import { Model } from '../../model'
import {
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { AWinAPIService } from '../abstract'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'AWinMockAPIService',
    options: { skipMethodDebugger: true },
})
export class AWinMockAPIService implements AWinAPIService {
    
}