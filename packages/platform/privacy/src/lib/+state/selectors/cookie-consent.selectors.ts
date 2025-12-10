import { createNamespacedFeatureKey, isNull, isUndefined } from '@zwp/platform.common'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ZWPCookieStoreItem } from '../../model/cookies/cookie-store.item'
import { Identifiers } from '../identifiers'
import { CookieConsentFeatureState, cookieConsentItemEntityAdapter } from '../reducers'
import { ZWPCookieStatus } from '../../model'

const cookieConsentState = createFeatureSelector<CookieConsentFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_PRIVACY_ACTION_IDENTIFIER,
        Identifiers.COOKIE_CONSENT_STATE_FEATURE_KEY
    )
)
const cookieConsentItemEntitySelectors = cookieConsentItemEntityAdapter.getSelectors()
const cookieConsentItems = createSelector(cookieConsentState, state => cookieConsentItemEntitySelectors.selectAll(state))
const cookieConsentItemsCount = createSelector(cookieConsentState, state => cookieConsentItemEntitySelectors.selectTotal(state))
const cookieConsentItemsByCategory = createSelector(cookieConsentItems, (items) => {
    const categories: { [key: string]: ZWPCookieStoreItem[] } = {}
    if (isUndefined(items)) return categories
    items.forEach((item) => {
        if (isUndefined(categories[item.category])) categories[item.category] = []
        categories[item.category].push(item)
    })
    return categories
})

const essentialConsentStatus = createSelector(cookieConsentState, (state) => state.essential)
const personalisationConsentStatus = createSelector(cookieConsentState, (state) => state.personalisation)
const analyticsConsentStatus = createSelector(cookieConsentState, (state) => state.analytics)
const marketingConsentStatus = createSelector(cookieConsentState, (state) => state.marketing)
const performanceConsentStatus = createSelector(cookieConsentState, (state) => state.performance)
const functionalConsentStatus = createSelector(cookieConsentState, (state) => state.functional)
const uncategorisedConsentStatus = createSelector(cookieConsentState, (state) => state.uncategorised)
const hasUnset = createSelector(
    essentialConsentStatus, 
    personalisationConsentStatus, 
    analyticsConsentStatus, 
    marketingConsentStatus, 
    performanceConsentStatus, 
    functionalConsentStatus,
    (essential, personalisation, analytics, marketing, performance, functional) => {
    return [essential, personalisation, analytics, marketing, performance, functional].some(status => status === ZWPCookieStatus.UNSET)
})


const lastUpdated = createSelector(cookieConsentState, (state) => {
    if (isNull(state.lastUpdated)) return null
    return new Date(state.lastUpdated)
})

export const CookieConsentSelectors = {
    cookieConsentItems,
    cookieConsentItemsCount,
    cookieConsentItemsByCategory,
    essentialConsentStatus,
    personalisationConsentStatus,
    analyticsConsentStatus,
    marketingConsentStatus,
    performanceConsentStatus,
    functionalConsentStatus,
    uncategorisedConsentStatus,
    lastUpdated,
    hasUnset
}