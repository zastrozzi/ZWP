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

const ADMIN_USER_EMAIL_ACTION_IDENTIFIERS = [
    Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
    Identifiers.ADMIN_USER_EMAIL_STATE_FEATURE_KEY,
]

const updateAdminUserEmailFilters = createAction(
    createActionType(ADMIN_USER_EMAIL_ACTION_IDENTIFIERS, 'Update Filters'),
    props<{ filters: Partial<Model.Filters.AdminUserEmailFilters> }>()
)
const resetAdminUserEmailFilters = createAction(
    createActionType(ADMIN_USER_EMAIL_ACTION_IDENTIFIERS, 'Reset Filters')
)
const resetAdminUserEmailState = createAction(
    createActionType(ADMIN_USER_EMAIL_ACTION_IDENTIFIERS, 'Reset State')
)
const initialiseAdminUserEmailState = createAction(
    createActionType(ADMIN_USER_EMAIL_ACTION_IDENTIFIERS, 'Initialise State')
)

const createAdminUserEmail = createRemoteActionGroup<
    { adminUserId: string; request: Model.CreateAdminUserEmailRequest },
    Model.AdminUserEmailResponse
>('Create Admin User Email', ...ADMIN_USER_EMAIL_ACTION_IDENTIFIERS)

const getAdminUserEmail = createRemoteActionGroup<
    { adminUserEmailId: string },
    Model.AdminUserEmailResponse
>('Get Admin User Email', ...ADMIN_USER_EMAIL_ACTION_IDENTIFIERS)

const listAdminUserEmails = createRemoteActionGroup<
    {
        adminUserId: Nullable<string>
        pagination: Nullable<Partial<PaginatedQueryParams<Model.AdminUserEmailResponse>>>
    },
    PaginatedResponse<Model.AdminUserEmailResponse>
>('List Admin User Emails', ...ADMIN_USER_EMAIL_ACTION_IDENTIFIERS)

const updateAdminUserEmail = createRemoteActionGroup<
    { adminUserEmailId: string; update: Model.UpdateAdminUserEmailRequest },
    Model.AdminUserEmailResponse
>('Update Admin User Email', ...ADMIN_USER_EMAIL_ACTION_IDENTIFIERS)

const deleteAdminUserEmail = createRemoteActionGroup<
    { adminUserEmailId: string },
    { adminUserEmailId: string }
>('Delete Admin User Email', ...ADMIN_USER_EMAIL_ACTION_IDENTIFIERS)

export const AdminUserEmailLocalActions = {
    updateAdminUserEmailFilters,
    resetAdminUserEmailFilters,
    resetAdminUserEmailState,
    initialiseAdminUserEmailState,
}

export const AdminUserEmailRemoteActions = createRemoteActionMap(
    ADMIN_USER_EMAIL_ACTION_IDENTIFIERS,
    {
        createAdminUserEmail,
        getAdminUserEmail,
        listAdminUserEmails,
        updateAdminUserEmail,
        deleteAdminUserEmail,
    }
)
