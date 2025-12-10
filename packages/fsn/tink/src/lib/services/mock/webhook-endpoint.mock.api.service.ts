import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { TinkWebhookEndpointAPIService } from '../abstract/webhook-endpoint.api.service'
import { Model } from '../../model'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { ZWPDebuggableInjectable } from '@zwp/platform.common'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'TinkWebhookEndpointMockAPIService', options: { skipMethodDebugger: true } })
export class TinkWebhookEndpointMockAPIService implements TinkWebhookEndpointAPIService {
    createWebhookEndpoint(
        _request: Model.ServerAPIModel.Events.CreateTinkV2WebhookEndpointRequest
    ): Observable<Model.ServerAPIModel.Events.TinkV2WebhookEndpointResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    getWebhookEndpoint(_endpointId: string): Observable<Model.ServerAPIModel.Events.TinkV2WebhookEndpointResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listWebhookEndpoints(
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Events.TinkV2WebhookEndpointResponse>>>,
        _filters: Nullable<Partial<Model.Filters.WebhookEndpointFilters>>
    ): Observable<PaginatedResponse<Model.ServerAPIModel.Events.TinkV2WebhookEndpointResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    updateWebhookEndpoint(
        _endpointId: string,
        _request: Model.ServerAPIModel.Events.UpdateTinkV2WebhookEndpointRequest
    ): Observable<Model.ServerAPIModel.Events.TinkV2WebhookEndpointResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteWebhookEndpoint(_endpointId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }

    refreshWebhookEndpoints(_limit: Nullable<number>): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }
}
