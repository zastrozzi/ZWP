import { Model } from '../../../model'
import { PlatformAuth } from '@zwp/platform.auth'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    createActionType,
    createRemoteActionGroup,
    createRemoteActionMap,
} from '@zwp/platform.common'
import { Identifiers } from '../../identifiers'
import { createAction, props } from '@ngrx/store'

const ADMIN_USER_ACTION_IDENTIFIERS = [
    Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
    Identifiers.ADMIN_USER_STATE_FEATURE_KEY,
]

const updateAdminUserFilters = createAction(
    createActionType(ADMIN_USER_ACTION_IDENTIFIERS, 'Update Filters'),
    props<{ filters: Partial<Model.Filters.AdminUserFilters> }>()
)
const resetAdminUserFilters = createAction(
    createActionType(ADMIN_USER_ACTION_IDENTIFIERS, 'Reset Filters')
)
const resetAdminUserState = createAction(
    createActionType(ADMIN_USER_ACTION_IDENTIFIERS, 'Reset State')
)
const initialiseAdminUserState = createAction(
    createActionType(ADMIN_USER_ACTION_IDENTIFIERS, 'Initialise State')
)
const selectAdminUser = createAction(
    createActionType(ADMIN_USER_ACTION_IDENTIFIERS, 'Select Admin User'),
    props<{ adminUserId: string }>()
)

const createAdminUser = createRemoteActionGroup<
    Model.CreateAdminUserRequest,
    Model.AdminUserResponse
>('Create Admin User', ...ADMIN_USER_ACTION_IDENTIFIERS)
const getAdminUser = createRemoteActionGroup<
    { adminUserId: string },
    Model.AdminUserResponse
>('Get Admin User', ...ADMIN_USER_ACTION_IDENTIFIERS)
const getAdminUserOnInitialise = createRemoteActionGroup<
    { adminUserId: string },
    Model.AdminUserResponse
>('Get Admin User on Initialise', ...ADMIN_USER_ACTION_IDENTIFIERS)
const listAdminUsers = createRemoteActionGroup<
    { pagination: Nullable<Partial<PaginatedQueryParams<Model.AdminUserResponse>>> },
    PaginatedResponse<Model.AdminUserResponse>
>('List Admin Users', ...ADMIN_USER_ACTION_IDENTIFIERS)
const updateAdminUser = createRemoteActionGroup<
    { adminUserId: string; update: Model.UpdateAdminUserRequest },
    Model.AdminUserResponse
>('Update Admin User', ...ADMIN_USER_ACTION_IDENTIFIERS)
const deleteAdminUser = createRemoteActionGroup<
    { adminUserId: string },
    { adminUserId: string }
>('Delete Admin User', ...ADMIN_USER_ACTION_IDENTIFIERS)
const loginAdminUserEmailPassword = createRemoteActionGroup<
    Model.LoginAdminUserEmailPasswordRequest,
    PlatformAuth.Model.AuthedUserResponse<Model.AdminUserResponse>
>('Login Admin User Email Password', ...ADMIN_USER_ACTION_IDENTIFIERS)
const logoutAdminUser = createRemoteActionGroup<
    { adminUserId: string },
    { adminUserId: string }
>('Logout Admin User', ...ADMIN_USER_ACTION_IDENTIFIERS)
// const refreshAdminUserToken = createRemoteActionGroup<
//     Model.RefreshAdminUserTokenRequest,
//     PlatformAuth.Model.AuthedUserResponse<Model.AdminUserResponse>
// >('Refresh Admin User Token', ...ADMIN_USER_ACTION_IDENTIFIERS)

export const AdminUserLocalActions = {
    updateAdminUserFilters,
    resetAdminUserFilters,
    resetAdminUserState,
    initialiseAdminUserState,
    selectAdminUser,
}

export const AdminUserRemoteActions = createRemoteActionMap(
    ADMIN_USER_ACTION_IDENTIFIERS,
    {
        createAdminUser,
        getAdminUser,
        getAdminUserOnInitialise,
        listAdminUsers,
        updateAdminUser,
        deleteAdminUser,
        loginAdminUserEmailPassword,
        logoutAdminUser,
    }
)
