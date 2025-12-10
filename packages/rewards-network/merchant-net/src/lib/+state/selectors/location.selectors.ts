import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectRemoteState } from '@zwp/platform.common'
import { MerchantSelectors } from './merchant.selectors'

const selectLocationState = createFeatureSelector<Reducers.LocationFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
        Identifiers.LOCATION_STATE_FEATURE_KEY
    )
)
const selectLocationFilters = createSelector(selectLocationState, (state) => state.filters)
const selectLocationRemotePagination = createSelector(selectLocationState, (state) => state.locationsRemotePagination)
const selectLocationRemoteState = createSelector(selectLocationState, selectRemoteState)

const selectSelectedLocationId = createSelector(selectLocationState, (state) => state.selectedLocationId)

const locationEntitySelectors = Reducers.locationEntityAdapter.getSelectors()
const selectLocationEntityState = createSelector(selectLocationState, (state) => state.locations)
const selectLocationIds = createSelector(selectLocationEntityState, locationEntitySelectors.selectIds)
const selectLocationEntities = createSelector(selectLocationEntityState, locationEntitySelectors.selectEntities)
const selectAllLocations = createSelector(selectLocationEntityState, locationEntitySelectors.selectAll)
const selectLocationTotal = createSelector(selectLocationEntityState, locationEntitySelectors.selectTotal)
const selectLocationById = (id: string) => createSelector(selectLocationEntities, (entities) => entities[id])

const selectedLocation = createSelector(
    selectLocationEntities,
    selectSelectedLocationId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectLocationsForSelectedMerchant = createSelector(
    MerchantSelectors.selectSelectedMerchantId,
    selectAllLocations,
    (merchantId, locations) => locations.filter(location => location.merchantId === merchantId)
)

// const selectLocationsForSelectedBrand = createSelector(
//     BrandSelectors.selectSelectedBrandId,
//     selectAllLocations,
//     (brandId, locations) => locations.filter(location => location.brandId === brandId)
// )

export const LocationSelectors = {
    selectLocationState,
    selectLocationFilters,
    selectLocationRemotePagination,
    selectLocationRemoteState,

    selectSelectedLocationId,
    
    locationEntitySelectors,
    selectLocationEntityState,
    selectLocationIds,
    selectLocationEntities,
    selectAllLocations,
    selectLocationTotal,
    selectLocationById,
    selectedLocation,

    selectLocationsForSelectedMerchant
}
