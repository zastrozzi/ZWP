import { Model } from '../../model'
import {
    DateQueryFilter,
    ZWPISO3166Alpha2,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    ResetRemoteFilters,
    UpdateRemoteFilters,
    createActionType,
    createRemoteActionCRUDMap,
    createRemoteActionGroup,
    createRemoteActionMap,
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const CREDENTIAL_ACTION_IDENTIFIERS = [
    Identifiers.FSN_TINK_ACTION_IDENTIFIER,
    Identifiers.CREDENTIAL_STATE_FEATURE_KEY,
]

const updateCredentialFilters = createAction(
    createActionType(CREDENTIAL_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.CredentialFilters>>()
)

const resetCredentialFilters = createAction(
    createActionType(CREDENTIAL_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetCredentialState = createAction(
    createActionType(CREDENTIAL_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseCredentialState = createAction(
    createActionType(CREDENTIAL_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectCredential = createAction(
    createActionType(CREDENTIAL_ACTION_IDENTIFIERS, 'Select Credential'),
    props<{ credentialId: string }>()
)

const deselectCredential = createAction(
    createActionType(CREDENTIAL_ACTION_IDENTIFIERS, 'Deselect Credential')
)

const resetPagination = createAction(
    createActionType(CREDENTIAL_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const getCredential = createRemoteActionGroup<
    { credentialId: string },
    Model.ServerAPIModel.Credentials.TinkV1CredentialsResponse
>('Get Credential', ...CREDENTIAL_ACTION_IDENTIFIERS)

const listCredentials = createRemoteActionGroup<
    {
        tinkUserId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Credentials.TinkV1CredentialsResponse>>>
    },
    PaginatedResponse<Model.ServerAPIModel.Credentials.TinkV1CredentialsResponse>
>('List Credentials', ...CREDENTIAL_ACTION_IDENTIFIERS)

const deleteCredential = createRemoteActionGroup<
    { credentialId: string },
    { credentialId: string }
>('Delete Credential', ...CREDENTIAL_ACTION_IDENTIFIERS)

const refreshCredentials = createRemoteActionGroup<
    { 
        tinkUserId: string
    },
    {
        tinkUserId: string
    }
>('Refresh Credentials', ...CREDENTIAL_ACTION_IDENTIFIERS)

const refreshCredential = createRemoteActionGroup<
    { 
        credentialId: string
    },
    {
        credentialId: string
    }
>('Refresh Credential', ...CREDENTIAL_ACTION_IDENTIFIERS)

const forceRefreshCredential = createRemoteActionGroup<
    { 
        credentialId: string
    },
    {
        credentialId: string
    }
>('Force Refresh Credential', ...CREDENTIAL_ACTION_IDENTIFIERS)

export const CredentialLocalActions = {
    updateCredentialFilters,
    resetCredentialFilters,
    resetCredentialState,
    initialiseCredentialState,
    selectCredential,
    deselectCredential,
    resetPagination
}

export const CredentialRemoteActions = createRemoteActionMap(
    CREDENTIAL_ACTION_IDENTIFIERS,
    {
        getCredential,
        listCredentials,
        deleteCredential,
        refreshCredentials,
        refreshCredential,
        forceRefreshCredential
    }
)