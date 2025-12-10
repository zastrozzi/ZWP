import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { CDPUsers } from '@zwp/cdp.users'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class EnduserAPIService {

    abstract addEnduser(
        parentId: string,
        parentType: 'partner' | 'subgroup',
        enduserId: string,
        request: Model.CreateSubscriptionRequest
    ): Observable<Model.PartnerSubscriptionResponse | Model.SubgroupSubscriptionResponse>

    abstract removeEnduser(
        parentId: string,
        parentType: 'partner' | 'subgroup',
        enduserId: string
    ): Observable<void>

    abstract listEndusers(
        parentId: string,
        parentType: 'partner' | 'subgroup',
        pagination: Nullable<Partial<PaginatedQueryParams<CDPUsers.Model.EnduserResponse>>>,
        filters: Nullable<Partial<CDPUsers.Model.EnduserFilters>>
    ): Observable<PaginatedResponse<CDPUsers.Model.EnduserResponse>>

}

export const ENDUSER_API_SERVICE = new InjectionToken<EnduserAPIService>(
    'cdp.partner-net.enduser.api.service'
)