import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { MerchantSelectors } from './merchant.selectors'
import { Model } from '../../model'

const selectLoyaltyCardSchemeState = createFeatureSelector<Reducers.LoyaltyCardSchemeFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
        Identifiers.LOYALTY_CARD_SCHEME_STATE_FEATURE_KEY
    )
)
const selectLoyaltyCardSchemeFilters = createSelector(selectLoyaltyCardSchemeState, (state) => state.filters)
const selectLoyaltyCardSchemeRemotePagination = createSelector(selectLoyaltyCardSchemeState, (state) => state.loyaltyCardSchemesRemotePagination)
const selectLoyaltyCardSchemeRemoteState = createSelector(selectLoyaltyCardSchemeState, selectRemoteState)

const selectSelectedLoyaltyCardSchemeId = createSelector(selectLoyaltyCardSchemeState, (state) => state.selectedLoyaltyCardSchemeId)

const loyaltyCardSchemeEntitySelectors = Reducers.loyaltyCardSchemeEntityAdapter.getSelectors()
const selectLoyaltyCardSchemeEntityState = createSelector(selectLoyaltyCardSchemeState, (state) => state.loyaltyCardSchemes)
const selectLoyaltyCardSchemeIds = createSelector(selectLoyaltyCardSchemeEntityState, loyaltyCardSchemeEntitySelectors.selectIds)
const selectLoyaltyCardSchemeEntities = createSelector(selectLoyaltyCardSchemeEntityState, loyaltyCardSchemeEntitySelectors.selectEntities)
const selectAllLoyaltyCardSchemes = createSelector(selectLoyaltyCardSchemeEntityState, loyaltyCardSchemeEntitySelectors.selectAll)
const selectLoyaltyCardSchemeTotal = createSelector(selectLoyaltyCardSchemeEntityState, loyaltyCardSchemeEntitySelectors.selectTotal)
const selectLoyaltyCardSchemeById = (id: string) => createSelector(selectLoyaltyCardSchemeEntities, (entities) => entities[id])

const selectedLoyaltyCardScheme = createSelector(
    selectLoyaltyCardSchemeEntities,
    selectSelectedLoyaltyCardSchemeId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectLoyaltyCardSchemesForSelectedMerchant = createSelector(
    MerchantSelectors.selectSelectedMerchantId,
    selectAllLoyaltyCardSchemes,
    (merchantId, loyaltyCardSchemes) => {
        return loyaltyCardSchemes.filter(loyaltyCardScheme => loyaltyCardScheme.merchantId === merchantId)
    }
)

const selectLoyaltyCardSchemesForMerchant = (merchantId: string) => createSelector(
    selectAllLoyaltyCardSchemes,
    (loyaltyCardSchemes) => {
        return loyaltyCardSchemes.filter(loyaltyCardScheme => loyaltyCardScheme.merchantId === merchantId)
    }
)



const selectFilteredLoyaltyCardSchemes = createSelector(
    selectAllLoyaltyCardSchemes,
    selectLoyaltyCardSchemeFilters,
    (loyaltyCardSchemes, filters) => selectFilteredElements(loyaltyCardSchemes, filters, Model.Filters.loyaltyCardSchemeFilterEntityMap)
)

const selectPaginatedLoyaltyCardSchemes = createSelector(
    selectAllLoyaltyCardSchemes,
    selectLoyaltyCardSchemeRemotePagination,
    (loyaltyCardSchemes, pagination) => selectPaginatedElements(loyaltyCardSchemes, pagination)
)

const selectPaginatedFilteredLoyaltyCardSchemes = createSelector(
    selectFilteredLoyaltyCardSchemes,
    selectLoyaltyCardSchemeRemotePagination,
    (loyaltyCardSchemes, pagination) => selectPaginatedElements(loyaltyCardSchemes, pagination)
)



const selectFilteredLoyaltyCardSchemesForSelectedMerchant = createSelector(
    selectLoyaltyCardSchemesForSelectedMerchant,
    selectLoyaltyCardSchemeFilters,
    (loyaltyCardSchemes, filters) => selectFilteredElements(loyaltyCardSchemes, filters, Model.Filters.loyaltyCardSchemeFilterEntityMap)
)

const selectPaginatedFilteredLoyaltyCardSchemesForSelectedMerchant = createSelector(
    selectFilteredLoyaltyCardSchemesForSelectedMerchant,
    selectLoyaltyCardSchemeRemotePagination,
    (loyaltyCardSchemes, pagination) => selectPaginatedElements(loyaltyCardSchemes, pagination)
)

const selectFilteredLoyaltyCardSchemesForMerchant = (merchantId: string) => createSelector(
    selectLoyaltyCardSchemesForMerchant(merchantId),
    selectLoyaltyCardSchemeFilters,
    (loyaltyCardSchemes, filters) => selectFilteredElements(loyaltyCardSchemes, filters, Model.Filters.loyaltyCardSchemeFilterEntityMap)
)

const selectPaginatedFilteredLoyaltyCardSchemesForMerchant = (merchantId: string) => createSelector(
    selectFilteredLoyaltyCardSchemesForMerchant(merchantId),
    selectLoyaltyCardSchemeRemotePagination,
    (loyaltyCardSchemes, pagination) => selectPaginatedElements(loyaltyCardSchemes, pagination)
)


export const LoyaltyCardSchemeSelectors = {
    selectLoyaltyCardSchemeState,
    selectLoyaltyCardSchemeFilters,
    selectLoyaltyCardSchemeRemotePagination,
    selectLoyaltyCardSchemeRemoteState,

    selectSelectedLoyaltyCardSchemeId,
    
    loyaltyCardSchemeEntitySelectors,
    selectLoyaltyCardSchemeEntityState,
    selectLoyaltyCardSchemeIds,
    selectLoyaltyCardSchemeEntities,
    selectAllLoyaltyCardSchemes,
    selectLoyaltyCardSchemeTotal,
    selectLoyaltyCardSchemeById,
    selectedLoyaltyCardScheme,

    selectLoyaltyCardSchemesForSelectedMerchant,
    selectLoyaltyCardSchemesForMerchant,
    
    selectFilteredLoyaltyCardSchemes,
    selectPaginatedLoyaltyCardSchemes,
    selectPaginatedFilteredLoyaltyCardSchemes,
    
    selectFilteredLoyaltyCardSchemesForSelectedMerchant,
    selectPaginatedFilteredLoyaltyCardSchemesForSelectedMerchant,
    selectFilteredLoyaltyCardSchemesForMerchant,
    selectPaginatedFilteredLoyaltyCardSchemesForMerchant
}
