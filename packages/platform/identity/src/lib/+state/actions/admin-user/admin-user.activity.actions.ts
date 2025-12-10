import { AuditEventFilters, AuditEventResponse } from '@zwp/platform.common'
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

const ADMIN_USER_ACTIVITY_ACTION_IDENTIFIERS = [
    Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
    Identifiers.ADMIN_USER_ACTIVITY_STATE_FEATURE_KEY,
]

const updateAdminUserActivityFilters = createAction(
    createActionType(ADMIN_USER_ACTIVITY_ACTION_IDENTIFIERS, 'Update Filters'),
    props<{ filters: Partial<AuditEventFilters> }>()
)
const resetAdminUserActivityFilters = createAction(
    createActionType(ADMIN_USER_ACTIVITY_ACTION_IDENTIFIERS, 'Reset Filters')
)
const resetAdminUserActivityState = createAction(
    createActionType(ADMIN_USER_ACTIVITY_ACTION_IDENTIFIERS, 'Reset State')
)
const initialiseAdminUserActivityState = createAction(
    createActionType(ADMIN_USER_ACTIVITY_ACTION_IDENTIFIERS, 'Initialise State')
)

const listAdminUserActivity = createRemoteActionGroup<
    {
        adminUserId: Nullable<string>
        pagination: Nullable<Partial<PaginatedQueryParams<AuditEventResponse>>>
    },
    PaginatedResponse<AuditEventResponse>
>('List Admin User Activity', ...ADMIN_USER_ACTIVITY_ACTION_IDENTIFIERS)

export const AdminUserActivityLocalActions = {
    updateAdminUserActivityFilters,
    resetAdminUserActivityFilters,
    resetAdminUserActivityState,
    initialiseAdminUserActivityState,
}

export const AdminUserActivityRemoteActions = createRemoteActionMap(
    ADMIN_USER_ACTIVITY_ACTION_IDENTIFIERS,
    {
        listAdminUserActivity,
    }
)
