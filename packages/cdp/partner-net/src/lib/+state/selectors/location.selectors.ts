import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { Model } from '../../model'
import { PartnerSelectors } from './partner.selectors'
import { SubgroupSelectors } from './subgroup.selectors'

const selectLocationState = createFeatureSelector<Reducers.LocationFeatureState>(
    createNamespacedFeatureKey(Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER, Identifiers.LOCATION_STATE_FEATURE_KEY)
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

const selectLocationsForSelectedPartner = createSelector(
    PartnerSelectors.selectSelectedPartnerId,
    selectAllLocations,
    (selectedPartnerId, locations) => locations.filter(location => location.partnerId === selectedPartnerId)
)

const selectLocationsForPartner = (partnerId: string) => createSelector(
    selectAllLocations,
    (locations) => locations.filter(location => location.partnerId === partnerId)
)

const selectLocationsForSelectedSubgroup = createSelector(
    SubgroupSelectors.selectSelectedSubgroupId,
    selectAllLocations,
    (selectedSubgroupId, locations) => locations.filter(location => location.subgroupId === selectedSubgroupId)
)

const selectLocationsForSubgroup = (subgroupId: string) => createSelector(
    selectAllLocations,
    (locations) => locations.filter(location => location.subgroupId === subgroupId)
)

const selectFilteredLocations = createSelector(
    selectAllLocations,
    selectLocationFilters,
    (locations, filters) => selectFilteredElements(locations, filters, Model.locationFilterEntityMap)
)

const selectPaginatedLocations = createSelector(
    selectAllLocations,
    selectLocationRemotePagination,
    (locations, pagination) => selectPaginatedElements(locations, pagination)
)

const selectPaginatedFilteredLocations = createSelector(
    selectFilteredLocations,
    selectLocationRemotePagination,
    (locations, pagination) => selectPaginatedElements(locations, pagination)
)

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
    selectLocationsForSelectedPartner,
    selectLocationsForPartner,
    selectLocationsForSelectedSubgroup,
    selectLocationsForSubgroup,

    selectFilteredLocations,
    selectPaginatedLocations,
    selectPaginatedFilteredLocations
}