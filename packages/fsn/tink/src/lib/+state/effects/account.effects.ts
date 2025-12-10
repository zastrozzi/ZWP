import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { AccountLocalActions, AccountRemoteActions } from '../actions/account.actions'
import { debounceTime, filter, map, mergeMap, of, withLatestFrom } from 'rxjs'
import { Facades } from '../facades'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'TinkAccountEffects', options: { skipMethodDebugger: true } })
export class TinkAccountEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private accountAPI = inject(Services.TINK_ACCOUNT_API_SERVICE)
    private accountFacade = inject(Facades.TinkAccountFacade)
    private userFacade = inject(Facades.TinkUserFacade)
    private routerFacade = inject(ZWPRouterFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...AccountRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(AccountRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...AccountRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(AccountRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...AccountRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(AccountRemoteActions.identifiers)({ error: action.error }))
    ))


    // Local Action Effects
    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            AccountLocalActions.updateAccountFilters, 
            AccountLocalActions.resetAccountFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        withLatestFrom(this.userFacade.selectedUserId$),
        debounceTime(200),
        map(([_, tinkUserId]) => AccountRemoteActions.listAccounts.request({ tinkUserId: tinkUserId, pagination: null }))
    ))

    selectAccount$ = createEffect(() => this.actions$.pipe(
        ofType(AccountLocalActions.selectAccount),
        map((action) => AccountRemoteActions.getAccount.request({ accountId: action.accountId }))
    ))

    getAccount$ = createRemoteEffect(this.actions$, AccountRemoteActions.getAccount, (action) =>
        this.accountAPI.getAccount(action.accountId)
    )

    listAccounts$ = createRemoteEffect(this.actions$, AccountRemoteActions.listAccounts, (action) =>
        of(action).pipe(
            withLatestFrom(this.accountFacade.accountFilters$),
            mergeMap(([action, filters]) => this.accountAPI.listAccounts(action.tinkUserId, action.pagination, filters))
        )
    )

    deleteAccount$ = createRemoteEffect(
        this.actions$, 
        AccountRemoteActions.deleteAccount, 
        (action) => this.accountAPI.deleteAccount(action.accountId),
        (action) => ({ accountId: action.accountId })
    )

    refreshAccounts$ = createRemoteEffect(
        this.actions$, 
        AccountRemoteActions.refreshAccounts, 
        (action) => this.accountAPI.refreshAccounts(action.tinkUserId),
        (action) => ({ tinkUserId: action.tinkUserId })
    )

    refreshAccount$ = createRemoteEffect(
        this.actions$, 
        AccountRemoteActions.refreshAccount, 
        (action) => this.accountAPI.refreshAccount(action.accountId),
        (action) => ({ accountId: action.accountId })
    )

    refreshAccountBalance$ = createRemoteEffect(
        this.actions$, 
        AccountRemoteActions.refreshAccountBalance, 
        (action) => this.accountAPI.refreshAccountBalance(action.accountId),
        (action) => ({ accountId: action.accountId })
    )

    ngrxOnInitEffects() {
        return AccountLocalActions.initialiseAccountState()
    }
}