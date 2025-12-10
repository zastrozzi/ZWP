import { inject, Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { RewardsNetworkTillo } from '@zwp/rewards-network.tillo'
import { BrandTilloBrandLocalActions, BrandTilloBrandRemoteActions } from '../actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'MerchantNetTilloBrandFacade', options: { skipMethodDebugger: true } })
export class MerchantNetTilloBrandFacade {
    private store = inject(Store)

    brandTilloBrandState$ = this.store.pipe(select(Selectors.TilloBrandSelectors.selectBrandTilloBrandState))
    brandTilloBrandFilters$ = this.store.pipe(select(Selectors.TilloBrandSelectors.selectBrandTilloBrandFilters))
    brandTilloBrandRemotePagination$ = this.store.pipe(
        select(Selectors.TilloBrandSelectors.selectBrandTilloBrandRemotePagination)
    )
    brandTilloBrandRemoteState$ = this.store.pipe(
        select(Selectors.TilloBrandSelectors.selectBrandTilloBrandRemoteState)
    )
    selectedBrandTilloBrandId$ = this.store.pipe(select(Selectors.TilloBrandSelectors.selectSelectedBrandTilloBrandId))
    brandTilloBrandEntityState$ = this.store.pipe(
        select(Selectors.TilloBrandSelectors.selectBrandTilloBrandEntityState)
    )
    brandTilloBrandIds$ = this.store.pipe(select(Selectors.TilloBrandSelectors.selectBrandTilloBrandIds))
    brandTilloBrandEntities$ = this.store.pipe(select(Selectors.TilloBrandSelectors.selectBrandTilloBrandEntities))
    allBrandTilloBrands$ = this.store.pipe(select(Selectors.TilloBrandSelectors.selectAllBrandTilloBrands))
    brandTilloBrandTotal$ = this.store.pipe(select(Selectors.TilloBrandSelectors.selectBrandTilloBrandTotal))
    selectedBrandTilloBrand$ = this.store.pipe(select(Selectors.TilloBrandSelectors.selectedBrandTilloBrand))

    brandTilloBrandsForSelectedBrand$ = this.store.pipe(
        select(Selectors.TilloBrandSelectors.selectBrandTilloBrandsForSelectedBrand)
    )
    brandTilloBrandsForSelectedMerchant$ = this.store.pipe(
        select(Selectors.TilloBrandSelectors.selectBrandTilloBrandsForSelectedMerchant)
    )
    brandTilloBrandsForSelectedTilloBrand$ = this.store.pipe(
        select(Selectors.TilloBrandSelectors.selectBrandTilloBrandsForSelectedTilloBrand)
    )
    filteredBrandTilloBrands$ = this.store.pipe(select(Selectors.TilloBrandSelectors.selectFilteredBrandTilloBrands))
    filteredBrandTilloBrandsForSelectedBrand$ = this.store.pipe(
        select(Selectors.TilloBrandSelectors.selectFilteredBrandTilloBrandsForSelectedBrand)
    )
    filteredBrandTilloBrandsForSelectedMerchant$ = this.store.pipe(
        select(Selectors.TilloBrandSelectors.selectFilteredBrandTilloBrandsForSelectedMerchant)
    )
    filteredBrandTilloBrandsForSelectedTilloBrand$ = this.store.pipe(
        select(Selectors.TilloBrandSelectors.selectFilteredBrandTilloBrandsForSelectedTilloBrand)
    )
    paginatedBrandTilloBrands$ = this.store.pipe(select(Selectors.TilloBrandSelectors.selectPaginatedBrandTilloBrands))
    paginatedBrandTilloBrandsForSelectedMerchant$ = this.store.pipe(
        select(Selectors.TilloBrandSelectors.selectPaginatedBrandTilloBrandsForSelectedMerchant)
    )
    paginatedBrandTilloBrandsForSelectedBrand$ = this.store.pipe(
        select(Selectors.TilloBrandSelectors.selectPaginatedBrandTilloBrandsForSelectedBrand)
    )
    paginatedBrandTilloBrandsForSelectedTilloBrand$ = this.store.pipe(
        select(Selectors.TilloBrandSelectors.selectPaginatedBrandTilloBrandsForSelectedTilloBrand)
    )
    paginatedFilteredBrandTilloBrands$ = this.store.pipe(
        select(Selectors.TilloBrandSelectors.selectPaginatedFilteredBrandTilloBrands)
    )
    paginatedFilteredBrandTilloBrandsForSelectedMerchant$ = this.store.pipe(
        select(Selectors.TilloBrandSelectors.selectPaginatedFilteredBrandTilloBrandsForSelectedMerchant)
    )
    paginatedFilteredBrandTilloBrandsForSelectedBrand$ = this.store.pipe(
        select(Selectors.TilloBrandSelectors.selectPaginatedFilteredBrandTilloBrandsForSelectedBrand)
    )
    paginatedFilteredBrandTilloBrandsForSelectedTilloBrand$ = this.store.pipe(
        select(Selectors.TilloBrandSelectors.selectPaginatedFilteredBrandTilloBrandsForSelectedTilloBrand)
    )

    tilloBrandsForSelectedBrand$ = this.store.pipe(
        select(Selectors.TilloBrandSelectors.selectTilloBrandsForSelectedBrand)
    )
    tilloBrandsForSelectedMerchant$ = this.store.pipe(
        select(Selectors.TilloBrandSelectors.selectTilloBrandsForSelectedMerchant)
    )
    filteredTilloBrandsForSelectedBrand$ = this.store.pipe(
        select(Selectors.TilloBrandSelectors.selectFilteredTilloBrandsForSelectedBrand)
    )
    filteredTilloBrandsForSelectedMerchant$ = this.store.pipe(
        select(Selectors.TilloBrandSelectors.selectFilteredTilloBrandsForSelectedMerchant)
    )
    paginatedTilloBrandsForSelectedBrand$ = this.store.pipe(
        select(Selectors.TilloBrandSelectors.selectPaginatedTilloBrandsForSelectedBrand)
    )
    paginatedTilloBrandsForSelectedMerchant$ = this.store.pipe(
        select(Selectors.TilloBrandSelectors.selectPaginatedTilloBrandsForSelectedMerchant)
    )
    paginatedFilteredTilloBrandsForSelectedBrand$ = this.store.pipe(
        select(Selectors.TilloBrandSelectors.selectPaginatedFilteredTilloBrandsForSelectedBrand)
    )
    paginatedFilteredTilloBrandsForSelectedMerchant$ = this.store.pipe(
        select(Selectors.TilloBrandSelectors.selectPaginatedFilteredTilloBrandsForSelectedMerchant)
    )

    brandTilloBrandById$ = (id: string) =>
        this.store.pipe(select(Selectors.TilloBrandSelectors.selectBrandTilloBrandById(id)))
    brandTilloBrandsForBrand$ = (brandId: string) =>
        this.store.pipe(select(Selectors.TilloBrandSelectors.selectBrandTilloBrandsForBrand(brandId)))
    brandTilloBrandsForMerchant$ = (merchantId: string) =>
        this.store.pipe(select(Selectors.TilloBrandSelectors.selectBrandTilloBrandsForMerchant(merchantId)))
    brandTilloBrandsForTilloBrand$ = (tilloBrandId: string) =>
        this.store.pipe(select(Selectors.TilloBrandSelectors.selectBrandTilloBrandsForTilloBrand(tilloBrandId)))
    filteredBrandTilloBrandsForBrand$ = (brandId: string) =>
        this.store.pipe(select(Selectors.TilloBrandSelectors.selectFilteredBrandTilloBrandsForBrand(brandId)))
    filteredBrandTilloBrandsForMerchant$ = (merchantId: string) =>
        this.store.pipe(select(Selectors.TilloBrandSelectors.selectFilteredBrandTilloBrandsForMerchant(merchantId)))
    filteredBrandTilloBrandsForTilloBrand$ = (tilloBrandId: string) =>
        this.store.pipe(select(Selectors.TilloBrandSelectors.selectFilteredBrandTilloBrandsForTilloBrand(tilloBrandId)))
    paginatedBrandTilloBrandsForBrand$ = (brandId: string) =>
        this.store.pipe(select(Selectors.TilloBrandSelectors.selectPaginatedBrandTilloBrandsForBrand(brandId)))
    paginatedBrandTilloBrandsForMerchant$ = (merchantId: string) =>
        this.store.pipe(select(Selectors.TilloBrandSelectors.selectPaginatedBrandTilloBrandsForMerchant(merchantId)))
    paginatedBrandTilloBrandsForTilloBrand$ = (tilloBrandId: string) =>
        this.store.pipe(
            select(Selectors.TilloBrandSelectors.selectPaginatedBrandTilloBrandsForTilloBrand(tilloBrandId))
        )
    paginatedFilteredBrandTilloBrandsForBrand$ = (brandId: string) =>
        this.store.pipe(select(Selectors.TilloBrandSelectors.selectPaginatedFilteredBrandTilloBrandsForBrand(brandId)))
    paginatedFilteredBrandTilloBrandsForMerchant$ = (merchantId: string) =>
        this.store.pipe(
            select(Selectors.TilloBrandSelectors.selectPaginatedFilteredBrandTilloBrandsForMerchant(merchantId))
        )
    paginatedFilteredBrandTilloBrandsForTilloBrand$ = (tilloBrandId: string) =>
        this.store.pipe(
            select(Selectors.TilloBrandSelectors.selectPaginatedFilteredBrandTilloBrandsForTilloBrand(tilloBrandId))
        )

    tilloBrandsForBrand$ = (brandId: string) =>
        this.store.pipe(select(Selectors.TilloBrandSelectors.selectTilloBrandsForBrand(brandId)))
    tilloBrandsForMerchant$ = (merchantId: string) =>
        this.store.pipe(select(Selectors.TilloBrandSelectors.selectTilloBrandsForMerchant(merchantId)))
    filteredTilloBrandsForBrand$ = (brandId: string) =>
        this.store.pipe(select(Selectors.TilloBrandSelectors.selectFilteredTilloBrandsForBrand(brandId)))
    filteredTilloBrandsForMerchant$ = (merchantId: string) =>
        this.store.pipe(select(Selectors.TilloBrandSelectors.selectFilteredTilloBrandsForMerchant(merchantId)))
    paginatedTilloBrandsForBrand$ = (brandId: string) =>
        this.store.pipe(select(Selectors.TilloBrandSelectors.selectPaginatedTilloBrandsForBrand(brandId)))
    paginatedTilloBrandsForMerchant$ = (merchantId: string) =>
        this.store.pipe(select(Selectors.TilloBrandSelectors.selectPaginatedTilloBrandsForMerchant(merchantId)))
    paginatedFilteredTilloBrandsForBrand$ = (brandId: string) =>
        this.store.pipe(select(Selectors.TilloBrandSelectors.selectPaginatedFilteredTilloBrandsForBrand(brandId)))
    paginatedFilteredTilloBrandsForMerchant$ = (merchantId: string) =>
        this.store.pipe(select(Selectors.TilloBrandSelectors.selectPaginatedFilteredTilloBrandsForMerchant(merchantId)))

    onboardTilloBrand(
        tilloBrandId: string,
        parent: { brandId: Nullable<string>; merchantId: Nullable<string> }
    ) {
        this.store.dispatch(
            BrandTilloBrandRemoteActions.onboardTilloBrand.request({ tilloBrandId, parent })
        )
    }

    getBrandTilloBrand(brandTilloBrandId: string) {
        this.store.dispatch(BrandTilloBrandRemoteActions.getBrandTilloBrand.request({ brandTilloBrandId }))
    }

    listBrandTilloBrands(
        parent: { brandId: Nullable<string>; merchantId: Nullable<string>; tilloBrandId: Nullable<string> },
        pagination: Nullable<Partial<PaginatedQueryParams<Model.BrandTilloBrandResponse>>>
    ) {
        this.store.dispatch(
            BrandTilloBrandRemoteActions.listBrandTilloBrands.request({ parent, pagination })
        )
    }

    deleteBrandTilloBrand(brandTilloBrandId: string, force: boolean = true) {
        this.store.dispatch(BrandTilloBrandRemoteActions.deleteBrandTilloBrand.request({ brandTilloBrandId, force }))
    }

    listTilloBrands(
        parent: { brandId: Nullable<string>; brandTilloBrandId: Nullable<string>; merchantId: Nullable<string> },
        pagination: Nullable<Partial<PaginatedQueryParams<RewardsNetworkTillo.Model.BrandResponse>>>
    ) {
        this.store.dispatch(BrandTilloBrandRemoteActions.listTilloBrands.request({ parent, pagination }))
    }

    selectBrandTilloBrand(brandTilloBrandId: string) {
        this.store.dispatch(BrandTilloBrandLocalActions.selectBrandTilloBrand({ brandTilloBrandId }))
    }

    deselectBrandTilloBrand() {
        this.store.dispatch(BrandTilloBrandLocalActions.deselectBrandTilloBrand())
    }

    updateBrandTilloBrandFilters(
        filters: Partial<Model.Filters.BrandTilloBrandFilters>,
        triggerRemoteFetch: boolean = true
    ) {
        this.store.dispatch(
            BrandTilloBrandLocalActions.updateBrandTilloBrandFilters({
                filters,
                triggerRemoteFetch
            })
        )
    }

    resetBrandTilloBrandFilters(triggerRemoteFetch: boolean = true) {
        this.store.dispatch(BrandTilloBrandLocalActions.resetBrandTilloBrandFilters({ triggerRemoteFetch }))
    }

    resetBrandTilloBrandPagination() {
        this.store.dispatch(BrandTilloBrandLocalActions.resetPagination())
    }
}
