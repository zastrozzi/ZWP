import { createActionType } from '@zwp/platform.common'
import { createAction, props } from '@ngrx/store'
import { ZWPCookieCategory, ZWPCookieStatus } from '../../model'
import { Identifiers } from '../identifiers'

const COOKIE_CONSENT_ACTION_IDENTIFIERS = [
    Identifiers.PLATFORM_PRIVACY_ACTION_IDENTIFIER, 
    Identifiers.COOKIE_CONSENT_STATE_FEATURE_KEY
]
const setCategoryStatus = createAction(createActionType(COOKIE_CONSENT_ACTION_IDENTIFIERS, 'Set Category Status'), props<{ category: ZWPCookieCategory, consentStatus: ZWPCookieStatus }>())
const setMultipleCategoryStatus = createAction(createActionType(COOKIE_CONSENT_ACTION_IDENTIFIERS, 'Set Multiple Category Status'), props<{ categories: ZWPCookieCategory[], consentStatus: ZWPCookieStatus }>())
const setCookieStatus = createAction(createActionType(COOKIE_CONSENT_ACTION_IDENTIFIERS, 'Set Cookie Status'), props<{ name: string, consentStatus: ZWPCookieStatus }>())
const setMultipleCookieStatus = createAction(createActionType(COOKIE_CONSENT_ACTION_IDENTIFIERS, 'Set Multiple Cookie Status'), props<{ names: string[], consentStatus: ZWPCookieStatus }>())
const confirmPreferences = createAction(createActionType(COOKIE_CONSENT_ACTION_IDENTIFIERS, 'Confirm Preferences'))
const resetPreferences = createAction(createActionType(COOKIE_CONSENT_ACTION_IDENTIFIERS, 'Reset Preferences'))
const registerCookie = createAction(createActionType(COOKIE_CONSENT_ACTION_IDENTIFIERS, 'Register Cookie'), props<{ name: string, category: ZWPCookieCategory, description: string }>())
const showBanner = createAction(createActionType(COOKIE_CONSENT_ACTION_IDENTIFIERS, 'Show Banner'))
const hideBanner = createAction(createActionType(COOKIE_CONSENT_ACTION_IDENTIFIERS, 'Hide Banner'))
const rehydrateState = createAction(createActionType(COOKIE_CONSENT_ACTION_IDENTIFIERS, 'Rehydrate State'))
// const setManyCookieCategoriesConsentStatus = createAction(createActionType(COOKIES_ACTION_IDENTIFIERS, 'Set Many Cookie Categories Consent Status'), props<{ categories: ZWPCookieCategory[], consentStatus: ZWPCookieStatus }>())
// const setCookieConsentStatus = createAction(createActionType(COOKIES_ACTION_IDENTIFIERS, 'Set Cookie Consent Status'), props<{ name: string, consentStatus: ZWPCookieStatus }>())

export const CookieConsentActions = {
    setCategoryStatus,
    setMultipleCategoryStatus,
    setCookieStatus,
    setMultipleCookieStatus,
    confirmPreferences,
    resetPreferences,
    registerCookie,
    showBanner,
    hideBanner,
    rehydrateState
}