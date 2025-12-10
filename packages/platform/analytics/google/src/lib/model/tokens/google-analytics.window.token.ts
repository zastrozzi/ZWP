import { DOCUMENT } from "@angular/common";
import { inject, InjectionToken } from "@angular/core";
import { isNull } from "@zwp/platform.common";
import { ZWPGoogleAnalyticsWindow } from "../types";

export const ZWP_GOOGLE_ANALYTICS_WINDOW = new InjectionToken<ZWPGoogleAnalyticsWindow>('zwp.analytics.google.window', {
    providedIn: 'root',
    factory: () => {
        const { defaultView } = inject(DOCUMENT)
        if (isNull(defaultView)) { throw new Error('Window is not available') }
        return defaultView
    }
})