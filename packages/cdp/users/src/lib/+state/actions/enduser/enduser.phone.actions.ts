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

const ENDUSER_PHONE_ACTION_IDENTIFIERS = [
    Identifiers.CDP_USERS_ACTION_IDENTIFIER,
    Identifiers.ENDUSER_PHONE_STATE_FEATURE_KEY,
]

const updateEnduserPhoneFilters = createAction(
    createActionType(ENDUSER_PHONE_ACTION_IDENTIFIERS, 'Update Filters'),
    props<{ filters: Partial<Model.EnduserPhoneFilters> }>()
)
const resetEnduserPhoneFilters = createAction(
    createActionType(ENDUSER_PHONE_ACTION_IDENTIFIERS, 'Reset Filters')
)
const resetEnduserPhoneState = createAction(
    createActionType(ENDUSER_PHONE_ACTION_IDENTIFIERS, 'Reset State')
)
const initialiseEnduserPhoneState = createAction(
    createActionType(ENDUSER_PHONE_ACTION_IDENTIFIERS, 'Initialise State')
)

const createEnduserPhone = createRemoteActionGroup<
    { enduserId: string; request: Model.CreateEnduserPhoneRequest },
    Model.EnduserPhoneResponse
>('Create Enduser Phone', ...ENDUSER_PHONE_ACTION_IDENTIFIERS)

const getEnduserPhone = createRemoteActionGroup<
    { enduserPhoneId: string },
    Model.EnduserPhoneResponse
>('Get Enduser Phone', ...ENDUSER_PHONE_ACTION_IDENTIFIERS)

const listEnduserPhones = createRemoteActionGroup<
    {
        enduserId: Nullable<string>
        pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserPhoneResponse>>>
    },
    PaginatedResponse<Model.EnduserPhoneResponse>
>('List Enduser Phones', ...ENDUSER_PHONE_ACTION_IDENTIFIERS)

const updateEnduserPhone = createRemoteActionGroup<
    { enduserPhoneId: string; update: Model.UpdateEnduserPhoneRequest },
    Model.EnduserPhoneResponse
>('Update Enduser Phone', ...ENDUSER_PHONE_ACTION_IDENTIFIERS)

const deleteEnduserPhone = createRemoteActionGroup<
    { enduserPhoneId: string },
    { enduserPhoneId: string }
>('Delete Enduser Phone', ...ENDUSER_PHONE_ACTION_IDENTIFIERS)

export const EnduserPhoneLocalActions = {
    updateEnduserPhoneFilters,
    resetEnduserPhoneFilters,
    resetEnduserPhoneState,
    initialiseEnduserPhoneState,
}

export const EnduserPhoneRemoteActions = createRemoteActionMap(
    ENDUSER_PHONE_ACTION_IDENTIFIERS,
    {
        createEnduserPhone,
        getEnduserPhone,
        listEnduserPhones,
        updateEnduserPhone,
        deleteEnduserPhone,
    }
)
