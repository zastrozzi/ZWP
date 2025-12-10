import { Model } from '../../../model'
import { PlatformAuth } from '@zwp/platform.auth'
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

const ENDUSER_ACTION_IDENTIFIERS = [
    Identifiers.CDP_USERS_ACTION_IDENTIFIER,
    Identifiers.ENDUSER_STATE_FEATURE_KEY,
]

const updateEnduserFilters = createAction(
    createActionType(ENDUSER_ACTION_IDENTIFIERS, 'Update Filters'),
    props<{ filters: Partial<Model.EnduserFilters> }>()
)
const resetEnduserFilters = createAction(
    createActionType(ENDUSER_ACTION_IDENTIFIERS, 'Reset Filters')
)
const resetEnduserState = createAction(
    createActionType(ENDUSER_ACTION_IDENTIFIERS, 'Reset State')
)
const initialiseEnduserState = createAction(
    createActionType(ENDUSER_ACTION_IDENTIFIERS, 'Initialise State')
)
const selectEnduser = createAction(
    createActionType(ENDUSER_ACTION_IDENTIFIERS, 'Select Enduser'),
    props<{ enduserId: string }>()
)

const createEnduser = createRemoteActionGroup<
    Model.CreateEnduserRequest,
    Model.EnduserResponse
>('Create Enduser', ...ENDUSER_ACTION_IDENTIFIERS)

const getEnduser = createRemoteActionGroup<
    { enduserId: string },
    Model.EnduserResponse
>('Get Enduser', ...ENDUSER_ACTION_IDENTIFIERS)

const listEndusers = createRemoteActionGroup<
    { pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserResponse>>> },
    PaginatedResponse<Model.EnduserResponse>
>('List Endusers', ...ENDUSER_ACTION_IDENTIFIERS)

const updateEnduser = createRemoteActionGroup<
    { enduserId: string; update: Model.UpdateEnduserRequest },
    Model.EnduserResponse
>('Update Enduser', ...ENDUSER_ACTION_IDENTIFIERS)

const deleteEnduser = createRemoteActionGroup<
    { enduserId: string },
    { enduserId: string }
>('Delete Enduser', ...ENDUSER_ACTION_IDENTIFIERS)

const loginEnduserEmailPassword = createRemoteActionGroup<
    Model.LoginEnduserEmailPasswordRequest,
    PlatformAuth.Model.AuthedUserResponse<Model.EnduserResponse>
>('Login Enduser Email Password', ...ENDUSER_ACTION_IDENTIFIERS)

const logoutEnduser = createRemoteActionGroup<
    { enduserId: string },
    { enduserId: string }
>('Logout Enduser', ...ENDUSER_ACTION_IDENTIFIERS)

export const EnduserLocalActions = {
    updateEnduserFilters,
    resetEnduserFilters,
    resetEnduserState,
    initialiseEnduserState,
    selectEnduser,
}

export const EnduserRemoteActions = createRemoteActionMap(
    ENDUSER_ACTION_IDENTIFIERS,
    {
        createEnduser,
        getEnduser,
        listEndusers,
        updateEnduser,
        deleteEnduser,
        loginEnduserEmailPassword,
        logoutEnduser,
    }
)
