import { Model } from '../../../model'
import { createAction, props } from '@ngrx/store'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    createActionType,
    createRemoteActionGroup,
    createRemoteActionMap,
} from '@zwp/platform.common'
import { Identifiers } from '../../identifiers'

const ENDUSER_DEVICE_ACTION_IDENTIFIERS = [
    Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
    Identifiers.ENDUSER_DEVICE_STATE_FEATURE_KEY,
]

const updateEnduserDeviceFilters = createAction(
    createActionType(ENDUSER_DEVICE_ACTION_IDENTIFIERS, 'Update Filters'),
    props<{ filters: Partial<Model.Filters.EnduserDeviceFilters> }>()
)
const resetEnduserDeviceFilters = createAction(
    createActionType(ENDUSER_DEVICE_ACTION_IDENTIFIERS, 'Reset Filters')
)
const resetEnduserDeviceState = createAction(
    createActionType(ENDUSER_DEVICE_ACTION_IDENTIFIERS, 'Reset State')
)
const initialiseEnduserDeviceState = createAction(
    createActionType(ENDUSER_DEVICE_ACTION_IDENTIFIERS, 'Initialise State')
)

const getEnduserDevice = createRemoteActionGroup<
    { enduserDeviceId: string },
    Model.EnduserDeviceResponse
>('Get Enduser Device', ...ENDUSER_DEVICE_ACTION_IDENTIFIERS)

const listEnduserDevices = createRemoteActionGroup<
    {
        enduserId: Nullable<string>
        pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserDeviceResponse>>>
    },
    PaginatedResponse<Model.EnduserDeviceResponse>
>('List Enduser Devices', ...ENDUSER_DEVICE_ACTION_IDENTIFIERS)

export const EnduserDeviceLocalActions = {
    updateEnduserDeviceFilters,
    resetEnduserDeviceFilters,
    resetEnduserDeviceState,
    initialiseEnduserDeviceState,
}

export const EnduserDeviceRemoteActions = createRemoteActionMap(
    ENDUSER_DEVICE_ACTION_IDENTIFIERS,
    {
        getEnduserDevice,
        listEnduserDevices,
    }
)
