import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class PartnerAssetAssignmentAPIService {
    abstract getAssetAssignment(assetAssignmentId: string): Observable<Model.PartnerAssetAssignmentResponse>

    abstract listAssetAssignments(
        parentId: Nullable<string>,
        parentType: 'partner' | 'asset' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.PartnerAssetAssignmentResponse>>>,
        filters: Nullable<Partial<Model.PartnerAssetAssignmentFilters>>
    ): Observable<PaginatedResponse<Model.PartnerAssetAssignmentResponse>>

    abstract updateAssetAssignment(
        assetAssignmentId: string,
        request: Model.UpdateAssetAssignmentRequest
    ): Observable<Model.PartnerAssetAssignmentResponse>

    abstract deleteAssetAssignment(assetAssignmentId: string, force: boolean): Observable<void>
}

export const PARTNER_ASSET_ASSIGNMENT_API_SERVICE = new InjectionToken<PartnerAssetAssignmentAPIService>(
    'cdp.partner-net.partner-asset-assignment.api.service'
)