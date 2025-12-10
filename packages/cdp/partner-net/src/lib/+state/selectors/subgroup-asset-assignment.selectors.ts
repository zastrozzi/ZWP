import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { Model } from '../../model'
import { SubgroupSelectors } from './subgroup.selectors'
import { AssetSelectors } from './asset.selectors'

const selectSubgroupAssetAssignmentState = createFeatureSelector<Reducers.SubgroupAssetAssignmentFeatureState>(
    createNamespacedFeatureKey(Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER, Identifiers.SUBGROUP_ASSET_ASSIGNMENT_STATE_FEATURE_KEY)
)

const selectSubgroupAssetAssignmentFilters = createSelector(selectSubgroupAssetAssignmentState, (state) => state.filters)
const selectSubgroupAssetAssignmentRemotePagination = createSelector(selectSubgroupAssetAssignmentState, (state) => state.subgroupAssetAssignmentsRemotePagination)
const selectSubgroupAssetAssignmentRemoteState = createSelector(selectSubgroupAssetAssignmentState, selectRemoteState)

const selectSelectedSubgroupAssetAssignmentId = createSelector(selectSubgroupAssetAssignmentState, (state) => state.selectedSubgroupAssetAssignmentId)

const subgroupAssetAssignmentEntitySelectors = Reducers.subgroupAssetAssignmentEntityAdapter.getSelectors()
const selectSubgroupAssetAssignmentEntityState = createSelector(selectSubgroupAssetAssignmentState, (state) => state.subgroupAssetAssignments)
const selectSubgroupAssetAssignmentIds = createSelector(selectSubgroupAssetAssignmentEntityState, subgroupAssetAssignmentEntitySelectors.selectIds)
const selectSubgroupAssetAssignmentEntities = createSelector(selectSubgroupAssetAssignmentEntityState, subgroupAssetAssignmentEntitySelectors.selectEntities)
const selectAllSubgroupAssetAssignments = createSelector(selectSubgroupAssetAssignmentEntityState, subgroupAssetAssignmentEntitySelectors.selectAll)
const selectSubgroupAssetAssignmentTotal = createSelector(selectSubgroupAssetAssignmentEntityState, subgroupAssetAssignmentEntitySelectors.selectTotal)
const selectSubgroupAssetAssignmentById = (id: string) => createSelector(selectSubgroupAssetAssignmentEntities, (entities) => entities[id])

