import { Injectable } from '@angular/core'
import { PartnerAPIService } from '../abstract'
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
    serviceName: 'PartnerMockAPIService',
    options: { skipMethodDebugger: true },
})
export class PartnerMockAPIService implements PartnerAPIService {
    createPartner(
        _request: Model.CreatePartnerRequest
    ): Observable<Model.PartnerResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    getPartner(_partnerId: string): Observable<Model.PartnerResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listPartners(
        _parentId: Nullable<string>,
        _parentType: 'partnerType' | 'none',
        _pagination: Nullable<
            Partial<PaginatedQueryParams<Model.PartnerResponse>>
        >
    ): Observable<PaginatedResponse<Model.PartnerResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    updatePartner(
        _partnerId: string,
        _request: Model.UpdatePartnerRequest
    ): Observable<Model.PartnerResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    deletePartner(_partnerId: string, _force: boolean): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }
}
