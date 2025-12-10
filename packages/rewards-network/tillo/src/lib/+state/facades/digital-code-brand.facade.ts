import { Injectable, inject } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { Selectors } from '../selectors';
import { Model } from '../../model';

@Injectable()
@ZWPDebuggableInjectable({serviceName: 'TilloDigitalCodeBrandFacade', options: { skipMethodDebugger: true } })
export class TilloDigitalCodeBrandFacade {
    private store = inject(Store)

    digitalCodeBrandFilters$ = this.store.pipe(select(Selectors.DigitalCodeBrandSelectors.selectDigitalCodeBrandFilters))
    digitalCodeBrandRemotePagination$ = this.store.pipe(select(Selectors.DigitalCodeBrandSelectors.selectDigitalCodeBrandRemotePagination))
    digitalCodeBrandRemoteState$ = this.store.pipe(select(Selectors.DigitalCodeBrandSelectors.selectDigitalCodeBrandRemoteState))

    digitalCodeBrands$ = this.store.pipe(select(Selectors.DigitalCodeBrandSelectors.selectAllDigitalCodeBrands))
    selectedDigitalCodeBrands$ = this.store.pipe(select(Selectors.DigitalCodeBrandSelectors.selectedDigitalCodeBrand))
    selectedDigitalCodeId$ = this.store.pipe(select(Selectors.DigitalCodeBrandSelectors.selectSelectedDigitalCodeBrandId))

    digitalCodeBrandById$ = (id: string) => this.store.pipe(select(Selectors.DigitalCodeBrandSelectors.selectDigitalCodeBrandById(id)))

    
    
    // selectDigitalCode(digitalCodeId: string) {
    //     return this.store.dispatch(DigitalCodeBrandLocalActions.selectDigitalCodeBrand({digitalCodeId}))
    // }

    // deselectDigitalCode() {
    //     return this.store.dispatch(DigitalCodeBrandLocalActions.deselectDigitalCodeBrand())
    // }

    
    // updateDigitalCodeBrandFilters(filters: Partial<Model.Filters.DigitalCodeFilters>, triggerRemoteFetch: boolean = true) {
    //     return this.store.dispatch(DigitalCodeBrandLocalActions.updateDigitalCodeBrandFilters({filters, triggerRemoteFetch}))
    // }
    
    // resetDigitalCodeBrandFilters(triggerRemoteFetch: boolean = true) {
    //     return this.store.dispatch(DigitalCodeBrandLocalActions.resetDigitalCodeBrandFilters({ triggerRemoteFetch }))
    // }
    
    // resetPagination() {
    //     return this.store.dispatch(DigitalCodeBrandLocalActions.resetPagination())
    // }


}