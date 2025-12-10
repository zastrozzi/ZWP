import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../../identifiers'
import { Reducers } from '../../reducers'
import { AdminUserSelectors } from './admin-user.selectors'
import { createNamespacedFeatureKey } from '@zwp/platform.common'

const selectAdminUserDeviceState = createFeatureSelector<Reducers.AdminUserDeviceFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.CDP_USERS_ACTION_IDENTIFIER,
        Identifiers.ADMIN_USER_DEVICE_STATE_FEATURE_KEY
    )
)
const selectAdminUserDeviceEntityState = createSelector(selectAdminUserDeviceState, (state) => state.adminUserDevices)
const selectAdminUserDeviceFilters = createSelector(selectAdminUserDeviceState, (state) => state.filters)
const selectAdminUserDeviceRemotePagination = createSelector(selectAdminUserDeviceState, (state) => state.adminUserDevicesRemotePagination)
const selectSelectedAdminUserDeviceId = createSelector(selectAdminUserDeviceState, (state) => state.selectedAdminUserDeviceId)
const adminUserDeviceEntitySelectors = Reducers.adminUserDeviceEntityAdapter.getSelectors()

const selectAdminUserDeviceIds = createSelector(selectAdminUserDeviceEntityState, adminUserDeviceEntitySelectors.selectIds)
const selectAdminUserDeviceEntities = createSelector(selectAdminUserDeviceEntityState, adminUserDeviceEntitySelectors.selectEntities)
const selectAllAdminUserDevices = createSelector(selectAdminUserDeviceEntityState, adminUserDeviceEntitySelectors.selectAll)
const selectAdminUserDeviceTotal = createSelector(selectAdminUserDeviceEntityState, adminUserDeviceEntitySelectors.selectTotal)
const selectAdminUserDeviceById = (id: string) => createSelector(selectAdminUserDeviceEntities, (entities) => entities[id])

const selectAdminUserDevicesForSelectedAdminUser = createSelector(
    AdminUserSelectors.selectSelectedAdminUserId,
    selectAllAdminUserDevices,
    (adminUserId, devices) => devices.filter(device => device.adminUserId === adminUserId)
)

// const selectFilteredAdminUserDevices = createSelector(
//     selectAllAdminUserDevices,
//     selectAdminUserDeviceFilters,
//     (devices, filters) => devices.filter(device => {
//         let include = true
//         if (filters.adminUserId) {
//             include = include && device.adminUserId === filters.adminUserId
//         }
//         return include
//     })
// )

const selectedAdminUserDevice = createSelector(
    selectAdminUserDeviceEntities,
    selectSelectedAdminUserDeviceId,
    (entities, selectedId) => selectedId && entities[selectedId]
)

export const AdminUserDeviceSelectors = {
    selectAdminUserDeviceState,
    selectAdminUserDeviceEntityState,
    selectAdminUserDeviceFilters,
    selectAdminUserDeviceRemotePagination,
    selectSelectedAdminUserDeviceId,
    adminUserDeviceEntitySelectors,
    selectAdminUserDeviceIds,
    selectAdminUserDeviceEntities,
    selectAllAdminUserDevices,
    selectAdminUserDeviceTotal,
    selectAdminUserDeviceById,
    selectAdminUserDevicesForSelectedAdminUser,
    selectedAdminUserDevice
}