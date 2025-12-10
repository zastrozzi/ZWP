import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectRemoteState } from '@zwp/platform.common'
import { OfferSelectors } from './offer.selectors'

const selectOfferLayoutState = createFeatureSelector<Reducers.OfferLayoutFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
        Identifiers.OFFER_LAYOUT_STATE_FEATURE_KEY
    )
)
const selectOfferLayoutFilters = createSelector(selectOfferLayoutState, (state) => state.filters)
const selectOfferLayoutRemotePagination = createSelector(selectOfferLayoutState, (state) => state.offerLayoutsRemotePagination)
const selectOfferLayoutRemoteState = createSelector(selectOfferLayoutState, selectRemoteState)

const selectSelectedOfferLayoutId = createSelector(selectOfferLayoutState, (state) => state.selectedOfferLayoutId)

const offerLayoutEntitySelectors = Reducers.offerLayoutEntityAdapter.getSelectors()
const selectOfferLayoutEntityState = createSelector(selectOfferLayoutState, (state) => state.offerLayouts)
const selectOfferLayoutIds = createSelector(selectOfferLayoutEntityState, offerLayoutEntitySelectors.selectIds)
const selectOfferLayoutEntities = createSelector(selectOfferLayoutEntityState, offerLayoutEntitySelectors.selectEntities)
const selectAllOfferLayouts = createSelector(selectOfferLayoutEntityState, offerLayoutEntitySelectors.selectAll)
const selectOfferLayoutTotal = createSelector(selectOfferLayoutEntityState, offerLayoutEntitySelectors.selectTotal)
const selectOfferLayoutById = (id: string) => createSelector(selectOfferLayoutEntities, (entities) => entities[id])

const selectedOfferLayout = createSelector(
    selectOfferLayoutEntities,
    selectSelectedOfferLayoutId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectOfferLayoutsForSelectedOffer = createSelector(
    OfferSelectors.selectSelectedOfferId,
    selectAllOfferLayouts,
    (offerId, offerLayouts) => offerLayouts.filter(offerLayout => offerLayout.offerId === offerId)
)

// const selectOfferLayoutsForSelectedBrand = createSelector(
//     BrandSelectors.selectSelectedBrandId,
//     selectAllOfferLayouts,
//     (brandId, offerLayouts) => offerLayouts.filter(offerLayout => offerLayout.brandId === brandId)
// )

export const OfferLayoutSelectors = {
    selectOfferLayoutState,
    selectOfferLayoutFilters,
    selectOfferLayoutRemotePagination,
    selectOfferLayoutRemoteState,

    selectSelectedOfferLayoutId,
    
    offerLayoutEntitySelectors,
    selectOfferLayoutEntityState,
    selectOfferLayoutIds,
    selectOfferLayoutEntities,
    selectAllOfferLayouts,
    selectOfferLayoutTotal,
    selectOfferLayoutById,
    selectedOfferLayout,

    selectOfferLayoutsForSelectedOffer
}
