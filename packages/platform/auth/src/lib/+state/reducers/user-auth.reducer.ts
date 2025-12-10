import { createReducer, on } from "@ngrx/store";
import { Nullable, PersistentState } from "@zwp/platform.common";
import { UserAuthActions } from "../actions";

export interface UserAuthFeatureState {
    accessToken: Nullable<string>,
    refreshToken: Nullable<string>,
    localDeviceIdentifier: Nullable<string>
}

export const persistentUserAuthState: PersistentState<UserAuthFeatureState> = {
    accessToken: true,
    refreshToken: true,
    localDeviceIdentifier: true
}

export const initialUserAuthFeatureState: UserAuthFeatureState = {
    accessToken: null,
    refreshToken: null,
    localDeviceIdentifier: null
}

export const userAuthReducer = createReducer(
    initialUserAuthFeatureState,
    on(UserAuthActions.setAccessToken, (state, { accessToken }) => ({ ...state, accessToken })),
    on(UserAuthActions.setRefreshToken, (state, { refreshToken }) => ({ ...state, refreshToken })),
    on(UserAuthActions.setTokens, (state, { accessToken, refreshToken }) => ({ ...state, accessToken, refreshToken })),
    on(UserAuthActions.removeAccessToken, (state) => ({ ...state, accessToken: null })),
    on(UserAuthActions.removeRefreshToken, (state) => ({ ...state, refreshToken: null })),
    on(UserAuthActions.clearTokens, (state) => ({ ...state, accessToken: null, refreshToken: null })),
    on(UserAuthActions.setLocalDeviceIdentifier, (state, { localDeviceIdentifier }) => ({ ...state, localDeviceIdentifier })),
    on(UserAuthActions.clearLocalDeviceIdentifier, (state) => ({ ...state, localDeviceIdentifier: null }))
)