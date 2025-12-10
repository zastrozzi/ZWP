import { Injectable } from '@angular/core'
import { PartnerAssetAssignmentAPIService } from '../abstract/partner-asset-assignment.api.service'
import { Model } from '../../model'
import { Observable, throwError } from 'rxjs'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
  serviceName: 'PartnerAssetAssignmentMockAPIService',
  options: { skipMethodDebugger: true }
})
export class PartnerAssetAssignmentMockAPIService implements PartnerAssetAssignmentAPIService {
  getAssetAssignment(_assetAssignmentId: string): Observable<Model.PartnerAssetAssignmentResponse> {
    return throwError(() => new Error('Method not implemented'))
  }

  listAssetAssignments(
    _parentId: Nullable<string>,
    _parentType: 'partner' | 'asset' | 'none',
    _pagination: Nullable<Partial<PaginatedQueryParams<Model.PartnerAssetAssignmentResponse>>>,
    _filters: Nullable<Partial<Model.PartnerAssetAssignmentFilters>>
  ): Observable<PaginatedResponse<Model.PartnerAssetAssignmentResponse>> {
    return throwError(() => new Error('Method not implemented'))
  }

  updateAssetAssignment(
    _assetAssignmentId: string,
    _request: Model.UpdateAssetAssignmentRequest
  ): Observable<Model.PartnerAssetAssignmentResponse> {
    return throwError(() => new Error('Method not implemented'))
  }

  deleteAssetAssignment(_assetAssignmentId: string, _force: boolean): Observable<void> {
    return throwError(() => new Error('Method not implemented'))
  }
}