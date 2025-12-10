import { Injectable } from '@angular/core'
import { PartnerTypeAssignmentAPIService } from '../abstract'
import { Model } from '../../model'
import { Observable, throwError } from 'rxjs'
import {
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'PartnerTypeAssignmentMockAPIService',
    options: { skipMethodDebugger: true },
})
export class PartnerTypeAssignmentMockAPIService
    implements PartnerTypeAssignmentAPIService
{
    getPartnerTypeAssignment(
        _partnerTypeAssignmentId: string
    ): Observable<Model.PartnerTypeAssignmentResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listPartnerTypeAssignments(
        _parentId: Nullable<string>,
        _parentType: 'partner' | 'partnerType' | 'none',
        _pagination: Nullable<
            Partial<PaginatedQueryParams<Model.PartnerTypeAssignmentResponse>>
        >
    ): Observable<PaginatedResponse<Model.PartnerTypeAssignmentResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    deletePartnerTypeAssignment(
        _partnerTypeAssignmentId: string, _force: boolean
    ): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }
}
