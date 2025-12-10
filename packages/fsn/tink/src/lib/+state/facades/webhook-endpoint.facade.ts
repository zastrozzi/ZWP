import { Injectable, inject } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { WebhookEndpointLocalActions, WebhookEndpointRemoteActions } from '../actions/webhook-endpoint.actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'TinkWebhookEndpointFacade', options: { skipMethodDebugger: true } })
export class TinkWebhookEndpointFacade {
    private store = inject(Store)

    // Observables from selectors
    webhookEndpointFilters$ = this.store.pipe(select(Selectors.WebhookEndpointSelectors.selectWebhookEndpointFilters))
    webhookEndpointRemotePagination$ = this.store.pipe(
        select(Selectors.WebhookEndpointSelectors.selectWebhookEndpointRemotePagination)
    )
    webhookEndpointRemoteState$ = this.store.pipe(
        select(Selectors.WebhookEndpointSelectors.selectWebhookEndpointRemoteState)
    )

    webhookEndpoints$ = this.store.pipe(select(Selectors.WebhookEndpointSelectors.selectAllWebhookEndpoints))
    selectedWebhookEndpointId$ = this.store.pipe(
        select(Selectors.WebhookEndpointSelectors.selectSelectedWebhookEndpointId)
    )
    selectedWebhookEndpoint$ = this.store.pipe(select(Selectors.WebhookEndpointSelectors.selectedWebhookEndpoint))
    filteredWebhookEndpoints$ = this.store.pipe(
        select(Selectors.WebhookEndpointSelectors.selectFilteredWebhookEndpoints)
    )
    paginatedWebhookEndpoints$ = this.store.pipe(
        select(Selectors.WebhookEndpointSelectors.selectPaginatedWebhookEndpoints)
    )
    paginatedFilteredWebhookEndpoints$ = this.store.pipe(
        select(Selectors.WebhookEndpointSelectors.selectPaginatedFilteredWebhookEndpoints)
    )

    webhookEndpointById$ = (endpointId: string) =>
        this.store.pipe(select(Selectors.WebhookEndpointSelectors.selectWebhookEndpointById(endpointId)))

    // Local Actions
    updateWebhookEndpointFilters(
        filters: Partial<Model.Filters.WebhookEndpointFilters>,
        triggerRemoteFetch: boolean = true
    ) {
        return this.store.dispatch(
            WebhookEndpointLocalActions.updateWebhookEndpointFilters({ filters, triggerRemoteFetch })
        )
    }

    resetWebhookEndpointFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(WebhookEndpointLocalActions.resetWebhookEndpointFilters({ triggerRemoteFetch }))
    }

    resetWebhookEndpointState() {
        return this.store.dispatch(WebhookEndpointLocalActions.resetWebhookEndpointState())
    }

    initialiseWebhookEndpointState() {
        return this.store.dispatch(WebhookEndpointLocalActions.initialiseWebhookEndpointState())
    }

    selectWebhookEndpoint(endpointId: string) {
        return this.store.dispatch(WebhookEndpointLocalActions.selectWebhookEndpoint({ endpointId }))
    }

    deselectWebhookEndpoint() {
        return this.store.dispatch(WebhookEndpointLocalActions.deselectWebhookEndpoint())
    }

    resetPagination() {
        return this.store.dispatch(WebhookEndpointLocalActions.resetPagination())
    }

    // Remote Actions
    createWebhookEndpoint(request: Model.ServerAPIModel.Events.CreateTinkV2WebhookEndpointRequest) {
        return this.store.dispatch(WebhookEndpointRemoteActions.createWebhookEndpoint.request({ request }))
    }

    getWebhookEndpoint(endpointId: string) {
        return this.store.dispatch(WebhookEndpointRemoteActions.getWebhookEndpoint.request({ endpointId }))
    }

    listWebhookEndpoints(
        pagination: Nullable<
            Partial<PaginatedQueryParams<Model.ServerAPIModel.Events.TinkV2WebhookEndpointResponse>>
        > = null
    ) {
        return this.store.dispatch(WebhookEndpointRemoteActions.listWebhookEndpoints.request({ pagination }))
    }

    updateWebhookEndpoint(endpointId: string, request: Model.ServerAPIModel.Events.UpdateTinkV2WebhookEndpointRequest) {
        return this.store.dispatch(WebhookEndpointRemoteActions.updateWebhookEndpoint.request({ endpointId, request }))
    }

    deleteWebhookEndpoint(endpointId: string) {
        return this.store.dispatch(WebhookEndpointRemoteActions.deleteWebhookEndpoint.request({ endpointId }))
    }

    refreshWebhookEndpoints(limit: Nullable<number> = null) {
        return this.store.dispatch(WebhookEndpointRemoteActions.refreshWebhookEndpoints.request({ limit }))
    }
}
