import { inject, Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from "@zwp/platform.common";
import { BrandLocalActions, BrandRemoteActions } from '../actions';
import { Selectors } from '../selectors';
import { Model } from '../../model';

@Injectable()
@ZWPDebuggableInjectable({serviceName: 'TilloBrandFacade', options: { skipMethodDebugger: true } })
export class TilloBrandFacade {
    private store = inject(Store)

    brandFilters$ = this.store.pipe(select(Selectors.BrandSelectors.selectBrandFilters))
    brandRemotePagination$ = this.store.pipe(select(Selectors.BrandSelectors.selectBrandRemotePagination))
    brandRemoteState$ = this.store.pipe(select(Selectors.BrandSelectors.selectBrandRemoteState))

    brands$ = this.store.pipe(select(Selectors.BrandSelectors.selectAllBrands))

    paginatedFilteredBrands$ = this.store.pipe(select(Selectors.BrandSelectors.selectPaginatedFilteredBrands))
    
    selectedBrand$ = this.store.pipe(select(Selectors.BrandSelectors.selectedBrand))
    selectedBrandId$ = this.store.pipe(select(Selectors.BrandSelectors.selectSelectedBrandId))

    brandById$ = (id: string) => this.store.pipe(select(Selectors.BrandSelectors.selectBrandById(id)))

    getBrand(brandId: string) {
        return this.store.dispatch(BrandRemoteActions.getBrand.request({ brandId }))
    }

    listBrands(pagination: Nullable<Partial<PaginatedQueryParams<Model.BrandResponse>>> = null) {
        return this.store.dispatch(BrandRemoteActions.listBrands.request({ pagination }))
    }

    selectBrand(brandId: string) {
        return this.store.dispatch(BrandLocalActions.selectBrand({ brandId }))
    }

    deselectBrand() {
        return this.store.dispatch(BrandLocalActions.deselectBrand())
    }

    deleteBrand(brandId: string) {
        return this.store.dispatch(BrandRemoteActions.deleteBrand.request({ brandId }))
    }

    updateBrandFilters(filters: Partial<Model.Filters.BrandFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(BrandLocalActions.updateBrandFilters({ filters, triggerRemoteFetch }))
    }

    resetBrandFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(BrandLocalActions.resetBrandFilters({ triggerRemoteFetch }))
    }

    resetPagination() {
        return this.store.dispatch(BrandLocalActions.resetPagination())
    }
}
