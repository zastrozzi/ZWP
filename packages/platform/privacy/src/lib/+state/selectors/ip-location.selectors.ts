import { createNamespacedFeatureKey, isNull } from "@zwp/platform.common"
import { createFeatureSelector, createSelector } from "@ngrx/store"
import { ZWPPrivacyModuleCountriesAnalyticsCookiesOffDefault, ZWPPrivacyModuleCountriesCookiesShowCategories, ZWPPrivacyModuleCountriesNonEssentialCookiesOptIn } from "../../model"
import { Identifiers } from "../identifiers"
import { IPLocationFeatureState } from "../reducers"

const ipLocationState = createFeatureSelector<IPLocationFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_PRIVACY_ACTION_IDENTIFIER,
        Identifiers.IP_LOCATION_STATE_FEATURE_KEY
    )
)

const lastUpdated = createSelector(ipLocationState, (state) => {
    if (isNull(state.lastUpdated)) return null
    return new Date(state.lastUpdated)
})
// const lastUpdatedDate = createSelector(lastUpdated, (updated) => { 
//     if (isNull(updated)) return null
//     return new Date(updated)
// })
const ip = createSelector(ipLocationState, (state) => state.ip)
const hostname = createSelector(ipLocationState, (state) => state.hostname)
const city = createSelector(ipLocationState, (state) => state.city)
const region = createSelector(ipLocationState, (state) => state.region)
const country = createSelector(ipLocationState, (state) => state.country)
const latitude = createSelector(ipLocationState, (state) => state.latitude)
const longitude = createSelector(ipLocationState, (state) => state.longitude)
const org = createSelector(ipLocationState, (state) => state.org)
const postCode = createSelector(ipLocationState, (state) => state.postCode)
const timezone = createSelector(ipLocationState, (state) => state.timezone)

const countryAnalyticsCookiesOffDefault = createSelector(country, (country) => {
    if (isNull(country)) return false
    if (ZWPPrivacyModuleCountriesAnalyticsCookiesOffDefault.includes(country)) return true
    return false
})

const countryNonEssentialCookiesOptIn = createSelector(country, (country) => {
    if (isNull(country)) return false
    if (ZWPPrivacyModuleCountriesNonEssentialCookiesOptIn.includes(country)) return true
    return false
})

const countryCookiesShowCategories = createSelector(country, (country) => {
    if (isNull(country)) return false
    if (ZWPPrivacyModuleCountriesCookiesShowCategories.includes(country)) return true
    return false
})

export const IPLocationSelectors = {
    lastUpdated,
    // lastUpdatedDate,
    ip,
    hostname,
    city,
    region,
    country,
    latitude,
    longitude,
    org,
    postCode,
    timezone,
    countryAnalyticsCookiesOffDefault,
    countryNonEssentialCookiesOptIn,
    countryCookiesShowCategories
}