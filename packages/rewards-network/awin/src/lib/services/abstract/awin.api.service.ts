import { Injectable, InjectionToken } from '@angular/core'
// import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class AWinAPIService {
    
}

export const AWIN_API_SERVICE = new InjectionToken<AWinAPIService>(
    'rewards-network.affiliate-window.awin.api.service'
)