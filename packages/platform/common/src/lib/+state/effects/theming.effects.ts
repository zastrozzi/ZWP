import { Injectable } from "@angular/core"
import { MetaDefinition } from "@angular/platform-browser"
import { Actions, createEffect, ofType, OnInitEffects } from "@ngrx/effects"
import { Action, select, Store } from "@ngrx/store"
import { delay, filter, fromEvent, map, Observable, skip, startWith, tap, withLatestFrom } from "rxjs"
import { ZWPDebuggableInjectable } from '../../decorators'
import { PersistenceActions, PersistenceProfileActions, ThemingActions } from "../actions"
import { ZWPApplicationFacade } from "../facades"
import { Identifiers } from "../identifiers"
import { ThemingSelectors } from "../selectors"
import { createNamespacedFeatureKey, isUndefined } from "../../utils"
import { ZWPScreenBreakpointSize } from "../../model"

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'ZWPThemingEffects', options: { skipMethodDebugger: true } })
export class ZWPThemingEffects implements OnInitEffects {
    constructor(private actions$: Actions, private store: Store, private applicationFacade: ZWPApplicationFacade) {
        // super('ZWPThemingEffects', { skipMethodDebugger: true })
    }

    detectDarkMode$ = createEffect(() =>
        mediaQueryEvent('(prefers-color-scheme: dark)').pipe(
            skip(1),
            withLatestFrom(this.store.pipe(select(ThemingSelectors.automaticDarkModeSwitching))),
            map(pair => ({ browserPrefersDarkMode: pair[0], automaticDarkModeSwitching: pair[1]})),
            filter((value) => (value.automaticDarkModeSwitching === true)),
            map((value) => ThemingActions.setDarkMode({ isDarkMode: value.browserPrefersDarkMode }))
        )        
    )

    setDarkModeOnInit$ = createEffect(() => this.actions$.pipe(
        ofType(ThemingActions.setInitialThemeColors),
        withLatestFrom(this.store.pipe(select(ThemingSelectors.automaticDarkModeSwitching)), this.store.pipe(select(ThemingSelectors.darkMode))),
        map(pair => ({ automaticSwitching: pair[1], darkMode: pair[2] })),
        // filter(settings => (settings.automaticSwitching === true)),
        map((settings) => {
            // console.log('dark mode on init settings', settings)
            const darkModeOn = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            return ThemingActions.setDarkMode({ isDarkMode: settings.automaticSwitching ? darkModeOn : settings.darkMode })
        })
    ))

    setSafariThemeColorMetatagOnDarkMode$ = createEffect(() =>
        this.store.pipe(select(ThemingSelectors.darkMode)).pipe(
            withLatestFrom(
                this.store.pipe(select(ThemingSelectors.safariThemeColorDark)),
                this.store.pipe(select(ThemingSelectors.safariThemeColorLight))
            ),
            map(tuple => ({darkMode: tuple[0], safariDark: tuple[1], safariLight: tuple[2]})),
            tap(value => { 
                const themeColorTag: MetaDefinition = { name: "theme-color", content: value.darkMode ? value.safariDark : value.safariLight }
                this.applicationFacade.upsertMetaTag(themeColorTag)
                return
            })
        ),
        { dispatch: false }
    )

    setSafariThemeColorMetatagOnThemeDarkColorChange$ = createEffect(() =>
        this.store.pipe(select(ThemingSelectors.safariThemeColorDark)).pipe(
            withLatestFrom(
                this.store.pipe(select(ThemingSelectors.darkMode))
            ),
            map(tuple => ({safariDark: tuple[0], darkMode: tuple[1]})),
            filter(value => value.darkMode === true),
            tap(value => { 
                const themeColorTag: MetaDefinition = { name: "theme-color", content: value.safariDark }
                this.applicationFacade.upsertMetaTag(themeColorTag)
                return
            })
        ),
        { dispatch: false }
    )

    setSafariThemeColorMetatagOnThemeLightColorChange$ = createEffect(() =>
        this.store.pipe(select(ThemingSelectors.safariThemeColorLight)).pipe(
            withLatestFrom(
                this.store.pipe(select(ThemingSelectors.darkMode))
            ),
            map(tuple => ({safariLight: tuple[0], darkMode: tuple[1]})),
            filter(value => value.darkMode === false),
            tap(value => { 
                const themeColorTag: MetaDefinition = { name: "theme-color", content: value.safariLight }
                this.applicationFacade.upsertMetaTag(themeColorTag)
                return
            })
        ),
        { dispatch: false }
    )

