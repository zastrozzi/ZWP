import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../../identifiers'
import { Reducers } from '../../reducers'
import { createNamespacedFeatureKey } from '@zwp/platform.common'

const selectEnduserDeviceState = createFeatureSelector<Reducers.EnduserDeviceFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.CDP_USERS_ACTION_IDENTIFIER,
        Identifiers.ENDUSER_DEVICE_STATE_FEATURE_KEY
    )
)
const selectEnduserDeviceEntityState = createSelector(selectEnduserDeviceState, (state) => state.enduserDevices)
const selectEnduserDeviceFilters = createSelector(selectEnduserDeviceState, (state) => state.filters)
const selectEnduserDeviceRemotePagination = createSelector(selectEnduserDeviceState, (state) => state.enduserDevicesRemotePagination)
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
    (devices, filters) => devices.filter(device => {
        let include = true
        if (filters.enduserId) {
            include = include && device.enduserId === filters.enduserId
        }
        return include
    })
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
    selectSelectedEnduserDeviceId,
    enduserDeviceEntitySelectors,
    selectEnduserDeviceIds,
    selectEnduserDeviceEntities,
    selectAllEnduserDevices,
    selectEnduserDeviceTotal,
    selectEnduserDeviceById,
    selectFilteredEnduserDevices,
    selectedEnduserDevice
}