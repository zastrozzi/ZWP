import { inject, Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from "@zwp/platform.common";
import { BrandLocalActions, BrandRemoteActions } from '../actions';
import { Selectors } from '../selectors'
import { Model } from "../../model";

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'BrandFacade', options: { skipMethodDebugger: true } })
export class BrandFacade {
    private store = inject(Store)
    
    brandFilters$ = this.store.pipe(select(Selectors.BrandSelectors.selectBrandFilters))
    brandRemotePagination$ = this.store.pipe(select(Selectors.BrandSelectors.selectBrandRemotePagination))
    brandRemoteState$ = this.store.pipe(select(Selectors.BrandSelectors.selectBrandRemoteState))

    brands$ = this.store.pipe(select(Selectors.BrandSelectors.selectAllBrands))
    paginatedFilteredBrands$ = this.store.pipe(select(Selectors.BrandSelectors.selectPaginatedFilteredBrands))
    selectedBrand$ = this.store.pipe(select(Selectors.BrandSelectors.selectedBrand))
    selectedBrandId$ = this.store.pipe(select(Selectors.BrandSelectors.selectSelectedBrandId))
    brandsForSelectedMerchant$ = this.store.pipe(select(Selectors.BrandSelectors.selectBrandsForSelectedMerchant))
    paginatedFilteredBrandsForSelectedMerchant$ = this.store.pipe(select(Selectors.BrandSelectors.selectPaginatedFilteredBrandsForSelectedMerchant))
    brandsForMerchant$ = (id: string) => this.store.pipe(select(Selectors.BrandSelectors.selectBrandsForMerchant(id)))
    paginatedFilteredBrandsForMerchant$ = (id: string) => this.store.pipe(select(Selectors.BrandSelectors.selectPaginatedFilteredBrandsForMerchant(id)))

    brandById$ = (id: string) => this.store.pipe(select(Selectors.BrandSelectors.selectBrandById(id)))
    
    createBrand(merchantId: string, request: Model.CreateBrandRequest) {
        return this.store.dispatch(BrandRemoteActions.create.request({merchantId, request}))
    }

    getBrand(brandId: string) {
        return this.store.dispatch(BrandRemoteActions.get.request({ brandId }))
    }

    listBrands(merchantId: Nullable<string> | 'auto' = null, pagination: Nullable<Partial<PaginatedQueryParams<Model.BrandResponse>>> = null) {
        return this.store.dispatch(BrandRemoteActions.list.request({ merchantId, pagination }))
    }

    selectBrand(brandId: string) {
        return this.store.dispatch(BrandLocalActions.selectBrand({ brandId }))
    }

    deselectBrand() {
        return this.store.dispatch(BrandLocalActions.deselectBrand())
    }

    updateBrand(brandId: string, update: Model.UpdateBrandRequest) {
        return this.store.dispatch(BrandRemoteActions.update.request({ brandId, update }))
    }

    deleteBrand(brandId: string) {
        return this.store.dispatch(BrandRemoteActions.delete.request({ brandId }))
    }

    updateBrandFilters(filters: Partial<Model.Filters.BrandFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(BrandLocalActions.updateBrandFilters({ filters, triggerRemoteFetch }))
    }

    updateBrandFiltersForPaginatedListComponent(
            filters: Partial<Model.Filters.BrandFilters>,
            context: Model.BrandPaginatedListComponentContext,
            triggerRemoteFetch: boolean = true
        ) {
            return this.store.dispatch(
                BrandLocalActions.updateBrandFiltersForPaginatedListComponent({
                    filters,
                    context,
                    triggerRemoteFetch,
                })
            )
        }

    resetBrandFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(BrandLocalActions.resetBrandFilters({triggerRemoteFetch}))
    }

    resetBrandFiltersForPaginatedListComponent(
            context: Model.BrandPaginatedListComponentContext,
            triggerRemoteFetch: boolean = true
        ) {
            return this.store.dispatch(
                BrandLocalActions.resetBrandFiltersForPaginatedListComponent({
                    context,
                    triggerRemoteFetch,
                })
            )
        }

    resetPagination() {
        return this.store.dispatch(BrandLocalActions.resetPagination())
    }
}