import { Injectable, inject } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { FloatLocalActions, FloatRemoteActions } from '../actions';
import { Selectors } from '../selectors';
import { Model } from '../../model';

@Injectable()
@ZWPDebuggableInjectable({serviceName: 'TilloFloatFacade', options: { skipMethodDebugger: true }})
export class TilloFloatFacade {
    private store = inject(Store);

    floatFilters$ = this.store.pipe(select(Selectors.FloatSelectors.selectFloatFilters))
    floatRemotePagination$ = this.store.pipe(select(Selectors.FloatSelectors.selectFloatRemotePagination))
    floatRemoteState$ = this.store.pipe(select(Selectors.FloatSelectors.selectFloatRemoteState))

    floats$ = this.store.pipe(select(Selectors.FloatSelectors.selectAllFloats))

    paginatedFilteredFloats$ = this.store.pipe(select(Selectors.FloatSelectors.selectPaginatedFilteredFloats))

    selectedFloat$ = this.store.pipe(select(Selectors.FloatSelectors.selectedFloat))
    selectedFloatId$ = this.store.pipe(select(Selectors.FloatSelectors.selectSelectedFloatId))
    floatForSelectedBrand$ = this.store.pipe(select(Selectors.FloatSelectors.selectFloatsForSelectedBrand))

    floatById$ = (id: string) => this.store.pipe(select(Selectors.FloatSelectors.selectFloatById(id)))

    getFloat(floatId: string) {
        return this.store.dispatch(FloatRemoteActions.getFloat.request({floatId}))
    }

    listFloats( pagination: Nullable<Partial<PaginatedQueryParams<Model.FloatResponse>>> = null) {
        return this.store.dispatch(FloatRemoteActions.listFloats.request({ pagination }))
    }

    selectFloat(floatId: string) {
        return this.store.dispatch(FloatLocalActions.selectFloat({floatId}))
    }

    deselectFloat() {
        return this.store.dispatch(FloatLocalActions.deselectFloat())
    }

    deleteFloat(floatId: string) {
        return this.store.dispatch(FloatRemoteActions.deleteFloat.request({floatId}))
    }

    updateFloatFilters(filters: Partial<Model.Filters.FloatFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(FloatLocalActions.updateFloatFilters({filters, triggerRemoteFetch}))
    }

    resetFloatFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(FloatLocalActions.resetFloatFilters({triggerRemoteFetch}))
    }

    resetPagination() {
        return this.store.dispatch(FloatLocalActions.resetPagination())
    }
}