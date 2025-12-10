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

const ENDUSER_CREDENTIAL_ACTION_IDENTIFIERS = [
    Identifiers.CDP_USERS_ACTION_IDENTIFIER,
    Identifiers.ENDUSER_CREDENTIAL_STATE_FEATURE_KEY,
]

const updateEnduserCredentialFilters = createAction(
    createActionType(ENDUSER_CREDENTIAL_ACTION_IDENTIFIERS, 'Update Filters'),
    props<{ filters: Partial<Model.EnduserCredentialFilters> }>()
)
const resetEnduserCredentialFilters = createAction(
    createActionType(ENDUSER_CREDENTIAL_ACTION_IDENTIFIERS, 'Reset Filters')
)
const resetEnduserCredentialState = createAction(
    createActionType(ENDUSER_CREDENTIAL_ACTION_IDENTIFIERS, 'Reset State')
)
const initialiseEnduserCredentialState = createAction(
    createActionType(ENDUSER_CREDENTIAL_ACTION_IDENTIFIERS, 'Initialise State')
)

const createEnduserCredential = createRemoteActionGroup<
    { enduserId: string; request: Model.CreateEnduserCredentialRequest },
    Model.EnduserCredentialResponse
>('Create Enduser Credential', ...ENDUSER_CREDENTIAL_ACTION_IDENTIFIERS)

const getEnduserCredential = createRemoteActionGroup<
    { enduserCredentialId: string },
    Model.EnduserCredentialResponse
>('Get Enduser Credential', ...ENDUSER_CREDENTIAL_ACTION_IDENTIFIERS)

const listEnduserCredentials = createRemoteActionGroup<
    {
        enduserId: Nullable<string>
        pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserCredentialResponse>>>
    },
    PaginatedResponse<Model.EnduserCredentialResponse>
>('List Enduser Credentials', ...ENDUSER_CREDENTIAL_ACTION_IDENTIFIERS)

const updateEnduserCredential = createRemoteActionGroup<
    {
        enduserCredentialId: string
        update: Model.UpdateEnduserCredentialRequest
    },
    Model.EnduserCredentialResponse
>('Update Enduser Credential', ...ENDUSER_CREDENTIAL_ACTION_IDENTIFIERS)

const deleteEnduserCredential = createRemoteActionGroup<
    { enduserCredentialId: string },
    { enduserCredentialId: string }
>('Delete Enduser Credential', ...ENDUSER_CREDENTIAL_ACTION_IDENTIFIERS)

export const EnduserCredentialLocalActions = {
    updateEnduserCredentialFilters,
    resetEnduserCredentialFilters,
    resetEnduserCredentialState,
    initialiseEnduserCredentialState,
}

export const EnduserCredentialRemoteActions = createRemoteActionMap(
    ENDUSER_CREDENTIAL_ACTION_IDENTIFIERS,
    {
        createEnduserCredential,
        getEnduserCredential,
        listEnduserCredentials,
        updateEnduserCredential,
        deleteEnduserCredential,
    }
)
