import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class PartnerTypeAssignmentAPIService {
    abstract getPartnerTypeAssignment(partnerTypeAssignmentId: string): Observable<Model.PartnerTypeAssignmentResponse>

    abstract listPartnerTypeAssignments(
        parentId: Nullable<string>,
        parentType: 'partner' | 'partnerType' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.PartnerTypeAssignmentResponse>>>,
        filters: Nullable<Partial<Model.PartnerTypeAssignmentFilters>>
    ): Observable<PaginatedResponse<Model.PartnerTypeAssignmentResponse>>

    abstract deletePartnerTypeAssignment(partnerTypeAssignmentId: string, force: boolean): Observable<void>

}

export const PARTNER_TYPE_ASSIGNMENT_API_SERVICE = new InjectionToken<PartnerTypeAssignmentAPIService>(
    'cdp.partner-net.partner-type-assignment.api.service'
)