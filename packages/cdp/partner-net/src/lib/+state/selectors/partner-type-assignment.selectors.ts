import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { Model } from '../../model'
import { PartnerSelectors } from './partner.selectors'
import { PartnerTypeSelectors } from './partner-type.selectors'

const selectPartnerTypeAssignmentState = createFeatureSelector<Reducers.PartnerTypeAssignmentFeatureState>(
    createNamespacedFeatureKey(Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER, Identifiers.PARTNER_TYPE_ASSIGNMENT_STATE_FEATURE_KEY)
)

const selectPartnerTypeAssignmentFilters = createSelector(selectPartnerTypeAssignmentState, (state) => state.filters)
const selectPartnerTypeAssignmentRemotePagination = createSelector(selectPartnerTypeAssignmentState, (state) => state.partnerTypeAssignmentsRemotePagination)
const selectPartnerTypeAssignmentRemoteState = createSelector(selectPartnerTypeAssignmentState, selectRemoteState)

const selectSelectedPartnerTypeAssignmentId = createSelector(selectPartnerTypeAssignmentState, (state) => state.selectedPartnerTypeAssignmentId)

const partnerTypeAssignmentEntitySelectors = Reducers.partnerTypeAssignmentEntityAdapter.getSelectors()
const selectPartnerTypeAssignmentEntityState = createSelector(selectPartnerTypeAssignmentState, (state) => state.partnerTypeAssignments)
const selectPartnerTypeAssignmentIds = createSelector(selectPartnerTypeAssignmentEntityState, partnerTypeAssignmentEntitySelectors.selectIds)
const selectPartnerTypeAssignmentEntities = createSelector(selectPartnerTypeAssignmentEntityState, partnerTypeAssignmentEntitySelectors.selectEntities)
const selectAllPartnerTypeAssignments = createSelector(selectPartnerTypeAssignmentEntityState, partnerTypeAssignmentEntitySelectors.selectAll)
const selectPartnerTypeAssignmentTotal = createSelector(selectPartnerTypeAssignmentEntityState, partnerTypeAssignmentEntitySelectors.selectTotal)
const selectPartnerTypeAssignmentById = (id: string) => createSelector(selectPartnerTypeAssignmentEntities, (entities) => entities[id])

