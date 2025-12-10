import { AuditEventFilters, AuditEventResponse } from '@zwp/platform.common'
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

const ENDUSER_ACTIVITY_ACTION_IDENTIFIERS = [
    Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
    Identifiers.ENDUSER_ACTIVITY_STATE_FEATURE_KEY,
]

const updateEnduserActivityFilters = createAction(
    createActionType(ENDUSER_ACTIVITY_ACTION_IDENTIFIERS, 'Update Filters'),
    props<{ filters: Partial<AuditEventFilters> }>()
)
const resetEnduserActivityFilters = createAction(
    createActionType(ENDUSER_ACTIVITY_ACTION_IDENTIFIERS, 'Reset Filters')
)
const resetEnduserActivityState = createAction(
    createActionType(ENDUSER_ACTIVITY_ACTION_IDENTIFIERS, 'Reset State')
)
const initialiseEnduserActivityState = createAction(
    createActionType(ENDUSER_ACTIVITY_ACTION_IDENTIFIERS, 'Initialise State')
)

const listEnduserActivity = createRemoteActionGroup<
    {
        enduserId: Nullable<string>
        pagination: Nullable<Partial<PaginatedQueryParams<AuditEventResponse>>>
    },
    PaginatedResponse<AuditEventResponse>
>('List Admin User Activity', ...ENDUSER_ACTIVITY_ACTION_IDENTIFIERS)

export const EnduserActivityLocalActions = {
    updateEnduserActivityFilters,
    resetEnduserActivityFilters,
    resetEnduserActivityState,
    initialiseEnduserActivityState,
}

export const EnduserActivityRemoteActions = createRemoteActionMap(
    ENDUSER_ACTIVITY_ACTION_IDENTIFIERS,
    {
        listEnduserActivity,
    }
)
