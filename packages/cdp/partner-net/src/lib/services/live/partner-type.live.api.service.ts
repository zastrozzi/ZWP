import { Injectable, inject } from '@angular/core'
import { PartnerTypeAPIService } from '../abstract/partner-type.api.service'
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
    serviceName: 'PartnerTypeLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class PartnerTypeLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements PartnerTypeAPIService
{
    private config = inject(CDP_PARTNER_NET_API_CONFIG)
    private baseUrl = inject(CDP_PARTNER_NET_API_BASE_URL)
    private partnerTypeFacade = inject(Facades.PartnerNetPartnerTypeFacade)

    createPartnerType(
        request: Model.CreatePartnerTypeRequest
    ): Observable<Model.PartnerTypeResponse> {
        const path = APIRoutes.partnerTypeRoutes(
            this.baseUrl
        ).createPartnerType()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.POST,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    addPartner(
        partnerId: string,
        partnerTypeId: string
    ): Observable<Model.PartnerTypeAssignmentResponse> {
        const path = APIRoutes.partnerTypeRoutes(this.baseUrl)
            .partnerRoutesForPartnerType(partnerTypeId)
            .addPartner(partnerId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.POST,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    removePartner(partnerId: string, partnerTypeId: string): Observable<void> {
        const path = APIRoutes.partnerTypeRoutes(this.baseUrl)
            .partnerRoutesForPartnerType(partnerTypeId)
            .removePartner(partnerId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    getPartnerType(
        partnerTypeId: string
    ): Observable<Model.PartnerTypeResponse> {
        const path = APIRoutes.partnerTypeRoutes(
            this.baseUrl
        ).getPartnerType(partnerTypeId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    listPartnerTypes(
        parentId: Nullable<string>,
        parentType: 'partner' | 'none',
        pagination: Nullable<
            Partial<PaginatedQueryParams<Model.PartnerTypeResponse>>
        >,
        filters: Nullable<Partial<Model.PartnerTypeFilters>>
    ): Observable<PaginatedResponse<Model.PartnerTypeResponse>> {
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
                    .partnerTypeRoutesForPartner(parentId)
                    .listPartnerTypes()
                break
            }
            case 'none': {
                path = APIRoutes.partnerTypeRoutes(
                    this.baseUrl
                ).listPartnerTypes()
                break
            }
        }
        let params = serialisePaginatedQueryParams(
            pagination,
            this.partnerTypeFacade.partnerTypeRemotePagination$
        )
        if (filters) {
            if (filters.dbCreatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt)) }
            if (filters.dbUpdatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt)) }
            if (filters.name) { params = upsertHTTPParams(params, serialiseStringQueryFilter('name', filters.name)) }
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

    updatePartnerType(
        partnerTypeId: string,
        request: Model.UpdatePartnerTypeRequest
    ): Observable<Model.PartnerTypeResponse> {
        const path = APIRoutes.partnerTypeRoutes(
            this.baseUrl
        ).updatePartnerType(partnerTypeId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PATCH,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    deletePartnerType(partnerTypeId: string, force: boolean): Observable<void> {
        const path = APIRoutes.partnerTypeRoutes(
            this.baseUrl
        ).deletePartnerType(partnerTypeId)
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
