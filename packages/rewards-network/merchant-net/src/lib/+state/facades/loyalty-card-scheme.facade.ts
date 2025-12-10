import { inject, Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import {
    LoyaltyCardLocalActions,
    LoyaltyCardRemoteActions,
    LoyaltyCardSchemeLocalActions,
    LoyaltyCardSchemeRemoteActions,
} from '../actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'LoyaltyCardSchemeFacade', options: { skipMethodDebugger: true } })
export class LoyaltyCardSchemeFacade {
    private store = inject(Store)

    loyaltyCardSchemeFilters$ = this.store.pipe(
        select(Selectors.LoyaltyCardSchemeSelectors.selectLoyaltyCardSchemeFilters)
    )
    loyaltyCardSchemeRemotePagination$ = this.store.pipe(
        select(Selectors.LoyaltyCardSchemeSelectors.selectLoyaltyCardSchemeRemotePagination)
    )
    loyaltyCardSchemeRemoteState$ = this.store.pipe(
        select(Selectors.LoyaltyCardSchemeSelectors.selectLoyaltyCardSchemeRemoteState)
    )

    loyaltyCardSchemes$ = this.store.pipe(select(Selectors.LoyaltyCardSchemeSelectors.selectAllLoyaltyCardSchemes))
    paginatedFilteredLoyaltyCardSchemes$ = this.store.pipe(
        select(Selectors.LoyaltyCardSchemeSelectors.selectPaginatedFilteredLoyaltyCardSchemes)
    )
    loyaltyCardSchemesForSelectedBrand$ = this.store.pipe(
        select(Selectors.LoyaltyCardSchemeBrandSelectors.selectLoyaltyCardSchemesForSelectedBrand)
    )
    loyaltyCardSchemesForSelectedMerchant$ = this.store.pipe(
        select(Selectors.LoyaltyCardSchemeSelectors.selectLoyaltyCardSchemesForSelectedMerchant)
    )
    paginatedFilteredLoyaltyCardSchemesForSelectedBrand$ = this.store.pipe(
        select(Selectors.LoyaltyCardSchemeBrandSelectors.selectPaginatedFilteredLoyaltyCardSchemesForSelectedBrand)
    )
    paginatedFilteredLoyaltyCardSchemesForSelectedMerchant$ = this.store.pipe(
        select(Selectors.LoyaltyCardSchemeSelectors.selectPaginatedFilteredLoyaltyCardSchemesForSelectedMerchant)
    )

    selectedLoyaltyCardScheme$ = this.store.pipe(select(Selectors.LoyaltyCardSchemeSelectors.selectedLoyaltyCardScheme))
    selectedLoyaltyCardSchemeId$ = this.store.pipe(
        select(Selectors.LoyaltyCardSchemeSelectors.selectSelectedLoyaltyCardSchemeId)
    )
    
    loyaltyCardSchemeById$ = (id: string) =>
        this.store.pipe(select(Selectors.LoyaltyCardSchemeSelectors.selectLoyaltyCardSchemeById(id)))

    loyaltyCardSchemesForMerchant$ = (merchantId: string) =>
        this.store.pipe(select(Selectors.LoyaltyCardSchemeSelectors.selectLoyaltyCardSchemesForMerchant(merchantId)))
    loyaltyCardSchemesForBrand$ = (brandId: string) =>
        this.store.pipe(select(Selectors.LoyaltyCardSchemeBrandSelectors.selectLoyaltyCardSchemesForBrand(brandId)))
    paginatedFilteredLoyaltyCardSchemesForMerchant$ = (merchantId: string) =>
        this.store.pipe(
            select(Selectors.LoyaltyCardSchemeSelectors.selectPaginatedFilteredLoyaltyCardSchemesForMerchant(merchantId))
        )
    paginatedFilteredLoyaltyCardSchemesForBrand$ = (brandId: string) =>
        this.store.pipe(
            select(Selectors.LoyaltyCardSchemeBrandSelectors.selectPaginatedFilteredLoyaltyCardSchemesForBrand(brandId))
        )

    createLoyaltyCardScheme(
        merchantId: string,
        request: Model.CreateLoyaltyCardSchemeRequest
    ) {
        return this.store.dispatch(LoyaltyCardSchemeRemoteActions.create.request({ merchantId, request }))
    }

    getLoyaltyCardScheme(loyaltyCardSchemeId: string) {
        return this.store.dispatch(LoyaltyCardSchemeRemoteActions.get.request({ loyaltyCardSchemeId }))
    }

    listLoyaltyCardSchemes(
        brandId: Nullable<string> = null,
        merchantId: Nullable<string> = null,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.LoyaltyCardSchemeResponse>>> = null
    ) {
        return this.store.dispatch(LoyaltyCardSchemeRemoteActions.list.request({ brandId, merchantId, pagination }))
    }

    selectLoyaltyCardScheme(loyaltyCardSchemeId: string) {
        return this.store.dispatch(LoyaltyCardSchemeLocalActions.selectLoyaltyCardScheme({ loyaltyCardSchemeId }))
    }

    deselectLoyaltyCardScheme() {
        return this.store.dispatch(LoyaltyCardSchemeLocalActions.deselectLoyaltyCardScheme())
    }

    updateLoyaltyCardScheme(loyaltyCardSchemeId: string, update: Model.UpdateLoyaltyCardSchemeRequest) {
        return this.store.dispatch(LoyaltyCardSchemeRemoteActions.update.request({ loyaltyCardSchemeId, update }))
    }

    deleteLoyaltyCardScheme(loyaltyCardSchemeId: string, force: boolean) {
        return this.store.dispatch(LoyaltyCardSchemeRemoteActions.delete.request({ loyaltyCardSchemeId, force }))
    }

    updateLoyaltyCardSchemeFilters(
        filters: Partial<Model.Filters.LoyaltyCardSchemeFilters>,
        triggerRemoteFetch: boolean = true
    ) {
        return this.store.dispatch(
            LoyaltyCardSchemeLocalActions.updateLoyaltyCardSchemeFilters({ filters, triggerRemoteFetch })
        )
    }

    updateLoyaltyCardSchemeFiltersForPaginatedListComponent(
        filters: Partial<Model.Filters.LoyaltyCardSchemeFilters>,
        context: Model.LoyaltyCardSchemePaginatedListComponentContext,
        triggerRemoteFetch: boolean = true
    ) {
        return this.store.dispatch(
            LoyaltyCardSchemeLocalActions.updateLoyaltyCardSchemeFiltersForPaginatedListComponent({
                filters,
                context,
                triggerRemoteFetch,
            })
        )
    }

    resetLoyaltyCardSchemeFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(LoyaltyCardSchemeLocalActions.resetLoyaltyCardSchemeFilters({ triggerRemoteFetch }))
    }

    resetLoyaltyCardSchemeFiltersForPaginatedListComponent(
        context: Model.LoyaltyCardSchemePaginatedListComponentContext,
        triggerRemoteFetch: boolean = true
    ) {
        return this.store.dispatch(
            LoyaltyCardSchemeLocalActions.resetLoyaltyCardSchemeFiltersForPaginatedListComponent({
                context,
                triggerRemoteFetch,
            })
        )
    }

    resetLoyaltyCardSchemePagination() {
        return this.store.dispatch(LoyaltyCardSchemeLocalActions.resetPagination())
    }
}
