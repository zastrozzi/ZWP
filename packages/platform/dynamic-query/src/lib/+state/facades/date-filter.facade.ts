import { inject, Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { DateFilterLocalActions, DateFilterRemoteActions } from '../actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'DateFilterFacade', options: { skipMethodDebugger: true } })
export class DateFilterFacade {
    private store = inject(Store)

    // Observables for local filters & remote state
    dateFilterFilters$ = this.store.pipe(select(Selectors.DateFilterSelectors.selectDateFilterFilters))
    dateFilterRemotePagination$ = this.store.pipe(
        select(Selectors.DateFilterSelectors.selectDateFilterRemotePagination)
    )
    dateFilterRemoteState$ = this.store.pipe(select(Selectors.DateFilterSelectors.selectDateFilterRemoteState))

    // Collections & selection
    dateFilters$ = this.store.pipe(select(Selectors.DateFilterSelectors.selectAllDateFilters))
    selectedDateFilter$ = this.store.pipe(select(Selectors.DateFilterSelectors.selectedDateFilter))
    selectedDateFilterId$ = this.store.pipe(select(Selectors.DateFilterSelectors.selectSelectedDateFilterId))

    // Observables for parent relationships:
    dateFiltersForSelectedStructuredQuery$ = this.store.pipe(
        select(Selectors.DateFilterSelectors.selectDateFiltersForSelectedStructuredQuery)
    )

    dateFiltersForSelectedFilterGroup$ = this.store.pipe(
        select(Selectors.DateFilterSelectors.selectDateFiltersForSelectedFilterGroup)
    )

    dateFilterById$ = (id: string) => this.store.pipe(select(Selectors.DateFilterSelectors.selectDateFilterById(id)))

    // Remote actions
    createDateFilter(parentId: string, parentType: 'query' | 'parentGroup', request: Model.CreateDateFilterRequest) {
        return this.store.dispatch(DateFilterRemoteActions.create.request({ parentId, parentType, request }))
    }

    getDateFilter(dateFilterId: string) {
        return this.store.dispatch(DateFilterRemoteActions.get.request({ dateFilterId }))
    }

    listDateFilters(
        parentId: Nullable<string> | 'auto' = null,
        parentType: 'query' | 'parentGroup' | 'none' = 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.DateFilterResponse>>> = null
    ) {
        return this.store.dispatch(
            DateFilterRemoteActions.list.request({
                parentId,
                parentType,
                pagination,
            })
        )
    }

    updateDateFilter(dateFilterId: string, update: Model.UpdateDateFilterRequest) {
        return this.store.dispatch(DateFilterRemoteActions.update.request({ dateFilterId, update }))
    }

    deleteDateFilter(dateFilterId: string) {
        return this.store.dispatch(DateFilterRemoteActions.delete.request({ dateFilterId }))
    }

    // Local actions
    selectDateFilter(dateFilterId: string) {
        return this.store.dispatch(DateFilterLocalActions.selectDateFilter({ dateFilterId }))
    }

    deselectDateFilter() {
        return this.store.dispatch(DateFilterLocalActions.deselectDateFilter())
    }

    updateDateFilterFilters(filters: Partial<Model.DateFilterFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(DateFilterLocalActions.updateDateFilterFilters({ filters, triggerRemoteFetch }))
    }

    resetDateFilterFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(DateFilterLocalActions.resetDateFilterFilters({ triggerRemoteFetch }))
    }

    resetPagination() {
        return this.store.dispatch(DateFilterLocalActions.resetPagination())
    }
}
