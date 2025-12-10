import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class PartnerEnduserSubscriptionAPIService {
    abstract getSubscription(subscriptionId: string): Observable<Model.PartnerSubscriptionResponse>

    abstract listSubscriptions(
        parentId: Nullable<string>,
        parentType: 'partner' | 'enduser' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.PartnerSubscriptionResponse>>>,
        filters: Nullable<Partial<Model.PartnerSubscriptionFilters>>
    ): Observable<PaginatedResponse<Model.PartnerSubscriptionResponse>>

    abstract updateSubscription(
        subscriptionId: string,
        request: Model.UpdateSubscriptionRequest
    ): Observable<Model.PartnerSubscriptionResponse>

    abstract deleteSubscription(subscriptionId: string, force: boolean): Observable<void>
}

export const PARTNER_ENDUSER_SUBSCRIPTION_API_SERVICE = new InjectionToken<PartnerEnduserSubscriptionAPIService>(
    'cdp.partner-net.partner-enduser-subscription.api.service'
)