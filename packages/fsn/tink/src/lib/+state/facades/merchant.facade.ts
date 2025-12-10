import { Injectable, inject } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { MerchantLocalActions, MerchantRemoteActions } from '../actions/merchant.actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'TinkMerchantFacade', options: { skipMethodDebugger: true } })
export class TinkMerchantFacade {
    private store = inject(Store)

    // Observables from selectors
    merchantFilters$ = this.store.pipe(select(Selectors.MerchantSelectors.selectMerchantFilters))
    merchantRemotePagination$ = this.store.pipe(select(Selectors.MerchantSelectors.selectMerchantRemotePagination))
    merchantRemoteState$ = this.store.pipe(select(Selectors.MerchantSelectors.selectMerchantRemoteState))

    merchants$ = this.store.pipe(select(Selectors.MerchantSelectors.selectAllMerchants))
    selectedMerchantId$ = this.store.pipe(select(Selectors.MerchantSelectors.selectSelectedMerchantId))
    selectedMerchant$ = this.store.pipe(select(Selectors.MerchantSelectors.selectedMerchant))
    filteredMerchants$ = this.store.pipe(select(Selectors.MerchantSelectors.selectFilteredMerchants))
    paginatedMerchants$ = this.store.pipe(select(Selectors.MerchantSelectors.selectPaginatedMerchants))
    paginatedFilteredMerchants$ = this.store.pipe(select(Selectors.MerchantSelectors.selectPaginatedFilteredMerchants))

    merchantById$ = (merchantId: string) =>
        this.store.pipe(select(Selectors.MerchantSelectors.selectMerchantById(merchantId)))

    // Local Actions
    updateMerchantFilters(filters: Partial<Model.Filters.MerchantFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(MerchantLocalActions.updateMerchantFilters({ filters, triggerRemoteFetch }))
    }

    resetMerchantFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(MerchantLocalActions.resetMerchantFilters({ triggerRemoteFetch }))
    }

    resetMerchantState() {
        return this.store.dispatch(MerchantLocalActions.resetMerchantState())
    }

    initialiseMerchantState() {
        return this.store.dispatch(MerchantLocalActions.initialiseMerchantState())
    }

    selectMerchant(merchantId: string) {
        return this.store.dispatch(MerchantLocalActions.selectMerchant({ merchantId }))
    }

    deselectMerchant() {
        return this.store.dispatch(MerchantLocalActions.deselectMerchant())
    }

    resetPagination() {
        return this.store.dispatch(MerchantLocalActions.resetPagination())
    }

    // Remote Actions
    createMerchant(request: Model.ServerAPIModel.Merchant.CreateTinkMerchantRequest) {
        return this.store.dispatch(MerchantRemoteActions.createMerchant.request({ request }))
    }

    getMerchant(merchantId: string) {
        return this.store.dispatch(MerchantRemoteActions.getMerchant.request({ merchantId }))
    }

    listMerchants(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Merchant.TinkMerchantResponse>>> = null
    ) {
        return this.store.dispatch(MerchantRemoteActions.listMerchants.request({ pagination }))
    }

    deleteMerchant(merchantId: string) {
        return this.store.dispatch(MerchantRemoteActions.deleteMerchant.request({ merchantId }))
    }

    refreshMerchants(limit: Nullable<number> = null) {
        return this.store.dispatch(MerchantRemoteActions.refreshMerchants.request({ limit }))
    }
}
