import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { Model } from '../../model'
import { PartnerSelectors } from './partner.selectors'
import { AssetSelectors } from './asset.selectors'

const selectPartnerAssetAssignmentState = createFeatureSelector<Reducers.PartnerAssetAssignmentFeatureState>(
    createNamespacedFeatureKey(Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER, Identifiers.PARTNER_ASSET_ASSIGNMENT_STATE_FEATURE_KEY)
)

const selectPartnerAssetAssignmentFilters = createSelector(selectPartnerAssetAssignmentState, (state) => state.filters)
const selectPartnerAssetAssignmentRemotePagination = createSelector(selectPartnerAssetAssignmentState, (state) => state.partnerAssetAssignmentsRemotePagination)
const selectPartnerAssetAssignmentRemoteState = createSelector(selectPartnerAssetAssignmentState, selectRemoteState)

const selectSelectedPartnerAssetAssignmentId = createSelector(selectPartnerAssetAssignmentState, (state) => state.selectedPartnerAssetAssignmentId)

const partnerAssetAssignmentEntitySelectors = Reducers.partnerAssetAssignmentEntityAdapter.getSelectors()
const selectPartnerAssetAssignmentEntityState = createSelector(selectPartnerAssetAssignmentState, (state) => state.partnerAssetAssignments)
const selectPartnerAssetAssignmentIds = createSelector(selectPartnerAssetAssignmentEntityState, partnerAssetAssignmentEntitySelectors.selectIds)
const selectPartnerAssetAssignmentEntities = createSelector(selectPartnerAssetAssignmentEntityState, partnerAssetAssignmentEntitySelectors.selectEntities)
const selectAllPartnerAssetAssignments = createSelector(selectPartnerAssetAssignmentEntityState, partnerAssetAssignmentEntitySelectors.selectAll)
const selectPartnerAssetAssignmentTotal = createSelector(selectPartnerAssetAssignmentEntityState, partnerAssetAssignmentEntitySelectors.selectTotal)
const selectPartnerAssetAssignmentById = (id: string) => createSelector(selectPartnerAssetAssignmentEntities, (entities) => entities[id])

