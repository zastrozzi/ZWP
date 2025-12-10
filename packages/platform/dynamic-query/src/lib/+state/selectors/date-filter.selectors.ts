import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectRemoteState } from '@zwp/platform.common'
import { StructuredQuerySelectors } from './structured-query.selectors'
import { FilterGroupSelectors } from './filter-group.selectors'

const selectDateFilterState = createFeatureSelector<Reducers.DateFilterFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER,
        Identifiers.DATE_FILTER_STATE_FEATURE_KEY
    )
)

const selectDateFilterFilters = createSelector(selectDateFilterState, (state) => state.filters)
const selectDateFilterRemotePagination = createSelector(selectDateFilterState, (state) => state.dateFiltersRemotePagination)
const selectDateFilterRemoteState = createSelector(selectDateFilterState, selectRemoteState)

const selectSelectedDateFilterId = createSelector(selectDateFilterState, (state) => state.selectedDateFilterId)

const dateFilterEntitySelectors = Reducers.dateFilterEntityAdapter.getSelectors()
const selectDateFilterEntityState = createSelector(selectDateFilterState, (state) => state.dateFilters)
const selectDateFilterIds = createSelector(selectDateFilterEntityState, dateFilterEntitySelectors.selectIds)
const selectDateFilterEntities = createSelector(selectDateFilterEntityState, dateFilterEntitySelectors.selectEntities)
const selectAllDateFilters = createSelector(selectDateFilterEntityState, dateFilterEntitySelectors.selectAll)
const selectDateFilterTotal = createSelector(selectDateFilterEntityState, dateFilterEntitySelectors.selectTotal)
const selectDateFilterById = (id: string) =>
  createSelector(selectDateFilterEntities, (entities) => entities[id])

const selectedDateFilter = createSelector(
    selectDateFilterEntities,
    selectSelectedDateFilterId,
    (entities, selectedId) => entities[selectedId ?? '']
)

// Additional selectors based on relationships
const selectDateFiltersForSelectedStructuredQuery = createSelector(
    StructuredQuerySelectors.selectSelectedStructuredQueryId,
    selectAllDateFilters,
    (structuredQueryId, filters) => filters.filter(filter => filter.structuredQueryId === structuredQueryId)
)

const selectDateFiltersForSelectedFilterGroup = createSelector(
    FilterGroupSelectors.selectSelectedFilterGroupId,
    selectAllDateFilters,
    (filterGroupId, filters) => filters.filter(filter => filter.parentGroupId === filterGroupId)
)

export const DateFilterSelectors = {
    selectDateFilterState,
    selectDateFilterFilters,
    selectDateFilterRemotePagination,
    selectDateFilterRemoteState,
    
    selectSelectedDateFilterId,
    dateFilterEntitySelectors,
    selectDateFilterEntityState,
    selectDateFilterIds,
    selectDateFilterEntities,
    selectAllDateFilters,
    selectDateFilterTotal,
    selectDateFilterById,
    selectedDateFilter,

    selectDateFiltersForSelectedStructuredQuery,
    selectDateFiltersForSelectedFilterGroup
}