import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectRemoteState } from '@zwp/platform.common'
import { StructuredQuerySelectors } from './structured-query.selectors'
import { FilterGroupSelectors } from './filter-group.selectors'

const selectEnumFilterState = createFeatureSelector<Reducers.EnumFilterFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER,
        Identifiers.ENUM_FILTER_STATE_FEATURE_KEY
    )
)

const selectEnumFilterFilters = createSelector(selectEnumFilterState, (state) => state.filters)
const selectEnumFilterRemotePagination = createSelector(selectEnumFilterState, (state) => state.enumFiltersRemotePagination)
const selectEnumFilterRemoteState = createSelector(selectEnumFilterState, selectRemoteState)

const selectSelectedEnumFilterId = createSelector(selectEnumFilterState, (state) => state.selectedEnumFilterId)

const enumFilterEntitySelectors = Reducers.enumFilterEntityAdapter.getSelectors()
const selectEnumFilterEntityState = createSelector(selectEnumFilterState, (state) => state.enumFilters)
const selectEnumFilterIds = createSelector(selectEnumFilterEntityState, enumFilterEntitySelectors.selectIds)
const selectEnumFilterEntities = createSelector(selectEnumFilterEntityState, enumFilterEntitySelectors.selectEntities)
const selectAllEnumFilters = createSelector(selectEnumFilterEntityState, enumFilterEntitySelectors.selectAll)
const selectEnumFilterTotal = createSelector(selectEnumFilterEntityState, enumFilterEntitySelectors.selectTotal)
const selectEnumFilterById = (id: string) =>
  createSelector(selectEnumFilterEntities, (entities) => entities[id])

const selectedEnumFilter = createSelector(
    selectEnumFilterEntities,
    selectSelectedEnumFilterId,
    (entities, selectedId) => entities[selectedId ?? '']
)

// Additional selectors based on relationships
const selectEnumFiltersForSelectedStructuredQuery = createSelector(
    StructuredQuerySelectors.selectSelectedStructuredQueryId,
    selectAllEnumFilters,
    (structuredQueryId, filters) => filters.filter(filter => filter.structuredQueryId === structuredQueryId)
)

const selectEnumFiltersForSelectedFilterGroup = createSelector(
    FilterGroupSelectors.selectSelectedFilterGroupId,
    selectAllEnumFilters,
    (filterGroupId, filters) => filters.filter(filter => filter.parentGroupId === filterGroupId)
)

export const EnumFilterSelectors = {
    selectEnumFilterState,
    selectEnumFilterFilters,
    selectEnumFilterRemotePagination,
    selectEnumFilterRemoteState,
    
    selectSelectedEnumFilterId,
    enumFilterEntitySelectors,
    selectEnumFilterEntityState,
    selectEnumFilterIds,
    selectEnumFilterEntities,
    selectAllEnumFilters,
    selectEnumFilterTotal,
    selectEnumFilterById,
    selectedEnumFilter,

    selectEnumFiltersForSelectedStructuredQuery,
    selectEnumFiltersForSelectedFilterGroup
}