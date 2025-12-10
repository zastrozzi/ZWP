import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../../identifiers'
import { Reducers } from '../../reducers'
import { createNamespacedFeatureKey, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { Model } from '../../../model'
import { EnduserSelectors } from './enduser.selectors'

const selectEnduserAddressState = createFeatureSelector<Reducers.EnduserAddressFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
        Identifiers.ENDUSER_ADDRESS_STATE_FEATURE_KEY
    )
)
const selectEnduserAddressEntityState = createSelector(selectEnduserAddressState, (state) => state.enduserAddresses)
const selectEnduserAddressFilters = createSelector(selectEnduserAddressState, (state) => state.filters)
const selectEnduserAddressRemotePagination = createSelector(selectEnduserAddressState, (state) => state.enduserAddressesRemotePagination)
const selectEnduserAddressRemoteState = createSelector(selectEnduserAddressState, selectRemoteState)
const selectSelectedEnduserAddressId = createSelector(selectEnduserAddressState, (state) => state.selectedEnduserAddressId)
const enduserAddressEntitySelectors = Reducers.enduserAddressEntityAdapter.getSelectors()

const selectEnduserAddressIds = createSelector(selectEnduserAddressEntityState, enduserAddressEntitySelectors.selectIds)
const selectEnduserAddressEntities = createSelector(selectEnduserAddressEntityState, enduserAddressEntitySelectors.selectEntities)
const selectAllEnduserAddresses = createSelector(selectEnduserAddressEntityState, enduserAddressEntitySelectors.selectAll)
const selectEnduserAddressTotal = createSelector(selectEnduserAddressEntityState, enduserAddressEntitySelectors.selectTotal)
const selectEnduserAddressById = (id: string) => createSelector(selectEnduserAddressEntities, (entities) => entities[id])

const selectFilteredEnduserAddresses = createSelector(
    selectAllEnduserAddresses,
    selectEnduserAddressFilters,
    (addresses, filters) => selectFilteredElements(addresses, filters, Model.Filters.enduserAddressFilterEntityMap)
)

const selectPaginatedEnduserAddresses = createSelector(
    selectAllEnduserAddresses,
    selectEnduserAddressRemotePagination,
    (addresses, pagination) => selectPaginatedElements(addresses, pagination)
)

const selectPaginatedFilteredEnduserAddresses = createSelector(
    selectFilteredEnduserAddresses,
    selectEnduserAddressRemotePagination,
    (addresses, pagination) => selectPaginatedElements(addresses, pagination)
)

const selectEnduserAddressesForSelectedEnduser = createSelector(
    EnduserSelectors.selectSelectedEnduserId,
    selectAllEnduserAddresses,
    (selectedEnduserId, addresses) => addresses.filter(address => address.enduserId === selectedEnduserId)
)

const selectEnduserAddressesForEnduser = (enduserId: string) => createSelector(
    selectAllEnduserAddresses,
    (addresses) => addresses.filter(address => address.enduserId === enduserId)
)

const selectFilteredEnduserAddressesForSelectedEnduser = createSelector(
    selectEnduserAddressesForSelectedEnduser,
    selectEnduserAddressFilters,
    (addresses, filters) => selectFilteredElements(addresses, filters, Model.Filters.enduserAddressFilterEntityMap)
)

const selectPaginatedEnduserAddressesForSelectedEnduser = createSelector(
    selectEnduserAddressesForSelectedEnduser,
    selectEnduserAddressRemotePagination,
    (addresses, pagination) => selectPaginatedElements(addresses, pagination)
)

const selectPaginatedFilteredEnduserAddressesForSelectedEnduser = createSelector(
    selectFilteredEnduserAddressesForSelectedEnduser,
    selectEnduserAddressRemotePagination,
    (addresses, pagination) => selectPaginatedElements(addresses, pagination)
)

const selectedEnduserAddress = createSelector(
    selectEnduserAddressEntities,
    selectSelectedEnduserAddressId,
    (entities, selectedId) => selectedId && entities[selectedId]
)

export const EnduserAddressSelectors = {
    selectEnduserAddressState,
    selectEnduserAddressEntityState,
    selectEnduserAddressFilters,
    selectEnduserAddressRemotePagination,
    selectEnduserAddressRemoteState,
    selectSelectedEnduserAddressId,
    enduserAddressEntitySelectors,
    selectEnduserAddressIds,
    selectEnduserAddressEntities,
    selectAllEnduserAddresses,
    selectEnduserAddressTotal,
    selectEnduserAddressById,
    selectFilteredEnduserAddresses,
    selectPaginatedEnduserAddresses,
    selectPaginatedFilteredEnduserAddresses,
    selectEnduserAddressesForSelectedEnduser,
    selectEnduserAddressesForEnduser,
    selectFilteredEnduserAddressesForSelectedEnduser,
    selectPaginatedEnduserAddressesForSelectedEnduser,
    selectPaginatedFilteredEnduserAddressesForSelectedEnduser,
    selectedEnduserAddress
}