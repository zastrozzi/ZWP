import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../../identifiers'
import { Reducers } from '../../reducers'
import { createNamespacedFeatureKey, selectRemoteState } from '@zwp/platform.common'

const selectEnduserAddressState = createFeatureSelector<Reducers.EnduserAddressFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.CDP_USERS_ACTION_IDENTIFIER,
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
    (addresses, filters) => addresses.filter(address => {
        let include = true
        if (filters.enduserId) {
            include = include && address.enduserId === filters.enduserId
        }
        return include
    })
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
    selectedEnduserAddress
}