const selectedPartnerAssetAssignment = createSelector(
    selectPartnerAssetAssignmentEntities,
    selectSelectedPartnerAssetAssignmentId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectPartnerAssetAssignmentsForSelectedPartner = createSelector(
    PartnerSelectors.selectSelectedPartnerId,
    selectAllPartnerAssetAssignments,
    (selectedPartnerId, partnerAssetAssignments) => partnerAssetAssignments.filter(partnerAssetAssignment => partnerAssetAssignment.partnerId === selectedPartnerId)
)

const selectPartnerAssetAssignmentsForPartner = (partnerId: string) => createSelector(
    selectAllPartnerAssetAssignments,
    (partnerAssetAssignments) => partnerAssetAssignments.filter(partnerAssetAssignment => partnerAssetAssignment.partnerId === partnerId)
)

const selectPartnerAssetAssignmentsForSelectedAsset = createSelector(
    AssetSelectors.selectSelectedAssetId,
    selectAllPartnerAssetAssignments,
    (selectedAssetId, partnerAssetAssignments) => partnerAssetAssignments.filter(partnerAssetAssignment => partnerAssetAssignment.assetId === selectedAssetId)
)

const selectPartnerAssetAssignmentsForAsset = (assetId: string) => createSelector(
    selectAllPartnerAssetAssignments,
    (partnerAssetAssignments) => partnerAssetAssignments.filter(partnerAssetAssignment => partnerAssetAssignment.assetId === assetId)
)


const selectAssetsForSelectedPartner = createSelector(
    PartnerSelectors.selectSelectedPartnerId,
    selectAllPartnerAssetAssignments,
    AssetSelectors.selectAllAssets,
    (selectedPartnerId, partnerAssetAssignments, assets) => {
        const assetIds = partnerAssetAssignments
            .filter(assignment => assignment.partnerId  === selectedPartnerId)
            .map(partnerAssetAssignment => partnerAssetAssignment.assetId)
        return assets.filter(asset => assetIds.includes(asset.id))
    }
)

const selectAssetsForPartner = (partnerId: string) => createSelector(
    selectAllPartnerAssetAssignments,
    AssetSelectors.selectAllAssets,
    (partnerAssetAssignments, assets) => {
        const assetIds = partnerAssetAssignments
            .filter(assignment => assignment.partnerId  === partnerId)
            .map(partnerAssetAssignment => partnerAssetAssignment.assetId)
        return assets.filter(asset => assetIds.includes(asset.id))
    }
)

const selectPartnersForSelectedAsset = createSelector(
    AssetSelectors.selectSelectedAssetId,
    selectAllPartnerAssetAssignments,
    PartnerSelectors.selectAllPartners,
    (selectedAssetId, partnerAssetAssignments, partners) => {
        const partnerIds = partnerAssetAssignments
            .filter(assignment => assignment.assetId  === selectedAssetId)
            .map(partnerAssetAssignment => partnerAssetAssignment.partnerId)
        return partners.filter(partner => partnerIds.includes(partner.id))
    }
)

const selectPartnersForAsset = (assetId: string) => createSelector(
    selectAllPartnerAssetAssignments,
    PartnerSelectors.selectAllPartners,
    (partnerAssetAssignments, partners) => {
        const partnerIds = partnerAssetAssignments
            .filter(assignment => assignment.assetId  === assetId)
            .map(partnerAssetAssignment => partnerAssetAssignment.partnerId)
        return partners.filter(partner => partnerIds.includes(partner.id))
    }
)

const selectFilteredPartnerAssetAssignments = createSelector(
    selectAllPartnerAssetAssignments,
    selectPartnerAssetAssignmentFilters,
    (partnerAssetAssignments, filters) => selectFilteredElements(partnerAssetAssignments, filters, Model.partnerAssetAssignmentFilterEntityMap)
)

const selectPaginatedPartnerAssetAssignments = createSelector(
    selectAllPartnerAssetAssignments,
    selectPartnerAssetAssignmentRemotePagination,
    (partnerAssetAssignments, pagination) => selectPaginatedElements(partnerAssetAssignments, pagination)
)

const selectPaginatedFilteredPartnerAssetAssignments = createSelector(
    selectFilteredPartnerAssetAssignments,
    selectPartnerAssetAssignmentRemotePagination,
    (partnerAssetAssignments, pagination) => selectPaginatedElements(partnerAssetAssignments, pagination)
)

export const PartnerAssetAssignmentSelectors = {
    selectPartnerAssetAssignmentState,
    selectPartnerAssetAssignmentFilters,
    selectPartnerAssetAssignmentRemotePagination,
    selectPartnerAssetAssignmentRemoteState,

    selectSelectedPartnerAssetAssignmentId,

    partnerAssetAssignmentEntitySelectors,
    selectPartnerAssetAssignmentEntityState,
    selectPartnerAssetAssignmentIds,
    selectPartnerAssetAssignmentEntities,
    selectAllPartnerAssetAssignments,
    selectPartnerAssetAssignmentTotal,
    selectPartnerAssetAssignmentById,
    selectedPartnerAssetAssignment,
    selectPartnerAssetAssignmentsForSelectedPartner,
    selectPartnerAssetAssignmentsForPartner,
    selectPartnerAssetAssignmentsForSelectedAsset,
    selectPartnerAssetAssignmentsForAsset,

    selectAssetsForSelectedPartner,
    selectAssetsForPartner,
    selectPartnersForSelectedAsset,
    selectPartnersForAsset,

    selectFilteredPartnerAssetAssignments,
    selectPaginatedPartnerAssetAssignments,
    selectPaginatedFilteredPartnerAssetAssignments
}