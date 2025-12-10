import { Injectable, inject } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { TransactionLocalActions, TransactionRemoteActions } from '../actions/transaction.actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams, DateQueryFilter } from '@zwp/platform.common'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'TinkTransactionFacade', options: { skipMethodDebugger: true } })
export class TinkTransactionFacade {
    private store = inject(Store)

    // Observables from selectors
    transactionFilters$ = this.store.pipe(select(Selectors.TransactionSelectors.selectTransactionFilters))
    transactionRemotePagination$ = this.store.pipe(
        select(Selectors.TransactionSelectors.selectTransactionRemotePagination)
    )
    transactionRemoteState$ = this.store.pipe(select(Selectors.TransactionSelectors.selectTransactionRemoteState))

    transactions$ = this.store.pipe(select(Selectors.TransactionSelectors.selectAllTransactions))
    selectedTransactionId$ = this.store.pipe(select(Selectors.TransactionSelectors.selectSelectedTransactionId))
    selectedTransaction$ = this.store.pipe(select(Selectors.TransactionSelectors.selectedTransaction))
    filteredTransactions$ = this.store.pipe(select(Selectors.TransactionSelectors.selectFilteredTransactions))
    paginatedTransactions$ = this.store.pipe(select(Selectors.TransactionSelectors.selectPaginatedTransactions))
    paginatedFilteredTransactions$ = this.store.pipe(
        select(Selectors.TransactionSelectors.selectPaginatedFilteredTransactions)
    )

    transactionById$ = (transactionId: string) =>
        this.store.pipe(select(Selectors.TransactionSelectors.selectTransactionById(transactionId)))

    // Local Actions
    updateTransactionFilters(filters: Partial<Model.Filters.TransactionFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(TransactionLocalActions.updateTransactionFilters({ filters, triggerRemoteFetch }))
    }

    resetTransactionFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(TransactionLocalActions.resetTransactionFilters({ triggerRemoteFetch }))
    }

    resetTransactionState() {
        return this.store.dispatch(TransactionLocalActions.resetTransactionState())
    }

    initialiseTransactionState() {
        return this.store.dispatch(TransactionLocalActions.initialiseTransactionState())
    }

    selectTransaction(transactionId: string) {
        return this.store.dispatch(TransactionLocalActions.selectTransaction({ transactionId }))
    }

    deselectTransaction() {
        return this.store.dispatch(TransactionLocalActions.deselectTransaction())
    }

    resetPagination() {
        return this.store.dispatch(TransactionLocalActions.resetPagination())
    }

    // Remote Actions
    getTransaction(transactionId: string) {
        return this.store.dispatch(TransactionRemoteActions.getTransaction.request({ transactionId }))
    }

    listTransactions(
        accountId: Nullable<string> = null,
        pagination: Nullable<
            Partial<PaginatedQueryParams<Model.ServerAPIModel.Transaction.TinkV2TransactionResponse>>
        > = null
    ) {
        return this.store.dispatch(TransactionRemoteActions.listTransactions.request({ accountId, pagination }))
    }

    deleteTransaction(transactionId: string) {
        return this.store.dispatch(TransactionRemoteActions.deleteTransaction.request({ transactionId }))
    }

    refreshTransactions(accountId: string, bookedDate: Nullable<DateQueryFilter>, limit: Nullable<number>) {
        return this.store.dispatch(
            TransactionRemoteActions.refreshTransactions.request({ accountId, bookedDate, limit })
        )
    }
}
