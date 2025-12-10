import { Injectable } from '@angular/core'
import { PartnerEnduserSubscriptionAPIService } from '../abstract'
import { Model } from '../../model'
import { Observable, throwError } from 'rxjs'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'

@Injectable({ providedIn: 'root' })
export class PartnerEnduserSubscriptionMockAPIService implements PartnerEnduserSubscriptionAPIService {
  getSubscription(_subscriptionId: string): Observable<Model.PartnerSubscriptionResponse> {
    return throwError(() => new Error('Method not implemented'))
  }

  listSubscriptions(
    _parentId: Nullable<string>,
    _parentType: 'partner' | 'enduser' | 'none',
    _pagination: Nullable<Partial<PaginatedQueryParams<Model.PartnerSubscriptionResponse>>>,
    _filters: Nullable<Partial<Model.PartnerSubscriptionFilters>>
  ): Observable<PaginatedResponse<Model.PartnerSubscriptionResponse>> {
    return throwError(() => new Error('Method not implemented'))
  }

  updateSubscription(
    _subscriptionId: string,
    _request: Model.UpdateSubscriptionRequest
  ): Observable<Model.PartnerSubscriptionResponse> {
    return throwError(() => new Error('Method not implemented'))
  }

  deleteSubscription(_subscriptionId: string, _force: boolean): Observable<void> {
    return throwError(() => new Error('Method not implemented'))
  }
}