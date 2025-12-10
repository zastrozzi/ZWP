import { createReducer, on } from '@ngrx/store'
import { PersistentState, Undefinable } from '../../model'
import { ZWPScreenBreakpointDevice, ZWPScreenBreakpointSize } from '../../model/breakpoints'
import { ApplicationActions } from '../actions'

export interface ApplicationFeatureState {
    applicationName: string
    applicationVersion: Undefinable<string>
    currentScreenBreakpointSize: Undefinable<ZWPScreenBreakpointSize>
    currentScreenBreakpointDevice: Undefinable<ZWPScreenBreakpointDevice>
}

export const persistentApplicationState: PersistentState<ApplicationFeatureState> = {
    
}

export const initialApplicationFeatureState: ApplicationFeatureState = {
    applicationName: 'ZWP',
    applicationVersion: undefined,
    currentScreenBreakpointSize: undefined,
    currentScreenBreakpointDevice: undefined
}

export const applicationReducer = createReducer(
    initialApplicationFeatureState,
    on(ApplicationActions.setApplicationName, (state, { applicationName }) => ({ ...state, applicationName: applicationName })),
    on(ApplicationActions.setApplicationVersion, (state, { applicationVersion }) => ({ ...state, applicationVersion: applicationVersion })),
    on(ApplicationActions.setCurrentScreenBreakpointSize, (state, { breakpointSize }) => ({ ...state, currentScreenBreakpointSize: breakpointSize })),
    on(ApplicationActions.setCurrentScreenBreakpointDevice, (state, { breakpointDevice }) => ({ ...state, currentScreenBreakpointDevice: breakpointDevice }))
)
