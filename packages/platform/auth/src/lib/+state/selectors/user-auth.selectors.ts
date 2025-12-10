import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserAuthFeatureState } from '../reducers';
import { Identifiers } from '../identifiers';
import { createNamespacedFeatureKey, getPayloadFromJWT } from '@zwp/platform.common';
import { Model } from '../../model'

const userAuthState = createFeatureSelector<UserAuthFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.AUTH_ACTION_IDENTIFIER,
        Identifiers.USER_AUTH_STATE_FEATURE_KEY
    )
)

const accessToken = createSelector(userAuthState, (state) => state.accessToken)
const refreshToken = createSelector(userAuthState, (state) => state.refreshToken)
const hasAccessToken = createSelector(accessToken, (accessToken) => !!accessToken)
const hasRefreshToken = createSelector(refreshToken, (refreshToken) => !!refreshToken)
const accessTokenPayload = createSelector(accessToken, (accessToken) => getPayloadFromJWT(accessToken, false) as Model.AccessTokenPayload)
const refreshTokenPayload = createSelector(refreshToken, (refreshToken) => getPayloadFromJWT(refreshToken, false) as Model.RefreshTokenPayload)
const localDeviceIdentifier = createSelector(userAuthState, (state) => state.localDeviceIdentifier)
const hasLocalDeviceIdentifier = createSelector(localDeviceIdentifier, (localDeviceIdentifier) => !!localDeviceIdentifier)
const authedUserPlatformRole = createSelector(accessTokenPayload, (accessTokenPayload) => accessTokenPayload && accessTokenPayload.p)
const authedUserPlatformRoleIsAdminUser = createSelector(authedUserPlatformRole, (authedUserPlatformRole) => authedUserPlatformRole === 'adminUser')
const authedUserPlatformRoleIsEnduser = createSelector(authedUserPlatformRole, (authedUserPlatformRole) => authedUserPlatformRole === 'enduser')
const accessTokenExpiresAt = createSelector(accessTokenPayload, (accessTokenPayload) => accessTokenPayload && accessTokenPayload.exp)
const refreshTokenExpiresAt = createSelector(refreshTokenPayload, (refreshTokenPayload) => refreshTokenPayload && refreshTokenPayload.exp)

export const UserAuthSelectors = {
    accessToken,
    refreshToken,
    hasAccessToken,
    hasRefreshToken,
    accessTokenPayload,
    refreshTokenPayload,
    localDeviceIdentifier,
    hasLocalDeviceIdentifier,
    authedUserPlatformRole,
    authedUserPlatformRoleIsAdminUser,
    authedUserPlatformRoleIsEnduser,
    accessTokenExpiresAt,
    refreshTokenExpiresAt
}