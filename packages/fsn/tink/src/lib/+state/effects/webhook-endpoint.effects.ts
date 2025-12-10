import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { WebhookEndpointLocalActions, WebhookEndpointRemoteActions } from '../actions/webhook-endpoint.actions'
import { debounceTime, filter, map, mergeMap, of, withLatestFrom } from 'rxjs'
import { Facades } from '../facades'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'TinkWebhookEndpointEffects', options: { skipMethodDebugger: true } })
export class TinkWebhookEndpointEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private webhookEndpointAPI = inject(Services.TINK_WEBHOOK_ENDPOINT_API_SERVICE)
    private webhookEndpointFacade = inject(Facades.TinkWebhookEndpointFacade)
    private routerFacade = inject(ZWPRouterFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...WebhookEndpointRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(WebhookEndpointRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...WebhookEndpointRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(WebhookEndpointRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...WebhookEndpointRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(WebhookEndpointRemoteActions.identifiers)({ error: action.error }))
    ))


    // Local Action Effects
    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            WebhookEndpointLocalActions.updateWebhookEndpointFilters, 
            WebhookEndpointLocalActions.resetWebhookEndpointFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        debounceTime(200),
        map(() => WebhookEndpointRemoteActions.listWebhookEndpoints.request({ pagination: null }))
    ))

    selectWebhookEndpoint$ = createEffect(() => this.actions$.pipe(
        ofType(WebhookEndpointLocalActions.selectWebhookEndpoint),
        map((action) => WebhookEndpointRemoteActions.getWebhookEndpoint.request({ endpointId: action.endpointId }))
    ))

    createWebhookEndpoint$ = createRemoteEffect(this.actions$, WebhookEndpointRemoteActions.createWebhookEndpoint, (action) =>
        this.webhookEndpointAPI.createWebhookEndpoint(action.request)
    )

    getWebhookEndpoint$ = createRemoteEffect(this.actions$, WebhookEndpointRemoteActions.getWebhookEndpoint, (action) =>
        this.webhookEndpointAPI.getWebhookEndpoint(action.endpointId)
    )

    listWebhookEndpoints$ = createRemoteEffect(this.actions$, WebhookEndpointRemoteActions.listWebhookEndpoints, (action) =>
        of(action).pipe(
            withLatestFrom(this.webhookEndpointFacade.webhookEndpointFilters$),
            mergeMap(([action, filters]) => this.webhookEndpointAPI.listWebhookEndpoints(action.pagination, filters))
        )
    )

    updateWebhookEndpoint$ = createRemoteEffect(this.actions$, WebhookEndpointRemoteActions.updateWebhookEndpoint, (action) =>
        this.webhookEndpointAPI.updateWebhookEndpoint(action.endpointId, action.request)
    )

    deleteWebhookEndpoint$ = createRemoteEffect(
        this.actions$, 
        WebhookEndpointRemoteActions.deleteWebhookEndpoint, 
        (action) => this.webhookEndpointAPI.deleteWebhookEndpoint(action.endpointId),
        (action) => ({ endpointId: action.endpointId })
    )

    refreshWebhookEndpoints$ = createRemoteEffect(
        this.actions$, 
        WebhookEndpointRemoteActions.refreshWebhookEndpoints, 
        (action) => this.webhookEndpointAPI.refreshWebhookEndpoints(action.limit),
        (action) => ({ limit: action.limit })
    )

    ngrxOnInitEffects() {
        return WebhookEndpointLocalActions.initialiseWebhookEndpointState()
    }
}