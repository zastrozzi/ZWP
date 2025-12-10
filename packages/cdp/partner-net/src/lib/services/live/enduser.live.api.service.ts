import { Injectable, inject } from '@angular/core'
import { EnduserAPIService } from '../abstract/enduser.api.service'
import { Model } from '../../model'
import {
    HTTPMethod,
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    serialiseDateQueryFilter,
    serialisePaginatedQueryParams,
    serialiseStringQueryFilter,
    upsertHTTPParams,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'
import { PlatformAuth } from '@zwp/platform.auth'
import { APIRoutes } from '../../api-routes'
import { CDP_PARTNER_NET_API_BASE_URL, CDP_PARTNER_NET_API_CONFIG } from '../../config'
import { CDPUsers } from '@zwp/cdp.users'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'PartnerNetEnduserLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class EnduserLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements EnduserAPIService
{
    private config = inject(CDP_PARTNER_NET_API_CONFIG)
    private baseUrl = inject(CDP_PARTNER_NET_API_BASE_URL)
    private enduserFacade = inject(CDPUsers.State.EnduserFacade)

    addEnduser(
        parentId: string,
        parentType: 'partner' | 'subgroup',
        enduserId: string,
        request: Model.CreateSubscriptionRequest
    ): Observable<
        Model.PartnerSubscriptionResponse | 
        Model.SubgroupSubscriptionResponse
    > {
        let path: string
        switch (parentType) {
            case 'partner': {
                path = APIRoutes.partnerRoutes(this.baseUrl)
                    .enduserRoutesForPartner(parentId)
                    .addEnduser(enduserId)
                break
            }
            case 'subgroup': {
                path = APIRoutes.subgroupRoutes(this.baseUrl)
                    .enduserRoutesForSubgroup(parentId)
                    .addEnduser(enduserId)
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

    removeEnduser(
        parentId: string,
        parentType: 'partner' | 'subgroup',
        enduserId: string
    ): Observable<void> {
        let path: string
        switch (parentType) {
            case 'partner': {
                path = APIRoutes.partnerRoutes(this.baseUrl)
                    .enduserRoutesForPartner(parentId)
                    .removeEnduser(enduserId)
                break
            }
            case 'subgroup': {
                path = APIRoutes.subgroupRoutes(this.baseUrl)
                    .enduserRoutesForSubgroup(parentId)
                    .removeEnduser(enduserId)
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

    listEndusers(
        parentId: string,
        parentType: 'partner' | 'subgroup',
        pagination: Nullable<Partial<PaginatedQueryParams<CDPUsers.Model.EnduserResponse>>>,
        filters: Nullable<Partial<CDPUsers.Model.EnduserFilters>>
    ): Observable<PaginatedResponse<CDPUsers.Model.EnduserResponse>> {
                let path: string
                switch (parentType) {
                    case 'partner': {
                        path = APIRoutes.partnerRoutes(this.baseUrl)
                            .enduserRoutesForPartner(parentId)
                            .listEndusers()
                        break
                    }
                    case 'subgroup': {
                        path = APIRoutes.subgroupRoutes(this.baseUrl)
                            .enduserRoutesForSubgroup(parentId)
                            .listEndusers()
                        break
                    }
                }
        let params = serialisePaginatedQueryParams(
            pagination, 
            this.enduserFacade.enduserRemotePagination$
        )
        if (filters) {
            if (filters.dbCreatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt)) }
            if (filters.dbUpdatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt)) }
            if (filters.firstName) { params = upsertHTTPParams(params, serialiseStringQueryFilter('first_name', filters.firstName)) }
            if (filters.lastName) { params = upsertHTTPParams(params, serialiseStringQueryFilter('last_name', filters.lastName)) }
        }
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
            params: params
        })
    }
}
