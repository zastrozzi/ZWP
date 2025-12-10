import { Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { Model } from '../../model'
import {
    createHTTPParams,
    HTTPMethod,
    isNull,
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    serialisePaginatedQueryParams,
    upsertHTTPParam,
} from '@zwp/platform.common'
import { TinkWebhookEndpointAPIService } from '../abstract/webhook-endpoint.api.service'
import { APIRoutes } from '../../api-routes'
import { TINK_API_CONFIG, TINK_API_BASE_URL } from '../../config'
import { PlatformAuth } from '@zwp/platform.auth'
import { State } from '../../+state'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'TinkWebhookEndpointLiveAPIService', options: { skipMethodDebugger: true } })
export class TinkWebhookEndpointLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements TinkWebhookEndpointAPIService
{
    private config = inject(TINK_API_CONFIG)
    private baseUrl = inject(TINK_API_BASE_URL)
    private webhookEndpointFacade = inject(State.Facades.TinkWebhookEndpointFacade)

    createWebhookEndpoint(
        request: Model.ServerAPIModel.Events.CreateTinkV2WebhookEndpointRequest
    ): Observable<Model.ServerAPIModel.Events.TinkV2WebhookEndpointResponse> {
        const path = APIRoutes.eventRoutes(this.baseUrl).webhookEndpointRoutes().createWebhookEndpoint()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.POST,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    getWebhookEndpoint(endpointId: string): Observable<Model.ServerAPIModel.Events.TinkV2WebhookEndpointResponse> {
        const path = APIRoutes.eventRoutes(this.baseUrl).webhookEndpointRoutes().getWebhookEndpoint(endpointId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    listWebhookEndpoints(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Events.TinkV2WebhookEndpointResponse>>> = null,
        filters: Nullable<Partial<Model.Filters.WebhookEndpointFilters>> = null
    ): Observable<PaginatedResponse<Model.ServerAPIModel.Events.TinkV2WebhookEndpointResponse>> {
        const path = APIRoutes.eventRoutes(this.baseUrl).webhookEndpointRoutes().listWebhookEndpoints()
        const params = serialisePaginatedQueryParams(pagination, this.webhookEndpointFacade.webhookEndpointRemotePagination$)
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

    updateWebhookEndpoint(
        endpointId: string,
        request: Model.ServerAPIModel.Events.UpdateTinkV2WebhookEndpointRequest
    ): Observable<Model.ServerAPIModel.Events.TinkV2WebhookEndpointResponse> {
        const path = APIRoutes.eventRoutes(this.baseUrl).webhookEndpointRoutes().updateWebhookEndpoint(endpointId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PUT,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    deleteWebhookEndpoint(endpointId: string): Observable<void> {
        const path = APIRoutes.eventRoutes(this.baseUrl).webhookEndpointRoutes().deleteWebhookEndpoint(endpointId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    refreshWebhookEndpoints(limit: Nullable<number> = null): Observable<void> {
        let params = createHTTPParams()
        if (!isNull(limit)) {
            params = upsertHTTPParam(params, 'limit', limit)
        }
        const path = APIRoutes.eventRoutes(this.baseUrl).webhookEndpointRoutes().refreshWebhookEndpoints()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.POST,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
            params: params,
        })
    }
}
