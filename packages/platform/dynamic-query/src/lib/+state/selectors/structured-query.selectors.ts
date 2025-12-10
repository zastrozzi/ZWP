import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectRemoteState } from '@zwp/platform.common'

const selectStructuredQueryState = createFeatureSelector<Reducers.StructuredQueryFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER,
        Identifiers.STRUCTURED_QUERY_STATE_FEATURE_KEY
    )
)

const selectStructuredQueryFilters = createSelector(selectStructuredQueryState, (state) => state.filters)
const selectStructuredQueryRemotePagination = createSelector(selectStructuredQueryState, (state) => state.structuredQueriesRemotePagination)
const selectStructuredQueryRemoteState = createSelector(selectStructuredQueryState, selectRemoteState)

const selectSelectedStructuredQueryId = createSelector(selectStructuredQueryState, (state) => state.selectedStructuredQueryId)

const structuredQueryEntitySelectors = Reducers.structuredQueryEntityAdapter.getSelectors()
const selectStructuredQueryEntityState = createSelector(selectStructuredQueryState, (state) => state.structuredQueries)
const selectStructuredQueryIds = createSelector(selectStructuredQueryEntityState, structuredQueryEntitySelectors.selectIds)
const selectStructuredQueryEntities = createSelector(selectStructuredQueryEntityState, structuredQueryEntitySelectors.selectEntities)
const selectAllStructuredQueries = createSelector(selectStructuredQueryEntityState, structuredQueryEntitySelectors.selectAll)
const selectStructuredQueryTotal = createSelector(selectStructuredQueryEntityState, structuredQueryEntitySelectors.selectTotal)
const selectStructuredQueryById = (id: string) => createSelector(selectStructuredQueryEntities, (entities) => entities[id])

const selectedStructuredQuery = createSelector(
    selectStructuredQueryEntities,
    selectSelectedStructuredQueryId,
    (entities, selectedId) => entities[selectedId ?? '']
)

export const StructuredQuerySelectors = {
    selectStructuredQueryState,
    selectStructuredQueryFilters,
    selectStructuredQueryRemotePagination,
    selectStructuredQueryRemoteState,

    selectSelectedStructuredQueryId,

    structuredQueryEntitySelectors,
    selectStructuredQueryEntityState,
    selectStructuredQueryIds,
    selectStructuredQueryEntities,
    selectAllStructuredQueries,
    selectStructuredQueryTotal,
    selectStructuredQueryById,
    selectedStructuredQuery
}