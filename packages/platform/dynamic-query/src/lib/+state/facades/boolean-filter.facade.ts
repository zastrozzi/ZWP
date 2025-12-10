import { inject, Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { BooleanFilterLocalActions, BooleanFilterRemoteActions } from '../actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'BooleanFilterFacade', options: { skipMethodDebugger: true } })
export class BooleanFilterFacade {
    private store = inject(Store)

    // Observables for local filters & remote state
    booleanFilterFilters$ = this.store.pipe(select(Selectors.BooleanFilterSelectors.selectBooleanFilterFilters))
    booleanFilterRemotePagination$ = this.store.pipe(
        select(Selectors.BooleanFilterSelectors.selectBooleanFilterRemotePagination)
    )
    booleanFilterRemoteState$ = this.store.pipe(select(Selectors.BooleanFilterSelectors.selectBooleanFilterRemoteState))

    // Collections & selection
    booleanFilters$ = this.store.pipe(select(Selectors.BooleanFilterSelectors.selectAllBooleanFilters))
    selectedBooleanFilter$ = this.store.pipe(select(Selectors.BooleanFilterSelectors.selectedBooleanFilter))
    selectedBooleanFilterId$ = this.store.pipe(select(Selectors.BooleanFilterSelectors.selectSelectedBooleanFilterId))

    // Observables for parent relationships:
    booleanFiltersForSelectedStructuredQuery$ = this.store.pipe(
        select(Selectors.BooleanFilterSelectors.selectBooleanFiltersForSelectedStructuredQuery)
    )

    booleanFiltersForSelectedFilterGroup$ = this.store.pipe(
        select(Selectors.BooleanFilterSelectors.selectBooleanFiltersForSelectedFilterGroup)
    )

    booleanFilterById$ = (id: string) =>
        this.store.pipe(select(Selectors.BooleanFilterSelectors.selectBooleanFilterById(id)))

    // Remote actions
    createBooleanFilter(
        parentId: string,
        parentType: 'query' | 'parentGroup',
        request: Model.CreateBooleanFilterRequest
    ) {
        return this.store.dispatch(BooleanFilterRemoteActions.create.request({ parentId, parentType, request }))
    }

    getBooleanFilter(booleanFilterId: string) {
        return this.store.dispatch(BooleanFilterRemoteActions.get.request({ booleanFilterId }))
    }

    listBooleanFilters(
        parentId: Nullable<string> | 'auto' = null,
        parentType: 'query' | 'parentGroup' | 'none' = 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.BooleanFilterResponse>>> = null
    ) {
        return this.store.dispatch(
            BooleanFilterRemoteActions.list.request({
                parentId,
                parentType,
                pagination,
            })
        )
    }

    updateBooleanFilter(booleanFilterId: string, update: Model.UpdateBooleanFilterRequest) {
        return this.store.dispatch(BooleanFilterRemoteActions.update.request({ booleanFilterId, update }))
    }

    deleteBooleanFilter(booleanFilterId: string) {
        return this.store.dispatch(BooleanFilterRemoteActions.delete.request({ booleanFilterId }))
    }

    // Local actions
    selectBooleanFilter(booleanFilterId: string) {
        return this.store.dispatch(BooleanFilterLocalActions.selectBooleanFilter({ booleanFilterId }))
    }

    deselectBooleanFilter() {
        return this.store.dispatch(BooleanFilterLocalActions.deselectBooleanFilter())
    }

    updateBooleanFilterFilters(filters: Partial<Model.BooleanFilterFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(
            BooleanFilterLocalActions.updateBooleanFilterFilters({ filters, triggerRemoteFetch })
        )
    }

    resetBooleanFilterFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(BooleanFilterLocalActions.resetBooleanFilterFilters({ triggerRemoteFetch }))
    }

    resetPagination() {
        return this.store.dispatch(BooleanFilterLocalActions.resetPagination())
    }
}
