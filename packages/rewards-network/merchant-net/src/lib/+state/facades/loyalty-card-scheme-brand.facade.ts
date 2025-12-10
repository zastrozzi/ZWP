import { inject, Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import {
    LoyaltyCardLocalActions,
    LoyaltyCardRemoteActions,
    LoyaltyCardSchemeBrandLocalActions,
    LoyaltyCardSchemeBrandRemoteActions,
} from '../actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'LoyaltyCardSchemeBrandFacade', options: { skipMethodDebugger: true } })
export class LoyaltyCardSchemeBrandFacade {
    private store = inject(Store)

    loyaltyCardSchemeBrandFilters$ = this.store.pipe(
        select(Selectors.LoyaltyCardSchemeBrandSelectors.selectLoyaltyCardSchemeBrandFilters)
    )
    loyaltyCardSchemeBrandRemotePagination$ = this.store.pipe(
        select(Selectors.LoyaltyCardSchemeBrandSelectors.selectLoyaltyCardSchemeBrandRemotePagination)
    )
    loyaltyCardSchemeBrandRemoteState$ = this.store.pipe(
        select(Selectors.LoyaltyCardSchemeBrandSelectors.selectLoyaltyCardSchemeBrandRemoteState)
    )

    loyaltyCardSchemeBrands$ = this.store.pipe(select(Selectors.LoyaltyCardSchemeBrandSelectors.selectAllLoyaltyCardSchemeBrands))
    paginatedFilteredLoyaltyCardSchemeBrands$ = this.store.pipe(
        select(Selectors.LoyaltyCardSchemeBrandSelectors.selectPaginatedFilteredLoyaltyCardSchemeBrands)
    )
    loyaltyCardSchemeBrandsForSelectedBrand$ = this.store.pipe(
        select(Selectors.LoyaltyCardSchemeBrandSelectors.selectLoyaltyCardSchemeBrandsForSelectedBrand)
    )
    loyaltyCardSchemeBrandsForSelectedCardScheme$ = this.store.pipe(
        select(Selectors.LoyaltyCardSchemeBrandSelectors.selectLoyaltyCardSchemeBrandsForSelectedCardScheme)
    )
    paginatedFilteredLoyaltyCardSchemeBrandsForSelectedBrand$ = this.store.pipe(
        select(Selectors.LoyaltyCardSchemeBrandSelectors.selectPaginatedFilteredLoyaltyCardSchemeBrandsForSelectedBrand)
    )
    paginatedFilteredLoyaltyCardSchemeBrandsForSelectedCardScheme$ = this.store.pipe(
        select(Selectors.LoyaltyCardSchemeBrandSelectors.selectPaginatedFilteredLoyaltyCardSchemeBrandsForSelectedCardScheme)
    )

    selectedLoyaltyCardSchemeBrand$ = this.store.pipe(select(Selectors.LoyaltyCardSchemeBrandSelectors.selectedLoyaltyCardSchemeBrand))
    selectedLoyaltyCardSchemeBrandId$ = this.store.pipe(
        select(Selectors.LoyaltyCardSchemeBrandSelectors.selectSelectedLoyaltyCardSchemeBrandId)
    )
    
    loyaltyCardSchemeBrandById$ = (id: string) =>
        this.store.pipe(select(Selectors.LoyaltyCardSchemeBrandSelectors.selectLoyaltyCardSchemeBrandById(id)))

    loyaltyCardSchemeBrandsForCardScheme$ = (cardSchemeId: string) =>
        this.store.pipe(select(Selectors.LoyaltyCardSchemeBrandSelectors.selectLoyaltyCardSchemeBrandsForCardScheme(cardSchemeId)))
    loyaltyCardSchemeBrandsForBrand$ = (brandId: string) =>
        this.store.pipe(select(Selectors.LoyaltyCardSchemeBrandSelectors.selectLoyaltyCardSchemeBrandsForBrand(brandId)))
    paginatedFilteredLoyaltyCardSchemeBrandsForCardScheme$ = (cardSchemeId: string) =>
        this.store.pipe(
            select(Selectors.LoyaltyCardSchemeBrandSelectors.selectPaginatedFilteredLoyaltyCardSchemeBrandsForCardScheme(cardSchemeId))
        )
    paginatedFilteredLoyaltyCardSchemeBrandsForBrand$ = (brandId: string) =>
        this.store.pipe(
            select(Selectors.LoyaltyCardSchemeBrandSelectors.selectPaginatedFilteredLoyaltyCardSchemeBrandsForBrand(brandId))
        )

    addBrandToLoyaltyCardScheme(
        loyaltyCardSchemeId: string,
        brandId: string, 
    ) {
        return this.store.dispatch(LoyaltyCardSchemeBrandRemoteActions.addBrandToLoyaltyCardScheme.request({ loyaltyCardSchemeId, brandId }))
    }

    removeBrandFromLoyaltyCardScheme(
        loyaltyCardSchemeId: string,
        brandId: string,
        force: boolean = false
    ) {
        return this.store.dispatch(LoyaltyCardSchemeBrandRemoteActions.removeBrandFromLoyaltyCardScheme.request({ loyaltyCardSchemeId, brandId, force }))
    }

    getLoyaltyCardSchemeBrand(loyaltyCardSchemeBrandId: string) {
        return this.store.dispatch(LoyaltyCardSchemeBrandRemoteActions.getLoyaltyCardSchemeBrand.request({ loyaltyCardSchemeBrandId }))
    }

    listLoyaltyCardSchemeBrands(
        loyaltyCardSchemeId: Nullable<string> = null,
        brandId: Nullable<string> = null,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.LoyaltyCardSchemeBrandResponse>>> = null
    ) {
        return this.store.dispatch(LoyaltyCardSchemeBrandRemoteActions.listLoyaltyCardSchemeBrands.request({ loyaltyCardSchemeId, brandId, pagination }))
    }

    selectLoyaltyCardSchemeBrand(loyaltyCardSchemeBrandId: string) {
        return this.store.dispatch(LoyaltyCardSchemeBrandLocalActions.selectLoyaltyCardSchemeBrand({ loyaltyCardSchemeBrandId }))
    }

    deselectLoyaltyCardSchemeBrand() {
        return this.store.dispatch(LoyaltyCardSchemeBrandLocalActions.deselectLoyaltyCardSchemeBrand())
    }

    updateLoyaltyCardSchemeBrandFilters(
        filters: Partial<Model.Filters.LoyaltyCardSchemeBrandFilters>,
        triggerRemoteFetch: boolean = true
    ) {
        return this.store.dispatch(
            LoyaltyCardSchemeBrandLocalActions.updateLoyaltyCardSchemeBrandFilters({ filters, triggerRemoteFetch })
        )
    }

    resetLoyaltyCardSchemeBrandFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(LoyaltyCardSchemeBrandLocalActions.resetLoyaltyCardSchemeBrandFilters({ triggerRemoteFetch }))
    }

    resetLoyaltyCardSchemeBrandPagination() {
        return this.store.dispatch(LoyaltyCardSchemeBrandLocalActions.resetPagination())
    }
}
