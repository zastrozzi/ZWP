import { Injectable } from '@angular/core'
import { PartnerTypeAPIService } from '../abstract'
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
    serviceName: 'PartnerTypeMockAPIService',
    options: { skipMethodDebugger: true },
})
export class PartnerTypeMockAPIService implements PartnerTypeAPIService {
    createPartnerType(
        _request: Model.CreatePartnerTypeRequest
    ): Observable<Model.PartnerTypeResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    addPartner(
        _partnerId: string,
        _partnerTypeId: string
    ): Observable<Model.PartnerTypeAssignmentResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    removePartner(
        _partnerId: string,
        _partnerTypeId: string
    ): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }

    getPartnerType(
        _partnerTypeId: string
    ): Observable<Model.PartnerTypeResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listPartnerTypes(
        _parentId: Nullable<string>,
        _parentType: 'partner' | 'none',
        _pagination: Nullable<
            Partial<PaginatedQueryParams<Model.PartnerTypeResponse>>
        >
    ): Observable<PaginatedResponse<Model.PartnerTypeResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    updatePartnerType(
        _partnerTypeId: string,
        _request: Model.UpdatePartnerTypeRequest
    ): Observable<Model.PartnerTypeResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    deletePartnerType(_partnerTypeId: string, _force: boolean): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }
}
