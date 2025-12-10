import { Injectable } from '@angular/core'
import { Model } from '../../model'
import {
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { AssetAPIService } from '../abstract'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'AssetMockAPIService', options: { skipMethodDebugger: true } })
export class AssetMockAPIService implements AssetAPIService {
    createAsset(_merchantId: string, _request: Model.CreateAssetRequest): Observable<Model.AssetResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    getAsset(_assetId: string): Observable<Model.AssetResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listAssets(_merchantId: Nullable<string>, _pagination: Nullable<Partial<PaginatedQueryParams<Model.AssetResponse>>>): Observable<PaginatedResponse<Model.AssetResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    updateAsset(_assetId: string, _request: Model.UpdateAssetRequest): Observable<Model.AssetResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteAsset(_assetId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }
}