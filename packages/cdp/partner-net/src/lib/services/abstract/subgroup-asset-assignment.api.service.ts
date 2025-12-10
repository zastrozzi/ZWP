import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class SubgroupAssetAssignmentAPIService {
    abstract getAssetAssignment(assetAssignmentId: string): Observable<Model.SubgroupAssetAssignmentResponse>

    abstract listAssetAssignments(
        parentId: Nullable<string>,
        parentType: 'subgroup' | 'asset' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.SubgroupAssetAssignmentResponse>>>,
        filters: Nullable<Partial<Model.SubgroupAssetAssignmentFilters>>
    ): Observable<PaginatedResponse<Model.SubgroupAssetAssignmentResponse>>

    abstract updateAssetAssignment(
        assetAssignmentId: string,
        request: Model.UpdateAssetAssignmentRequest
    ): Observable<Model.SubgroupAssetAssignmentResponse>

    abstract deleteAssetAssignment(assetAssignmentId: string, force: boolean): Observable<void>
}

export const SUBGROUP_ASSET_ASSIGNMENT_API_SERVICE = new InjectionToken<SubgroupAssetAssignmentAPIService>(
    'cdp.partner-net.subgroup-asset-assignment.api.service'
)