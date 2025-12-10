import { createFeatureSelector, createSelector } from "@ngrx/store"
import { createNamespacedFeatureKey, screenBreakpointDeviceIsLandscape, screenBreakpointDeviceIsPortrait, screenBreakpointDeviceMaxWidth, screenBreakpointDeviceMinWidth, screenBreakpointSizeMaxWidth, screenBreakpointSizeMinWidth } from "../../utils"
import { Identifiers } from "../identifiers"
import { ApplicationFeatureState } from "../reducers"

const applicationState = createFeatureSelector<ApplicationFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.ZWP_ACTION_IDENTIFIER,
        Identifiers.APPLICATION_STATE_FEATURE_KEY
    )
)

const applicationName = createSelector(applicationState, (state) => state.applicationName)
const applicationVersion = createSelector(applicationState, (state) => state.applicationVersion)
const currentScreenBreakpointSize = createSelector(applicationState, (state) => state.currentScreenBreakpointSize)
const currentScreenBreakpointDevice = createSelector(applicationState, (state) => state.currentScreenBreakpointDevice)
const currentScreenBreakpointSizeMinWidth = createSelector(currentScreenBreakpointSize, breakpointSize => breakpointSize && screenBreakpointSizeMinWidth(breakpointSize))
const currentScreenBreakpointSizeMaxWidth = createSelector(currentScreenBreakpointSize, breakpointSize => breakpointSize && screenBreakpointSizeMaxWidth(breakpointSize))
const currentScreenBreakpointDeviceMinWidth = createSelector(currentScreenBreakpointDevice, breakpointDevice => breakpointDevice && screenBreakpointDeviceMinWidth(breakpointDevice))
const currentScreenBreakpointDeviceMaxWidth = createSelector(currentScreenBreakpointDevice, breakpointDevice => breakpointDevice && screenBreakpointDeviceMaxWidth(breakpointDevice))
const currentScreenBreakpointDeviceIsPortrait = createSelector(currentScreenBreakpointDevice, breakpointDevice => breakpointDevice && screenBreakpointDeviceIsPortrait(breakpointDevice))
const currentScreenBreakpointDeviceIsLandscape = createSelector(currentScreenBreakpointDevice, breakpointDevice => breakpointDevice && screenBreakpointDeviceIsLandscape(breakpointDevice))


export const ApplicationSelectors = {
    applicationName,
    applicationVersion,
    currentScreenBreakpointSize,
    currentScreenBreakpointDevice,
    currentScreenBreakpointSizeMinWidth,
    currentScreenBreakpointSizeMaxWidth,
    currentScreenBreakpointDeviceMinWidth,
    currentScreenBreakpointDeviceMaxWidth,
    currentScreenBreakpointDeviceIsPortrait,
    currentScreenBreakpointDeviceIsLandscape
}