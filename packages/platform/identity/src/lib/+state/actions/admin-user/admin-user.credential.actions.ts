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

const ADMIN_USER_CREDENTIAL_ACTION_IDENTIFIERS = [
    Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
    Identifiers.ADMIN_USER_CREDENTIAL_STATE_FEATURE_KEY,
]

const updateAdminUserCredentialFilters = createAction(
    createActionType(
        ADMIN_USER_CREDENTIAL_ACTION_IDENTIFIERS,
        'Update Filters'
    ),
    props<{ filters: Partial<Model.Filters.AdminUserCredentialFilters> }>()
)
const resetAdminUserCredentialFilters = createAction(
    createActionType(ADMIN_USER_CREDENTIAL_ACTION_IDENTIFIERS, 'Reset Filters')
)
const resetAdminUserCredentialState = createAction(
    createActionType(ADMIN_USER_CREDENTIAL_ACTION_IDENTIFIERS, 'Reset State')
)
const initialiseAdminUserCredentialState = createAction(
    createActionType(
        ADMIN_USER_CREDENTIAL_ACTION_IDENTIFIERS,
        'Initialise State'
    )
)

const createAdminUserCredential = createRemoteActionGroup<
    { adminUserId: string; request: Model.CreateAdminUserCredentialRequest },
    Model.AdminUserCredentialResponse
>('Create Admin User Credential', ...ADMIN_USER_CREDENTIAL_ACTION_IDENTIFIERS)

const getAdminUserCredential = createRemoteActionGroup<
    { adminUserCredentialId: string },
    Model.AdminUserCredentialResponse
>('Get Admin User Credential', ...ADMIN_USER_CREDENTIAL_ACTION_IDENTIFIERS)

const listAdminUserCredentials = createRemoteActionGroup<
    {
        adminUserId: Nullable<string>
        pagination: Nullable<Partial<PaginatedQueryParams<Model.AdminUserCredentialResponse>>>
    },
    PaginatedResponse<Model.AdminUserCredentialResponse>
>('List Admin User Credentials', ...ADMIN_USER_CREDENTIAL_ACTION_IDENTIFIERS)

const updateAdminUserCredential = createRemoteActionGroup<
    {
        adminUserCredentialId: string
        update: Model.UpdateAdminUserCredentialRequest
    },
    Model.AdminUserCredentialResponse
>('Update Admin User Credential', ...ADMIN_USER_CREDENTIAL_ACTION_IDENTIFIERS)

const deleteAdminUserCredential = createRemoteActionGroup<
    { adminUserCredentialId: string },
    { adminUserCredentialId: string }
>('Delete Admin User Credential', ...ADMIN_USER_CREDENTIAL_ACTION_IDENTIFIERS)

export const AdminUserCredentialLocalActions = {
    updateAdminUserCredentialFilters,
    resetAdminUserCredentialFilters,
    resetAdminUserCredentialState,
    initialiseAdminUserCredentialState,
}

export const AdminUserCredentialRemoteActions = createRemoteActionMap(
    ADMIN_USER_CREDENTIAL_ACTION_IDENTIFIERS,
    {
        createAdminUserCredential,
        getAdminUserCredential,
        listAdminUserCredentials,
        updateAdminUserCredential,
        deleteAdminUserCredential,
    }
)
