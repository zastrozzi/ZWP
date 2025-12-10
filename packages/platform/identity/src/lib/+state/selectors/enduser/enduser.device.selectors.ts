import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../../identifiers'
import { Reducers } from '../../reducers'
import { createNamespacedFeatureKey, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { Model } from '../../../model'
import { EnduserSelectors } from './enduser.selectors'

const selectEnduserDeviceState = createFeatureSelector<Reducers.EnduserDeviceFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
        Identifiers.ENDUSER_DEVICE_STATE_FEATURE_KEY
    )
)
const selectEnduserDeviceEntityState = createSelector(selectEnduserDeviceState, (state) => state.enduserDevices)
const selectEnduserDeviceFilters = createSelector(selectEnduserDeviceState, (state) => state.filters)
const selectEnduserDeviceRemotePagination = createSelector(selectEnduserDeviceState, (state) => state.enduserDevicesRemotePagination)
const selectEnduserDeviceRemoteState = createSelector(selectEnduserDeviceState, selectRemoteState)
const selectSelectedEnduserDeviceId = createSelector(selectEnduserDeviceState, (state) => state.selectedEnduserDeviceId)
const enduserDeviceEntitySelectors = Reducers.enduserDeviceEntityAdapter.getSelectors()

const selectEnduserDeviceIds = createSelector(selectEnduserDeviceEntityState, enduserDeviceEntitySelectors.selectIds)
const selectEnduserDeviceEntities = createSelector(selectEnduserDeviceEntityState, enduserDeviceEntitySelectors.selectEntities)
const selectAllEnduserDevices = createSelector(selectEnduserDeviceEntityState, enduserDeviceEntitySelectors.selectAll)
const selectEnduserDeviceTotal = createSelector(selectEnduserDeviceEntityState, enduserDeviceEntitySelectors.selectTotal)
const selectEnduserDeviceById = (id: string) => createSelector(selectEnduserDeviceEntities, (entities) => entities[id])

const selectFilteredEnduserDevices = createSelector(
    selectAllEnduserDevices,
    selectEnduserDeviceFilters,
    (devices, filters) => selectFilteredElements(devices, filters, Model.Filters.enduserDeviceFilterEntityMap)
)

const selectPaginatedEnduserDevices = createSelector(
    selectAllEnduserDevices,
    selectEnduserDeviceRemotePagination,
    (devices, pagination) => selectPaginatedElements(devices, pagination)
)

const selectPaginatedFilteredEnduserDevices = createSelector(
    selectFilteredEnduserDevices,
    selectEnduserDeviceRemotePagination,
    (devices, pagination) => selectPaginatedElements(devices, pagination)
)

const selectEnduserDevicesForSelectedEnduser = createSelector(
    EnduserSelectors.selectSelectedEnduserId,
    selectAllEnduserDevices,
    (selectedEnduserId, devices) => devices.filter(device => device.enduserId === selectedEnduserId)
)

const selectEnduserDevicesForEnduser = (enduserId: string) => createSelector(
    selectAllEnduserDevices,
    (devices) => devices.filter(device => device.enduserId === enduserId)
)

const selectFilteredEnduserDevicesForSelectedEnduser = createSelector(
    selectEnduserDevicesForSelectedEnduser,
    selectEnduserDeviceFilters,
    (devices, filters) => selectFilteredElements(devices, filters, Model.Filters.enduserDeviceFilterEntityMap)
)

const selectPaginatedEnduserDevicesForSelectedEnduser = createSelector(
    selectEnduserDevicesForSelectedEnduser,
    selectEnduserDeviceRemotePagination,
    (devices, pagination) => selectPaginatedElements(devices, pagination)
)

const selectPaginatedFilteredEnduserDevicesForSelectedEnduser = createSelector(
    selectFilteredEnduserDevicesForSelectedEnduser,
    selectEnduserDeviceRemotePagination,
    (devices, pagination) => selectPaginatedElements(devices, pagination)
)

const selectedEnduserDevice = createSelector(
    selectEnduserDeviceEntities,
    selectSelectedEnduserDeviceId,
    (entities, selectedId) => selectedId && entities[selectedId]
)

export const EnduserDeviceSelectors = {
    selectEnduserDeviceState,
    selectEnduserDeviceEntityState,
    selectEnduserDeviceFilters,
    selectEnduserDeviceRemotePagination,
    selectEnduserDeviceRemoteState,
    selectSelectedEnduserDeviceId,
    enduserDeviceEntitySelectors,
    selectEnduserDeviceIds,
    selectEnduserDeviceEntities,
    selectAllEnduserDevices,
    selectEnduserDeviceTotal,
    selectEnduserDeviceById,
    selectFilteredEnduserDevices,
    selectPaginatedEnduserDevices,
    selectPaginatedFilteredEnduserDevices,
    selectEnduserDevicesForSelectedEnduser,
    selectEnduserDevicesForEnduser,
    selectFilteredEnduserDevicesForSelectedEnduser,
    selectPaginatedEnduserDevicesForSelectedEnduser,
    selectPaginatedFilteredEnduserDevicesForSelectedEnduser,
    selectedEnduserDevice
}