import { Injectable, inject } from '@angular/core'
import { PartnerAPIService } from '../abstract/partner.api.service'
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
    serviceName: 'PartnerLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class PartnerLiveAPIService extends PlatformAuth.AuthedAPIService implements PartnerAPIService {
    private config = inject(CDP_PARTNER_NET_API_CONFIG)
    private baseUrl = inject(CDP_PARTNER_NET_API_BASE_URL)
    private partnerFacade = inject(Facades.PartnerNetPartnerFacade)

    createPartner(request: Model.CreatePartnerRequest): Observable<Model.PartnerResponse> {
        const path = APIRoutes.partnerRoutes(this.baseUrl).createPartner()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.POST,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    getPartner(partnerId: string): Observable<Model.PartnerResponse> {
        const path = APIRoutes.partnerRoutes(this.baseUrl).getPartner(partnerId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    listPartners(
        parentId: Nullable<string>,
        parentType: 'partnerType' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.PartnerResponse>>>,
        filters: Nullable<Partial<Model.PartnerFilters>>
    ): Observable<PaginatedResponse<Model.PartnerResponse>> {
        let path: string
        switch (parentType) {
            case 'partnerType': {
                if (isNull(parentId)) {
                    return throwError(() => new Error('Parent ID is required when parent type is partner type'))
                }
                path = APIRoutes.partnerTypeRoutes(this.baseUrl).partnerRoutesForPartnerType(parentId).listPartners()
                break
            }
            case 'none': {
                path = APIRoutes.partnerRoutes(this.baseUrl).listPartners()
                break
            }
        }
        let params = serialisePaginatedQueryParams(pagination, this.partnerFacade.partnerRemotePagination$)
        if (filters) {
            if (filters.dbCreatedAt) {
                params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt))
            }
            if (filters.dbUpdatedAt) {
                params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt))
            }
            if (filters.name) {
                params = upsertHTTPParams(params, serialiseStringQueryFilter('name', filters.name))
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

    updatePartner(partnerId: string, request: Model.UpdatePartnerRequest): Observable<Model.PartnerResponse> {
        const path = APIRoutes.partnerRoutes(this.baseUrl).updatePartner(partnerId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PATCH,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    deletePartner(partnerId: string, force: boolean): Observable<void> {
        const path = APIRoutes.partnerRoutes(this.baseUrl).deletePartner(partnerId)
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
