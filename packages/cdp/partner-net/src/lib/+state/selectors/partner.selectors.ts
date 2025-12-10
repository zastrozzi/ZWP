import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { Model } from '../../model'

const selectPartnerState = createFeatureSelector<Reducers.PartnerFeatureState>(
    createNamespacedFeatureKey(Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER, Identifiers.PARTNER_STATE_FEATURE_KEY)
)

const selectPartnerFilters = createSelector(selectPartnerState, (state) => state.filters)
const selectPartnerRemotePagination = createSelector(selectPartnerState, (state) => state.partnersRemotePagination)
const selectPartnerRemoteState = createSelector(selectPartnerState, selectRemoteState)

const selectSelectedPartnerId = createSelector(selectPartnerState, (state) => state.selectedPartnerId)

const partnerEntitySelectors = Reducers.partnerEntityAdapter.getSelectors()
const selectPartnerEntityState = createSelector(selectPartnerState, (state) => state.partners)
const selectPartnerIds = createSelector(selectPartnerEntityState, partnerEntitySelectors.selectIds)
const selectPartnerEntities = createSelector(selectPartnerEntityState, partnerEntitySelectors.selectEntities)
const selectAllPartners = createSelector(selectPartnerEntityState, partnerEntitySelectors.selectAll)
const selectPartnerTotal = createSelector(selectPartnerEntityState, partnerEntitySelectors.selectTotal)
const selectPartnerById = (id: string) => createSelector(selectPartnerEntities, (entities) => entities[id])

const selectedPartner = createSelector(
    selectPartnerEntities,
    selectSelectedPartnerId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectFilteredPartners = createSelector(
    selectAllPartners,
    selectPartnerFilters,
    (partners, filters) => selectFilteredElements(partners, filters, Model.partnerFilterEntityMap)
)

const selectPaginatedPartners = createSelector(
    selectAllPartners,
    selectPartnerRemotePagination,
    (partners, pagination) => selectPaginatedElements(partners, pagination)
)

const selectPaginatedFilteredPartners = createSelector(
    selectFilteredPartners,
    selectPartnerRemotePagination,
    (partners, pagination) => selectPaginatedElements(partners, pagination)
)

export const PartnerSelectors = {
    selectPartnerState,
    selectPartnerFilters,
    selectPartnerRemotePagination,
    selectPartnerRemoteState,

    selectSelectedPartnerId,

    partnerEntitySelectors,
    selectPartnerEntityState,
    selectPartnerIds,
    selectPartnerEntities,
    selectAllPartners,
    selectPartnerTotal,
    selectPartnerById,
    selectedPartner,

    selectFilteredPartners,
    selectPaginatedPartners,
    selectPaginatedFilteredPartners
}