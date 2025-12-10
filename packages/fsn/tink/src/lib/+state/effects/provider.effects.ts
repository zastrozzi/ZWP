import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { ProviderLocalActions, ProviderRemoteActions } from '../actions/provider.actions'
import { debounceTime, filter, map, mergeMap, of, withLatestFrom } from 'rxjs'
import { Facades } from '../facades'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'TinkProviderEffects', options: { skipMethodDebugger: true } })
export class TinkProviderEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private providerAPI = inject(Services.TINK_PROVIDER_API_SERVICE)
    private providerFacade = inject(Facades.TinkProviderFacade)
    private userFacade = inject(Facades.TinkUserFacade)
    private routerFacade = inject(ZWPRouterFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...ProviderRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(ProviderRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...ProviderRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(ProviderRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...ProviderRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(ProviderRemoteActions.identifiers)({ error: action.error }))
    ))


    // Local Action Effects
    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            ProviderLocalActions.updateProviderFilters, 
            ProviderLocalActions.resetProviderFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        withLatestFrom(this.userFacade.selectedUserId$),
        debounceTime(200),
        map(([_, tinkUserId]) => ProviderRemoteActions.listProviders.request({ tinkUserId: tinkUserId, pagination: null }))
    ))

    selectProvider$ = createEffect(() => this.actions$.pipe(
        ofType(ProviderLocalActions.selectProvider),
        map((action) => ProviderRemoteActions.getProvider.request({ providerId: action.providerId }))
    ))

    getProvider$ = createRemoteEffect(this.actions$, ProviderRemoteActions.getProvider, (action) =>
        this.providerAPI.getProvider(action.providerId)
    )

    listProviders$ = createRemoteEffect(this.actions$, ProviderRemoteActions.listProviders, (action) =>
        of(action).pipe(
            withLatestFrom(this.providerFacade.providerFilters$),
            mergeMap(([action, filters]) => this.providerAPI.listProviders(action.tinkUserId, action.pagination, filters))
        )
    )

    deleteProvider$ = createRemoteEffect(
        this.actions$, 
        ProviderRemoteActions.deleteProvider, 
        (action) => this.providerAPI.deleteProvider(action.providerId),
        (action) => ({ providerId: action.providerId })
    )

    refreshProviders$ = createRemoteEffect(
        this.actions$, 
        ProviderRemoteActions.refreshProviders, 
        (action) => this.providerAPI.refreshProviders(action.market),
        (action) => ({ market: action.market })
    )

    ngrxOnInitEffects() {
        return ProviderLocalActions.initialiseProviderState()
    }
}