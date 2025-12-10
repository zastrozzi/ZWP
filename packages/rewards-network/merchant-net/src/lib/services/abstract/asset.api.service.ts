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
        merchantId: string,
        request: Model.CreateAssetRequest
    ): Observable<Model.AssetResponse>
    abstract getAsset(assetId: string): Observable<Model.AssetResponse>
    abstract listAssets(
        merchantId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.AssetResponse>>>
    ): Observable<PaginatedResponse<Model.AssetResponse>>
    abstract updateAsset(
        assetId: string,
        request: Model.UpdateAssetRequest
    ): Observable<Model.AssetResponse>
    abstract deleteAsset(assetId: string): Observable<void>
}

export const ASSET_API_SERVICE = new InjectionToken<AssetAPIService>(
    'rewards-network.merchant-net.asset.api.service'
)
