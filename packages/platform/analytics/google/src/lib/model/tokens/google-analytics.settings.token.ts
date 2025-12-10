import { InjectionToken } from "@angular/core";
import { ZWPGoogleAnalyticsSettings } from "../interfaces";

export const ZWP_GOOGLE_ANALYTICS_SETTINGS = new InjectionToken<ZWPGoogleAnalyticsSettings>('zwp.analytics.google.settings', {
    factory: () => ({ trackingCode: '', enableTracing: false })
})