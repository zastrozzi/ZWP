import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectRemoteState } from '@zwp/platform.common'
import { StructuredQuerySelectors } from './structured-query.selectors'
import { FilterGroupSelectors } from './filter-group.selectors'

const selectBooleanFilterState = createFeatureSelector<Reducers.BooleanFilterFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER,
        Identifiers.BOOLEAN_FILTER_STATE_FEATURE_KEY
    )
)

const selectBooleanFilterFilters = createSelector(selectBooleanFilterState, (state) => state.filters)
const selectBooleanFilterRemotePagination = createSelector(selectBooleanFilterState, (state) => state.booleanFiltersRemotePagination)
const selectBooleanFilterRemoteState = createSelector(selectBooleanFilterState, selectRemoteState)

const selectSelectedBooleanFilterId = createSelector(selectBooleanFilterState, (state) => state.selectedBooleanFilterId)

const booleanFilterEntitySelectors = Reducers.booleanFilterEntityAdapter.getSelectors()
const selectBooleanFilterEntityState = createSelector(selectBooleanFilterState, (state) => state.booleanFilters)
const selectBooleanFilterIds = createSelector(selectBooleanFilterEntityState, booleanFilterEntitySelectors.selectIds)
const selectBooleanFilterEntities = createSelector(selectBooleanFilterEntityState, booleanFilterEntitySelectors.selectEntities)
const selectAllBooleanFilters = createSelector(selectBooleanFilterEntityState, booleanFilterEntitySelectors.selectAll)
const selectBooleanFilterTotal = createSelector(selectBooleanFilterEntityState, booleanFilterEntitySelectors.selectTotal)
const selectBooleanFilterById = (id: string) =>
  createSelector(selectBooleanFilterEntities, (entities) => entities[id])

const selectedBooleanFilter = createSelector(
    selectBooleanFilterEntities,
    selectSelectedBooleanFilterId,
    (entities, selectedId) => entities[selectedId ?? '']
)

// Additional selectors based on relationships
const selectBooleanFiltersForSelectedStructuredQuery = createSelector(
    StructuredQuerySelectors.selectSelectedStructuredQueryId,
    selectAllBooleanFilters,
    (structuredQueryId, filters) => filters.filter(filter => filter.structuredQueryId === structuredQueryId)
)

const selectBooleanFiltersForSelectedFilterGroup = createSelector(
    FilterGroupSelectors.selectSelectedFilterGroupId,
    selectAllBooleanFilters,
    (filterGroupId, filters) => filters.filter(filter => filter.parentGroupId === filterGroupId)
)

export const BooleanFilterSelectors = {
    selectBooleanFilterState,
    selectBooleanFilterFilters,
    selectBooleanFilterRemotePagination,
    selectBooleanFilterRemoteState,
    
    selectSelectedBooleanFilterId,
    booleanFilterEntitySelectors,
    selectBooleanFilterEntityState,
    selectBooleanFilterIds,
    selectBooleanFilterEntities,
    selectAllBooleanFilters,
    selectBooleanFilterTotal,
    selectBooleanFilterById,
    selectedBooleanFilter,

    selectBooleanFiltersForSelectedStructuredQuery,
    selectBooleanFiltersForSelectedFilterGroup
}