const selectedPartnerTypeAssignment = createSelector(
    selectPartnerTypeAssignmentEntities,
    selectSelectedPartnerTypeAssignmentId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectPartnerTypeAssignmentsForSelectedPartner = createSelector(
    PartnerSelectors.selectSelectedPartnerId,
    selectAllPartnerTypeAssignments,
    (selectedPartnerId, partnerTypeAssignments) => partnerTypeAssignments.filter(partnerTypeAssignment => partnerTypeAssignment.partnerId === selectedPartnerId)
)

const selectPartnerTypeAssignmentsForPartner = (partnerId: string) => createSelector(
    selectAllPartnerTypeAssignments,
    (partnerTypeAssignments) => partnerTypeAssignments.filter(partnerTypeAssignment => partnerTypeAssignment.partnerId === partnerId)
)

const selectPartnerTypeAssignmentsForSelectedPartnerType = createSelector(
    PartnerTypeSelectors.selectSelectedPartnerTypeId,
    selectAllPartnerTypeAssignments,
    (selectedPartnerTypeId, partnerTypeAssignments) => partnerTypeAssignments.filter(partnerTypeAssignment => partnerTypeAssignment.partnerTypeId === selectedPartnerTypeId)
)

const selectPartnerTypeAssignmentsForPartnerType = (partnerTypeId: string) => createSelector(
    selectAllPartnerTypeAssignments,
    (partnerTypeAssignments) => partnerTypeAssignments.filter(partnerTypeAssignment => partnerTypeAssignment.partnerTypeId === partnerTypeId)
)


const selectPartnerTypesForSelectedPartner = createSelector(
    PartnerSelectors.selectSelectedPartnerId,
    selectAllPartnerTypeAssignments,
    PartnerTypeSelectors.selectAllPartnerTypes,
    (selectedPartnerId, partnerTypeAssignments, partnerTypes) => {
        const partnerTypeIds = partnerTypeAssignments
            .filter(assignment => assignment.partnerId  === selectedPartnerId)
            .map(partnerTypeAssignment => partnerTypeAssignment.partnerTypeId)
        return partnerTypes.filter(partnerType => partnerTypeIds.includes(partnerType.id))
    }
)

const selectPartnerTypesForPartner = (partnerId: string) => createSelector(
    selectAllPartnerTypeAssignments,
    PartnerTypeSelectors.selectAllPartnerTypes,
    (partnerTypeAssignments, partnerTypes) => {
        const partnerTypeIds = partnerTypeAssignments
            .filter(assignment => assignment.partnerId  === partnerId)
            .map(partnerTypeAssignment => partnerTypeAssignment.partnerTypeId)
        return partnerTypes.filter(partnerType => partnerTypeIds.includes(partnerType.id))
    }
)

const selectPartnersForSelectedPartnerType = createSelector(
    PartnerTypeSelectors.selectSelectedPartnerTypeId,
    selectAllPartnerTypeAssignments,
    PartnerSelectors.selectAllPartners,
    (selectedPartnerTypeId, partnerTypeAssignments, partners) => {
        const partnerIds = partnerTypeAssignments
            .filter(assignment => assignment.partnerTypeId  === selectedPartnerTypeId)
            .map(partnerTypeAssignment => partnerTypeAssignment.partnerId)
        return partners.filter(partner => partnerIds.includes(partner.id))
    }
)

const selectPartnersForPartnerType = (partnerTypeId: string) => createSelector(
    selectAllPartnerTypeAssignments,
    PartnerSelectors.selectAllPartners,
    (partnerTypeAssignments, partners) => {
        const partnerIds = partnerTypeAssignments
            .filter(assignment => assignment.partnerTypeId  === partnerTypeId)
            .map(partnerTypeAssignment => partnerTypeAssignment.partnerId)
        return partners.filter(partner => partnerIds.includes(partner.id))
    }
)

const selectFilteredPartnerTypeAssignments = createSelector(
    selectAllPartnerTypeAssignments,
    selectPartnerTypeAssignmentFilters,
    (partnerTypeAssignments, filters) => selectFilteredElements(partnerTypeAssignments, filters, Model.partnerTypeAssignmentFilterEntityMap)
)

const selectPaginatedPartnerTypeAssignments = createSelector(
    selectAllPartnerTypeAssignments,
    selectPartnerTypeAssignmentRemotePagination,
    (partnerTypeAssignments, pagination) => selectPaginatedElements(partnerTypeAssignments, pagination)
)

const selectPaginatedFilteredPartnerTypeAssignments = createSelector(
    selectFilteredPartnerTypeAssignments,
    selectPartnerTypeAssignmentRemotePagination,
    (partnerTypeAssignments, pagination) => selectPaginatedElements(partnerTypeAssignments, pagination)
)

export const PartnerTypeAssignmentSelectors = {
    selectPartnerTypeAssignmentState,
    selectPartnerTypeAssignmentFilters,
    selectPartnerTypeAssignmentRemotePagination,
    selectPartnerTypeAssignmentRemoteState,

    selectSelectedPartnerTypeAssignmentId,

    partnerTypeAssignmentEntitySelectors,
    selectPartnerTypeAssignmentEntityState,
    selectPartnerTypeAssignmentIds,
    selectPartnerTypeAssignmentEntities,
    selectAllPartnerTypeAssignments,
    selectPartnerTypeAssignmentTotal,
    selectPartnerTypeAssignmentById,
    selectedPartnerTypeAssignment,
    selectPartnerTypeAssignmentsForSelectedPartner,
    selectPartnerTypeAssignmentsForPartner,
    selectPartnerTypeAssignmentsForSelectedPartnerType,
    selectPartnerTypeAssignmentsForPartnerType,

    selectPartnerTypesForSelectedPartner,
    selectPartnerTypesForPartner,
    selectPartnersForSelectedPartnerType,
    selectPartnersForPartnerType,

    selectFilteredPartnerTypeAssignments,
    selectPaginatedPartnerTypeAssignments,
    selectPaginatedFilteredPartnerTypeAssignments
}