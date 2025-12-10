import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { Model } from '../../model'
// import { PartnerSelectors } from './partner.selectors'

const selectPartnerTypeState = createFeatureSelector<Reducers.PartnerTypeFeatureState>(
    createNamespacedFeatureKey(Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER, Identifiers.PARTNER_TYPE_STATE_FEATURE_KEY)
)

const selectPartnerTypeFilters = createSelector(selectPartnerTypeState, (state) => state.filters)
const selectPartnerTypeRemotePagination = createSelector(selectPartnerTypeState, (state) => state.partnerTypesRemotePagination)
const selectPartnerTypeRemoteState = createSelector(selectPartnerTypeState, selectRemoteState)

const selectSelectedPartnerTypeId = createSelector(selectPartnerTypeState, (state) => state.selectedPartnerTypeId)

const partnerTypeEntitySelectors = Reducers.partnerTypeEntityAdapter.getSelectors()
const selectPartnerTypeEntityState = createSelector(selectPartnerTypeState, (state) => state.partnerTypes)
const selectPartnerTypeIds = createSelector(selectPartnerTypeEntityState, partnerTypeEntitySelectors.selectIds)
const selectPartnerTypeEntities = createSelector(selectPartnerTypeEntityState, partnerTypeEntitySelectors.selectEntities)
const selectAllPartnerTypes = createSelector(selectPartnerTypeEntityState, partnerTypeEntitySelectors.selectAll)
const selectPartnerTypeTotal = createSelector(selectPartnerTypeEntityState, partnerTypeEntitySelectors.selectTotal)
const selectPartnerTypeById = (id: string) => createSelector(selectPartnerTypeEntities, (entities) => entities[id])

const selectedPartnerType = createSelector(
    selectPartnerTypeEntities,
    selectSelectedPartnerTypeId,
    (entities, selectedId) => entities[selectedId ?? '']
)

// const selectPartnerTypesForSelectedPartner = createSelector(
//     PartnerSelectors.selectSelectedPartnerId,
//     selectAllPartnerTypes,
//     (selectedPartnerId, partnerTypes) => partnerTypes.filter(partnerType => partnerType.partnerId === selectedPartnerId)
// )

// const selectPartnerTypesForPartner = (partnerId: string) => createSelector(
//     selectAllPartnerTypes,
//     (partnerTypes) => partnerTypes.filter(partnerType => partnerType.partnerId === partnerId)
// )

const selectFilteredPartnerTypes = createSelector(
    selectAllPartnerTypes,
    selectPartnerTypeFilters,
    (partnerTypes, filters) => selectFilteredElements(partnerTypes, filters, Model.partnerTypeFilterEntityMap)
)

const selectPaginatedPartnerTypes = createSelector(
    selectAllPartnerTypes,
    selectPartnerTypeRemotePagination,
    (partnerTypes, pagination) => selectPaginatedElements(partnerTypes, pagination)
)

const selectPaginatedFilteredPartnerTypes = createSelector(
    selectFilteredPartnerTypes,
    selectPartnerTypeRemotePagination,
    (partnerTypes, pagination) => selectPaginatedElements(partnerTypes, pagination)
)

export const PartnerTypeSelectors = {
    selectPartnerTypeState,
    selectPartnerTypeFilters,
    selectPartnerTypeRemotePagination,
    selectPartnerTypeRemoteState,

    selectSelectedPartnerTypeId,

    partnerTypeEntitySelectors,
    selectPartnerTypeEntityState,
    selectPartnerTypeIds,
    selectPartnerTypeEntities,
    selectAllPartnerTypes,
    selectPartnerTypeTotal,
    selectPartnerTypeById,
    selectedPartnerType,
    // selectPartnerTypesForSelectedPartner,
    // selectPartnerTypesForPartner,

    selectFilteredPartnerTypes,
    selectPaginatedPartnerTypes,
    selectPaginatedFilteredPartnerTypes
}