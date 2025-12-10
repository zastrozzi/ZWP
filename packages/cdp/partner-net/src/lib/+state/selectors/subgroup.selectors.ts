import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { Model } from '../../model'
import { PartnerSelectors } from './partner.selectors'

const selectSubgroupState = createFeatureSelector<Reducers.SubgroupFeatureState>(
    createNamespacedFeatureKey(Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER, Identifiers.SUBGROUP_STATE_FEATURE_KEY)
)

const selectSubgroupFilters = createSelector(selectSubgroupState, (state) => state.filters)
const selectSubgroupRemotePagination = createSelector(selectSubgroupState, (state) => state.subgroupsRemotePagination)
const selectSubgroupRemoteState = createSelector(selectSubgroupState, selectRemoteState)

const selectSelectedSubgroupId = createSelector(selectSubgroupState, (state) => state.selectedSubgroupId)

const subgroupEntitySelectors = Reducers.subgroupEntityAdapter.getSelectors()
const selectSubgroupEntityState = createSelector(selectSubgroupState, (state) => state.subgroups)
const selectSubgroupIds = createSelector(selectSubgroupEntityState, subgroupEntitySelectors.selectIds)
const selectSubgroupEntities = createSelector(selectSubgroupEntityState, subgroupEntitySelectors.selectEntities)
const selectAllSubgroups = createSelector(selectSubgroupEntityState, subgroupEntitySelectors.selectAll)
const selectSubgroupTotal = createSelector(selectSubgroupEntityState, subgroupEntitySelectors.selectTotal)
const selectSubgroupById = (id: string) => createSelector(selectSubgroupEntities, (entities) => entities[id])

const selectedSubgroup = createSelector(
    selectSubgroupEntities,
    selectSelectedSubgroupId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectSubgroupsForSelectedPartner = createSelector(
    PartnerSelectors.selectSelectedPartnerId,
    selectAllSubgroups,
    (selectedPartnerId, subgroups) => subgroups.filter(subgroup => subgroup.partnerId === selectedPartnerId)
)

const selectSubgroupsForPartner = (partnerId: string) => createSelector(
    selectAllSubgroups,
    (subgroups) => subgroups.filter(subgroup => subgroup.partnerId === partnerId)
)

const selectFilteredSubgroups = createSelector(
    selectAllSubgroups,
    selectSubgroupFilters,
    (subgroups, filters) => selectFilteredElements(subgroups, filters, Model.subgroupFilterEntityMap)
)

const selectPaginatedSubgroups = createSelector(
    selectAllSubgroups,
    selectSubgroupRemotePagination,
    (subgroups, pagination) => selectPaginatedElements(subgroups, pagination)
)

const selectPaginatedFilteredSubgroups = createSelector(
    selectFilteredSubgroups,
    selectSubgroupRemotePagination,
    (subgroups, pagination) => selectPaginatedElements(subgroups, pagination)
)

export const SubgroupSelectors = {
    selectSubgroupState,
    selectSubgroupFilters,
    selectSubgroupRemotePagination,
    selectSubgroupRemoteState,

    selectSelectedSubgroupId,

    subgroupEntitySelectors,
    selectSubgroupEntityState,
    selectSubgroupIds,
    selectSubgroupEntities,
    selectAllSubgroups,
    selectSubgroupTotal,
    selectSubgroupById,
    selectedSubgroup,
    selectSubgroupsForSelectedPartner,
    selectSubgroupsForPartner,

    selectFilteredSubgroups,
    selectPaginatedSubgroups,
    selectPaginatedFilteredSubgroups
}