import { createActionType } from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const USER_AUTH_ACTION_IDENTIFIERS = [
    Identifiers.AUTH_ACTION_IDENTIFIER, 
    Identifiers.USER_AUTH_STATE_FEATURE_KEY
]

const setAccessToken = createAction(createActionType(USER_AUTH_ACTION_IDENTIFIERS, 'Set Access Token'), props<{ accessToken: string }>())
const setRefreshToken = createAction(createActionType(USER_AUTH_ACTION_IDENTIFIERS, 'Set Refresh Token'), props<{ refreshToken: string }>())
const setTokens = createAction(createActionType(USER_AUTH_ACTION_IDENTIFIERS, 'Set Tokens'), props<{ accessToken: string, refreshToken: string }>())
const removeAccessToken = createAction(createActionType(USER_AUTH_ACTION_IDENTIFIERS, 'Remove Access Token'))
const removeRefreshToken = createAction(createActionType(USER_AUTH_ACTION_IDENTIFIERS, 'Remove Refresh Token'))
const clearTokens = createAction(createActionType(USER_AUTH_ACTION_IDENTIFIERS, 'Clear Tokens'))
const setLocalDeviceIdentifier = createAction(createActionType(USER_AUTH_ACTION_IDENTIFIERS, 'Set Local Device Identifier'), props<{ localDeviceIdentifier: string }>())
const clearLocalDeviceIdentifier = createAction(createActionType(USER_AUTH_ACTION_IDENTIFIERS, 'Clear Local Device Identifier'))
const rehydrateState = createAction(createActionType(USER_AUTH_ACTION_IDENTIFIERS, 'Rehydrate State'))

export const UserAuthActions = {
    setAccessToken,
    setRefreshToken,
    setTokens,
    removeAccessToken,
    removeRefreshToken,
    clearTokens,
    setLocalDeviceIdentifier,
    clearLocalDeviceIdentifier,
    rehydrateState
}