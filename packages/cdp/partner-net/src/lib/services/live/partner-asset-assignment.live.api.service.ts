import { Injectable, inject } from '@angular/core'
import { PartnerAssetAssignmentAPIService } from '../abstract'
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
    serviceName: 'PartnerAssetAssignmentLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class PartnerAssetAssignmentLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements PartnerAssetAssignmentAPIService
{
    private config = inject(CDP_PARTNER_NET_API_CONFIG)
    private baseUrl = inject(CDP_PARTNER_NET_API_BASE_URL)
    private partnerAssetAssignmentFacade = inject(Facades.PartnerNetPartnerAssetAssignmentFacade)

    getAssetAssignment(assetAssignmentId: string): Observable<Model.PartnerAssetAssignmentResponse> {
        const path = APIRoutes.partnerAssetAssignmentRoutes(this.baseUrl).getPartnerAssetAssignment(
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
        parentType: 'partner' | 'asset' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.PartnerAssetAssignmentResponse>>>,
        filters: Nullable<Partial<Model.PartnerAssetAssignmentFilters>>
    ): Observable<PaginatedResponse<Model.PartnerAssetAssignmentResponse>> {
        let path: string
        switch (parentType) {
            case 'partner': {
                if (isNull(parentId)) {
                    return throwError(() => new Error('No parent ID provided'))
                }
                path = APIRoutes.partnerRoutes(this.baseUrl)
                    .partnerAssetAssignmentRoutesForPartner(parentId)
                    .listPartnerAssetAssignments()
                break
            }
            case 'asset': {
                if (isNull(parentId)) {
                    return throwError(() => new Error('No parent ID provided'))
                }
                path = APIRoutes.assetRoutes(this.baseUrl)
                    .partnerAssetAssignmentRoutesForAsset(parentId)
                    .listPartnerAssetAssignments()
                break
            }
            case 'none': {
                path = APIRoutes.partnerAssetAssignmentRoutes(this.baseUrl).listPartnerAssetAssignments()
                break
            }
        }
        let params = serialisePaginatedQueryParams(
            pagination,
            this.partnerAssetAssignmentFacade.assetAssignmentRemotePagination$
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
    ): Observable<Model.PartnerAssetAssignmentResponse> {
        const path = APIRoutes.partnerAssetAssignmentRoutes(this.baseUrl).updatePartnerAssetAssignment(
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
        const path = APIRoutes.partnerAssetAssignmentRoutes(this.baseUrl).deletePartnerAssetAssignment(
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
            params: params
        })
    }
}
