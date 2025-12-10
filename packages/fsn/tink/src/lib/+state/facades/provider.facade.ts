import { Injectable, inject } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ProviderLocalActions, ProviderRemoteActions } from '../actions/provider.actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'
import { ZWPDebuggableInjectable, ZWPISO3166Alpha2, Nullable, PaginatedQueryParams } from '@zwp/platform.common'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'TinkProviderFacade', options: { skipMethodDebugger: true } })
export class TinkProviderFacade {
  private store = inject(Store)

  // Observables from selectors
  providerFilters$ = this.store.pipe(select(Selectors.ProviderSelectors.selectProviderFilters))
  providerRemotePagination$ = this.store.pipe(select(Selectors.ProviderSelectors.selectProviderRemotePagination))
  providerRemoteState$ = this.store.pipe(select(Selectors.ProviderSelectors.selectProviderRemoteState))
  
  providers$ = this.store.pipe(select(Selectors.ProviderSelectors.selectAllProviders))
  selectedProviderId$ = this.store.pipe(select(Selectors.ProviderSelectors.selectSelectedProviderId))
  selectedProvider$ = this.store.pipe(select(Selectors.ProviderSelectors.selectedProvider))
  filteredProviders$ = this.store.pipe(select(Selectors.ProviderSelectors.selectFilteredProviders))
  paginatedProviders$ = this.store.pipe(select(Selectors.ProviderSelectors.selectPaginatedProviders))
  paginatedFilteredProviders$ = this.store.pipe(select(Selectors.ProviderSelectors.selectPaginatedFilteredProviders))

  providerById$ = (providerId: string) => this.store.pipe(select(Selectors.ProviderSelectors.selectProviderById(providerId)))

  // Local Actions
  updateProviderFilters(filters: Partial<Model.Filters.ProviderFilters>, triggerRemoteFetch: boolean = true) {
    return this.store.dispatch(ProviderLocalActions.updateProviderFilters({ filters, triggerRemoteFetch }))
  }

  resetProviderFilters(triggerRemoteFetch: boolean = true) {
    return this.store.dispatch(ProviderLocalActions.resetProviderFilters({ triggerRemoteFetch }))
  }

  resetProviderState() {
    return this.store.dispatch(ProviderLocalActions.resetProviderState())
  }

  initialiseProviderState() {
    return this.store.dispatch(ProviderLocalActions.initialiseProviderState())
  }

  selectProvider(providerId: string) {
    return this.store.dispatch(ProviderLocalActions.selectProvider({ providerId }))
  }

  deselectProvider() {
    return this.store.dispatch(ProviderLocalActions.deselectProvider())
  }

  resetPagination() {
    return this.store.dispatch(ProviderLocalActions.resetPagination())
  }

  // Remote Actions
  getProvider(providerId: string) {
    return this.store.dispatch(ProviderRemoteActions.getProvider.request({ providerId }))
  }

  listProviders(
    tinkUserId: Nullable<string> = null,
    pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Provider.TinkV1ProviderResponse>>> = null
  ) {
    return this.store.dispatch(ProviderRemoteActions.listProviders.request({ tinkUserId, pagination }))
  }

  deleteProvider(providerId: string) {
    return this.store.dispatch(ProviderRemoteActions.deleteProvider.request({ providerId }))
  }

  refreshProviders(market: Nullable<ZWPISO3166Alpha2> = null) {
    return this.store.dispatch(ProviderRemoteActions.refreshProviders.request({ market }))
  }
}