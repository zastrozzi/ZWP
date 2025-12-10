import { Injectable, inject } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { AccountConsentLocalActions, AccountConsentRemoteActions } from '../actions/account-consent.actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'TinkAccountConsentFacade', options: { skipMethodDebugger: true } })
export class TinkAccountConsentFacade {
    private store = inject(Store)

    // Observables from selectors
    accountConsentFilters$ = this.store.pipe(select(Selectors.AccountConsentSelectors.selectAccountConsentFilters))
    accountConsentRemotePagination$ = this.store.pipe(
        select(Selectors.AccountConsentSelectors.selectAccountConsentRemotePagination)
    )
    accountConsentRemoteState$ = this.store.pipe(
        select(Selectors.AccountConsentSelectors.selectAccountConsentRemoteState)
    )

    accountConsents$ = this.store.pipe(select(Selectors.AccountConsentSelectors.selectAllAccountConsents))
    selectedAccountConsentId$ = this.store.pipe(
        select(Selectors.AccountConsentSelectors.selectSelectedAccountConsentId)
    )
    selectedAccountConsent$ = this.store.pipe(select(Selectors.AccountConsentSelectors.selectedAccountConsent))
    filteredAccountConsents$ = this.store.pipe(select(Selectors.AccountConsentSelectors.selectFilteredAccountConsents))
    paginatedAccountConsents$ = this.store.pipe(
        select(Selectors.AccountConsentSelectors.selectPaginatedAccountConsents)
    )
    paginatedFilteredAccountConsents$ = this.store.pipe(
        select(Selectors.AccountConsentSelectors.selectPaginatedFilteredAccountConsents)
    )

    accountConsentById$ = (accountConsentId: string) =>
        this.store.pipe(select(Selectors.AccountConsentSelectors.selectAccountConsentById(accountConsentId)))

    // Local Actions
    updateAccountConsentFilters(
        filters: Partial<Model.Filters.AccountConsentFilters>,
        triggerRemoteFetch: boolean = true
    ) {
        return this.store.dispatch(
            AccountConsentLocalActions.updateAccountConsentFilters({ filters, triggerRemoteFetch })
        )
    }

    resetAccountConsentFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(AccountConsentLocalActions.resetAccountConsentFilters({ triggerRemoteFetch }))
    }

    resetAccountConsentState() {
        return this.store.dispatch(AccountConsentLocalActions.resetAccountConsentState())
    }

    initialiseAccountConsentState() {
        return this.store.dispatch(AccountConsentLocalActions.initialiseAccountConsentState())
    }

    selectAccountConsent(accountConsentId: string) {
        return this.store.dispatch(AccountConsentLocalActions.selectAccountConsent({ accountConsentId }))
    }

    deselectAccountConsent() {
        return this.store.dispatch(AccountConsentLocalActions.deselectAccountConsent())
    }

    resetPagination() {
        return this.store.dispatch(AccountConsentLocalActions.resetPagination())
    }

    // Remote Actions
    getAccountConsent(accountConsentId: string) {
        return this.store.dispatch(AccountConsentRemoteActions.getAccountConsent.request({ accountConsentId }))
    }

    listAccountConsents(
        tinkUserId: Nullable<string> = null,
        pagination: Nullable<
            Partial<PaginatedQueryParams<Model.ServerAPIModel.Consent.TinkV1AccountConsentResponse>>
        > = null
    ) {
        return this.store.dispatch(AccountConsentRemoteActions.listAccountConsents.request({ tinkUserId, pagination }))
    }

    deleteAccountConsent(accountConsentId: string) {
        return this.store.dispatch(AccountConsentRemoteActions.deleteAccountConsent.request({ accountConsentId }))
    }
}
