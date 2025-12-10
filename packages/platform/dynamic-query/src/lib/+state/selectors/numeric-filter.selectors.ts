import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectRemoteState } from '@zwp/platform.common'
import { StructuredQuerySelectors } from './structured-query.selectors'
import { FilterGroupSelectors } from './filter-group.selectors'

const selectNumericFilterState = createFeatureSelector<Reducers.NumericFilterFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER,
        Identifiers.NUMERIC_FILTER_STATE_FEATURE_KEY
    )
)

const selectNumericFilterFilters = createSelector(selectNumericFilterState, (state) => state.filters)
const selectNumericFilterRemotePagination = createSelector(selectNumericFilterState, (state) => state.numericFiltersRemotePagination)
const selectNumericFilterRemoteState = createSelector(selectNumericFilterState, selectRemoteState)

const selectSelectedNumericFilterId = createSelector(selectNumericFilterState, (state) => state.selectedNumericFilterId)

const numericFilterEntitySelectors = Reducers.numericFilterEntityAdapter.getSelectors()
const selectNumericFilterEntityState = createSelector(selectNumericFilterState, (state) => state.numericFilters)
const selectNumericFilterIds = createSelector(selectNumericFilterEntityState, numericFilterEntitySelectors.selectIds)
const selectNumericFilterEntities = createSelector(selectNumericFilterEntityState, numericFilterEntitySelectors.selectEntities)
const selectAllNumericFilters = createSelector(selectNumericFilterEntityState, numericFilterEntitySelectors.selectAll)
const selectNumericFilterTotal = createSelector(selectNumericFilterEntityState, numericFilterEntitySelectors.selectTotal)
const selectNumericFilterById = (id: string) =>
  createSelector(selectNumericFilterEntities, (entities) => entities[id])

const selectedNumericFilter = createSelector(
    selectNumericFilterEntities,
    selectSelectedNumericFilterId,
    (entities, selectedId) => entities[selectedId ?? '']
)

// Additional selectors based on relationships
const selectNumericFiltersForSelectedStructuredQuery = createSelector(
    StructuredQuerySelectors.selectSelectedStructuredQueryId,
    selectAllNumericFilters,
    (structuredQueryId, filters) => filters.filter(filter => filter.structuredQueryId === structuredQueryId)
)

const selectNumericFiltersForSelectedFilterGroup = createSelector(
    FilterGroupSelectors.selectSelectedFilterGroupId,
    selectAllNumericFilters,
    (filterGroupId, filters) => filters.filter(filter => filter.parentGroupId === filterGroupId)
)

export const NumericFilterSelectors = {
    selectNumericFilterState,
    selectNumericFilterFilters,
    selectNumericFilterRemotePagination,
    selectNumericFilterRemoteState,
    
    selectSelectedNumericFilterId,
    numericFilterEntitySelectors,
    selectNumericFilterEntityState,
    selectNumericFilterIds,
    selectNumericFilterEntities,
    selectAllNumericFilters,
    selectNumericFilterTotal,
    selectNumericFilterById,
    selectedNumericFilter,

    selectNumericFiltersForSelectedStructuredQuery,
    selectNumericFiltersForSelectedFilterGroup
}