import { Nullable, PersistentState } from "@zwp/platform.common"
import { EntityState, createEntityAdapter } from "@ngrx/entity"
import { createReducer, on } from "@ngrx/store"
import { ZWPCookieStatus } from "../../model"
import { ZWPCookieStoreItem } from "../../model/cookies/cookie-store.item"
import { CookieConsentActions } from "../actions"

export interface CookieConsentFeatureState extends EntityState<ZWPCookieStoreItem> {
    
    essential: ZWPCookieStatus
    personalisation: ZWPCookieStatus
    analytics: ZWPCookieStatus
    marketing: ZWPCookieStatus
    performance: ZWPCookieStatus
    functional: ZWPCookieStatus
    uncategorised: ZWPCookieStatus
    lastUpdated: Nullable<number>
    bannerShown: boolean
}

export const cookieConsentItemEntityAdapter = createEntityAdapter<ZWPCookieStoreItem>()

export const initialCookieConsentFeatureState: CookieConsentFeatureState = cookieConsentItemEntityAdapter.getInitialState({
    lastUpdated: null,
    essential: ZWPCookieStatus.ALLOW,
    personalisation: ZWPCookieStatus.UNSET,
    analytics: ZWPCookieStatus.UNSET,
    marketing: ZWPCookieStatus.UNSET,
    performance: ZWPCookieStatus.UNSET,
    functional: ZWPCookieStatus.UNSET,
    uncategorised: ZWPCookieStatus.UNSET,
    bannerShown: false
})

export const persistentCookieConsent: PersistentState<CookieConsentFeatureState> = {
    lastUpdated: true,
    essential: true,
    personalisation: true,
    analytics: true,
    marketing: true,
    performance: true,
    functional: true,
    uncategorised: true,
    ids: true,
    entities: true
}

export const cookieConsentReducer = createReducer(
    initialCookieConsentFeatureState,
    on(CookieConsentActions.setCategoryStatus, (state, { category, consentStatus }) => ({ ...state, [category]: consentStatus })),
    on(CookieConsentActions.setMultipleCategoryStatus, (state, { categories, consentStatus }) => {
        const newState = { ...state }
        categories.forEach(category => newState[category] = consentStatus)
        return newState
    }),
    on(CookieConsentActions.setCookieStatus, (state, { name, consentStatus }) => cookieConsentItemEntityAdapter.updateOne({ id: name, changes: {status: consentStatus}}, state)),
    on(CookieConsentActions.setMultipleCookieStatus, (state, { names, consentStatus }) => cookieConsentItemEntityAdapter.updateMany(names.map(name => ({ id: name, changes: {status: consentStatus}})), state)),
    on(CookieConsentActions.confirmPreferences, (state) => ({ ...state, lastUpdated: (new Date()).getTime() })),
    on(CookieConsentActions.resetPreferences, (state) => ({ ...state, lastUpdated: null })),
    // on(CookieConsentActions.resetPreferences, (state) => cookieConsentItemEntityAdapter.updateMany(Object.keys(state.entities).map(id => ({ id, changes: { status: ZWPCookieStatus.UNSET } })), {...state, ...initialCookieConsentFeatureState})),
    on(CookieConsentActions.registerCookie, (state, { name, category, description }) => cookieConsentItemEntityAdapter.setOne({ id: name, name, category, description, status: ZWPCookieStatus.UNSET }, state))
)
