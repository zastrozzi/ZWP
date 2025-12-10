import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectRemoteState } from '@zwp/platform.common'
import { StructuredQuerySelectors } from './structured-query.selectors' // Import StructuredQuery selectors

const selectFilterGroupState = createFeatureSelector<Reducers.FilterGroupFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER,
        Identifiers.FILTER_GROUP_STATE_FEATURE_KEY
    )
)

const selectFilterGroupFilters = createSelector(selectFilterGroupState, (state) => state.filters)
const selectFilterGroupRemotePagination = createSelector(selectFilterGroupState, (state) => state.filterGroupsRemotePagination)
const selectFilterGroupRemoteState = createSelector(selectFilterGroupState, selectRemoteState)

const selectSelectedFilterGroupId = createSelector(selectFilterGroupState, (state) => state.selectedFilterGroupId)

const filterGroupEntitySelectors = Reducers.filterGroupEntityAdapter.getSelectors()
const selectFilterGroupEntityState = createSelector(selectFilterGroupState, (state) => state.filterGroups)
const selectFilterGroupIds = createSelector(selectFilterGroupEntityState, filterGroupEntitySelectors.selectIds)
const selectFilterGroupEntities = createSelector(selectFilterGroupEntityState, filterGroupEntitySelectors.selectEntities)
const selectAllFilterGroups = createSelector(selectFilterGroupEntityState, filterGroupEntitySelectors.selectAll)
const selectFilterGroupTotal = createSelector(selectFilterGroupEntityState, filterGroupEntitySelectors.selectTotal)
const selectFilterGroupById = (id: string) => createSelector(selectFilterGroupEntities, (entities) => entities[id])

const selectedFilterGroup = createSelector(
    selectFilterGroupEntities,
    selectSelectedFilterGroupId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectFilterGroupsForSelectedStructuredQuery = createSelector(
    StructuredQuerySelectors.selectSelectedStructuredQueryId,
    selectAllFilterGroups,
    (structuredQueryId, groups) => groups.filter(group => group.structuredQueryId === structuredQueryId)
)

const selectFilterGroupsForSelectedParentGroup = createSelector(
    selectSelectedFilterGroupId,
    selectAllFilterGroups,
    (parentGroupId, groups) => groups.filter(group => group.parentGroupId === parentGroupId)
)

export const FilterGroupSelectors = {
    selectFilterGroupState,
    selectFilterGroupFilters,
    selectFilterGroupRemotePagination,
    selectFilterGroupRemoteState,

    selectSelectedFilterGroupId,

    filterGroupEntitySelectors,
    selectFilterGroupEntityState,
    selectFilterGroupIds,
    selectFilterGroupEntities,
    selectAllFilterGroups,
    selectFilterGroupTotal,
    selectFilterGroupById,
    selectedFilterGroup,

    selectFilterGroupsForSelectedStructuredQuery,
    selectFilterGroupsForSelectedParentGroup
}