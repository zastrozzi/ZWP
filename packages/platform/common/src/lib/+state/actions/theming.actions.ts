import { createAction, props } from '@ngrx/store'
import { ZWPScreenBreakpointSize, PartialTextStyleSet, TextStyle, TextStyleType } from '../../model'
import { ColorTheme, ColorThemeSet } from '../../model/styling/color-themes'
import { createActionType } from '../../utils'
import { Identifiers } from '../identifiers'

const THEMING_ACTION_IDENTIFIERS = [
    Identifiers.ZWP_ACTION_IDENTIFIER, 
    Identifiers.THEMING_STATE_FEATURE_KEY
]
const setOneThemeColor = createAction(createActionType(THEMING_ACTION_IDENTIFIERS, 'Set Theme Color'), props<{ colorName: string; colorHexString: string }>())
const setInitialThemeColors = createAction(createActionType(THEMING_ACTION_IDENTIFIERS, 'Set Initial Theme Colors'), props<{ colorThemeSet: ColorThemeSet }>())
const setManyThemeColors = createAction(
    createActionType(THEMING_ACTION_IDENTIFIERS, 'Set Many Theme Colors'),
    props<{ colorTheme: ColorTheme; storeDarkMode: boolean; storeLightMode: boolean }>()
)
const setAutomaticDarkModePreference = createAction(createActionType(THEMING_ACTION_IDENTIFIERS, 'Set Automatic Dark Mode Preference'), props<{ automatic: boolean }>())
const setDarkMode = createAction(createActionType(THEMING_ACTION_IDENTIFIERS, 'Set Dark Mode'), props<{ isDarkMode: boolean }>())
const toggleDarkMode = createAction(createActionType(THEMING_ACTION_IDENTIFIERS, 'Toggle Dark Mode'))
const setSafariThemeColorLight = createAction(createActionType(THEMING_ACTION_IDENTIFIERS, 'Set Safari Theme Color Light'), props<{ colorHexString: string }>())
const setSafariThemeColorDark = createAction(createActionType(THEMING_ACTION_IDENTIFIERS, 'Set Safari Theme Color Dark'), props<{ colorHexString: string }>())

const setTextStyles = createAction(createActionType(THEMING_ACTION_IDENTIFIERS, 'Set Text Styles'), props<{ styleSet: PartialTextStyleSet, breakpointSize: ZWPScreenBreakpointSize }>())
const setTextStyle = createAction(createActionType(THEMING_ACTION_IDENTIFIERS, 'Set Text Style'), props<{ styleType: TextStyleType; textStyle: TextStyle, breakpointSize: ZWPScreenBreakpointSize }>())
const setTextScale = createAction(createActionType(THEMING_ACTION_IDENTIFIERS, 'Set Text Scale'), props<{ textScale: number }>())
const incrementTextScale = createAction(createActionType(THEMING_ACTION_IDENTIFIERS, 'Increment Text Scale'), props<{ amount: number }>())
const decrementTextScale = createAction(createActionType(THEMING_ACTION_IDENTIFIERS, 'Decrement Text Scale'), props<{ amount: number }>())

export const ThemingActions = {
    setOneThemeColor,
    setInitialThemeColors,
    setManyThemeColors,
    setAutomaticDarkModePreference,
    setDarkMode,
    toggleDarkMode,
    setSafariThemeColorLight,
    setSafariThemeColorDark,
    setTextStyles,
    setTextStyle,
    setTextScale,
    incrementTextScale,
    decrementTextScale
}