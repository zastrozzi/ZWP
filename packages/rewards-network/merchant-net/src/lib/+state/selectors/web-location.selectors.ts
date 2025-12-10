import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectRemoteState } from '@zwp/platform.common'
import { MerchantSelectors } from './merchant.selectors'
import { BrandSelectors } from './brand.selectors'

const selectWebLocationState = createFeatureSelector<Reducers.WebLocationFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
        Identifiers.WEB_LOCATION_STATE_FEATURE_KEY
    )
)
const selectWebLocationFilters = createSelector(selectWebLocationState, (state) => state.filters)
const selectWebLocationRemotePagination = createSelector(selectWebLocationState, (state) => state.webLocationsRemotePagination)
const selectWebLocationRemoteState = createSelector(selectWebLocationState, selectRemoteState)

const selectSelectedWebLocationId = createSelector(selectWebLocationState, (state) => state.selectedWebLocationId)

const webLocationEntitySelectors = Reducers.webLocationEntityAdapter.getSelectors()
const selectWebLocationEntityState = createSelector(selectWebLocationState, (state) => state.webLocations)
const selectWebLocationIds = createSelector(selectWebLocationEntityState, webLocationEntitySelectors.selectIds)
const selectWebLocationEntities = createSelector(selectWebLocationEntityState, webLocationEntitySelectors.selectEntities)
const selectAllWebLocations = createSelector(selectWebLocationEntityState, webLocationEntitySelectors.selectAll)
const selectWebLocationTotal = createSelector(selectWebLocationEntityState, webLocationEntitySelectors.selectTotal)
const selectWebLocationById = (id: string) => createSelector(selectWebLocationEntities, (entities) => entities[id])

const selectedWebLocation = createSelector(
    selectWebLocationEntities,
    selectSelectedWebLocationId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectWebLocationsForSelectedMerchant = createSelector(
    MerchantSelectors.selectSelectedMerchantId,
    selectAllWebLocations,
    (merchantId, webLocations) => webLocations.filter(webLocation => webLocation.merchantId === merchantId)
)

const selectWebLocationsForSelectedBrand = createSelector(
    BrandSelectors.selectedBrand,
    selectAllWebLocations,
    (brand, webLocations) => webLocations.filter(webLocation => webLocation.merchantId === brand?.merchantId)
)

// const selectWebLocationsForSelectedBrand = createSelector(
//     BrandSelectors.selectSelectedBrandId,
//     selectAllWebLocations,
//     (brandId, webLocations) => webLocations.filter(webLocation => webLocation.brandId === brandId)
// )

export const WebLocationSelectors = {
    selectWebLocationState,
    selectWebLocationFilters,
    selectWebLocationRemotePagination,
    selectWebLocationRemoteState,

    selectSelectedWebLocationId,
    
    webLocationEntitySelectors,
    selectWebLocationEntityState,
    selectWebLocationIds,
    selectWebLocationEntities,
    selectAllWebLocations,
    selectWebLocationTotal,
    selectWebLocationById,
    selectedWebLocation,

    selectWebLocationsForSelectedMerchant
}
