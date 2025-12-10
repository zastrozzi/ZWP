import { Injectable } from '@angular/core'
import { SubgroupAssetAssignmentAPIService } from '../abstract'
import { Model } from '../../model'
import { Observable, throwError } from 'rxjs'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
  serviceName: 'SubgroupAssetAssignmentMockAPIService',
  options: { skipMethodDebugger: true }
})
export class SubgroupAssetAssignmentMockAPIService implements SubgroupAssetAssignmentAPIService {
  getAssetAssignment(_assetAssignmentId: string): Observable<Model.SubgroupAssetAssignmentResponse> {
    return throwError(() => new Error('Method not implemented'))
  }

  listAssetAssignments(
    _parentId: Nullable<string>,
    _parentType: 'subgroup' | 'asset' | 'none',
    _pagination: Nullable<Partial<PaginatedQueryParams<Model.SubgroupAssetAssignmentResponse>>>,
    _filters: Nullable<Partial<Model.SubgroupAssetAssignmentFilters>>
  ): Observable<PaginatedResponse<Model.SubgroupAssetAssignmentResponse>> {
    return throwError(() => new Error('Method not implemented'))
  }

  updateAssetAssignment(
    _assetAssignmentId: string,
    _request: Model.UpdateAssetAssignmentRequest
  ): Observable<Model.SubgroupAssetAssignmentResponse> {
    return throwError(() => new Error('Method not implemented'))
  }

  deleteAssetAssignment(_assetAssignmentId: string, _force: boolean): Observable<void> {
    return throwError(() => new Error('Method not implemented'))
  }
}