import { Injectable } from '@angular/core'
import { SubgroupEnduserSubscriptionAPIService } from '../abstract'
import { Model } from '../../model'
import { Observable, throwError } from 'rxjs'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'

@Injectable({ providedIn: 'root' })
export class SubgroupEnduserSubscriptionMockAPIService implements SubgroupEnduserSubscriptionAPIService {
  getSubscription(_subscriptionId: string): Observable<Model.SubgroupSubscriptionResponse> {
    return throwError(() => new Error('Method not implemented'))
  }

  listSubscriptions(
    _parentId: Nullable<string>,
    _parentType: 'subgroup' | 'enduser' | 'none',
    _pagination: Nullable<Partial<PaginatedQueryParams<Model.SubgroupSubscriptionResponse>>>,
    _filters: Nullable<Partial<Model.SubgroupSubscriptionFilters>>
  ): Observable<PaginatedResponse<Model.SubgroupSubscriptionResponse>> {
    return throwError(() => new Error('Method not implemented'))
  }

  updateSubscription(
    _subscriptionId: string,
    _request: Model.UpdateSubscriptionRequest
  ): Observable<Model.SubgroupSubscriptionResponse> {
    return throwError(() => new Error('Method not implemented'))
  }

  deleteSubscription(_subscriptionId: string, _force: boolean): Observable<void> {
    return throwError(() => new Error('Method not implemented'))
  }
}