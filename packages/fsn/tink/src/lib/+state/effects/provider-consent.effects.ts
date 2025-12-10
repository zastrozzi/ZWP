import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { ProviderConsentLocalActions, ProviderConsentRemoteActions } from '../actions/provider-consent.actions'
import { debounceTime, filter, map, mergeMap, of, withLatestFrom } from 'rxjs'
import { Facades } from '../facades'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'TinkProviderConsentEffects', options: { skipMethodDebugger: true } })
export class TinkProviderConsentEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private providerConsentAPI = inject(Services.TINK_PROVIDER_CONSENT_API_SERVICE)
    private providerConsentFacade = inject(Facades.TinkProviderConsentFacade)
    private userFacade = inject(Facades.TinkUserFacade)
    private routerFacade = inject(ZWPRouterFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...ProviderConsentRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(ProviderConsentRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...ProviderConsentRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(ProviderConsentRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...ProviderConsentRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(ProviderConsentRemoteActions.identifiers)({ error: action.error }))
    ))


    // Local Action Effects
    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            ProviderConsentLocalActions.updateProviderConsentFilters, 
            ProviderConsentLocalActions.resetProviderConsentFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        withLatestFrom(this.userFacade.selectedUserId$),
        debounceTime(200),
        map(([_, tinkUserId]) => ProviderConsentRemoteActions.listProviderConsents.request({ tinkUserId: tinkUserId, pagination: null }))
    ))

    selectProviderConsent$ = createEffect(() => this.actions$.pipe(
        ofType(ProviderConsentLocalActions.selectProviderConsent),
        map((action) => ProviderConsentRemoteActions.getProviderConsent.request({ providerConsentId: action.providerConsentId }))
    ))

    getProviderConsent$ = createRemoteEffect(this.actions$, ProviderConsentRemoteActions.getProviderConsent, (action) =>
        this.providerConsentAPI.getProviderConsent(action.providerConsentId)
    )

    listProviderConsents$ = createRemoteEffect(this.actions$, ProviderConsentRemoteActions.listProviderConsents, (action) =>
        of(action).pipe(
            withLatestFrom(this.providerConsentFacade.providerConsentFilters$),
            mergeMap(([action, filters]) => this.providerConsentAPI.listProviderConsents(action.tinkUserId, action.pagination, filters))
        )
    )

    deleteProviderConsent$ = createRemoteEffect(
        this.actions$, 
        ProviderConsentRemoteActions.deleteProviderConsent, 
        (action) => this.providerConsentAPI.deleteProviderConsent(action.providerConsentId),
        (action) => ({ providerConsentId: action.providerConsentId })
    )

    refreshProviderConsent$ = createRemoteEffect(
        this.actions$,
        ProviderConsentRemoteActions.refreshProviderConsent,
        (action) => this.providerConsentAPI.refreshProviderConsent(action.providerConsentId),
        (action) => ({ providerConsentId: action.providerConsentId })
    )
    
    refreshProviderConsents$ = createRemoteEffect(
        this.actions$,
        ProviderConsentRemoteActions.refreshProviderConsents,
        (action) => this.providerConsentAPI.refreshProviderConsents(action.tinkUserId),
        (action) => ({ tinkUserId: action.tinkUserId })
    )

    extendProviderConsent$ = createRemoteEffect(
        this.actions$,
        ProviderConsentRemoteActions.extendProviderConsent,
        (action) => this.providerConsentAPI.extendProviderConsent(action.providerConsentId)
    )

    ngrxOnInitEffects() {
        return ProviderConsentLocalActions.initialiseProviderConsentState()
    }
}