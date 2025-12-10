import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class SubgroupAPIService {

    abstract createSubgroup(
        parentId: string,
        request: Model.CreatePartnerSubgroupRequest
    ): Observable<Model.SubgroupResponse>

    abstract getSubgroup(subgroupId: string): Observable<Model.SubgroupResponse>

    abstract listSubgroups(
        parentId: Nullable<string>,
        parentType: 'partner' | 'asset' | 'enduser' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.SubgroupResponse>>>,
        filters: Nullable<Partial<Model.SubgroupFilters>>
    ): Observable<PaginatedResponse<Model.SubgroupResponse>>

    abstract updateSubgroup(
        subgroupId: string,
        request: Model.UpdatePartnerSubgroupRequest
    ): Observable<Model.SubgroupResponse>

    abstract deleteSubgroup(subgroupId: string, force: boolean): Observable<void>

}

export const SUBGROUP_API_SERVICE = new InjectionToken<SubgroupAPIService>(
    'cdp.partner-net.subgroup.api.service'
)