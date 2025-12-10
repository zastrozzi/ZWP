import { Injectable, InjectionToken } from '@angular/core'
import { Observable } from 'rxjs'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { Model } from '../../model'

@Injectable({ providedIn: 'root' })
export abstract class TinkWebhookEndpointAPIService {
    abstract createWebhookEndpoint(
        request: Model.ServerAPIModel.Events.CreateTinkV2WebhookEndpointRequest
    ): Observable<Model.ServerAPIModel.Events.TinkV2WebhookEndpointResponse>

    abstract getWebhookEndpoint(
        endpointId: string
    ): Observable<Model.ServerAPIModel.Events.TinkV2WebhookEndpointResponse>

    abstract listWebhookEndpoints(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Events.TinkV2WebhookEndpointResponse>>>,
        filters: Nullable<Partial<Model.Filters.WebhookEndpointFilters>>
    ): Observable<PaginatedResponse<Model.ServerAPIModel.Events.TinkV2WebhookEndpointResponse>>

    abstract updateWebhookEndpoint(
        endpointId: string,
        request: Model.ServerAPIModel.Events.UpdateTinkV2WebhookEndpointRequest
    ): Observable<Model.ServerAPIModel.Events.TinkV2WebhookEndpointResponse>

    abstract deleteWebhookEndpoint(endpointId: string): Observable<void>

    abstract refreshWebhookEndpoints(limit: Nullable<number>): Observable<void>
}

export const TINK_WEBHOOK_ENDPOINT_API_SERVICE = new InjectionToken<TinkWebhookEndpointAPIService>(
    'fsn.tink.webhook-endpoint.api.service'
)
