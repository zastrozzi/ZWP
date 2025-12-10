import { Injectable, inject } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ProviderConsentLocalActions, ProviderConsentRemoteActions } from '../actions/provider-consent.actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'TinkProviderConsentFacade', options: { skipMethodDebugger: true } })
export class TinkProviderConsentFacade {
    private store = inject(Store)

    // Observables from selectors
    providerConsentFilters$ = this.store.pipe(select(Selectors.ProviderConsentSelectors.selectProviderConsentFilters))
    providerConsentRemotePagination$ = this.store.pipe(
        select(Selectors.ProviderConsentSelectors.selectProviderConsentRemotePagination)
    )
    providerConsentRemoteState$ = this.store.pipe(
        select(Selectors.ProviderConsentSelectors.selectProviderConsentRemoteState)
    )

    providerConsents$ = this.store.pipe(select(Selectors.ProviderConsentSelectors.selectAllProviderConsents))
    selectedProviderConsentId$ = this.store.pipe(
        select(Selectors.ProviderConsentSelectors.selectSelectedProviderConsentId)
    )
    selectedProviderConsent$ = this.store.pipe(select(Selectors.ProviderConsentSelectors.selectedProviderConsent))
    filteredProviderConsents$ = this.store.pipe(
        select(Selectors.ProviderConsentSelectors.selectFilteredProviderConsents)
    )
    paginatedProviderConsents$ = this.store.pipe(
        select(Selectors.ProviderConsentSelectors.selectPaginatedProviderConsents)
    )
    paginatedFilteredProviderConsents$ = this.store.pipe(
        select(Selectors.ProviderConsentSelectors.selectPaginatedFilteredProviderConsents)
    )

    providerConsentById$ = (providerConsentId: string) =>
        this.store.pipe(select(Selectors.ProviderConsentSelectors.selectProviderConsentById(providerConsentId)))

    // Local Actions
    updateProviderConsentFilters(
        filters: Partial<Model.Filters.ProviderConsentFilters>,
        triggerRemoteFetch: boolean = true
    ) {
        return this.store.dispatch(
            ProviderConsentLocalActions.updateProviderConsentFilters({ filters, triggerRemoteFetch })
        )
    }

    resetProviderConsentFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(ProviderConsentLocalActions.resetProviderConsentFilters({ triggerRemoteFetch }))
    }

    resetProviderConsentState() {
        return this.store.dispatch(ProviderConsentLocalActions.resetProviderConsentState())
    }

    initialiseProviderConsentState() {
        return this.store.dispatch(ProviderConsentLocalActions.initialiseProviderConsentState())
    }

    selectProviderConsent(providerConsentId: string) {
        return this.store.dispatch(ProviderConsentLocalActions.selectProviderConsent({ providerConsentId }))
    }

    deselectProviderConsent() {
        return this.store.dispatch(ProviderConsentLocalActions.deselectProviderConsent())
    }

    resetPagination() {
        return this.store.dispatch(ProviderConsentLocalActions.resetPagination())
    }

    // Remote Actions
    getProviderConsent(providerConsentId: string) {
        return this.store.dispatch(ProviderConsentRemoteActions.getProviderConsent.request({ providerConsentId }))
    }

    listProviderConsents(
        tinkUserId: Nullable<string> = null,
        pagination: Nullable<
            Partial<PaginatedQueryParams<Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse>>
        > = null
    ) {
        return this.store.dispatch(
            ProviderConsentRemoteActions.listProviderConsents.request({ tinkUserId, pagination })
        )
    }

    deleteProviderConsent(providerConsentId: string) {
        return this.store.dispatch(ProviderConsentRemoteActions.deleteProviderConsent.request({ providerConsentId }))
    }

    refreshProviderConsent(providerConsentId: string) {
        return this.store.dispatch(ProviderConsentRemoteActions.refreshProviderConsent.request({ providerConsentId }))
    }

    refreshProviderConsents(tinkUserId: string) {
        return this.store.dispatch(ProviderConsentRemoteActions.refreshProviderConsents.request({ tinkUserId }))
    }

    extendProviderConsent(providerConsentId: string) {
        return this.store.dispatch(ProviderConsentRemoteActions.extendProviderConsent.request({ providerConsentId }))
    }
}
