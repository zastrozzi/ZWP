import { createReducer, on } from '@ngrx/store'
import { ColorTheme, ZWPScreenBreakpointSize, PersistentState, TextStyleSet, emptyTextStyleSet, PartialTextStyleSetForBreakpoint, PartialTextStyleSet } from '../../model'
import { ThemingActions } from '../actions'

export interface ThemingFeatureState {
    colors: ColorTheme
    darkMode: boolean
    storedLightModeColors: ColorTheme
    storedDarkModeColors: ColorTheme
    switchDarkModeAutomatically: boolean
    darkModeSafariThemeColor: string
    lightModeSafariThemeColor: string
    textStyles: { [breakpointSize: string]: TextStyleSet }
    textScale: number
}

export const persistentThemingState: PersistentState<ThemingFeatureState> = {
    colors: true,
    darkMode: true,
    storedLightModeColors: true,
    storedDarkModeColors: true,
    switchDarkModeAutomatically: true,
    darkModeSafariThemeColor: true,
    lightModeSafariThemeColor: true,
    textStyles: true,
    textScale: true,
}

export const initialThemingFeatureState: ThemingFeatureState = {
    colors: {},
    darkMode: false,
    storedDarkModeColors: {},
    storedLightModeColors: {},
    switchDarkModeAutomatically: true,
    darkModeSafariThemeColor: '#000000',
    lightModeSafariThemeColor: '#ffffff',
    textStyles: {
        [ZWPScreenBreakpointSize.EXTRA_SMALL]: emptyTextStyleSet,
        [ZWPScreenBreakpointSize.SMALL]: emptyTextStyleSet,
        [ZWPScreenBreakpointSize.MEDIUM]: emptyTextStyleSet,
        [ZWPScreenBreakpointSize.LARGE]: emptyTextStyleSet,
        [ZWPScreenBreakpointSize.EXTRA_LARGE]: emptyTextStyleSet
    },
    textScale: 1,
}

// const flattenColors = (colors: { colorName: string; colorHexString: string }[]) => {
//     return Object.assign({}, ...colors.map((x) => ({ [x.colorName]: x.colorName })))
// }

export const themingReducer = createReducer(
    initialThemingFeatureState,
    on(ThemingActions.setOneThemeColor, (state, { colorName, colorHexString }) => ({
        ...state,
        colors: { ...state.colors, [colorName]: colorHexString },
    })),
    on(ThemingActions.setManyThemeColors, (state, { colorTheme, storeDarkMode, storeLightMode }) => ({
        ...state,
        colors: { ...state.colors, ...colorTheme },
        storedDarkModeColors: storeDarkMode
            ? { ...state.storedDarkModeColors, ...colorTheme }
            : state.storedDarkModeColors,
        storedLightModeColors: storeLightMode
            ? { ...state.storedLightModeColors, ...colorTheme }
            : state.storedLightModeColors,
    })),
    on(ThemingActions.setInitialThemeColors, (state, { colorThemeSet }) => ({
        ...state,
        colors: colorThemeSet.commonColors,
        storedDarkModeColors: colorThemeSet.darkColors,
        storedLightModeColors: colorThemeSet.lightColors,
        darkModeSafariThemeColor: colorThemeSet.darkSafariThemeColor,
        lightModeSafariThemeColor: colorThemeSet.lightSafariThemeColor,
    })),
    on(ThemingActions.setAutomaticDarkModePreference, (state, { automatic }) => ({
        ...state,
        switchDarkModeAutomatically: automatic,
    })),
    on(ThemingActions.setDarkMode, (state, { isDarkMode }) => ({ ...state, darkMode: isDarkMode })),
    on(ThemingActions.setSafariThemeColorLight, (state, { colorHexString }) => ({
        ...state,
        lightModeSafariThemeColor: colorHexString,
    })),
    on(ThemingActions.setSafariThemeColorDark, (state, { colorHexString }) => ({
        ...state,
        darkModeSafariThemeColor: colorHexString,
    })),
    on(ThemingActions.setManyTextStyles, (state, { breakpointStyleSets }) => ({
        ...state,
        textStyles: {
            ...state.textStyles,
            ...breakpointStyleSets.reduce((acc, { styleSet, breakpointSize }) => {
                acc[breakpointSize] = { ...state.textStyles[breakpointSize], ...styleSet }
                return acc
            }, {} as Record<ZWPScreenBreakpointSize, TextStyleSet>)
        }
    })),
    on(ThemingActions.setTextStyles, (state, { styleSet, breakpointSize }) => ({
        ...state,
        textStyles: { ...state.textStyles, [breakpointSize]: { ...state.textStyles[breakpointSize], ...styleSet } },
    })),
    on(ThemingActions.setTextStyle, (state, { styleType, textStyle, breakpointSize }) => ({
        ...state,
        textStyles: {
            ...state.textStyles,
            [breakpointSize]: { [styleType]: textStyle, ...state.textStyles[breakpointSize] },
        },
    })),
    on(ThemingActions.incrementTextScale, (state, { amount }) => ({
        ...state,
        textScale: Math.min(2.5, state.textScale + amount),
    })),
    on(ThemingActions.decrementTextScale, (state, { amount }) => ({
        ...state,
        textScale: Math.max(0.5, state.textScale - amount),
    })),
    on(ThemingActions.setTextScale, (state, { textScale }) => ({
        ...state,
        textScale: Math.min(2.5, Math.max(0.5, textScale)),
    }))
)
