import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { CredentialLocalActions, CredentialRemoteActions } from '../actions/credential.actions'
import { debounceTime, filter, map, mergeMap, of, withLatestFrom } from 'rxjs'
import { Facades } from '../facades'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'TinkCredentialEffects', options: { skipMethodDebugger: true } })
export class TinkCredentialEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private credentialAPI = inject(Services.TINK_CREDENTIAL_API_SERVICE)
    private credentialFacade = inject(Facades.TinkCredentialFacade)
    private userFacade = inject(Facades.TinkUserFacade)
    private routerFacade = inject(ZWPRouterFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...CredentialRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(CredentialRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...CredentialRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(CredentialRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...CredentialRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(CredentialRemoteActions.identifiers)({ error: action.error }))
    ))


    // Local Action Effects
    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            CredentialLocalActions.updateCredentialFilters, 
            CredentialLocalActions.resetCredentialFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        withLatestFrom(this.userFacade.selectedUserId$),
        debounceTime(200),
        map(([_, tinkUserId]) => CredentialRemoteActions.listCredentials.request({ tinkUserId: tinkUserId, pagination: null }))
    ))

    selectCredential$ = createEffect(() => this.actions$.pipe(
        ofType(CredentialLocalActions.selectCredential),
        map((action) => CredentialRemoteActions.getCredential.request({ credentialId: action.credentialId }))
    ))

    getCredential$ = createRemoteEffect(this.actions$, CredentialRemoteActions.getCredential, (action) =>
        this.credentialAPI.getCredential(action.credentialId)
    )

    listCredentials$ = createRemoteEffect(this.actions$, CredentialRemoteActions.listCredentials, (action) =>
        of(action).pipe(
            withLatestFrom(this.credentialFacade.credentialFilters$),
            mergeMap(([action, filters]) => this.credentialAPI.listCredentials(action.tinkUserId, action.pagination, filters))
        )
    )

    deleteCredential$ = createRemoteEffect(
        this.actions$, 
        CredentialRemoteActions.deleteCredential, 
        (action) => this.credentialAPI.deleteCredential(action.credentialId),
        (action) => ({ credentialId: action.credentialId })
    )

    refreshCredentials$ = createRemoteEffect(
        this.actions$, 
        CredentialRemoteActions.refreshCredentials, 
        (action) => this.credentialAPI.refreshCredentials(action.tinkUserId),
        (action) => ({ tinkUserId: action.tinkUserId })
    )

    refreshCredential$ = createRemoteEffect(
        this.actions$, 
        CredentialRemoteActions.refreshCredential, 
        (action) => this.credentialAPI.refreshCredential(action.credentialId),
        (action) => ({ credentialId: action.credentialId })
    )

    forceRefreshCredential$ = createRemoteEffect(
        this.actions$,
        CredentialRemoteActions.forceRefreshCredential,
        (action) => this.credentialAPI.forceRefreshCredential(action.credentialId),
        (action) => ({ credentialId: action.credentialId })
    )

    ngrxOnInitEffects() {
        return CredentialLocalActions.initialiseCredentialState()
    }
}