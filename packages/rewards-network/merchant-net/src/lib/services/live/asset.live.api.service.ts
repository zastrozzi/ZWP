import { Injectable, inject } from '@angular/core'
import { Model } from '../../model'
import {
    HTTPMethod,
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    createHTTPParams,
    serialiseDateQueryFilter,
    serialiseEnumQueryFilter,
    serialiseNumberQueryFilter,
    serialisePaginatedQueryParams,
    serialiseStringQueryFilter,
    upsertHTTPParams,
} from '@zwp/platform.common'
import { Observable, map, take, throwError } from 'rxjs'
import { AssetAPIService } from '../abstract'
import { APIRoutes } from '../../api-routes'
import { MERCHANT_NET_API_BASE_URL, MERCHANT_NET_API_CONFIG } from '../../config'
import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'AssetLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class AssetLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements AssetAPIService
{
    private config = inject(MERCHANT_NET_API_CONFIG)
    private baseUrl = inject(MERCHANT_NET_API_BASE_URL)
    private assetFacade = inject(Facades.AssetFacade)

    createAsset(
        merchantId: string,
        request: Model.CreateAssetRequest
    ): Observable<Model.AssetResponse> {
        const path = APIRoutes.merchantRoutes(this.baseUrl)
            .assetRoutesForMerchant(merchantId)
            .createAsset()
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.POST,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }

    getAsset(assetId: string): Observable<Model.AssetResponse> {
        const path = APIRoutes.assetRoutes(this.baseUrl).getAsset(
            assetId
        )
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    listAssets(
        merchantId: Nullable<string> = null,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.AssetResponse>>> = null
    ): Observable<PaginatedResponse<Model.AssetResponse>> {
        let path: string
        if (merchantId) {
            path = APIRoutes.merchantRoutes(this.baseUrl)
                .assetRoutesForMerchant(merchantId)
                .listAssets()
        } else {
            path = APIRoutes.assetRoutes(this.baseUrl).listAssets()
        }

        let params = serialisePaginatedQueryParams(
            pagination,
            this.assetFacade.assetRemotePagination$
        )

        this.assetFacade.assetFilters$
            .pipe(
                take(1),
                map((filters) => {
                    if (filters.dbCreatedAt) {
                        params = upsertHTTPParams(
                            params,
                            serialiseDateQueryFilter(
                                'db_created_at',
                                filters.dbCreatedAt
                            )
                        )
                    }
                    if (filters.dbUpdatedAt) {
                        params = upsertHTTPParams(
                            params,
                            serialiseDateQueryFilter(
                                'db_updated_at',
                                filters.dbUpdatedAt
                            )
                        )
                    }
                    if (filters.dbDeletedAt) {
                        params = upsertHTTPParams(
                            params,
                            serialiseDateQueryFilter(
                                'db_deleted_at',
                                filters.dbDeletedAt
                            )
                        )
                    }
                    if (filters.assetName) {
                        params = upsertHTTPParams(
                            params,
                            serialiseStringQueryFilter(
                                'asset_name',
                                filters.assetName
                            )
                        )
                    }
                    if (filters.assetType) {
                        params = upsertHTTPParams(
                            params,
                            serialiseEnumQueryFilter(
                                'asset_type',
                                filters.assetType
                            )
                        )
                    }
                    if (filters.assetUrl) {
                        params = upsertHTTPParams(
                            params,
                            serialiseStringQueryFilter(
                                'asset_url',
                                filters.assetUrl
                            )
                        )
                    }
                    if (filters.status) {
                        params = upsertHTTPParams(
                            params,
                            serialiseEnumQueryFilter('status', filters.status)
                        )
                    }
                })
            )
            .subscribe()
            .unsubscribe()

        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader(),
            params
        )
    }

    updateAsset(
        assetId: string,
        request: Model.UpdateAssetRequest
    ): Observable<Model.AssetResponse> {
        const path = APIRoutes.assetRoutes(this.baseUrl).updateAsset(
            assetId
        )
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.PUT,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }

    deleteAsset(assetId: string): Observable<void> {
        const path = APIRoutes.assetRoutes(this.baseUrl).deleteAsset(
            assetId
        )
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.DELETE,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }
}
