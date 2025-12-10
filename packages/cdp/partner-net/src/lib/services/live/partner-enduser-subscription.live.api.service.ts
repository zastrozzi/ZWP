import { Injectable, inject } from '@angular/core'
import { PartnerEnduserSubscriptionAPIService } from '../abstract'
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
    serviceName: 'PartnerEnduserSubscriptionLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class PartnerEnduserSubscriptionLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements PartnerEnduserSubscriptionAPIService
{
    private config = inject(CDP_PARTNER_NET_API_CONFIG)
    private baseUrl = inject(CDP_PARTNER_NET_API_BASE_URL)
    private partnerEnduserSubscriptionFacade = inject(Facades.PartnerNetPartnerEnduserSubscriptionFacade)

    getSubscription(enduserSubscriptionId: string): Observable<Model.PartnerSubscriptionResponse> {
        const path = APIRoutes.partnerEnduserSubscriptionRoutes(this.baseUrl).getPartnerEnduserSubscription(
            enduserSubscriptionId
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

    listSubscriptions(
        parentId: Nullable<string>,
        parentType: 'partner' | 'enduser' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.PartnerSubscriptionResponse>>>,
        filters: Nullable<Partial<Model.PartnerSubscriptionFilters>>
    ): Observable<PaginatedResponse<Model.PartnerSubscriptionResponse>> {
        let path: string
        switch (parentType) {
            case 'partner': {
                if (isNull(parentId)) {
                    return throwError(() => new Error('No parent ID provided'))
                }
                path = APIRoutes.partnerRoutes(this.baseUrl)
                    .partnerEnduserSubscriptionRoutesForPartner(parentId)
                    .listPartnerEnduserSubscriptions()
                break
            }
            case 'enduser': {
                if (isNull(parentId)) {
                    return throwError(() => new Error('No parent ID provided'))
                }
                path = APIRoutes.enduserRoutes(this.baseUrl)
                    .partnerEnduserSubscriptionRoutesForEnduser(parentId)
                    .listPartnerEnduserSubscriptions()
                break
            }
            case 'none': {
                path = APIRoutes.partnerEnduserSubscriptionRoutes(this.baseUrl).listPartnerEnduserSubscriptions()
                break
            }
        }
        let params = serialisePaginatedQueryParams(
            pagination,
            this.partnerEnduserSubscriptionFacade.partnerSubscriptionRemotePagination$
        )
        if (filters) {
            if (filters.dbCreatedAt) {
                params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt))
            }
            if (filters.dbUpdatedAt) {
                params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt))
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

    updateSubscription(
        enduserSubscriptionId: string,
        request: Model.UpdateSubscriptionRequest
    ): Observable<Model.PartnerSubscriptionResponse> {
        const path = APIRoutes.partnerEnduserSubscriptionRoutes(this.baseUrl).updatePartnerEnduserSubscription(
            enduserSubscriptionId
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

    deleteSubscription(enduserSubscriptionId: string, force: boolean): Observable<void> {
        const path = APIRoutes.partnerEnduserSubscriptionRoutes(this.baseUrl).deletePartnerEnduserSubscription(
            enduserSubscriptionId
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
