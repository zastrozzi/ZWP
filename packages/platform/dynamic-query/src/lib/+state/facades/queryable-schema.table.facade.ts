import { inject, Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from "@zwp/platform.common";
import { QueryableSchemaTableLocalActions, QueryableSchemaTableRemoteActions } from '../actions';
import { Selectors } from '../selectors'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'QueryableSchemaTableFacade', options: { skipMethodDebugger: true } })
export class QueryableSchemaTableFacade {
    private store = inject(Store)

    tableFilters$ = this.store.pipe(select(Selectors.QueryableSchemaTableSelectors.selectQueryableSchemaTableFilters))
    tableRemotePagination$ = this.store.pipe(select(Selectors.QueryableSchemaTableSelectors.selectQueryableSchemaTableRemotePagination))
    tableRemoteState$ = this.store.pipe(select(Selectors.QueryableSchemaTableSelectors.selectQueryableSchemaTableRemoteState))

    tables$ = this.store.pipe(select(Selectors.QueryableSchemaTableSelectors.selectAllQueryableSchemaTables))
    paginatedFilteredTables$ = this.store.pipe(select(Selectors.QueryableSchemaTableSelectors.selectPaginatedFilteredQueryableSchemaTables))
    selectedTable$ = this.store.pipe(select(Selectors.QueryableSchemaTableSelectors.selectedQueryableSchemaTable))
    selectedTableId$ = this.store.pipe(select(Selectors.QueryableSchemaTableSelectors.selectSelectedQueryableSchemaTableId))

    tableById$ = (id: string) => this.store.pipe(select(Selectors.QueryableSchemaTableSelectors.selectQueryableSchemaTableById(id)))

    getTable(tableId: string) {
        return this.store.dispatch(QueryableSchemaTableRemoteActions.getTable.request({ tableId }))
    }

    listTables(pagination: Nullable<Partial<PaginatedQueryParams<Model.QueryableSchemaTableResponse>>> = null) {
        return this.store.dispatch(QueryableSchemaTableRemoteActions.listTables.request({ pagination: pagination }))
    }

    updateTableFilters(filters: Partial<Model.QueryableSchemaTableFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(QueryableSchemaTableLocalActions.updateTableFilters({ filters, triggerRemoteFetch }))
    }

    resetTableFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(QueryableSchemaTableLocalActions.resetTableFilters({ triggerRemoteFetch }))
    }

    selectTable(tableId: string) {
        return this.store.dispatch(QueryableSchemaTableLocalActions.selectTable({ tableId }))
    }

    deselectTable() {
        return this.store.dispatch(QueryableSchemaTableLocalActions.deselectTable())
    }

    resetPagination() {
        return this.store.dispatch(QueryableSchemaTableLocalActions.resetPagination())
    }
}