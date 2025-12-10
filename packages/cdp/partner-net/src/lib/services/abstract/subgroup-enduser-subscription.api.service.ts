import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class SubgroupEnduserSubscriptionAPIService {
    abstract getSubscription(subscriptionId: string): Observable<Model.SubgroupSubscriptionResponse>

    abstract listSubscriptions(
        parentId: Nullable<string>,
        parentType: 'subgroup' | 'enduser' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.SubgroupSubscriptionResponse>>>,
        filters: Nullable<Partial<Model.SubgroupSubscriptionFilters>>
    ): Observable<PaginatedResponse<Model.SubgroupSubscriptionResponse>>

    abstract updateSubscription(
        subscriptionId: string,
        request: Model.UpdateSubscriptionRequest
    ): Observable<Model.SubgroupSubscriptionResponse>

    abstract deleteSubscription(subscriptionId: string, force: boolean): Observable<void>
}

export const SUBGROUP_ENDUSER_SUBSCRIPTION_API_SERVICE = new InjectionToken<SubgroupEnduserSubscriptionAPIService>(
    'cdp.partner-net.subgroup-enduser-subscription.api.service'
)