import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectRemoteState } from '@zwp/platform.common'
import { StructuredQuerySelectors } from './structured-query.selectors'
import { FilterGroupSelectors } from './filter-group.selectors'

const selectStringFilterState = createFeatureSelector<Reducers.StringFilterFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER,
        Identifiers.STRING_FILTER_STATE_FEATURE_KEY
    )
)

const selectStringFilterFilters = createSelector(selectStringFilterState, (state) => state.filters)
const selectStringFilterRemotePagination = createSelector(selectStringFilterState, (state) => state.stringFiltersRemotePagination)
const selectStringFilterRemoteState = createSelector(selectStringFilterState, selectRemoteState)

const selectSelectedStringFilterId = createSelector(selectStringFilterState, (state) => state.selectedStringFilterId)

const stringFilterEntitySelectors = Reducers.stringFilterEntityAdapter.getSelectors()
const selectStringFilterEntityState = createSelector(selectStringFilterState, (state) => state.stringFilters)
const selectStringFilterIds = createSelector(selectStringFilterEntityState, stringFilterEntitySelectors.selectIds)
const selectStringFilterEntities = createSelector(selectStringFilterEntityState, stringFilterEntitySelectors.selectEntities)
const selectAllStringFilters = createSelector(selectStringFilterEntityState, stringFilterEntitySelectors.selectAll)
const selectStringFilterTotal = createSelector(selectStringFilterEntityState, stringFilterEntitySelectors.selectTotal)
const selectStringFilterById = (id: string) =>
  createSelector(selectStringFilterEntities, (entities) => entities[id])

const selectedStringFilter = createSelector(
    selectStringFilterEntities,
    selectSelectedStringFilterId,
    (entities, selectedId) => entities[selectedId ?? '']
)

// Additional selectors based on relationships
const selectStringFiltersForSelectedStructuredQuery = createSelector(
    StructuredQuerySelectors.selectSelectedStructuredQueryId,
    selectAllStringFilters,
    (structuredQueryId, filters) => filters.filter(filter => filter.structuredQueryId === structuredQueryId)
)

const selectStringFiltersForSelectedFilterGroup = createSelector(
    FilterGroupSelectors.selectSelectedFilterGroupId,
    selectAllStringFilters,
    (filterGroupId, filters) => filters.filter(filter => filter.parentGroupId === filterGroupId)
)

export const StringFilterSelectors = {
    selectStringFilterState,
    selectStringFilterFilters,
    selectStringFilterRemotePagination,
    selectStringFilterRemoteState,
    
    selectSelectedStringFilterId,
    stringFilterEntitySelectors,
    selectStringFilterEntityState,
    selectStringFilterIds,
    selectStringFilterEntities,
    selectAllStringFilters,
    selectStringFilterTotal,
    selectStringFilterById,
    selectedStringFilter,

    selectStringFiltersForSelectedStructuredQuery,
    selectStringFiltersForSelectedFilterGroup
}