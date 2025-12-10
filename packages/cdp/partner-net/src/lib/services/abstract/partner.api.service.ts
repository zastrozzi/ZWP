import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class PartnerAPIService {
    abstract createPartner(
        request: Model.CreatePartnerRequest
    ): Observable<Model.PartnerResponse>

    abstract getPartner(partnerId: string): Observable<Model.PartnerResponse>

    abstract listPartners(
        parentId: Nullable<string>,
        parentType: 'partnerType' | 'asset' | 'enduser' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.PartnerResponse>>>,
        filters: Nullable<Partial<Model.PartnerFilters>>
    ): Observable<PaginatedResponse<Model.PartnerResponse>>

    abstract updatePartner(
        partnerId: string,
        request: Model.UpdatePartnerRequest
    ): Observable<Model.PartnerResponse>

    abstract deletePartner(partnerId: string, force: boolean): Observable<void>
}

export const PARTNER_API_SERVICE = new InjectionToken<PartnerAPIService>(
    'cdp.partner-net.partner.api.service'
)