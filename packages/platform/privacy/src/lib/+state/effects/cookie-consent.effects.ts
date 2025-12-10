import { Injectable } from "@angular/core"
import { createNamespacedFeatureKey, isNull, isUndefined, ZWPDebuggableInjectable, PersistenceActions, PersistenceProfileActions } from "@zwp/platform.common"
import { Actions, createEffect, ofType, OnInitEffects } from "@ngrx/effects"
import { Action } from "@ngrx/store"
import { delay, map, tap, withLatestFrom } from "rxjs"
import { ZWPCookieCategory, ZWPCookieStatus } from "../../model"
import { CookieConsentActions, IPLocationActions } from "../actions"
import { ZWPPrivacyFacade } from "../facades"
import { Identifiers } from "../identifiers"

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'ZWPCookieConsentEffects', options: { skipMethodDebugger: true } })
export class ZWPCookieConsentEffects implements OnInitEffects {
    constructor(private actions$: Actions, private privacyFacade: ZWPPrivacyFacade) {
        // super('ZWPCookieConsentEffects', { skipMethodDebugger: true })
    }

    setCategoryStatus$ = createEffect(() => this.actions$.pipe(
        ofType(CookieConsentActions.setCategoryStatus),
        withLatestFrom(this.privacyFacade.cookieConsentItemsByCategory$),
        tap(([action, itemsByCategory]) => {
            // console.log('setCategoryStatus', action)
            if (!itemsByCategory[action.category]) { return }
            itemsByCategory[action.category].forEach(item => {
                if (action.consentStatus !== item.status) {
                    this.privacyFacade.setCookieStatus(item.name, action.consentStatus)
                }
            })
        })
    ), { dispatch: false })
            
    setCookieStatus$ = createEffect(() => this.actions$.pipe(
        ofType(CookieConsentActions.setCookieStatus),
        tap(action => {
            // console.log('setCookieStatus', action)
            this.privacyFacade.triggerCookieConsentCallback(action.name, action.consentStatus)

        })
    ), { dispatch: false })

    registerCookieStatus$ = createEffect(() => this.actions$.pipe(
        ofType(CookieConsentActions.registerCookie),
        delay(1000),
        withLatestFrom(
            this.privacyFacade.cookieConsentItems$,
            // this.privacyFacade.cookieConsentLastUpdated$,
            this.privacyFacade.cookieConsentEssentialStatus$,
            this.privacyFacade.cookieConsentPersonalisationStatus$,
            this.privacyFacade.cookieConsentAnalyticsStatus$,
            this.privacyFacade.cookieConsentMarketingStatus$,
            this.privacyFacade.cookieConsentPerformanceStatus$,
            this.privacyFacade.cookieConsentFunctionalStatus$,
            this.privacyFacade.cookieConsentUncategorisedStatus$
        ),
        tap(([action, items, essentialStatus, personalisationStatus, analyticsStatus, marketingStatus, performanceStatus, functionalStatus, uncategorisedStatus]) => {
            let status = ZWPCookieStatus.UNSET
            switch (action.category) {
                case ZWPCookieCategory.ESSENTIAL: status = essentialStatus; break
                case ZWPCookieCategory.PERSONALISATION: status = personalisationStatus; break
                case ZWPCookieCategory.ANALYTICS: status = analyticsStatus; break
                case ZWPCookieCategory.MARKETING: status = marketingStatus; break
                case ZWPCookieCategory.PERFORMANCE: status = performanceStatus; break
                case ZWPCookieCategory.FUNCTIONAL: status = functionalStatus; break
                case ZWPCookieCategory.UNCATEGORISED: status = uncategorisedStatus; break
            }
            const item = items.find(item => item.name === action.name)
            if (!isUndefined(item)) { 
                if (item.status !== status) {
                    this.privacyFacade.setCookieStatus(action.name, item.status)
                    return
                }
                
            }
            this.privacyFacade.setCookieStatus(action.name, status)
            return
        })
    ), { dispatch: false })

            // console.log('registerCookieStatus', action)
            // console.log('registerCookieStatus - lastUpdated', lastUpdated)
            // console.log('registerCookieStatus - essentialStatus', essentialStatus)
            // console.log('registerCookieStatus - personalisationStatus', personalisationStatus)
            // console.log('registerCookieStatus - analyticsStatus', analyticsStatus)
            // console.log('registerCookieStatus - marketingStatus', marketingStatus)
            // console.log('registerCookieStatus - performanceStatus', performanceStatus)
            // console.log('registerCookieStatus - functionalStatus', functionalStatus)
            // console.log('registerCookieStatus - uncategorisedStatus', uncategorisedStatus)
            
            

