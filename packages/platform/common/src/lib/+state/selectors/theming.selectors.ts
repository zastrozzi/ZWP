import { createFeatureSelector, createSelector } from "@ngrx/store"
import { systemDarkColors, systemLightColors } from "../../model"
import { Identifiers } from "../identifiers"
import { ThemingFeatureState } from "../reducers"
import { createNamespacedFeatureKey } from '../../utils'

const themingState = createFeatureSelector<ThemingFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.ZWP_ACTION_IDENTIFIER,
        Identifiers.THEMING_STATE_FEATURE_KEY
    )
)

const automaticDarkModeSwitching = createSelector(themingState, (state) => state.switchDarkModeAutomatically)
const darkMode = createSelector(themingState, (state) => state.darkMode)
const storedDarkModeColors = createSelector(themingState, (state) => state.storedDarkModeColors)
const storedLightModeColors = createSelector(themingState, (state) => state.storedLightModeColors)
const safariThemeColorDark = createSelector(themingState, (state) => state.darkModeSafariThemeColor)
const safariThemeColorLight = createSelector(themingState, (state) => state.lightModeSafariThemeColor)
const textStyles = createSelector(themingState, (state) => state.textStyles)
const textScale = createSelector(themingState, (state) => state.textScale)

const colors = createSelector(themingState, (state) => state.colors)
const themeColors = createSelector(
    darkMode, 
    colors, 
    storedDarkModeColors, 
    storedLightModeColors, 
    (isDarkMode, colors, darkColors, lightColors) => { return { ...colors, ...(isDarkMode ? darkColors : lightColors), ...(isDarkMode ? systemDarkColors : systemLightColors) } }
)

export const ThemingSelectors = {
    automaticDarkModeSwitching,
    darkMode,
    storedDarkModeColors,
    storedLightModeColors,
    safariThemeColorDark,
    safariThemeColorLight,
    textStyles,
    textScale,
    colors,
    themeColors
}