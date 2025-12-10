import { Injectable, inject } from '@angular/core'
import { PartnerTypeAssignmentAPIService } from '../abstract/partner-type-assignment.api.service'
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
    serialisePaginatedQueryParams,
    upsertHTTPParam,
    upsertHTTPParams,
} from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { APIRoutes } from '../../api-routes'
import { CDP_PARTNER_NET_API_BASE_URL, CDP_PARTNER_NET_API_CONFIG } from '../../config'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'PartnerTypeAssignmentLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class PartnerTypeAssignmentLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements PartnerTypeAssignmentAPIService
{
    private config = inject(CDP_PARTNER_NET_API_CONFIG)
    private baseUrl = inject(CDP_PARTNER_NET_API_BASE_URL)

    getPartnerTypeAssignment(
        partnerTypeAssignmentId: string
    ): Observable<Model.PartnerTypeAssignmentResponse> {
        const path = APIRoutes.partnerTypeAssignmentRoutes(
            this.baseUrl
        ).getPartnerTypeAssignment(partnerTypeAssignmentId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    listPartnerTypeAssignments(
        parentId: Nullable<string>,
        parentType: 'partner' | 'partnerType' | 'none',
        pagination: Nullable<
            Partial<PaginatedQueryParams<Model.PartnerTypeAssignmentResponse>>
        >,
        filters: Nullable<Partial<Model.PartnerTypeAssignmentFilters>>
    ): Observable<PaginatedResponse<Model.PartnerTypeAssignmentResponse>> {
        let path: string
        switch (parentType) {
            case 'partner': {
                if (isNull(parentId)) {
                    return throwError(
                        () =>
                            new Error(
                                'Parent ID is required when parent type is partner'
                            )
                    )
                }
                path = APIRoutes.partnerRoutes(this.baseUrl)
                    .partnerTypeAssignmentRoutesForPartner(parentId)
                    .listPartnerTypeAssignments()
                break
            }
            case 'partnerType': {
                if (isNull(parentId)) {
                    return throwError(
                        () =>
                            new Error(
                                'Parent ID is required when parent type is partner type'
                            )
                    )
                }
                path = APIRoutes.partnerTypeRoutes(this.baseUrl)
                    .partnerTypeAssignmentRoutesForPartnerType(parentId)
                    .listPartnerTypeAssignments()
                break
            }
            case 'none': {
                path = APIRoutes.partnerTypeAssignmentRoutes(
                    this.baseUrl
                ).listPartnerTypeAssignments()
                break
            }
        }
        let params = serialisePaginatedQueryParams(
            pagination
            // this.locationFacade.locationRemotePagination$
        )
        if (filters) {
            if (filters.dbCreatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt)) }
            if (filters.dbUpdatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt)) }
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

    deletePartnerTypeAssignment(
        partnerTypeAssignmentId: string,
        force: boolean
    ): Observable<void> {
        const path = APIRoutes.partnerTypeAssignmentRoutes(
            this.baseUrl
        ).deletePartnerTypeAssignment(partnerTypeAssignmentId)
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
