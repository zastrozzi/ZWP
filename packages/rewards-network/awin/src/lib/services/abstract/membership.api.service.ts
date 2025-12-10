import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class MembershipAPIService {
    abstract refreshMemberships():Observable<void>
    abstract getMembership(membershipID:string): Observable<Model.ProgrammeMembershipResponse>
    abstract listMemberships(
        // membershipID:Nullable<string>,
    ): Observable<PaginatedResponse<Model.ProgrammeMembershipResponse>>
    abstract deleteMembership(membershipID:string): Observable<void>
}

export const MEMBERSHIP_API_SERVICE = new InjectionToken<MembershipAPIService>(
    'rewards-network.affiliate-window.membership.api.service'
)