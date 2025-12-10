import { Injectable, inject } from '@angular/core'
import { SubgroupAPIService } from '../abstract'
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
    serviceName: 'SubgroupLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class SubgroupLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements SubgroupAPIService
{
    private config = inject(CDP_PARTNER_NET_API_CONFIG)
    private baseUrl = inject(CDP_PARTNER_NET_API_BASE_URL)
    private subgroupFacade = inject(Facades.PartnerNetSubgroupFacade)

    createSubgroup(
        parentId: string,
        request: Model.CreatePartnerSubgroupRequest
    ): Observable<Model.SubgroupResponse> {
        const path = APIRoutes.partnerRoutes(this.baseUrl)
            .subgroupRoutesForPartner(parentId)
            .createSubgroup()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.POST,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    getSubgroup(
        subgroupId: string
    ): Observable<Model.SubgroupResponse> {
        const path = APIRoutes.subgroupRoutes(
            this.baseUrl
        ).getSubgroup(subgroupId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    listSubgroups(
        parentId: Nullable<string>,
        parentType: 'partner' | 'asset' | 'enduser' | 'none',
        pagination: Nullable<
            Partial<PaginatedQueryParams<Model.SubgroupResponse>>
        >,
        filters: Nullable<Partial<Model.SubgroupFilters>>
    ): Observable<PaginatedResponse<Model.SubgroupResponse>> {
        let path: string
        switch (parentType) {
            case 'partner': {
                if (isNull(parentId)) {
                    return throwError(() => new Error('Parent ID is required when parent type is partner'))
                }
                path = APIRoutes.partnerRoutes(this.baseUrl)
                    .subgroupRoutesForPartner(parentId)
                    .listSubgroups()
                break
            }
            case 'asset': {
                if (isNull(parentId)) {
                    return throwError(() => new Error('Parent ID is required when parent type is asset'))
                }
                path = APIRoutes.assetRoutes(this.baseUrl)
                    .subgroupRoutesForAsset(parentId)
                    .listSubgroups()
                break
            }
            case 'enduser': {
                if (isNull(parentId)) {
                    return throwError(() => new Error('Parent ID is required when parent type is enduser'))
                }
                path = APIRoutes.enduserRoutes(this.baseUrl)
                    .subgroupRoutesForEnduser(parentId)
                    .listSubgroups()
                break
            }
            case 'none': {
                path = APIRoutes.subgroupRoutes(
                    this.baseUrl
                ).listSubgroups()
                break
            }
        }
        let params = serialisePaginatedQueryParams(
            pagination,
            this.subgroupFacade.subgroupRemotePagination$
        )
        if (filters) {
            if (filters.dbCreatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt)) }
            if (filters.dbUpdatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt)) }
            if (filters.name) { params = upsertHTTPParams(params, serialiseStringQueryFilter('name', filters.name)) }
            if (filters.status) { params = upsertHTTPParams(params, serialiseEnumQueryFilter('status', filters.status)) }
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

    updateSubgroup(
        subgroupId: string,
        request: Model.UpdatePartnerSubgroupRequest
    ): Observable<Model.SubgroupResponse> {
        const path = APIRoutes.subgroupRoutes(
            this.baseUrl
        ).updateSubgroup(subgroupId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PATCH,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    deleteSubgroup(subgroupId: string, force: boolean): Observable<void> {
        const path = APIRoutes.subgroupRoutes(
            this.baseUrl
        ).deleteSubgroup(subgroupId)
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
