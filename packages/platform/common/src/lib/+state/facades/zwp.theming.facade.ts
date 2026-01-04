import { Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { ZWPDebuggableInjectable } from '../../decorators/zwp.debuggable.decorator'
import { ColorTheme, ColorThemeSet, ZWPScreenBreakpointSize, PartialTextStyleSet, TextStyle, TextStyleType, PartialTextStyleSetForBreakpoint } from '../../model'
import { ThemingActions } from '../actions'
import { ThemingSelectors } from '../selectors'

@Injectable()
@ZWPDebuggableInjectable({serviceName: 'ZWPThemingFacade', options: { skipMethodDebugger: true }})
export class ZWPThemingFacade {
    constructor(private store: Store) {
        // super('ZWPThemingFacade', { includedMethods: [] })
    }

    themeColors$ = this.store.pipe(select(ThemingSelectors.themeColors))
    automaticDarkModeSwitching$ = this.store.pipe(select(ThemingSelectors.automaticDarkModeSwitching))
    darkMode$ = this.store.pipe(select(ThemingSelectors.darkMode))
    textStyles$ = this.store.pipe(select(ThemingSelectors.textStyles))
    textScale$ = this.store.pipe(select(ThemingSelectors.textScale))

    setThemeColor(colorName: string, colorHexString: string) {
        this.store.dispatch(ThemingActions.setOneThemeColor({ colorName, colorHexString }))
    }

    setThemeColors(colorTheme: ColorTheme, options: { storeDarkMode: boolean; storeLightMode: boolean }) {
        this.store.dispatch(ThemingActions.setManyThemeColors({ colorTheme, storeDarkMode: options.storeDarkMode, storeLightMode: options.storeLightMode }))
    }

    setAutomaticDarkModePreference(automatic: boolean) {
        this.store.dispatch(ThemingActions.setAutomaticDarkModePreference({ automatic }))
    }

    setDarkMode(isDarkMode: boolean) {
        this.store.dispatch(ThemingActions.setDarkMode({ isDarkMode }))
    }

    toggleDarkMode() {
        this.store.dispatch(ThemingActions.toggleDarkMode())
    }

    setInitialThemeColors(colorThemeSet: ColorThemeSet) {
        // const darkModeOn = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        this.store.dispatch(ThemingActions.setInitialThemeColors({ colorThemeSet }))
        // this.store.dispatch(ThemingActions.setDarkMode({ isDarkMode: darkModeOn }))
    }

    setSafariThemeColorDark(colorHexString: string) {
        this.store.dispatch(ThemingActions.setSafariThemeColorDark({ colorHexString }))
    }

    setSafariThemeColorLight(colorHexString: string) {
        this.store.dispatch(ThemingActions.setSafariThemeColorLight({ colorHexString }))
    }

    setManyTextStyles(breakpointStyleSets: PartialTextStyleSetForBreakpoint[]) {
        this.store.dispatch(ThemingActions.setManyTextStyles({ breakpointStyleSets }))
    }

    setTextStyles(styleSet: PartialTextStyleSet, breakpointSize: ZWPScreenBreakpointSize) {
        this.store.dispatch(ThemingActions.setTextStyles({ styleSet, breakpointSize }))
    }

    setTextStyle(styleType: TextStyleType, textStyle: TextStyle, breakpointSize: ZWPScreenBreakpointSize) {
        this.store.dispatch(ThemingActions.setTextStyle({ styleType, textStyle, breakpointSize }))
    }

    setTextScale(textScale: number) {
        this.store.dispatch(ThemingActions.setTextScale({ textScale }))
    }

    incrementTextScale(amount: number) {
        this.store.dispatch(ThemingActions.incrementTextScale({ amount }))
    }

    decrementTextScale(amount: number) {
        this.store.dispatch(ThemingActions.decrementTextScale({ amount }))
    }
}
