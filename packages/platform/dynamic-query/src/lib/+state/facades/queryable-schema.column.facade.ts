import { inject, Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { QueryableSchemaColumnLocalActions, QueryableSchemaColumnRemoteActions } from '../actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'QueryableSchemaColumnFacade', options: { skipMethodDebugger: true } })
export class QueryableSchemaColumnFacade {
    private store = inject(Store)

    columnRemotePagination$ = this.store.pipe(
        select(Selectors.QueryableSchemaColumnSelectors.selectQueryableSchemaColumnRemotePagination)
    )
    columnRemoteState$ = this.store.pipe(
        select(Selectors.QueryableSchemaColumnSelectors.selectQueryableSchemaColumnRemoteState)
    )

    columns$ = this.store.pipe(select(Selectors.QueryableSchemaColumnSelectors.selectAllQueryableSchemaColumns))
    selectedColumn$ = this.store.pipe(select(Selectors.QueryableSchemaColumnSelectors.selectedQueryableSchemaColumn))
    selectedColumnId$ = this.store.pipe(
        select(Selectors.QueryableSchemaColumnSelectors.selectSelectedQueryableSchemaColumnId)
    )

    columnsForSelectedTable$ = this.store.pipe(
        select(Selectors.QueryableSchemaColumnSelectors.selectQueryableSchemaColumnsForSelectedTable)
    )

    columnById$ = (id: string) =>
        this.store.pipe(select(Selectors.QueryableSchemaColumnSelectors.selectQueryableSchemaColumnById(id)))
    columnsForTable$ = (tableId: string) =>
        this.store.pipe(select(Selectors.QueryableSchemaColumnSelectors.selectQueryableSchemaColumnsForTable(tableId)))

    getColumn(columnId: string) {
        return this.store.dispatch(QueryableSchemaColumnRemoteActions.getColumn.request({ columnId }))
    }

    listColumns(
        tableId: Nullable<string> = null,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.QueryableSchemaColumnResponse>>> = null
    ) {
        return this.store.dispatch(
            QueryableSchemaColumnRemoteActions.listColumns.request({ tableId: tableId, pagination: pagination })
        )
    }

    selectColumn(columnId: string) {
        return this.store.dispatch(QueryableSchemaColumnLocalActions.selectColumn({ columnId }))
    }

    deselectColumn() {
        return this.store.dispatch(QueryableSchemaColumnLocalActions.deselectColumn())
    }

    resetPagination() {
        return this.store.dispatch(QueryableSchemaColumnLocalActions.resetPagination())
    }
}
