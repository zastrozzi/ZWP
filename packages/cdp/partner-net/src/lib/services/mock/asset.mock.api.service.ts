import { Injectable } from '@angular/core'
import { AssetAPIService } from '../abstract/asset.api.service'
import { Model } from '../../model'
import { Observable, throwError } from 'rxjs'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
  serviceName: 'PartnerNetAssetMockAPIService',
  options: { skipMethodDebugger: true }
})
export class AssetMockAPIService implements AssetAPIService {
  createAsset(_request: Model.CreateAssetRequest): Observable<Model.AssetResponse> {
    return throwError(() => new Error('Method not implemented'))
  }

  addAsset(
    _parentId: string,
    _parentType: 'partner' | 'subgroup',
    _assetId: string,
    _request: Model.CreateAssetAssignmentRequest
  ): Observable<Model.PartnerAssetAssignmentResponse | Model.SubgroupAssetAssignmentResponse> {
    return throwError(() => new Error('Method not implemented'))
  }

  removeAsset(
    _parentId: string,
    _parentType: 'partner' | 'subgroup',
    _assetId: string
  ): Observable<void> {
    return throwError(() => new Error('Method not implemented'))
  }

  getAsset(_assetId: string): Observable<Model.AssetResponse> {
    return throwError(() => new Error('Method not implemented'))
  }

  listAssets(
    _parentId: Nullable<string>,
    _parentType: 'partner' | 'subgroup' | 'none',
    _pagination: Nullable<Partial<PaginatedQueryParams<Model.AssetResponse>>>
  ): Observable<PaginatedResponse<Model.AssetResponse>> {
    return throwError(() => new Error('Method not implemented'))
  }

  updateAsset(
    _assetId: string,
    _request: Model.UpdateAssetRequest
  ): Observable<Model.AssetResponse> {
    return throwError(() => new Error('Method not implemented'))
  }

  deleteAsset(_assetId: string, _force: boolean): Observable<void> {
    return throwError(() => new Error('Method not implemented'))
  }
}