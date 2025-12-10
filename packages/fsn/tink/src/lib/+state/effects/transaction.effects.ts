import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { TransactionLocalActions, TransactionRemoteActions } from '../actions/transaction.actions'
import { debounceTime, filter, map, mergeMap, of, withLatestFrom } from 'rxjs'
import { Facades } from '../facades'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'TinkTransactionEffects', options: { skipMethodDebugger: true } })
export class TinkTransactionEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private transactionAPI = inject(Services.TINK_TRANSACTION_API_SERVICE)
    private transactionFacade = inject(Facades.TinkTransactionFacade)
    private accountFacade = inject(Facades.TinkAccountFacade)
    private userFacade = inject(Facades.TinkUserFacade)
    private routerFacade = inject(ZWPRouterFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...TransactionRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(TransactionRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...TransactionRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(TransactionRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...TransactionRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(TransactionRemoteActions.identifiers)({ error: action.error }))
    ))


    // Local Action Effects
    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            TransactionLocalActions.updateTransactionFilters, 
            TransactionLocalActions.resetTransactionFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        withLatestFrom(this.accountFacade.selectedAccountId$),
        debounceTime(200),
        map(([_, accountId]) => TransactionRemoteActions.listTransactions.request({ accountId: accountId, pagination: null }))
    ))

    selectTransaction$ = createEffect(() => this.actions$.pipe(
        ofType(TransactionLocalActions.selectTransaction),
        map((action) => TransactionRemoteActions.getTransaction.request({ transactionId: action.transactionId }))
    ))

    getTransaction$ = createRemoteEffect(this.actions$, TransactionRemoteActions.getTransaction, (action) =>
        this.transactionAPI.getTransaction(action.transactionId)
    )

    listTransactions$ = createRemoteEffect(this.actions$, TransactionRemoteActions.listTransactions, (action) =>
        of(action).pipe(
            withLatestFrom(this.transactionFacade.transactionFilters$),
            mergeMap(([action, filters]) => this.transactionAPI.listTransactions(action.accountId, action.pagination, filters))
        )
    )

    deleteTransaction$ = createRemoteEffect(
        this.actions$, 
        TransactionRemoteActions.deleteTransaction, 
        (action) => this.transactionAPI.deleteTransaction(action.transactionId),
        (action) => ({ transactionId: action.transactionId })
    )

    refreshTransactions$ = createRemoteEffect(
        this.actions$, 
        TransactionRemoteActions.refreshTransactions, 
        (action) => this.transactionAPI.refreshTransactions(action.accountId, action.bookedDate, action.limit),
        (action) => ({ accountId: action.accountId, bookedDate: action.bookedDate, limit: action.limit })
    )

    ngrxOnInitEffects() {
        return TransactionLocalActions.initialiseTransactionState()
    }
}