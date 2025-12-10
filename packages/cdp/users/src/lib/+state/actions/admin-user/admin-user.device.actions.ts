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

const ADMIN_USER_DEVICE_ACTION_IDENTIFIERS = [
    Identifiers.CDP_USERS_ACTION_IDENTIFIER,
    Identifiers.ADMIN_USER_DEVICE_STATE_FEATURE_KEY,
]

const updateAdminUserDeviceFilters = createAction(
    createActionType(ADMIN_USER_DEVICE_ACTION_IDENTIFIERS, 'Update Filters'),
    props<{ filters: Partial<Model.AdminUserDeviceFilters> }>()
)
const resetAdminUserDeviceFilters = createAction(
    createActionType(ADMIN_USER_DEVICE_ACTION_IDENTIFIERS, 'Reset Filters')
)
const resetAdminUserDeviceState = createAction(
    createActionType(ADMIN_USER_DEVICE_ACTION_IDENTIFIERS, 'Reset State')
)
const initialiseAdminUserDeviceState = createAction(
    createActionType(ADMIN_USER_DEVICE_ACTION_IDENTIFIERS, 'Initialise State')
)

const getAdminUserDevice = createRemoteActionGroup<
    { adminUserDeviceId: string },
    Model.AdminUserDeviceResponse
>('Get Admin User Device', ...ADMIN_USER_DEVICE_ACTION_IDENTIFIERS)

const listAdminUserDevices = createRemoteActionGroup<
    {
        adminUserId: Nullable<string>
        pagination: Nullable<Partial<PaginatedQueryParams<Model.AdminUserDeviceResponse>>>
    },
    PaginatedResponse<Model.AdminUserDeviceResponse>
>('List Admin User Devices', ...ADMIN_USER_DEVICE_ACTION_IDENTIFIERS)

export const AdminUserDeviceLocalActions = {
    updateAdminUserDeviceFilters,
    resetAdminUserDeviceFilters,
    resetAdminUserDeviceState,
    initialiseAdminUserDeviceState,
}

export const AdminUserDeviceRemoteActions = createRemoteActionMap(
    ADMIN_USER_DEVICE_ACTION_IDENTIFIERS,
    {
        getAdminUserDevice,
        listAdminUserDevices,
    }
)
