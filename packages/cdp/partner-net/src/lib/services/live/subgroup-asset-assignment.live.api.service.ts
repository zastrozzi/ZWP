import { Injectable, inject } from '@angular/core'
import { SubgroupAssetAssignmentAPIService } from '../abstract'
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
    serviceName: 'SubgroupAssetAssignmentLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class SubgroupAssetAssignmentLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements SubgroupAssetAssignmentAPIService
{
    private config = inject(CDP_PARTNER_NET_API_CONFIG)
    private baseUrl = inject(CDP_PARTNER_NET_API_BASE_URL)
    private subgroupAssetAssignmentFacade = inject(Facades.PartnerNetSubgroupAssetAssignmentFacade)

    getAssetAssignment(assetAssignmentId: string): Observable<Model.SubgroupAssetAssignmentResponse> {
        const path = APIRoutes.subgroupAssetAssignmentRoutes(this.baseUrl).getSubgroupAssetAssignment(
            assetAssignmentId
        )
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    listAssetAssignments(
        parentId: Nullable<string>,
        parentType: 'subgroup' | 'asset' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.SubgroupAssetAssignmentResponse>>>,
        filters: Nullable<Partial<Model.SubgroupAssetAssignmentFilters>>
    ): Observable<PaginatedResponse<Model.SubgroupAssetAssignmentResponse>> {
        let path: string
        switch (parentType) {
            case 'subgroup': {
                if (isNull(parentId)) {
                    return throwError(() => new Error('No parent ID provided'))
                }
                path = APIRoutes.subgroupRoutes(this.baseUrl)
                    .subgroupAssetAssignmentRoutesForSubgroup(parentId)
                    .listSubgroupAssetAssignments()
                break
            }
            case 'asset': {
                if (isNull(parentId)) {
                    return throwError(() => new Error('No parent ID provided'))
                }
                path = APIRoutes.assetRoutes(this.baseUrl)
                    .subgroupAssetAssignmentRoutesForAsset(parentId)
                    .listSubgroupAssetAssignments()
                break
            }
            case 'none': {
                path = APIRoutes.subgroupAssetAssignmentRoutes(this.baseUrl).listSubgroupAssetAssignments()
                break
            }
        }
        let params = serialisePaginatedQueryParams(
            pagination,
            this.subgroupAssetAssignmentFacade.assetAssignmentRemotePagination$
        )
        if (filters) {
            if (filters.dbCreatedAt) {
                params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt))
            }
            if (filters.dbUpdatedAt) {
                params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt))
            }
            if (filters.role) {
                params = upsertHTTPParams(params, serialiseStringQueryFilter('role', filters.role))
            }
            if (filters.status) {
                params = upsertHTTPParams(params, serialiseEnumQueryFilter('status', filters.status))
            }
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

    updateAssetAssignment(
        assetAssignmentId: string,
        request: Model.UpdateAssetAssignmentRequest
    ): Observable<Model.SubgroupAssetAssignmentResponse> {
        const path = APIRoutes.subgroupAssetAssignmentRoutes(this.baseUrl).updateSubgroupAssetAssignment(
            assetAssignmentId
        )
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PUT,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    deleteAssetAssignment(assetAssignmentId: string, force: boolean): Observable<void> {
        const path = APIRoutes.subgroupAssetAssignmentRoutes(this.baseUrl).deleteSubgroupAssetAssignment(
            assetAssignmentId
        )
        let params = createHTTPParams()
        if (force) { params = upsertHTTPParam(params, 'force', force) }
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
            params: params,
        })
    }
}
