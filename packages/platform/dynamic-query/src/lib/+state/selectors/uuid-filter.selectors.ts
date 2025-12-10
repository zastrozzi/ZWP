import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectRemoteState } from '@zwp/platform.common'
import { StructuredQuerySelectors } from './structured-query.selectors'
import { FilterGroupSelectors } from './filter-group.selectors'

const selectUUIDFilterState = createFeatureSelector<Reducers.UUIDFilterFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER,
        Identifiers.UUID_FILTER_STATE_FEATURE_KEY
    )
)

const selectUUIDFilterFilters = createSelector(selectUUIDFilterState, (state) => state.filters)
const selectUUIDFilterRemotePagination = createSelector(selectUUIDFilterState, (state) => state.uuidFiltersRemotePagination)
const selectUUIDFilterRemoteState = createSelector(selectUUIDFilterState, selectRemoteState)

const selectSelectedUUIDFilterId = createSelector(selectUUIDFilterState, (state) => state.selectedUUIDFilterId)

const uuidFilterEntitySelectors = Reducers.uuidFilterEntityAdapter.getSelectors()
const selectUUIDFilterEntityState = createSelector(selectUUIDFilterState, (state) => state.uuidFilters)
const selectUUIDFilterIds = createSelector(selectUUIDFilterEntityState, uuidFilterEntitySelectors.selectIds)
const selectUUIDFilterEntities = createSelector(selectUUIDFilterEntityState, uuidFilterEntitySelectors.selectEntities)
const selectAllUUIDFilters = createSelector(selectUUIDFilterEntityState, uuidFilterEntitySelectors.selectAll)
const selectUUIDFilterTotal = createSelector(selectUUIDFilterEntityState, uuidFilterEntitySelectors.selectTotal)
const selectUUIDFilterById = (id: string) =>
  createSelector(selectUUIDFilterEntities, (entities) => entities[id])

const selectedUUIDFilter = createSelector(
    selectUUIDFilterEntities,
    selectSelectedUUIDFilterId,
    (entities, selectedId) => entities[selectedId ?? '']
)

// Additional selectors based on relationships with StructuredQuery and FilterGroup
const selectUUIDFiltersForSelectedStructuredQuery = createSelector(
    StructuredQuerySelectors.selectSelectedStructuredQueryId,
    selectAllUUIDFilters,
    (structuredQueryId, filters) => filters.filter(filter => filter.structuredQueryId === structuredQueryId)
)

const selectUUIDFiltersForSelectedFilterGroup = createSelector(
    FilterGroupSelectors.selectSelectedFilterGroupId,
    selectAllUUIDFilters,
    (parentGroupId, filters) => filters.filter(filter => filter.parentGroupId === parentGroupId)
)

export const UUIDFilterSelectors = {
    selectUUIDFilterState,
    selectUUIDFilterFilters,
    selectUUIDFilterRemotePagination,
    selectUUIDFilterRemoteState,
    
    selectSelectedUUIDFilterId,
    uuidFilterEntitySelectors,
    selectUUIDFilterEntityState,
    selectUUIDFilterIds,
    selectUUIDFilterEntities,
    selectAllUUIDFilters,
    selectUUIDFilterTotal,
    selectUUIDFilterById,
    selectedUUIDFilter,

    selectUUIDFiltersForSelectedStructuredQuery,
    selectUUIDFiltersForSelectedFilterGroup
}