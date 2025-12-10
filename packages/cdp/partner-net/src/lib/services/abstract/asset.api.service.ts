import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class AssetAPIService {
    abstract createAsset(
        request: Model.CreateAssetRequest
    ): Observable<Model.AssetResponse>

    abstract addAsset(
        parentId: string,
        parentType: 'partner' | 'subgroup',
        assetId: string,
        request: Model.CreateAssetAssignmentRequest
    ): Observable<Model.PartnerAssetAssignmentResponse | Model.SubgroupAssetAssignmentResponse>

    abstract removeAsset(
        parentId: string,
        parentType: 'partner' | 'subgroup',
        assetId: string
    ): Observable<void>

    abstract getAsset(assetId: string): Observable<Model.AssetResponse>

    abstract listAssets(
        parentId: Nullable<string>,
        parentType: 'partner' | 'subgroup' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.AssetResponse>>>,
        filters: Nullable<Partial<Model.AssetFilters>>
    ): Observable<PaginatedResponse<Model.AssetResponse>>

    abstract updateAsset(
        assetId: string,
        request: Model.UpdateAssetRequest
    ): Observable<Model.AssetResponse>

    abstract deleteAsset(assetId: string, force: boolean): Observable<void>
}

export const ASSET_API_SERVICE = new InjectionToken<AssetAPIService>(
    'cdp.partner-net.asset.api.service'
)