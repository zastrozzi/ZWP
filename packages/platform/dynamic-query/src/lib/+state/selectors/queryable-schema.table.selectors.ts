import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { Model } from '../../model'

const selectQueryableSchemaTableState = createFeatureSelector<Reducers.QueryableSchemaTableFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER,
        Identifiers.QUERYABLE_SCHEMA_TABLE_STATE_FEATURE_KEY
    )
)

const selectQueryableSchemaTableFilters = createSelector(selectQueryableSchemaTableState, (state) => state.filters)
const selectQueryableSchemaTableRemotePagination = createSelector(selectQueryableSchemaTableState, (state) => state.tablesRemotePagination)
const selectQueryableSchemaTableRemoteState = createSelector(selectQueryableSchemaTableState, selectRemoteState)

const selectSelectedQueryableSchemaTableId = createSelector(selectQueryableSchemaTableState, (state) => state.selectedTableId)

const queryableSchemaTableEntitySelectors = Reducers.queryableSchemaTableEntityAdapter.getSelectors()
const selectQueryableSchemaTableEntityState = createSelector(selectQueryableSchemaTableState, (state) => state.tables)
const selectQueryableSchemaTableIds = createSelector(selectQueryableSchemaTableEntityState, queryableSchemaTableEntitySelectors.selectIds)
const selectQueryableSchemaTableEntities = createSelector(selectQueryableSchemaTableEntityState, queryableSchemaTableEntitySelectors.selectEntities)
const selectAllQueryableSchemaTables = createSelector(selectQueryableSchemaTableEntityState, queryableSchemaTableEntitySelectors.selectAll)
const selectQueryableSchemaTableTotal = createSelector(selectQueryableSchemaTableEntityState, queryableSchemaTableEntitySelectors.selectTotal)
const selectQueryableSchemaTableById = (id: string) => createSelector(selectQueryableSchemaTableEntities, (entities) => entities[id])

const selectedQueryableSchemaTable = createSelector(
    selectQueryableSchemaTableEntities,
    selectSelectedQueryableSchemaTableId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectFilteredQueryableSchemaTables = createSelector(
    selectAllQueryableSchemaTables,
    selectQueryableSchemaTableFilters,
    (tables, filters) => selectFilteredElements(tables, filters, Model.queryableSchemaTableFilterEntityMap)
)

const selectPaginatedQueryableSchemaTables = createSelector(
    selectAllQueryableSchemaTables,
    selectQueryableSchemaTableRemotePagination,
    (tables, pagination) => selectPaginatedElements(tables, pagination)
)

const selectPaginatedFilteredQueryableSchemaTables = createSelector(
    selectFilteredQueryableSchemaTables,
    selectQueryableSchemaTableRemotePagination,
    (tables, pagination) => selectPaginatedElements(tables, pagination)
)

export const QueryableSchemaTableSelectors = {
    selectQueryableSchemaTableState,
    selectQueryableSchemaTableFilters,
    selectQueryableSchemaTableRemotePagination,
    selectQueryableSchemaTableRemoteState,

    selectSelectedQueryableSchemaTableId,

    queryableSchemaTableEntitySelectors,
    selectQueryableSchemaTableEntityState,
    selectQueryableSchemaTableIds,
    selectQueryableSchemaTableEntities,
    selectAllQueryableSchemaTables,
    selectQueryableSchemaTableTotal,
    selectQueryableSchemaTableById,
    selectedQueryableSchemaTable,

    selectFilteredQueryableSchemaTables,
    selectPaginatedQueryableSchemaTables,
    selectPaginatedFilteredQueryableSchemaTables
}