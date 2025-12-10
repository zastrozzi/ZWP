import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectRemoteState } from '@zwp/platform.common'
import { OfferLayoutSelectors } from './offer-layout.selectors'

const selectOfferLayoutElementState = createFeatureSelector<Reducers.OfferLayoutElementFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
        Identifiers.OFFER_LAYOUT_ELEMENT_STATE_FEATURE_KEY
    )
)
const selectOfferLayoutElementFilters = createSelector(selectOfferLayoutElementState, (state) => state.filters)
const selectOfferLayoutElementRemotePagination = createSelector(selectOfferLayoutElementState, (state) => state.offerLayoutElementsRemotePagination)
const selectOfferLayoutElementRemoteState = createSelector(selectOfferLayoutElementState, selectRemoteState)

const selectSelectedOfferLayoutElementId = createSelector(selectOfferLayoutElementState, (state) => state.selectedOfferLayoutElementId)

const offerLayoutElementEntitySelectors = Reducers.offerLayoutElementEntityAdapter.getSelectors()
const selectOfferLayoutElementEntityState = createSelector(selectOfferLayoutElementState, (state) => state.offerLayoutElements)
const selectOfferLayoutElementIds = createSelector(selectOfferLayoutElementEntityState, offerLayoutElementEntitySelectors.selectIds)
const selectOfferLayoutElementEntities = createSelector(selectOfferLayoutElementEntityState, offerLayoutElementEntitySelectors.selectEntities)
const selectAllOfferLayoutElements = createSelector(selectOfferLayoutElementEntityState, offerLayoutElementEntitySelectors.selectAll)
const selectOfferLayoutElementTotal = createSelector(selectOfferLayoutElementEntityState, offerLayoutElementEntitySelectors.selectTotal)
const selectOfferLayoutElementById = (id: string) => createSelector(selectOfferLayoutElementEntities, (entities) => entities[id])

const selectedOfferLayoutElement = createSelector(
    selectOfferLayoutElementEntities,
    selectSelectedOfferLayoutElementId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectOfferLayoutElementsForSelectedOfferLayout = createSelector(
    OfferLayoutSelectors.selectSelectedOfferLayoutId,
    selectAllOfferLayoutElements,
    (offerLayoutId, offerLayoutElements) => offerLayoutElements.filter(offerLayoutElement => offerLayoutElement.layoutId === offerLayoutId)
)

// const selectOfferLayoutElementsForSelectedBrand = createSelector(
//     BrandSelectors.selectSelectedBrandId,
//     selectAllOfferLayoutElements,
//     (brandId, offerLayoutElements) => offerLayoutElements.filter(offerLayoutElement => offerLayoutElement.brandId === brandId)
// )

export const OfferLayoutElementSelectors = {
    selectOfferLayoutElementState,
    selectOfferLayoutElementFilters,
    selectOfferLayoutElementRemotePagination,
    selectOfferLayoutElementRemoteState,

    selectSelectedOfferLayoutElementId,
    
    offerLayoutElementEntitySelectors,
    selectOfferLayoutElementEntityState,
    selectOfferLayoutElementIds,
    selectOfferLayoutElementEntities,
    selectAllOfferLayoutElements,
    selectOfferLayoutElementTotal,
    selectOfferLayoutElementById,
    selectedOfferLayoutElement,

    selectOfferLayoutElementsForSelectedOfferLayout
}
