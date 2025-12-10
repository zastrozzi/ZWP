import { Injectable } from '@angular/core'
import { SubgroupAPIService } from '../abstract/subgroup.api.service'
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
    serviceName: 'SubgroupMockAPIService',
    options: { skipMethodDebugger: true },
})
export class SubgroupMockAPIService
    implements SubgroupAPIService
{
    createSubgroup(
        _parentId: string,
        _request: Model.CreatePartnerSubgroupRequest
    ): Observable<Model.SubgroupResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    getSubgroup(
        _subgroupId: string
    ): Observable<Model.SubgroupResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listSubgroups(
        _parentId: Nullable<string>,
        _parentType: 'partner' | 'none',
        _pagination: Nullable<
            Partial<PaginatedQueryParams<Model.SubgroupResponse>>
        >
    ): Observable<PaginatedResponse<Model.SubgroupResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    updateSubgroup(
        _subgroupId: string,
        _request: Model.UpdatePartnerSubgroupRequest
    ): Observable<Model.SubgroupResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteSubgroup(_subgroupId: string, _force: boolean): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }
}
