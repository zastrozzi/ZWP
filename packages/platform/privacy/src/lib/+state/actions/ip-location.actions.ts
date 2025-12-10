import { createActionType } from '@zwp/platform.common'
import { createAction, props } from '@ngrx/store'
import { ZWPIPLocation } from '../../model'
import { Identifiers } from '../identifiers'

const IP_LOCATION_ACTION_IDENTIFIERS = [
    Identifiers.PLATFORM_PRIVACY_ACTION_IDENTIFIER, 
    Identifiers.IP_LOCATION_STATE_FEATURE_KEY
]
const locateUserRequest = createAction(createActionType([...IP_LOCATION_ACTION_IDENTIFIERS, 'REQUEST'], 'Locate User'))
const locateUserSuccess = createAction(createActionType([...IP_LOCATION_ACTION_IDENTIFIERS, 'SUCCESS'], 'Locate User'), props<{ location: ZWPIPLocation }>())
const locateUserFailure = createAction(createActionType([...IP_LOCATION_ACTION_IDENTIFIERS, 'FAILURE'], 'Locate User'), props<{ error: string }>())

export const IPLocationActions = {
    locateUserRequest,
    locateUserSuccess,
    locateUserFailure
}

// const locateUser = createRemoteActionGroup<, ZWPIPLocation>('Locate User', ...IP_LOCATION_ACTION_IDENTIFIERS)

// const action = locateUser.request()
