import { inject, Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { StructuredQueryLocalActions, StructuredQueryRemoteActions } from '../actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'StructuredQueryFacade', options: { skipMethodDebugger: true } })
export class StructuredQueryFacade {
    private store = inject(Store)
    
    structuredQueryFilters$ = this.store.pipe(select(Selectors.StructuredQuerySelectors.selectStructuredQueryFilters))
    structuredQueryRemotePagination$ = this.store.pipe(select(Selectors.StructuredQuerySelectors.selectStructuredQueryRemotePagination))
    structuredQueryRemoteState$ = this.store.pipe(select(Selectors.StructuredQuerySelectors.selectStructuredQueryRemoteState))

    structuredQueries$ = this.store.pipe(select(Selectors.StructuredQuerySelectors.selectAllStructuredQueries))
    selectedStructuredQuery$ = this.store.pipe(select(Selectors.StructuredQuerySelectors.selectedStructuredQuery))
    selectedStructuredQueryId$ = this.store.pipe(select(Selectors.StructuredQuerySelectors.selectSelectedStructuredQueryId))

    structuredQueryById$ = (id: string) => this.store.pipe(select(Selectors.StructuredQuerySelectors.selectStructuredQueryById(id)))
    
    createStructuredQuery(request: Model.CreateStructuredQueryRequest) {
        return this.store.dispatch(StructuredQueryRemoteActions.create.request({request}))
    }

    getStructuredQuery(structuredQueryId: string) {
        return this.store.dispatch(StructuredQueryRemoteActions.get.request({ structuredQueryId }))
    }

    listStructuredQueries(pagination: Nullable<Partial<PaginatedQueryParams<Model.StructuredQueryResponse>>> = null) {
        return this.store.dispatch(StructuredQueryRemoteActions.list.request({ pagination: pagination }))
    }

    selectStructuredQuery(structuredQueryId: string) {
        return this.store.dispatch(StructuredQueryLocalActions.selectStructuredQuery({ structuredQueryId }))
    }

    deselectStructuredQuery() {
        return this.store.dispatch(StructuredQueryLocalActions.deselectStructuredQuery())
    }

    updateStructuredQuery(structuredQueryId: string, update: Model.UpdateStructuredQueryRequest) {
        return this.store.dispatch(StructuredQueryRemoteActions.update.request({ structuredQueryId, update }))
    }

    deleteStructuredQuery(structuredQueryId: string) {
        return this.store.dispatch(StructuredQueryRemoteActions.delete.request({ structuredQueryId }))
    }

    updateStructuredQueryFilters(filters: Partial<Model.StructuredQueryFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(StructuredQueryLocalActions.updateStructuredQueryFilters({ filters, triggerRemoteFetch }))
    }

    resetStructuredQueryFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(StructuredQueryLocalActions.resetStructuredQueryFilters({ triggerRemoteFetch }))
    }

    resetPagination() {
        return this.store.dispatch(StructuredQueryLocalActions.resetPagination())
    }
}