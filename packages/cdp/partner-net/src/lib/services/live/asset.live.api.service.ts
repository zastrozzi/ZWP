import { Injectable, inject } from '@angular/core'
import { AssetAPIService } from '../abstract/asset.api.service'
import { Model } from '../../model'
import {
    createHTTPParams,
    HTTPMethod,
    isNull,
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    serialiseDateQueryFilter,
    serialiseEnumQueryFilter,
    serialisePaginatedQueryParams,
    serialiseStringQueryFilter,
    upsertHTTPParam,
    upsertHTTPParams,
} from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { APIRoutes } from '../../api-routes'
import { CDP_PARTNER_NET_API_BASE_URL, CDP_PARTNER_NET_API_CONFIG } from '../../config'
import { PlatformAuth } from '@zwp/platform.auth'
import { Facades } from '../../+state/facades'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'PartnerNetAssetLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class AssetLiveAPIService extends PlatformAuth.AuthedAPIService implements AssetAPIService {
    private config = inject(CDP_PARTNER_NET_API_CONFIG)
    private baseUrl = inject(CDP_PARTNER_NET_API_BASE_URL)
    private assetFacade = inject(Facades.PartnerNetAssetFacade)

    createAsset(request: Model.CreateAssetRequest): Observable<Model.AssetResponse> {
        const path = APIRoutes.assetRoutes(this.baseUrl).createAsset()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.POST,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    addAsset(
        parentId: string,
        parentType: 'partner' | 'subgroup',
        assetId: string,
        request: Model.CreateAssetAssignmentRequest
    ): Observable<Model.PartnerAssetAssignmentResponse | Model.SubgroupAssetAssignmentResponse> {
        let path: string
        switch (parentType) {
            case 'partner': {
                path = APIRoutes.partnerRoutes(this.baseUrl).assetRoutesForPartner(parentId).addAsset(assetId)
                break
            }
            case 'subgroup': {
                path = APIRoutes.subgroupRoutes(this.baseUrl)
                    .assetRoutesForSubgroup(parentId)
                    .addAsset(assetId)
                break
            }
        }
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.POST,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    removeAsset(parentId: string, parentType: 'partner' | 'subgroup', assetId: string): Observable<void> {
        let path: string
        switch (parentType) {
            case 'partner': {
                path = APIRoutes.partnerRoutes(this.baseUrl).assetRoutesForPartner(parentId).removeAsset(assetId)
                break
            }
            case 'subgroup': {
                path = APIRoutes.subgroupRoutes(this.baseUrl)
                    .assetRoutesForSubgroup(parentId)
                    .removeAsset(assetId)
                break
            }
        }
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    getAsset(assetId: string): Observable<Model.AssetResponse> {
        const path = APIRoutes.assetRoutes(this.baseUrl).getAsset(assetId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    listAssets(
        parentId: Nullable<string>,
        parentType: 'partner' | 'subgroup' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.AssetResponse>>>,
        filters: Nullable<Partial<Model.AssetFilters>>
    ): Observable<PaginatedResponse<Model.AssetResponse>> {
        let path: string
        switch (parentType) {
            case 'partner': {
                if (isNull(parentId)) {
                    return throwError(() => new Error('No parent ID provided for asset parent type'))
                }
                path = APIRoutes.partnerRoutes(this.baseUrl).assetRoutesForPartner(parentId).listAssets()
                break
            }
            case 'subgroup': {
                if (isNull(parentId)) {
                    return throwError(() => new Error('No parent ID provided for asset parent type'))
                }
                path = APIRoutes.subgroupRoutes(this.baseUrl)
                    .assetRoutesForSubgroup(parentId)
                    .listAssets()
                break
            }
            case 'none': {
                path = APIRoutes.assetRoutes(this.baseUrl).listAssets()
                break
            }
        }
        let params = serialisePaginatedQueryParams(
            pagination,
            this.assetFacade.assetRemotePagination$
        )
        if (filters) {
            if (filters.dbCreatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt)) }
            if (filters.dbUpdatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt)) }
            if (filters.name) { params = upsertHTTPParams(params, serialiseStringQueryFilter('name', filters.name)) }
            if (filters.status) { params = upsertHTTPParams(params, serialiseEnumQueryFilter('status', filters.status)) }
            if (filters.type) { params = upsertHTTPParams(params, serialiseEnumQueryFilter('type', filters.type)) }
            if (filters.url) { params = upsertHTTPParams(params, serialiseStringQueryFilter('url', filters.url)) }
        }
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
            params: params,
        })
    }

    updateAsset(assetId: string, request: Model.UpdateAssetRequest): Observable<Model.AssetResponse> {
        const path = APIRoutes.assetRoutes(this.baseUrl).updateAsset(assetId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PATCH,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    deleteAsset(assetId: string, force: boolean): Observable<void> {
        const path = APIRoutes.assetRoutes(this.baseUrl).deleteAsset(assetId)
        let params = createHTTPParams()
        if (force) { params = upsertHTTPParam(params, 'force', force) }
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
            params: params
        })
    }
}