    toggleDarkMode$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ThemingActions.toggleDarkMode),
            withLatestFrom(this.store.pipe(select(ThemingSelectors.darkMode))),
            map(pair => !pair[1]),
            map(isDarkMode => ThemingActions.setDarkMode({ isDarkMode }))
        )
    )

    setDarkMode$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ThemingActions.setDarkMode),
            map(action => action.isDarkMode),
            withLatestFrom(
                this.store.pipe(select(ThemingSelectors.storedDarkModeColors)),
                this.store.pipe(select(ThemingSelectors.storedLightModeColors)),
                this.store.pipe(select(ThemingSelectors.safariThemeColorDark)),
                this.store.pipe(select(ThemingSelectors.safariThemeColorLight))
            ),
            map(tuple => ({darkMode: tuple[0], darkColors: tuple[1], lightColors: tuple[2], safariDark: tuple[3], safariLight: tuple[4]})),
            map(value => {
                return ThemingActions.setManyThemeColors({ colorTheme: value.darkMode ? value.darkColors : value.lightColors, storeDarkMode: false, storeLightMode: false })}
            )
        )
    )

    // setSafariThemeColorDark$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(ThemingActions.setSafariThemeColorDark),
    //         withLatestFrom(this.store.pipe(select(ThemingSelectors.darkMode))),
    //         filter(tuple => tuple[1] === true ),
    //         map(tuple => tuple[0].colorHexString),
    //         map(value => {
    //             let themeColorTag: MetaDefinition = { name: "theme-color", content: value }
    //             this.applicationFacade.upsertMetaTag(themeColorTag)
    //         })
    //     ), { dispatch: false }
    // )

    // setSafariThemeColorLight$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(ThemingActions.setSafariThemeColorLight),
    //         withLatestFrom(this.store.pipe(select(ThemingSelectors.darkMode))),
    //         filter(tuple => tuple[1] === false ),
    //         map(tuple => tuple[0].colorHexString),
    //         map(value => {
    //             let themeColorTag: MetaDefinition = { name: "theme-color", content: value }
    //             this.applicationFacade.upsertMetaTag(themeColorTag)
    //         })
    //     ), { dispatch: false }
    // )

    // setTextStylesForCurrentBreakpointSize$ = createEffect(() => this.applicationFacade.currentScreenBreakpointSize$.pipe(
    //     delay(10),
    //     map((size) => {
    //         if (!isUndefined(size)) {
    //             switch (size) {
    //                 case ZWPScreenBreakpointSize.EXTRA_SMALL:
    //                 case ZWPScreenBreakpointSize.SMALL:
    //                     this.themingFacade.setTextStyles(LocalTextStyles.mobile)
    //                     break
    //                 case ZWPScreenBreakpointSize.MEDIUM:
    //                     this.themingFacade.setTextStyles(LocalTextStyles.tablet)
    //                     break
    //                 case ZWPScreenBreakpointSize.LARGE: 
    //                 case ZWPScreenBreakpointSize.EXTRA_LARGE:
    //                     this.themingFacade.setTextStyles(LocalTextStyles.web)
    //                     break
    //             }
    //             this.googleAnalyticsService.event('set_breakpoint_size', 'application', size, 0, false)
    //         }
            
    //     })
    // ), { dispatch: false })

    rehydrateState$ = createEffect(() => this.actions$.pipe(
        ofType(PersistenceProfileActions.setSelected),
        map((action) => PersistenceActions.rehydrateStateRequest({ featureKey: createNamespacedFeatureKey(
                            Identifiers.ZWP_ACTION_IDENTIFIER, 
                            Identifiers.THEMING_STATE_FEATURE_KEY
                        ), persistenceProfileId: action.id }))
    ))

    ngrxOnInitEffects(): Action {
        return PersistenceActions.rehydrateStateRequest({ featureKey: createNamespacedFeatureKey(
            Identifiers.ZWP_ACTION_IDENTIFIER, 
            Identifiers.THEMING_STATE_FEATURE_KEY
        ), persistenceProfileId: null })
    }
}


export function mediaQueryEvent(query: string): Observable<boolean> {
    const mediaQuery = window.matchMedia(query)
    return fromEvent<MediaQueryList>(mediaQuery, 'change').pipe(
        startWith(mediaQuery),
        map((list: MediaQueryList) => list.matches)
    )
}