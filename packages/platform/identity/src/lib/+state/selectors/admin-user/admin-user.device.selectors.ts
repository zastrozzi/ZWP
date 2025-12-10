import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../../identifiers'
import { Reducers } from '../../reducers'
import { AdminUserSelectors } from './admin-user.selectors'
import { createNamespacedFeatureKey, isNull, Nullable, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { Model } from '../../../model'

const selectAdminUserDeviceState = createFeatureSelector<Reducers.AdminUserDeviceFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
        Identifiers.ADMIN_USER_DEVICE_STATE_FEATURE_KEY
    )
)
const selectAdminUserDeviceFilters = createSelector(selectAdminUserDeviceState, (state) => state.filters)
const selectAdminUserDeviceRemotePagination = createSelector(selectAdminUserDeviceState, (state) => state.adminUserDevicesRemotePagination)
const selectAdminUserDeviceRemoteState = createSelector(selectAdminUserDeviceState, selectRemoteState)

const selectSelectedAdminUserDeviceId = createSelector(selectAdminUserDeviceState, (state) => state.selectedAdminUserDeviceId)
const adminUserDeviceEntitySelectors = Reducers.adminUserDeviceEntityAdapter.getSelectors()
const selectAdminUserDeviceEntityState = createSelector(selectAdminUserDeviceState, (state) => state.adminUserDevices)

const selectAdminUserDeviceIds = createSelector(selectAdminUserDeviceEntityState, adminUserDeviceEntitySelectors.selectIds)
const selectAdminUserDeviceEntities = createSelector(selectAdminUserDeviceEntityState, adminUserDeviceEntitySelectors.selectEntities)
const selectAllAdminUserDevices = createSelector(selectAdminUserDeviceEntityState, adminUserDeviceEntitySelectors.selectAll)
const selectAdminUserDeviceTotal = createSelector(selectAdminUserDeviceEntityState, adminUserDeviceEntitySelectors.selectTotal)
const selectAdminUserDeviceById = (id: string) => createSelector(selectAdminUserDeviceEntities, (entities) => entities[id])

const selectedAdminUserDevice = createSelector(
    selectAdminUserDeviceEntities,
    selectSelectedAdminUserDeviceId,
    (entities, selectedId) => selectedId && entities[selectedId]
)

const selectAdminUserDevicesForSelectedAdminUser = createSelector(
    AdminUserSelectors.selectSelectedAdminUserId,
    selectAllAdminUserDevices,
    (adminUserId, devices) => devices.filter(device => device.adminUserId === adminUserId)
)

const selectAdminUserDevicesForAdminUser = (adminUserId: string) => createSelector(
    selectAllAdminUserDevices,
    (devices) => devices.filter(device => device.adminUserId === adminUserId)
)

const selectFilteredAdminUserDevices = (adminUserId: Nullable<string> | 'selected' = null) => createSelector(
    adminUserId === 'selected'
        ? selectAdminUserDevicesForSelectedAdminUser
        : isNull(adminUserId)
        ? selectAllAdminUserDevices
        : selectAdminUserDevicesForAdminUser(adminUserId),
    selectAdminUserDeviceFilters,
    (devices, filters) => selectFilteredElements(devices, filters, Model.Filters.adminUserDeviceFilterEntityMap)
)

const selectPaginatedAdminUserDevices = (adminUserId: Nullable<string> | 'selected' = null) => createSelector(
    adminUserId === 'selected'
        ? selectAdminUserDevicesForSelectedAdminUser
        : isNull(adminUserId)
        ? selectAllAdminUserDevices
        : selectAdminUserDevicesForAdminUser(adminUserId),
    selectAdminUserDeviceRemotePagination,
    (devices, pagination) => selectPaginatedElements(devices, pagination)
)

const selectPaginatedFilteredAdminUserDevices = (adminUserId: Nullable<string> | 'selected' = null) => createSelector(
    selectFilteredAdminUserDevices(adminUserId),
    selectAdminUserDeviceRemotePagination,
    (devices, pagination) => selectPaginatedElements(devices, pagination)
)

export const AdminUserDeviceSelectors = {
    selectAdminUserDeviceState,
    selectAdminUserDeviceEntityState,
    selectAdminUserDeviceFilters,
    selectAdminUserDeviceRemotePagination,
    selectAdminUserDeviceRemoteState,
    selectSelectedAdminUserDeviceId,
    adminUserDeviceEntitySelectors,
    selectAdminUserDeviceIds,
    selectAdminUserDeviceEntities,
    selectAllAdminUserDevices,
    selectAdminUserDeviceTotal,
    selectAdminUserDeviceById,
    selectFilteredAdminUserDevices,
    selectPaginatedAdminUserDevices,
    selectPaginatedFilteredAdminUserDevices,
    selectedAdminUserDevice,
    selectAdminUserDevicesForSelectedAdminUser,
    selectAdminUserDevicesForAdminUser
}