import { inject, InjectionToken } from "@angular/core";
// import { isUndefined } from "@zwp/platform.common";
import { ZWPGoogleAnalyticsDataLayer, ZWPGoogleAnalyticsGTagBuilder, ZWPGoogleAnalyticsWindow } from "../types";
import { getZWPGoogleAnalyticsDataLayer, ZWP_GOOGLE_ANALYTICS_DATA_LAYER } from "./google-analytics.data-layer.token";
import { ZWP_GOOGLE_ANALYTICS_WINDOW } from "./google-analytics.window.token";

export function getZWPGoogleAnalyticsGTagBuilder(zwpGAWindow: ZWPGoogleAnalyticsWindow, dataLayer: ZWPGoogleAnalyticsDataLayer): ZWPGoogleAnalyticsGTagBuilder {
    return (zwpGAWindow)
    ? zwpGAWindow['gtag'] = zwpGAWindow['gtag'] || function () {
        // eslint-disable-next-line prefer-rest-params
        dataLayer.push(arguments as any);
        // console.log('getZWPGoogleAnalyticsGTagBuilder', zwpGAWindow, dataLayer)
      }
    : null;
    
    
}

export const ZWP_GOOGLE_ANALYTICS_GTAG_BUILDER = new InjectionToken<ZWPGoogleAnalyticsGTagBuilder>('zwp.analytics.google.gtag-builder', {
    providedIn: 'root',
    factory: () => getZWPGoogleAnalyticsGTagBuilder(inject(ZWP_GOOGLE_ANALYTICS_WINDOW), inject(ZWP_GOOGLE_ANALYTICS_DATA_LAYER))
})