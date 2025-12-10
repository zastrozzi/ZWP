import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class PartnerTypeAPIService {

    abstract createPartnerType(
        request: Model.CreatePartnerTypeRequest
    ): Observable<Model.PartnerTypeResponse>

    abstract addPartner(
        partnerId: string,
        partnerTypeId: string
    ): Observable<Model.PartnerTypeAssignmentResponse>

    abstract removePartner(
        partnerId: string,
        partnerTypeId: string
    ): Observable<void>

    abstract getPartnerType(partnerTypeId: string): Observable<Model.PartnerTypeResponse>

    abstract listPartnerTypes(
        parentId: Nullable<string>,
        parentType: 'partner' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.PartnerTypeResponse>>>,
        filters: Nullable<Partial<Model.PartnerTypeFilters>>
    ): Observable<PaginatedResponse<Model.PartnerTypeResponse>>

    abstract updatePartnerType(
        partnerTypeId: string,
        request: Model.UpdatePartnerTypeRequest
    ): Observable<Model.PartnerTypeResponse>

    abstract deletePartnerType(partnerTypeId: string, force: boolean): Observable<void>

}

export const PARTNER_TYPE_API_SERVICE = new InjectionToken<PartnerTypeAPIService>(
    'cdp.partner-net.partner-type.api.service'
)