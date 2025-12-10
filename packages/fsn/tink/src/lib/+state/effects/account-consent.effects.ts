import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { AccountConsentLocalActions, AccountConsentRemoteActions } from '../actions/account-consent.actions'
import { debounceTime, filter, map, mergeMap, of, withLatestFrom } from 'rxjs'
import { Facades } from '../facades'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'TinkAccountConsentEffects', options: { skipMethodDebugger: true } })
export class TinkAccountConsentEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private accountConsentAPI = inject(Services.TINK_ACCOUNT_CONSENT_API_SERVICE)
    private accountConsentFacade = inject(Facades.TinkAccountConsentFacade)
    private userFacade = inject(Facades.TinkUserFacade)
    private routerFacade = inject(ZWPRouterFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...AccountConsentRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(AccountConsentRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...AccountConsentRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(AccountConsentRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...AccountConsentRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(AccountConsentRemoteActions.identifiers)({ error: action.error }))
    ))


    // Local Action Effects
    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            AccountConsentLocalActions.updateAccountConsentFilters, 
            AccountConsentLocalActions.resetAccountConsentFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        withLatestFrom(this.userFacade.selectedUserId$),
        debounceTime(200),
        map(([_, tinkUserId]) => AccountConsentRemoteActions.listAccountConsents.request({ tinkUserId: tinkUserId, pagination: null }))
    ))

    selectAccountConsent$ = createEffect(() => this.actions$.pipe(
        ofType(AccountConsentLocalActions.selectAccountConsent),
        map((action) => AccountConsentRemoteActions.getAccountConsent.request({ accountConsentId: action.accountConsentId }))
    ))

    getAccountConsent$ = createRemoteEffect(this.actions$, AccountConsentRemoteActions.getAccountConsent, (action) =>
        this.accountConsentAPI.getAccountConsent(action.accountConsentId)
    )

    listAccountConsents$ = createRemoteEffect(this.actions$, AccountConsentRemoteActions.listAccountConsents, (action) =>
        of(action).pipe(
            withLatestFrom(this.accountConsentFacade.accountConsentFilters$),
            mergeMap(([action, filters]) => this.accountConsentAPI.listAccountConsents(action.tinkUserId, action.pagination, filters))
        )
    )

    deleteAccountConsent$ = createRemoteEffect(
        this.actions$, 
        AccountConsentRemoteActions.deleteAccountConsent, 
        (action) => this.accountConsentAPI.deleteAccountConsent(action.accountConsentId),
        (action) => ({ accountConsentId: action.accountConsentId })
    )

    ngrxOnInitEffects() {
        return AccountConsentLocalActions.initialiseAccountConsentState()
    }
}