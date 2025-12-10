import { ZWPISO3166Alpha2, Nullable } from "@zwp/platform.common";
import { createReducer, on } from "@ngrx/store";
import { IPLocationActions } from "../actions";

export interface IPLocationFeatureState {
    lastUpdated: Nullable<number>
    ip: Nullable<string>
    hostname: Nullable<string>
    city: Nullable<string>
    region: Nullable<string>
    country: Nullable<ZWPISO3166Alpha2>
    latitude: Nullable<number>
    longitude: Nullable<number>
    org: Nullable<string>
    postCode: Nullable<string>
    timezone: Nullable<string>
}

export const initialIPLocationFeatureState: IPLocationFeatureState = {
    lastUpdated: null,
    ip: null,
    hostname: null,
    city: null,
    region: null,
    country: null,
    latitude: null,
    longitude: null,
    org: null,
    postCode: null,
    timezone: null
}

export const ipLocationReducer = createReducer(
    initialIPLocationFeatureState,
    on(IPLocationActions.locateUserSuccess, (state, { location }) => ({
        ...state,
        ...location,
        lastUpdated: (new Date()).getTime()
    }))
)