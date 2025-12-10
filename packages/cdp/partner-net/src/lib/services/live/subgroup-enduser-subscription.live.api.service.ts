import { Injectable, inject } from '@angular/core'
import { SubgroupEnduserSubscriptionAPIService } from '../abstract'
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
    serviceName: 'SubgroupEnduserSubscriptionLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class SubgroupEnduserSubscriptionLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements SubgroupEnduserSubscriptionAPIService
{
    private config = inject(CDP_PARTNER_NET_API_CONFIG)
    private baseUrl = inject(CDP_PARTNER_NET_API_BASE_URL)
    private subgroupEnduserSubscriptionFacade = inject(Facades.PartnerNetSubgroupEnduserSubscriptionFacade)

    getSubscription(enduserSubscriptionId: string): Observable<Model.SubgroupSubscriptionResponse> {
        const path = APIRoutes.subgroupEnduserSubscriptionRoutes(this.baseUrl).getSubgroupEnduserSubscription(
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
        parentType: 'subgroup' | 'enduser' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.SubgroupSubscriptionResponse>>>,
        filters: Nullable<Partial<Model.SubgroupSubscriptionFilters>>
    ): Observable<PaginatedResponse<Model.SubgroupSubscriptionResponse>> {
        let path: string
        switch (parentType) {
            case 'subgroup': {
                if (isNull(parentId)) {
                    return throwError(() => new Error('No parent ID provided'))
                }
                path = APIRoutes.subgroupRoutes(this.baseUrl)
                    .subgroupEnduserSubscriptionRoutesForSubgroup(parentId)
                    .listSubgroupEnduserSubscriptions()
                break
            }
            case 'enduser': {
                if (isNull(parentId)) {
                    return throwError(() => new Error('No parent ID provided'))
                }
                path = APIRoutes.enduserRoutes(this.baseUrl)
                    .subgroupEnduserSubscriptionRoutesForEnduser(parentId)
                    .listSubgroupEnduserSubscriptions()
                break
            }
            case 'none': {
                path = APIRoutes.subgroupEnduserSubscriptionRoutes(this.baseUrl).listSubgroupEnduserSubscriptions()
                break
            }
        }
        let params = serialisePaginatedQueryParams(
            pagination,
            this.subgroupEnduserSubscriptionFacade.subgroupSubscriptionRemotePagination$
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
    ): Observable<Model.SubgroupSubscriptionResponse> {
        const path = APIRoutes.subgroupEnduserSubscriptionRoutes(this.baseUrl).updateSubgroupEnduserSubscription(
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
        const path = APIRoutes.subgroupEnduserSubscriptionRoutes(this.baseUrl).deleteSubgroupEnduserSubscription(
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
