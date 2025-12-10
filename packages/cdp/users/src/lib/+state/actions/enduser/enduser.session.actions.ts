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

const ENDUSER_SESSION_ACTION_IDENTIFIERS = [
    Identifiers.CDP_USERS_ACTION_IDENTIFIER,
    Identifiers.ENDUSER_SESSION_STATE_FEATURE_KEY,
]

const updateEnduserSessionFilters = createAction(
    createActionType(ENDUSER_SESSION_ACTION_IDENTIFIERS, 'Update Filters'),
    props<{ filters: Partial<Model.EnduserSessionFilters> }>()
)

const resetEnduserSessionFilters = createAction(
    createActionType(ENDUSER_SESSION_ACTION_IDENTIFIERS, 'Reset Filters')
)

const resetEnduserSessionState = createAction(
    createActionType(ENDUSER_SESSION_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseEnduserSessionState = createAction(
    createActionType(ENDUSER_SESSION_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectEnduserSession = createAction(
    createActionType(
        ENDUSER_SESSION_ACTION_IDENTIFIERS,
        'Select Enduser Session'
    ),
    props<{ enduserSessionId: string }>()
)

const getEnduserSession = createRemoteActionGroup<
    { enduserSessionId: string },
    Model.EnduserSessionResponse
>('Get Enduser Session', ...ENDUSER_SESSION_ACTION_IDENTIFIERS)

const listEnduserSessions = createRemoteActionGroup<
    {
        enduserId: Nullable<string>
        pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserSessionResponse>>>
    },
    PaginatedResponse<Model.EnduserSessionResponse>
>('List Enduser Sessions', ...ENDUSER_SESSION_ACTION_IDENTIFIERS)

const invalidateEnduserSession = createRemoteActionGroup<
    { enduserSessionId: string },
    Model.EnduserSessionResponse
>('Invalidate Enduser Session', ...ENDUSER_SESSION_ACTION_IDENTIFIERS)

export const EnduserSessionLocalActions = {
    updateEnduserSessionFilters,
    resetEnduserSessionFilters,
    resetEnduserSessionState,
    initialiseEnduserSessionState,
    selectEnduserSession,
}

export const EnduserSessionRemoteActions = createRemoteActionMap(
    ENDUSER_SESSION_ACTION_IDENTIFIERS,
    {
        getEnduserSession,
        listEnduserSessions,
        invalidateEnduserSession,
    }
)
