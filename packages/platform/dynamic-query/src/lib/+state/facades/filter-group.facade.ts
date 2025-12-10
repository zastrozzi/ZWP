import { inject, Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { FilterGroupLocalActions, FilterGroupRemoteActions } from '../actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'FilterGroupFacade', options: { skipMethodDebugger: true } })
export class FilterGroupFacade {
    private store = inject(Store)

    // Observables for local filters & remote state
    filterGroupFilters$ = this.store.pipe(select(Selectors.FilterGroupSelectors.selectFilterGroupFilters))
    filterGroupRemotePagination$ = this.store.pipe(
        select(Selectors.FilterGroupSelectors.selectFilterGroupRemotePagination)
    )
    filterGroupRemoteState$ = this.store.pipe(select(Selectors.FilterGroupSelectors.selectFilterGroupRemoteState))

    // Collections & selection
    filterGroups$ = this.store.pipe(select(Selectors.FilterGroupSelectors.selectAllFilterGroups))
    selectedFilterGroup$ = this.store.pipe(select(Selectors.FilterGroupSelectors.selectedFilterGroup))
    selectedFilterGroupId$ = this.store.pipe(select(Selectors.FilterGroupSelectors.selectSelectedFilterGroupId))

    // Observables for parent relationships:
    filterGroupsForSelectedStructuredQuery$ = this.store.pipe(
        select(Selectors.FilterGroupSelectors.selectFilterGroupsForSelectedStructuredQuery)
    )

    filterGroupsForSelectedParentGroup$ = this.store.pipe(
        select(Selectors.FilterGroupSelectors.selectFilterGroupsForSelectedParentGroup)
    )

    filterGroupById$ = (id: string) => this.store.pipe(select(Selectors.FilterGroupSelectors.selectFilterGroupById(id)))

    // Remote actions
    createFilterGroup(parentId: string, parentType: 'query' | 'parentGroup', request: Model.CreateFilterGroupRequest) {
        return this.store.dispatch(FilterGroupRemoteActions.create.request({ parentId, parentType, request }))
    }

    getFilterGroup(filterGroupId: string) {
        return this.store.dispatch(FilterGroupRemoteActions.get.request({ filterGroupId }))
    }

    listFilterGroups(
        parentId: Nullable<string> | 'auto' = null,
        parentType: 'query' | 'parentGroup' | 'none' = 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.FilterGroupResponse>>> = null
    ) {
        return this.store.dispatch(
            FilterGroupRemoteActions.list.request({
                parentId,
                parentType,
                pagination,
            })
        )
    }

    updateFilterGroup(filterGroupId: string, update: Model.UpdateFilterGroupRequest) {
        return this.store.dispatch(FilterGroupRemoteActions.update.request({ filterGroupId, update }))
    }

    deleteFilterGroup(filterGroupId: string) {
        return this.store.dispatch(FilterGroupRemoteActions.delete.request({ filterGroupId }))
    }

    // Local actions
    selectFilterGroup(filterGroupId: string) {
        return this.store.dispatch(FilterGroupLocalActions.selectFilterGroup({ filterGroupId }))
    }

    deselectFilterGroup() {
        return this.store.dispatch(FilterGroupLocalActions.deselectFilterGroup())
    }

    updateFilterGroupFilters(filters: Partial<Model.FilterGroupFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(FilterGroupLocalActions.updateFilterGroupFilters({ filters, triggerRemoteFetch }))
    }

    resetFilterGroupFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(FilterGroupLocalActions.resetFilterGroupFilters({ triggerRemoteFetch }))
    }

    resetPagination() {
        return this.store.dispatch(FilterGroupLocalActions.resetPagination())
    }
}
