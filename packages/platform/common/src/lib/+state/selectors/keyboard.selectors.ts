import { createFeatureSelector, createSelector } from "@ngrx/store"
import { Identifiers } from "../identifiers"
import { KeyboardFeatureState } from "../reducers"
import { createNamespacedFeatureKey } from '../../utils'

const keyboardState = createFeatureSelector<KeyboardFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.ZWP_ACTION_IDENTIFIER,
        Identifiers.KEYBOARD_STATE_FEATURE_KEY
    )
)

const trackingActive = createSelector(keyboardState, s => s.trackingActive)
const activeKeyCodes = createSelector(keyboardState, s => s.activeKeyCodes)
const keyCodeIsActive = (keyCode: number) => createSelector(activeKeyCodes, (keyCodes) => keyCodes.includes(keyCode))
const altKeyActive = createSelector(keyboardState, s => s.altKeyActive)
const ctrlKeyActive = createSelector(keyboardState, s => s.ctrlKeyActive)
const metaKeyActive = createSelector(keyboardState, s => s.metaKeyActive)
const shiftKeyActive = createSelector(keyboardState, s => s.shiftKeyActive)


export const KeyboardSelectors = {
    trackingActive,
    altKeyActive,
    ctrlKeyActive,
    metaKeyActive,
    shiftKeyActive,
    activeKeyCodes,
    keyCodeIsActive
}