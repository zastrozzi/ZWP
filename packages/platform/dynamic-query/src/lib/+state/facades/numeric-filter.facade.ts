import { inject, Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { NumericFilterLocalActions, NumericFilterRemoteActions } from '../actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'NumericFilterFacade', options: { skipMethodDebugger: true } })
export class NumericFilterFacade {
    private store = inject(Store)

    // Observables for local filters & remote state
    numericFilterFilters$ = this.store.pipe(select(Selectors.NumericFilterSelectors.selectNumericFilterFilters))
    numericFilterRemotePagination$ = this.store.pipe(
        select(Selectors.NumericFilterSelectors.selectNumericFilterRemotePagination)
    )
    numericFilterRemoteState$ = this.store.pipe(select(Selectors.NumericFilterSelectors.selectNumericFilterRemoteState))

    // Collections & selection
    numericFilters$ = this.store.pipe(select(Selectors.NumericFilterSelectors.selectAllNumericFilters))
    selectedNumericFilter$ = this.store.pipe(select(Selectors.NumericFilterSelectors.selectedNumericFilter))
    selectedNumericFilterId$ = this.store.pipe(select(Selectors.NumericFilterSelectors.selectSelectedNumericFilterId))

    // Observables for parent relationships:
    numericFiltersForSelectedStructuredQuery$ = this.store.pipe(
        select(Selectors.NumericFilterSelectors.selectNumericFiltersForSelectedStructuredQuery)
    )

    numericFiltersForSelectedFilterGroup$ = this.store.pipe(
        select(Selectors.NumericFilterSelectors.selectNumericFiltersForSelectedFilterGroup)
    )

    numericFilterById$ = (id: string) =>
        this.store.pipe(select(Selectors.NumericFilterSelectors.selectNumericFilterById(id)))

    // Remote actions
    createNumericFilter(
        parentId: string,
        parentType: 'query' | 'parentGroup',
        request: Model.CreateNumericFilterRequest
    ) {
        return this.store.dispatch(NumericFilterRemoteActions.create.request({ parentId, parentType, request }))
    }

    getNumericFilter(numericFilterId: string) {
        return this.store.dispatch(NumericFilterRemoteActions.get.request({ numericFilterId }))
    }

    listNumericFilters(
        parentId: Nullable<string> | 'auto' = null,
        parentType: 'query' | 'parentGroup' | 'none' = 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.NumericFilterResponse>>> = null
    ) {
        return this.store.dispatch(
            NumericFilterRemoteActions.list.request({
                parentId,
                parentType,
                pagination,
            })
        )
    }

    updateNumericFilter(numericFilterId: string, update: Model.UpdateNumericFilterRequest) {
        return this.store.dispatch(NumericFilterRemoteActions.update.request({ numericFilterId, update }))
    }

    deleteNumericFilter(numericFilterId: string) {
        return this.store.dispatch(NumericFilterRemoteActions.delete.request({ numericFilterId }))
    }

    // Local actions
    selectNumericFilter(numericFilterId: string) {
        return this.store.dispatch(NumericFilterLocalActions.selectNumericFilter({ numericFilterId }))
    }

    deselectNumericFilter() {
        return this.store.dispatch(NumericFilterLocalActions.deselectNumericFilter())
    }

    updateNumericFilterFilters(filters: Partial<Model.NumericFilterFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(
            NumericFilterLocalActions.updateNumericFilterFilters({ filters, triggerRemoteFetch })
        )
    }

    resetNumericFilterFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(NumericFilterLocalActions.resetNumericFilterFilters({ triggerRemoteFetch }))
    }

    resetPagination() {
        return this.store.dispatch(NumericFilterLocalActions.resetPagination())
    }
}
