import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services';
import { TransactionSpreadLocalActions, TransactionSpreadRemoteActions } from '../actions';
import { debounceTime, filter, map, of, switchMap, withLatestFrom } from 'rxjs'
import { Facades } from '../facades';

@Injectable()
@ZWPDebuggableInjectable({serviceName: 'TilloTransactionSpreadEffects', options: { skipMethodDebugger: true }})
export class TilloTransactionSpreadEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private transactionSpreadAPI = inject(Services.TRANSACTION_SPREAD_API_SERVICE)

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...TransactionSpreadRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(TransactionSpreadRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...TransactionSpreadRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(TransactionSpreadRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() =>  this.actions$.pipe(
        ofType(...TransactionSpreadRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(TransactionSpreadRemoteActions.identifiers)({ error: action.error }))
    ))

    getTransactionSpread$ = createRemoteEffect(
        this.actions$,
        TransactionSpreadRemoteActions.getTransactionSpread,
        (action) => this.transactionSpreadAPI.getTransactionSpread(action.transactionSpreadId)
    )

    selectTransactionSpread$ = createEffect(() => this.actions$.pipe(
        ofType(TransactionSpreadLocalActions.selectTransactionSpread),
        map((action) => TransactionSpreadRemoteActions.getTransactionSpread.request({transactionSpreadId: action.transactionSpreadId}))
    ))

    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            TransactionSpreadLocalActions.updateTransactionSpreadFilters,
            TransactionSpreadLocalActions.resetTransactionSpreadFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        debounceTime(200),
        map(() => TransactionSpreadRemoteActions.listTransactionSpread.request({ pagination: null}))
    ))

    listTransactionSpread$ = createRemoteEffect(
        this.actions$,
        TransactionSpreadRemoteActions.listTransactionSpread,
        (action) => this.transactionSpreadAPI.listTransactionSpreads(null, action.pagination, null)
    )

    
    updateTransactionSpread$ = createRemoteEffect(
        this.actions$,
        TransactionSpreadRemoteActions.updateTransactionSpread,
        (action) => this.transactionSpreadAPI.updateTransactionSpread(action.transactionSpreadId, action.update)
    )

    deleteTransactionSpread$ = createRemoteEffect(
        this.actions$,
        TransactionSpreadRemoteActions.deleteTransactionSpread,
        (action) => this.transactionSpreadAPI.deleteTransactionSpread(action.transactionSpreadId)
    )

    ngrxOnInitEffects() {
        return TransactionSpreadLocalActions.initialiseTransactionSpreadState()
    }
}