import { inject, InjectionToken } from "@angular/core";
// import { isUndefined } from "@zwp/platform.common";
import { ZWPGoogleAnalyticsDataLayer, ZWPGoogleAnalyticsWindow } from "../types";
import { ZWP_GOOGLE_ANALYTICS_WINDOW } from "./google-analytics.window.token";
import { Nullable } from '@zwp/platform.common'

export function getZWPGoogleAnalyticsDataLayer(zwpGAWindow: ZWPGoogleAnalyticsWindow): ZWPGoogleAnalyticsDataLayer {
    return (zwpGAWindow)
    ? zwpGAWindow['dataLayer'] = zwpGAWindow['dataLayer'] || []
    : []
}

export const ZWP_GOOGLE_ANALYTICS_DATA_LAYER = new InjectionToken<ZWPGoogleAnalyticsDataLayer>('zwp.analytics.google.data-layer', {
    providedIn: 'root',
    factory: () => getZWPGoogleAnalyticsDataLayer(inject(ZWP_GOOGLE_ANALYTICS_WINDOW))
})