    setDefaultsFromLocation$ = createEffect(() => this.actions$.pipe(
        ofType(CookieConsentActions.rehydrateState),
        delay(1000),
        withLatestFrom(
            this.privacyFacade.cookieConsentLastUpdated$,
            this.privacyFacade.ipLocationCountryAnalyticsCookiesOffDefault$,
            this.privacyFacade.ipLocationCountryNonEssentialCookiesOptIn$,
            this.privacyFacade.cookieConsentHasUnset$
        ),
        tap(([action, lastUpdated, analyticsCookiesOffDefault, nonEssentialCookiesOptIn, hasUnset]) => {
            // console.log('setDefaultsFromLocation - action', action)
            // console.log('setDefaultsFromLocation - lastUpdated', lastUpdated)
            // console.log('setDefaultsFromLocation - analyticsCookiesOffDefault', analyticsCookiesOffDefault)
            // console.log('setDefaultsFromLocation - nonEssentialCookiesOptIn', nonEssentialCookiesOptIn)
            if (!isNull(lastUpdated) && !hasUnset) { return }
            console.log("Has unset cookies", hasUnset)
            this.privacyFacade.setCategoryStatus(ZWPCookieCategory.ANALYTICS, analyticsCookiesOffDefault ? ZWPCookieStatus.DENY : ZWPCookieStatus.ALLOW)
            this.privacyFacade.setCategoryStatus(ZWPCookieCategory.PERSONALISATION, nonEssentialCookiesOptIn ? ZWPCookieStatus.DENY : ZWPCookieStatus.ALLOW)
            this.privacyFacade.setCategoryStatus(ZWPCookieCategory.MARKETING, nonEssentialCookiesOptIn ? ZWPCookieStatus.DENY : ZWPCookieStatus.ALLOW)
            this.privacyFacade.setCategoryStatus(ZWPCookieCategory.PERFORMANCE, nonEssentialCookiesOptIn ? ZWPCookieStatus.DENY : ZWPCookieStatus.ALLOW)
            this.privacyFacade.setCategoryStatus(ZWPCookieCategory.FUNCTIONAL, nonEssentialCookiesOptIn ? ZWPCookieStatus.DENY : ZWPCookieStatus.ALLOW)
            this.privacyFacade.setCategoryStatus(ZWPCookieCategory.UNCATEGORISED, nonEssentialCookiesOptIn ? ZWPCookieStatus.DENY : ZWPCookieStatus.ALLOW)
            this.privacyFacade.showCookieConsentBanner()
            
            return 
        })
    ), { dispatch: false })

    resetPreferences$ = createEffect(() => this.actions$.pipe(
        ofType(CookieConsentActions.resetPreferences),
        withLatestFrom(
            this.privacyFacade.ipLocationCountryAnalyticsCookiesOffDefault$,
            this.privacyFacade.ipLocationCountryNonEssentialCookiesOptIn$
        ),
        tap(([action, analyticsCookiesOffDefault, nonEssentialCookiesOptIn]) => {
            // console.log('resetPreferences - action', action)
            // console.log('resetPreferences - analyticsCookiesOffDefault', analyticsCookiesOffDefault)
            // console.log('resetPreferences - nonEssentialCookiesOptIn', nonEssentialCookiesOptIn)
            this.privacyFacade.setCategoryStatus(ZWPCookieCategory.ANALYTICS, analyticsCookiesOffDefault ? ZWPCookieStatus.DENY : ZWPCookieStatus.ALLOW)

            this.privacyFacade.setCategoryStatus(ZWPCookieCategory.PERSONALISATION, nonEssentialCookiesOptIn ? ZWPCookieStatus.DENY : ZWPCookieStatus.ALLOW)
            this.privacyFacade.setCategoryStatus(ZWPCookieCategory.MARKETING, nonEssentialCookiesOptIn ? ZWPCookieStatus.DENY : ZWPCookieStatus.ALLOW)
            this.privacyFacade.setCategoryStatus(ZWPCookieCategory.PERFORMANCE, nonEssentialCookiesOptIn ? ZWPCookieStatus.DENY : ZWPCookieStatus.ALLOW)
            this.privacyFacade.setCategoryStatus(ZWPCookieCategory.FUNCTIONAL, nonEssentialCookiesOptIn ? ZWPCookieStatus.DENY : ZWPCookieStatus.ALLOW)
            this.privacyFacade.setCategoryStatus(ZWPCookieCategory.UNCATEGORISED, nonEssentialCookiesOptIn ? ZWPCookieStatus.DENY : ZWPCookieStatus.ALLOW)
            return
        })
    ), { dispatch: false })


    rehydrateState$ = createEffect(() => this.actions$.pipe(
        ofType(PersistenceProfileActions.setSelected),
        map((action) => PersistenceActions.rehydrateStateRequest({ 
            featureKey: createNamespacedFeatureKey(
                Identifiers.PLATFORM_PRIVACY_ACTION_IDENTIFIER, 
                Identifiers.COOKIE_CONSENT_STATE_FEATURE_KEY
            ),
            persistenceProfileId: action.id 
        }))
    ))

    delayInitialRehydrate$ = createEffect(() => this.actions$.pipe(
        ofType(CookieConsentActions.rehydrateState),
        delay(1),
        map(() => PersistenceActions.rehydrateStateRequest({ 
            featureKey: createNamespacedFeatureKey(
                Identifiers.PLATFORM_PRIVACY_ACTION_IDENTIFIER, 
                Identifiers.COOKIE_CONSENT_STATE_FEATURE_KEY
            ),
            persistenceProfileId: null 
        }))
    ))
    // relocateOnStateRehydration$ = createEffect(() => this.actions$.pipe(
    //     ofType(PersistenceActions.rehydrateStateSuccess),
    //     map(action => action.featureKey),
    //     filter(featureKey => featureKey === COOKIE_CONSENT_STATE_FEATURE_KEY),
    //     map(() => IPLocationActions.locateUserRequest())
    // ))

    // showCookieConsentBanner$ = createEffect(() => this.actions$.pipe(
    //     ofType(CookieConsentActions.showBanner),
    //     tap(() => this.privacyFacade.showCookieConsentBanner())
    // ), { dispatch: false })

    ngrxOnInitEffects(): Action {
        return CookieConsentActions.rehydrateState()
    }
}