const selectedSubgroupAssetAssignment = createSelector(
    selectSubgroupAssetAssignmentEntities,
    selectSelectedSubgroupAssetAssignmentId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectSubgroupAssetAssignmentsForSelectedSubgroup = createSelector(
    SubgroupSelectors.selectSelectedSubgroupId,
    selectAllSubgroupAssetAssignments,
    (selectedSubgroupId, subgroupAssetAssignments) => subgroupAssetAssignments.filter(subgroupAssetAssignment => subgroupAssetAssignment.subgroupId === selectedSubgroupId)
)

const selectSubgroupAssetAssignmentsForSubgroup = (subgroupId: string) => createSelector(
    selectAllSubgroupAssetAssignments,
    (subgroupAssetAssignments) => subgroupAssetAssignments.filter(subgroupAssetAssignment => subgroupAssetAssignment.subgroupId === subgroupId)
)

const selectSubgroupAssetAssignmentsForSelectedAsset = createSelector(
    AssetSelectors.selectSelectedAssetId,
    selectAllSubgroupAssetAssignments,
    (selectedAssetId, subgroupAssetAssignments) => subgroupAssetAssignments.filter(subgroupAssetAssignment => subgroupAssetAssignment.assetId === selectedAssetId)
)

const selectSubgroupAssetAssignmentsForAsset = (assetId: string) => createSelector(
    selectAllSubgroupAssetAssignments,
    (subgroupAssetAssignments) => subgroupAssetAssignments.filter(subgroupAssetAssignment => subgroupAssetAssignment.assetId === assetId)
)

const selectAssetsForSelectedSubgroup = createSelector(
    SubgroupSelectors.selectSelectedSubgroupId,
    selectAllSubgroupAssetAssignments,
    AssetSelectors.selectAllAssets,
    (selectedSubgroupId, subgroupAssetAssignments, assets) => {
        const assetIds = subgroupAssetAssignments
            .filter(assignment => assignment.subgroupId  === selectedSubgroupId)
            .map(subgroupAssetAssignment => subgroupAssetAssignment.assetId)
        return assets.filter(asset => assetIds.includes(asset.id))
    }
)

const selectAssetsForSubgroup = (subgroupId: string) => createSelector(
    selectAllSubgroupAssetAssignments,
    AssetSelectors.selectAllAssets,
    (subgroupAssetAssignments, assets) => {
        const assetIds = subgroupAssetAssignments
            .filter(assignment => assignment.subgroupId  === subgroupId)
            .map(subgroupAssetAssignment => subgroupAssetAssignment.assetId)
        return assets.filter(asset => assetIds.includes(asset.id))
    }
)

const selectSubgroupsForSelectedAsset = createSelector(
    AssetSelectors.selectSelectedAssetId,
    selectAllSubgroupAssetAssignments,
    SubgroupSelectors.selectAllSubgroups,
    (selectedAssetId, subgroupAssetAssignments, subgroups) => {
        const subgroupIds = subgroupAssetAssignments
            .filter(assignment => assignment.assetId  === selectedAssetId)
            .map(subgroupAssetAssignment => subgroupAssetAssignment.subgroupId)
        return subgroups.filter(subgroup => subgroupIds.includes(subgroup.id))
    }
)

const selectSubgroupsForAsset = (assetId: string) => createSelector(
    selectAllSubgroupAssetAssignments,
    SubgroupSelectors.selectAllSubgroups,
    (subgroupAssetAssignments, subgroups) => {
        const subgroupIds = subgroupAssetAssignments
            .filter(assignment => assignment.assetId  === assetId)
            .map(subgroupAssetAssignment => subgroupAssetAssignment.subgroupId)
        return subgroups.filter(subgroup => subgroupIds.includes(subgroup.id))
    }
)

const selectFilteredSubgroupAssetAssignments = createSelector(
    selectAllSubgroupAssetAssignments,
    selectSubgroupAssetAssignmentFilters,
    (subgroupAssetAssignments, filters) => selectFilteredElements(subgroupAssetAssignments, filters, Model.subgroupAssetAssignmentFilterEntityMap)
)

const selectPaginatedSubgroupAssetAssignments = createSelector(
    selectAllSubgroupAssetAssignments,
    selectSubgroupAssetAssignmentRemotePagination,
    (subgroupAssetAssignments, pagination) => selectPaginatedElements(subgroupAssetAssignments, pagination)
)

const selectPaginatedFilteredSubgroupAssetAssignments = createSelector(
    selectFilteredSubgroupAssetAssignments,
    selectSubgroupAssetAssignmentRemotePagination,
    (subgroupAssetAssignments, pagination) => selectPaginatedElements(subgroupAssetAssignments, pagination)
)

export const SubgroupAssetAssignmentSelectors = {
    selectSubgroupAssetAssignmentState,
    selectSubgroupAssetAssignmentFilters,
    selectSubgroupAssetAssignmentRemotePagination,
    selectSubgroupAssetAssignmentRemoteState,

    selectSelectedSubgroupAssetAssignmentId,

    subgroupAssetAssignmentEntitySelectors,
    selectSubgroupAssetAssignmentEntityState,
    selectSubgroupAssetAssignmentIds,
    selectSubgroupAssetAssignmentEntities,
    selectAllSubgroupAssetAssignments,
    selectSubgroupAssetAssignmentTotal,
    selectSubgroupAssetAssignmentById,
    selectedSubgroupAssetAssignment,
    selectSubgroupAssetAssignmentsForSelectedSubgroup,
    selectSubgroupAssetAssignmentsForSubgroup,
    selectSubgroupAssetAssignmentsForSelectedAsset,
    selectSubgroupAssetAssignmentsForAsset,

    selectAssetsForSelectedSubgroup,
    selectAssetsForSubgroup,
    selectSubgroupsForSelectedAsset,
    selectSubgroupsForAsset,

    selectFilteredSubgroupAssetAssignments,
    selectPaginatedSubgroupAssetAssignments,
    selectPaginatedFilteredSubgroupAssetAssignments
}