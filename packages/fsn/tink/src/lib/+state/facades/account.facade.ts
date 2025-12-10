import { Injectable, inject } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { AccountLocalActions, AccountRemoteActions } from '../actions/account.actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'TinkAccountFacade', options: { skipMethodDebugger: true } })
export class TinkAccountFacade {
    private store = inject(Store)

    // Observables from selectors
    accountFilters$ = this.store.pipe(select(Selectors.AccountSelectors.selectAccountFilters))
    accountRemotePagination$ = this.store.pipe(select(Selectors.AccountSelectors.selectAccountRemotePagination))
    accountRemoteState$ = this.store.pipe(select(Selectors.AccountSelectors.selectAccountRemoteState))

    accounts$ = this.store.pipe(select(Selectors.AccountSelectors.selectAllAccounts))
    selectedAccountId$ = this.store.pipe(select(Selectors.AccountSelectors.selectSelectedAccountId))
    selectedAccount$ = this.store.pipe(select(Selectors.AccountSelectors.selectedAccount))
    filteredAccounts$ = this.store.pipe(select(Selectors.AccountSelectors.selectFilteredAccounts))
    paginatedAccounts$ = this.store.pipe(select(Selectors.AccountSelectors.selectPaginatedAccounts))
    paginatedFilteredAccounts$ = this.store.pipe(select(Selectors.AccountSelectors.selectPaginatedFilteredAccounts))

    accountById$ = (accountId: string) =>
        this.store.pipe(select(Selectors.AccountSelectors.selectAccountById(accountId)))

    // Local Actions
    updateAccountFilters(filters: Partial<Model.Filters.AccountFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(AccountLocalActions.updateAccountFilters({ filters, triggerRemoteFetch }))
    }

    resetAccountFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(AccountLocalActions.resetAccountFilters({ triggerRemoteFetch }))
    }

    resetAccountState() {
        return this.store.dispatch(AccountLocalActions.resetAccountState())
    }

    initialiseAccountState() {
        return this.store.dispatch(AccountLocalActions.initialiseAccountState())
    }

    selectAccount(accountId: string) {
        return this.store.dispatch(AccountLocalActions.selectAccount({ accountId }))
    }

    deselectAccount() {
        return this.store.dispatch(AccountLocalActions.deselectAccount())
    }

    resetPagination() {
        return this.store.dispatch(AccountLocalActions.resetPagination())
    }

    // Remote Actions
    getAccount(accountId: string) {
        return this.store.dispatch(AccountRemoteActions.getAccount.request({ accountId }))
    }

    listAccounts(
        tinkUserId: Nullable<string> = null,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Account.TinkV2AccountResponse>>> = null
    ) {
        return this.store.dispatch(AccountRemoteActions.listAccounts.request({ tinkUserId, pagination }))
    }

    deleteAccount(accountId: string) {
        return this.store.dispatch(AccountRemoteActions.deleteAccount.request({ accountId }))
    }

    refreshAccounts(tinkUserId: string) {
        return this.store.dispatch(AccountRemoteActions.refreshAccounts.request({ tinkUserId }))
    }

    refreshAccount(accountId: string) {
        return this.store.dispatch(AccountRemoteActions.refreshAccount.request({ accountId }))
    }

    refreshAccountBalance(accountId: string) {
        return this.store.dispatch(AccountRemoteActions.refreshAccountBalance.request({ accountId }))
    }
}
