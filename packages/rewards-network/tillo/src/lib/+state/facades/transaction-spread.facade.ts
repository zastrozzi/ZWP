import { Injectable, inject } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { TransactionSpreadLocalActions, TransactionSpreadRemoteActions } from '../actions';
import { Selectors } from '../selectors';
import { Model } from '../../model';

@Injectable()
@ZWPDebuggableInjectable({serviceName: 'TilloTransactionSpreadFacade', options: { skipMethodDebugger: true }})
export class TilloTransactionSpreadFacade {
    private store = inject(Store)

    transactionSpreadFilter$ = this.store.pipe(select(Selectors.TransactionSpreadSelectors.selectTransactionSpreadFilters))
    transactionSpreadRemotePagination$ = this.store.pipe(select(Selectors.TransactionSpreadSelectors.selectTransactionSpreadRemotePagination))
    transactionSpreadRemoteState$ = this.store.pipe(select(Selectors.TransactionSpreadSelectors.selectTransactionSpreadRemoteState))

    transactionSpread$ = this.store.pipe(select(Selectors.TransactionSpreadSelectors.selectAllTransactionSpreads))

    paginatedFilteredtransactionSpread$ = this.store.pipe(select(Selectors.TransactionSpreadSelectors.selectPaginatedFilteredTransactionSpread))

    selectedTransactionSpread$ = this.store.pipe(select(Selectors.TransactionSpreadSelectors.selectedTransactionSpread))
    selectedtransactionSpreadId$ = this.store.pipe(select(Selectors.TransactionSpreadSelectors.selectSelectedTransactionSpreadId))
    transactionSpreadForSelectedBrand$ = this.store.pipe(select(Selectors.TransactionSpreadSelectors.selectTransactionSpreadForSelectedBrand))

    transactionSpreadById$ = (id: string) => this.store.pipe(select(Selectors.TransactionSpreadSelectors.selectTransactionSpreadById(id)))

    getTransactionSpread(transactionSpreadId: string) {
        return this.store.dispatch(TransactionSpreadRemoteActions.getTransactionSpread.request({transactionSpreadId}))
    }

    listTransactionSpreads(pagination: Nullable<Partial<PaginatedQueryParams<Model.TransactionSpreadResponse>>> = null) {
        return this.store.dispatch(TransactionSpreadRemoteActions.listTransactionSpread.request({ pagination }))
    }

    selectTransactionSpread(transactionSpreadId: string) {
        return this.store.dispatch(TransactionSpreadLocalActions.selectTransactionSpread({transactionSpreadId}))
    }

    deselectTransactionSpread() {
        return this.store.dispatch(TransactionSpreadLocalActions.deselectTransactionSpread())
    }

    deleteTransactionSpread(transactionSpreadId: string) {
        return this.store.dispatch(TransactionSpreadRemoteActions.deleteTransactionSpread.request({transactionSpreadId}))
    }

    updateTransactionSpreadFilters(filters: Partial<Model.Filters.TransactionSpreadFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(TransactionSpreadLocalActions.updateTransactionSpreadFilters({filters, triggerRemoteFetch}))
    }

    resetTransactionSpreadFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(TransactionSpreadLocalActions.resetTransactionSpreadFilters({triggerRemoteFetch}))
    }

    resetPagination() {
        return this.store.dispatch(TransactionSpreadLocalActions.resetPagination())
    }
}

