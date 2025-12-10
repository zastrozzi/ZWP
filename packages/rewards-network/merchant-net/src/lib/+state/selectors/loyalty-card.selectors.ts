import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectRemoteState } from '@zwp/platform.common'
import { LoyaltyCardSchemeSelectors } from './loyalty-card-scheme.selectors'
import { CDPUsers } from '@zwp/cdp.users'
import { LoyaltyCardSchemeBrandSelectors } from './loyalty-card-scheme-brand.selectors'

const selectLoyaltyCardState = createFeatureSelector<Reducers.LoyaltyCardFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
        Identifiers.LOYALTY_CARD_STATE_FEATURE_KEY
    )
)
const selectLoyaltyCardFilters = createSelector(selectLoyaltyCardState, (state) => state.filters)
const selectLoyaltyCardRemotePagination = createSelector(selectLoyaltyCardState, (state) => state.loyaltyCardsRemotePagination)
const selectLoyaltyCardRemoteState = createSelector(selectLoyaltyCardState, selectRemoteState)

const selectSelectedLoyaltyCardId = createSelector(selectLoyaltyCardState, (state) => state.selectedLoyaltyCardId)

const loyaltyCardEntitySelectors = Reducers.loyaltyCardEntityAdapter.getSelectors()
const selectLoyaltyCardEntityState = createSelector(selectLoyaltyCardState, (state) => state.loyaltyCards)
const selectLoyaltyCardIds = createSelector(selectLoyaltyCardEntityState, loyaltyCardEntitySelectors.selectIds)
const selectLoyaltyCardEntities = createSelector(selectLoyaltyCardEntityState, loyaltyCardEntitySelectors.selectEntities)
const selectAllLoyaltyCards = createSelector(selectLoyaltyCardEntityState, loyaltyCardEntitySelectors.selectAll)
const selectLoyaltyCardTotal = createSelector(selectLoyaltyCardEntityState, loyaltyCardEntitySelectors.selectTotal)
const selectLoyaltyCardById = (id: string) => createSelector(selectLoyaltyCardEntities, (entities) => entities[id])

const selectedLoyaltyCard = createSelector(
    selectLoyaltyCardEntities,
    selectSelectedLoyaltyCardId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectLoyaltyCardsForSelectedBrand = createSelector(
    LoyaltyCardSchemeBrandSelectors.selectLoyaltyCardSchemesForSelectedBrand,
    selectAllLoyaltyCards,
    (loyaltyCardSchemes, loyaltyCards) => loyaltyCards.filter(loyaltyCard => loyaltyCardSchemes.some(scheme => scheme.id === loyaltyCard.cardSchemeId))
)

const selectLoyaltyCardsForSelectedMerchant = createSelector(
    LoyaltyCardSchemeSelectors.selectLoyaltyCardSchemesForSelectedMerchant,
    selectAllLoyaltyCards,
    (loyaltyCardSchemes, loyaltyCards) => loyaltyCards.filter(loyaltyCard => loyaltyCardSchemes.some(scheme => scheme.id === loyaltyCard.cardSchemeId))
)

const selectLoyaltyCardsForSelectedLoyaltyCardScheme = createSelector(
    LoyaltyCardSchemeSelectors.selectSelectedLoyaltyCardSchemeId,
    selectAllLoyaltyCards,
    (loyaltyCardSchemeId, loyaltyCards) => loyaltyCards.filter(loyaltyCard => loyaltyCard.cardSchemeId === loyaltyCardSchemeId)
)

const selectLoyaltyCardsForSelectedEnduser = createSelector(
    CDPUsers.State.Selectors.EnduserSelectors.selectSelectedEnduserId,
    selectAllLoyaltyCards,
    (userId, loyaltyCards) => loyaltyCards.filter(loyaltyCard => loyaltyCard.enduserId === userId)
)

export const LoyaltyCardSelectors = {
    selectLoyaltyCardState,
    selectLoyaltyCardFilters,
    selectLoyaltyCardRemotePagination,
    selectLoyaltyCardRemoteState,

    selectSelectedLoyaltyCardId,
    
    loyaltyCardEntitySelectors,
    selectLoyaltyCardEntityState,
    selectLoyaltyCardIds,
    selectLoyaltyCardEntities,
    selectAllLoyaltyCards,
    selectLoyaltyCardTotal,
    selectLoyaltyCardById,
    selectedLoyaltyCard,

    selectLoyaltyCardsForSelectedBrand,
    selectLoyaltyCardsForSelectedEnduser,
    selectLoyaltyCardsForSelectedMerchant,
    selectLoyaltyCardsForSelectedLoyaltyCardScheme
}