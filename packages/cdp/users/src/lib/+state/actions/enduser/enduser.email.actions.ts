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

const ENDUSER_EMAIL_ACTION_IDENTIFIERS = [
    Identifiers.CDP_USERS_ACTION_IDENTIFIER,
    Identifiers.ENDUSER_EMAIL_STATE_FEATURE_KEY,
]

const updateEnduserEmailFilters = createAction(
    createActionType(ENDUSER_EMAIL_ACTION_IDENTIFIERS, 'Update Filters'),
    props<{ filters: Partial<Model.EnduserEmailFilters> }>()
)
const resetEnduserEmailFilters = createAction(
    createActionType(ENDUSER_EMAIL_ACTION_IDENTIFIERS, 'Reset Filters')
)
const resetEnduserEmailState = createAction(
    createActionType(ENDUSER_EMAIL_ACTION_IDENTIFIERS, 'Reset State')
)
const initialiseEnduserEmailState = createAction(
    createActionType(ENDUSER_EMAIL_ACTION_IDENTIFIERS, 'Initialise State')
)

const createEnduserEmail = createRemoteActionGroup<
    { enduserId: string; request: Model.CreateEnduserEmailRequest },
    Model.EnduserEmailResponse
>('Create Enduser Email', ...ENDUSER_EMAIL_ACTION_IDENTIFIERS)

const getEnduserEmail = createRemoteActionGroup<
    { enduserEmailId: string },
    Model.EnduserEmailResponse
>('Get Enduser Email', ...ENDUSER_EMAIL_ACTION_IDENTIFIERS)

const listEnduserEmails = createRemoteActionGroup<
    {
        enduserId: Nullable<string>
        pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserEmailResponse>>>
    },
    PaginatedResponse<Model.EnduserEmailResponse>
>('List Enduser Emails', ...ENDUSER_EMAIL_ACTION_IDENTIFIERS)

const updateEnduserEmail = createRemoteActionGroup<
    { enduserEmailId: string; update: Model.UpdateEnduserEmailRequest },
    Model.EnduserEmailResponse
>('Update Enduser Email', ...ENDUSER_EMAIL_ACTION_IDENTIFIERS)

const deleteEnduserEmail = createRemoteActionGroup<
    { enduserEmailId: string },
    { enduserEmailId: string }
>('Delete Enduser Email', ...ENDUSER_EMAIL_ACTION_IDENTIFIERS)

export const EnduserEmailLocalActions = {
    updateEnduserEmailFilters,
    resetEnduserEmailFilters,
    resetEnduserEmailState,
    initialiseEnduserEmailState,
}

export const EnduserEmailRemoteActions = createRemoteActionMap(
    ENDUSER_EMAIL_ACTION_IDENTIFIERS,
    {
        createEnduserEmail,
        getEnduserEmail,
        listEnduserEmails,
        updateEnduserEmail,
        deleteEnduserEmail,
    }
)
