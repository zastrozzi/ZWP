import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectRemoteState } from '@zwp/platform.common'
import { QueryableSchemaTableSelectors } from './queryable-schema.table.selectors'

const selectQueryableSchemaColumnState = createFeatureSelector<Reducers.QueryableSchemaColumnFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER,
        Identifiers.QUERYABLE_SCHEMA_COLUMN_STATE_FEATURE_KEY
    )
)

const selectQueryableSchemaColumnRemotePagination = createSelector(selectQueryableSchemaColumnState, (state) => state.columnsRemotePagination)
const selectQueryableSchemaColumnRemoteState = createSelector(selectQueryableSchemaColumnState, selectRemoteState)

const selectSelectedQueryableSchemaColumnId = createSelector(selectQueryableSchemaColumnState, (state) => state.selectedColumnId)

const queryableSchemaColumnEntitySelectors = Reducers.queryableSchemaColumnEntityAdapter.getSelectors()
const selectQueryableSchemaColumnEntityState = createSelector(selectQueryableSchemaColumnState, (state) => state.columns)
const selectQueryableSchemaColumnIds = createSelector(selectQueryableSchemaColumnEntityState, queryableSchemaColumnEntitySelectors.selectIds)
const selectQueryableSchemaColumnEntities = createSelector(selectQueryableSchemaColumnEntityState, queryableSchemaColumnEntitySelectors.selectEntities)
const selectAllQueryableSchemaColumns = createSelector(selectQueryableSchemaColumnEntityState, queryableSchemaColumnEntitySelectors.selectAll)
const selectQueryableSchemaColumnTotal = createSelector(selectQueryableSchemaColumnEntityState, queryableSchemaColumnEntitySelectors.selectTotal)
const selectQueryableSchemaColumnById = (id: string) => createSelector(selectQueryableSchemaColumnEntities, (entities) => entities[id])

const selectedQueryableSchemaColumn = createSelector(
    selectQueryableSchemaColumnEntities,
    selectSelectedQueryableSchemaColumnId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectQueryableSchemaColumnsForSelectedTable = createSelector(
    QueryableSchemaTableSelectors.selectSelectedQueryableSchemaTableId,
    selectAllQueryableSchemaColumns,
    (selectedTableId, columns) => columns.filter(column => column.tableId === selectedTableId)
)

const selectQueryableSchemaColumnsForTable = (tableId: string) => createSelector(
    selectAllQueryableSchemaColumns,
    (columns) => columns.filter(column => column.tableId === tableId)
)

export const QueryableSchemaColumnSelectors = {
    selectQueryableSchemaColumnState,
    selectQueryableSchemaColumnRemotePagination,
    selectQueryableSchemaColumnRemoteState,

    selectSelectedQueryableSchemaColumnId,

    queryableSchemaColumnEntitySelectors,
    selectQueryableSchemaColumnEntityState,
    selectQueryableSchemaColumnIds,
    selectQueryableSchemaColumnEntities,
    selectAllQueryableSchemaColumns,
    selectQueryableSchemaColumnTotal,
    selectQueryableSchemaColumnById,
    selectedQueryableSchemaColumn,

    selectQueryableSchemaColumnsForSelectedTable,
    selectQueryableSchemaColumnsForTable
}