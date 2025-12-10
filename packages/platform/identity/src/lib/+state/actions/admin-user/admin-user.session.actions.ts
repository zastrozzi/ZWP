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

const ADMIN_USER_SESSION_ACTION_IDENTIFIERS = [
    Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
    Identifiers.ADMIN_USER_SESSION_STATE_FEATURE_KEY,
]

const updateAdminUserSessionFilters = createAction(
    createActionType(ADMIN_USER_SESSION_ACTION_IDENTIFIERS, 'Update Filters'),
    props<{ filters: Partial<Model.Filters.AdminUserSessionFilters> }>()
)

const resetAdminUserSessionFilters = createAction(
    createActionType(ADMIN_USER_SESSION_ACTION_IDENTIFIERS, 'Reset Filters')
)

const resetAdminUserSessionState = createAction(
    createActionType(ADMIN_USER_SESSION_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseAdminUserSessionState = createAction(
    createActionType(ADMIN_USER_SESSION_ACTION_IDENTIFIERS, 'Initialise State')
)
const selectAdminUserSession = createAction(
    createActionType(
        ADMIN_USER_SESSION_ACTION_IDENTIFIERS,
        'Select Admin User Session'
    ),
    props<{ adminUserSessionId: string }>()
)

const getAdminUserSession = createRemoteActionGroup<
    { adminUserSessionId: string },
    Model.AdminUserSessionResponse
>('Get Admin User Session', ...ADMIN_USER_SESSION_ACTION_IDENTIFIERS)

const listAdminUserSessions = createRemoteActionGroup<
    {
        adminUserId: Nullable<string>
        pagination: Nullable<Partial<PaginatedQueryParams<Model.AdminUserSessionResponse>>>
    },
    PaginatedResponse<Model.AdminUserSessionResponse>
>('List Admin User Sessions', ...ADMIN_USER_SESSION_ACTION_IDENTIFIERS)

const invalidateAdminUserSession = createRemoteActionGroup<
    { adminUserSessionId: string },
    Model.AdminUserSessionResponse
>('Invalidate Admin User Session', ...ADMIN_USER_SESSION_ACTION_IDENTIFIERS)

export const AdminUserSessionLocalActions = {
    updateAdminUserSessionFilters,
    resetAdminUserSessionFilters,
    resetAdminUserSessionState,
    initialiseAdminUserSessionState,
    selectAdminUserSession,
}

export const AdminUserSessionRemoteActions = createRemoteActionMap(
    ADMIN_USER_SESSION_ACTION_IDENTIFIERS,
    {
        getAdminUserSession,
        listAdminUserSessions,
        invalidateAdminUserSession,
    }
)
