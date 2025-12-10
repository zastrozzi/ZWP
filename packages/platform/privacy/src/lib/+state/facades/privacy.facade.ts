import { Injectable } from "@angular/core"
import { ZWPDebuggableInjectable } from "@zwp/platform.common"
import { select, Store } from "@ngrx/store"
import { ZWPCookieCategory, ZWPCookieStatus } from "../../model"
import { ZWPCookieService } from "../../services/zwp.cookie.service"
import { CookieConsentActions, IPLocationActions } from "../actions"
import { IPLocationSelectors } from "../selectors"
import { CookieConsentSelectors } from "../selectors/cookie-consent.selectors"

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'ZWPPrivacyFacade', options: { skipMethodDebugger: true } })
export class ZWPPrivacyFacade {
    constructor(private store: Store, private cookieService: ZWPCookieService) {
        // super('ZWPPrivacyFacade', { skipMethodDebugger: true })
    }

    ipLocationLastUpdated$ = this.store.pipe(select(IPLocationSelectors.lastUpdated))
    ipLocationIP$ = this.store.pipe(select(IPLocationSelectors.ip))
    ipLocationHostname$ = this.store.pipe(select(IPLocationSelectors.hostname))
    ipLocationCity$ = this.store.pipe(select(IPLocationSelectors.city))
    ipLocationRegion$ = this.store.pipe(select(IPLocationSelectors.region))
    ipLocationCountry$ = this.store.pipe(select(IPLocationSelectors.country))
    ipLocationLatitude$ = this.store.pipe(select(IPLocationSelectors.latitude))
    ipLocationLongitude$ = this.store.pipe(select(IPLocationSelectors.longitude))
    ipLocationOrg$ = this.store.pipe(select(IPLocationSelectors.org))
    ipLocationPostCode$ = this.store.pipe(select(IPLocationSelectors.postCode))
    ipLocationTimezone$ = this.store.pipe(select(IPLocationSelectors.timezone))

    ipLocationCountryAnalyticsCookiesOffDefault$ = this.store.pipe(select(IPLocationSelectors.countryAnalyticsCookiesOffDefault))
    ipLocationCountryNonEssentialCookiesOptIn$ = this.store.pipe(select(IPLocationSelectors.countryNonEssentialCookiesOptIn))
    ipLocationCountryCookiesShowCategories$ = this.store.pipe(select(IPLocationSelectors.countryCookiesShowCategories))

    cookieConsentLastUpdated$ = this.store.pipe(select(CookieConsentSelectors.lastUpdated))
    cookieConsentItems$ = this.store.pipe(select(CookieConsentSelectors.cookieConsentItems))
    cookieConsentItemsByCategory$ = this.store.pipe(select(CookieConsentSelectors.cookieConsentItemsByCategory))
    cookieConsentEssentialStatus$ = this.store.pipe(select(CookieConsentSelectors.essentialConsentStatus))
    cookieConsentPersonalisationStatus$ = this.store.pipe(select(CookieConsentSelectors.personalisationConsentStatus))
    cookieConsentAnalyticsStatus$ = this.store.pipe(select(CookieConsentSelectors.analyticsConsentStatus))
    cookieConsentMarketingStatus$ = this.store.pipe(select(CookieConsentSelectors.marketingConsentStatus))
    cookieConsentPerformanceStatus$ = this.store.pipe(select(CookieConsentSelectors.performanceConsentStatus))
    cookieConsentFunctionalStatus$ = this.store.pipe(select(CookieConsentSelectors.functionalConsentStatus))
    cookieConsentUncategorisedStatus$ = this.store.pipe(select(CookieConsentSelectors.uncategorisedConsentStatus))
    cookieConsentHasUnset$ = this.store.pipe(select(CookieConsentSelectors.hasUnset))
    // cookieConsentPreferencesStatus$ = this.store.pipe(select(CookieConsentSelectors.preferencesConsentStatus))
    // cookieConsentStatisticsStatus$ = this.store.pipe(select(CookieConsentSelectors.statisticsConsentStatus))

    // cookies$ = this.cookieService.cookies$


    locateUser() {
        this.store.dispatch(IPLocationActions.locateUserRequest())
    }

    getCookies() {
        return this.cookieService.getCookies()
    }

    registerCookie(name: string, category: ZWPCookieCategory, description: string, allowCallback: () => void, denyCallback: () => void) {
        // console.log('registerCookie', name, category, description, allowCallback, denyCallback)
        this.store.dispatch(CookieConsentActions.registerCookie({ name, category, description }))
        this.cookieService.registerCookieConsentCallbacks(name, allowCallback, denyCallback)
    }

    deleteCookie(name: string) {
        this.cookieService.deleteCookie(name)
    }

    triggerCookieConsentCallback(name: string, consentStatus: ZWPCookieStatus) {
        this.cookieService.triggerCookieConsentCallback(name, consentStatus)
    }

    setCategoryStatus(category: ZWPCookieCategory, consentStatus: ZWPCookieStatus) {
        this.store.dispatch(CookieConsentActions.setCategoryStatus({ category, consentStatus }))
    }

    setMultipleCategoryStatus(categories: ZWPCookieCategory[], consentStatus: ZWPCookieStatus) {
        this.store.dispatch(CookieConsentActions.setMultipleCategoryStatus({ categories, consentStatus }))
    }

    setCookieStatus(name: string, consentStatus: ZWPCookieStatus) {
        this.store.dispatch(CookieConsentActions.setCookieStatus({ name, consentStatus }))
    }

    setMultipleCookieStatus(names: string[], consentStatus: ZWPCookieStatus) {
        this.store.dispatch(CookieConsentActions.setMultipleCookieStatus({ names, consentStatus }))
    }

    resetCookieConsent() {
        this.store.dispatch(CookieConsentActions.resetPreferences())
    }

    confirmCookiePreferences() {
        this.store.dispatch(CookieConsentActions.confirmPreferences())
    }

    showCookieConsentBanner() {
        this.cookieService.openBanner()
        // this.store.dispatch(CookieConsentActions.showBanner())
    }

    hideCookieConsentBanner() {
        this.cookieService.closeBanner()
        // this.store.dispatch(CookieConsentActions.hideBanner())
    }
}