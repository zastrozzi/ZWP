import { inject, Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { EnumFilterLocalActions, EnumFilterRemoteActions } from '../actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'EnumFilterFacade', options: { skipMethodDebugger: true } })
export class EnumFilterFacade {
    private store = inject(Store)

    // Observables for local filters & remote state
    enumFilterFilters$ = this.store.pipe(select(Selectors.EnumFilterSelectors.selectEnumFilterFilters))
    enumFilterRemotePagination$ = this.store.pipe(
        select(Selectors.EnumFilterSelectors.selectEnumFilterRemotePagination)
    )
    enumFilterRemoteState$ = this.store.pipe(select(Selectors.EnumFilterSelectors.selectEnumFilterRemoteState))

    // Collections & selection
    enumFilters$ = this.store.pipe(select(Selectors.EnumFilterSelectors.selectAllEnumFilters))
    selectedEnumFilter$ = this.store.pipe(select(Selectors.EnumFilterSelectors.selectedEnumFilter))
    selectedEnumFilterId$ = this.store.pipe(select(Selectors.EnumFilterSelectors.selectSelectedEnumFilterId))

    // Observables for parent relationships:
    enumFiltersForSelectedStructuredQuery$ = this.store.pipe(
        select(Selectors.EnumFilterSelectors.selectEnumFiltersForSelectedStructuredQuery)
    )

    enumFiltersForSelectedFilterGroup$ = this.store.pipe(
        select(Selectors.EnumFilterSelectors.selectEnumFiltersForSelectedFilterGroup)
    )

    enumFilterById$ = (id: string) => this.store.pipe(select(Selectors.EnumFilterSelectors.selectEnumFilterById(id)))

    // Remote actions
    createEnumFilter(parentId: string, parentType: 'query' | 'parentGroup', request: Model.CreateEnumFilterRequest) {
        return this.store.dispatch(EnumFilterRemoteActions.create.request({ parentId, parentType, request }))
    }

    getEnumFilter(enumFilterId: string) {
        return this.store.dispatch(EnumFilterRemoteActions.get.request({ enumFilterId }))
    }

    listEnumFilters(
        parentId: Nullable<string> | 'auto' = null,
        parentType: 'query' | 'parentGroup' | 'none' = 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.EnumFilterResponse>>> = null
    ) {
        return this.store.dispatch(
            EnumFilterRemoteActions.list.request({
                parentId,
                parentType,
                pagination,
            })
        )
    }

    updateEnumFilter(enumFilterId: string, update: Model.UpdateEnumFilterRequest) {
        return this.store.dispatch(EnumFilterRemoteActions.update.request({ enumFilterId, update }))
    }

    deleteEnumFilter(enumFilterId: string) {
        return this.store.dispatch(EnumFilterRemoteActions.delete.request({ enumFilterId }))
    }

    // Local actions
    selectEnumFilter(enumFilterId: string) {
        return this.store.dispatch(EnumFilterLocalActions.selectEnumFilter({ enumFilterId }))
    }

    deselectEnumFilter() {
        return this.store.dispatch(EnumFilterLocalActions.deselectEnumFilter())
    }

    updateEnumFilterFilters(filters: Partial<Model.EnumFilterFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(EnumFilterLocalActions.updateEnumFilterFilters({ filters, triggerRemoteFetch }))
    }

    resetEnumFilterFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(EnumFilterLocalActions.resetEnumFilterFilters({ triggerRemoteFetch }))
    }

    resetPagination() {
        return this.store.dispatch(EnumFilterLocalActions.resetPagination())
    }
}
