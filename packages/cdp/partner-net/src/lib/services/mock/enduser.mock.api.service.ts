import { Injectable } from '@angular/core'
import { EnduserAPIService } from '../abstract/enduser.api.service'
import { Model } from '../../model'
import { Observable, throwError } from 'rxjs'
import {
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { CDPUsers } from '@zwp/cdp.users'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'PartnerNetEnduserMockAPIService',
    options: { skipMethodDebugger: true },
})
export class EnduserMockAPIService implements EnduserAPIService {
    addEnduser(
        _parentId: string,
        _parentType: 'partner' | 'subgroup',
        _enduserId: string,
        _request: Model.CreateSubscriptionRequest
    ): Observable<
        | Model.PartnerSubscriptionResponse
        | Model.SubgroupSubscriptionResponse
    > {
        return throwError(() => new Error('Method not implemented'))
    }

    removeEnduser(
        _parentId: string,
        _parentType: 'partner' | 'subgroup',
        _enduserId: string
    ): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }

    listEndusers(
        _parentId: string,
        _parentType: 'partner' | 'subgroup',
        _pagination: Nullable<
            Partial<PaginatedQueryParams<CDPUsers.Model.EnduserResponse>>
        >
    ): Observable<PaginatedResponse<CDPUsers.Model.EnduserResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }
}
