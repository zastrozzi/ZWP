import { InjectionToken } from "@angular/core";
import { ZWPGoogleAnalyticsRoutingSettings } from "../interfaces";

export const ZWP_GOOGLE_ANALYTICS_ROUTING_SETTINGS = new InjectionToken<ZWPGoogleAnalyticsRoutingSettings>('zwp.analytics.google.routing-settings', {
    factory: () => ({})
})