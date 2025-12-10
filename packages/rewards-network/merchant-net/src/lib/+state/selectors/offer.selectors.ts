import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectRemoteState } from '@zwp/platform.common'
import { MerchantSelectors } from './merchant.selectors'

const selectOfferState = createFeatureSelector<Reducers.OfferFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
        Identifiers.OFFER_STATE_FEATURE_KEY
    )
)
const selectOfferFilters = createSelector(selectOfferState, (state) => state.filters)
const selectOfferRemotePagination = createSelector(selectOfferState, (state) => state.offersRemotePagination)
const selectOfferRemoteState = createSelector(selectOfferState, selectRemoteState)

const selectSelectedOfferId = createSelector(selectOfferState, (state) => state.selectedOfferId)

const offerEntitySelectors = Reducers.offerEntityAdapter.getSelectors()
const selectOfferEntityState = createSelector(selectOfferState, (state) => state.offers)
const selectOfferIds = createSelector(selectOfferEntityState, offerEntitySelectors.selectIds)
const selectOfferEntities = createSelector(selectOfferEntityState, offerEntitySelectors.selectEntities)
const selectAllOffers = createSelector(selectOfferEntityState, offerEntitySelectors.selectAll)
const selectOfferTotal = createSelector(selectOfferEntityState, offerEntitySelectors.selectTotal)
const selectOfferById = (id: string) => createSelector(selectOfferEntities, (entities) => entities[id])

const selectedOffer = createSelector(
    selectOfferEntities,
    selectSelectedOfferId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectOffersForSelectedMerchant = createSelector(
    MerchantSelectors.selectSelectedMerchantId,
    selectAllOffers,
    (merchantId, offers) => offers.filter(offer => offer.merchantId === merchantId)
)

// const selectOffersForSelectedBrand = createSelector(
//     BrandSelectors.selectSelectedBrandId,
//     selectAllOffers,
//     (brandId, offers) => offers.filter(offer => offer.brandId === brandId)
// )

export const OfferSelectors = {
    selectOfferState,
    selectOfferFilters,
    selectOfferRemotePagination,
    selectOfferRemoteState,

    selectSelectedOfferId,
    
    offerEntitySelectors,
    selectOfferEntityState,
    selectOfferIds,
    selectOfferEntities,
    selectAllOffers,
    selectOfferTotal,
    selectOfferById,
    selectedOffer,

    selectOffersForSelectedMerchant
}
