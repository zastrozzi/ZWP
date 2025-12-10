import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, isDevMode } from "@angular/core";
import { isUndefined, ZWPDebuggableInjectable } from "@zwp/platform.common";
import { ZWPGoogleAnalytics4ActionEventName, ZWPGoogleAnalyticsGTagBuilder, ZWPGoogleAnalyticsSettings, ZWP_GOOGLE_ANALYTICS_GTAG_BUILDER, ZWP_GOOGLE_ANALYTICS_SETTINGS } from "../model";

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({serviceName: 'ZWPGoogleAnalyticsService', options: { skipMethodDebugger: true }})
export class ZWPGoogleAnalyticsService {
    constructor(
        @Inject(ZWP_GOOGLE_ANALYTICS_SETTINGS) private readonly settings: ZWPGoogleAnalyticsSettings,
        @Inject(ZWP_GOOGLE_ANALYTICS_GTAG_BUILDER) private readonly gtagBuilder: ZWPGoogleAnalyticsGTagBuilder,
        @Inject(DOCUMENT) private readonly _document: Document
    ) {
        // super('ZWPGoogleAnalyticsService', { skipMethodDebugger: true })
    }

    gtag(...args: any[]) {
        try {
            this.gtagBuilder(...args.filter(x => x !== undefined))
        } catch (error: any) {
            this.throw(error)
        }
    }

    event(actionName: ZWPGoogleAnalytics4ActionEventName | string, category?: string, label?: string, value?: number, interaction?: boolean, options?: object) {
        // console.log('got event')
        try {
            const opts = new Map<string, any>()
            if (!isUndefined(category)) { opts.set('event_category', category) }
            if (!isUndefined(label)) { opts.set('event_label', label) }
            if (!isUndefined(value)) { opts.set('value', value) }
            if (!isUndefined(interaction)) { opts.set('interaction', interaction) }
            if (!isUndefined(options)) { Object.entries(options).map(([k, v]) => opts.set(k, v)) }
            const params = this.constructOptionsDict(opts)
            params ? this.gtag('event', actionName, params) : this.gtag('event', actionName)

        } catch (error: any) {
            this.throw(error)
        }
    }

    pageView(path: string, title?: string, location?: string, options?: object) {
        try {
            const opts = new Map<string, any>()
            opts.set('page_path', path)
            if (!isUndefined(title)) { opts.set('page_title', title) }
            if (!isUndefined(location) || !isUndefined(this.document.location)) { opts.set('page_location', location || this.document.location.href) }
            if (!isUndefined(options)) { Object.entries(options).map(([k, v]) => opts.set(k, v)) }
            const params = this.constructOptionsDict(opts)
            params ? this.gtag('config', this.settings.trackingCode, params) : this.gtag('config', this.settings.trackingCode)
        } catch (error: any) {
            this.throw(error)
        }
    }

    appView(screen: string, appName: string, appId?: string, appVersion?: string, installerId?: string) {
        try {
            const opts = new Map<string, any>()
            opts.set('screen_name', screen)
            opts.set('app_name', appName)
            if (!isUndefined(appId)) { opts.set('app_id', appId) }
            if (!isUndefined(appVersion)) { opts.set('app_version', appVersion) }
            if (!isUndefined(installerId)) { opts.set('app_installer_id', installerId) }
            const params = this.constructOptionsDict(opts)
            params ? this.gtag('event', 'screen_view', params) : this.gtag('event', 'screen_view')
        } catch (error: any) {
            this.throw(error)
        }
    }

    exception(description: string, fatal?: boolean) {
        try {
            const opts = new Map<string, any>()
            opts.set('description', description)
            if (!isUndefined(fatal)) { opts.set('fatal', fatal) }
            const params = this.constructOptionsDict(opts)
            params ? this.gtag('event', 'exception', params) : this.gtag('event', 'exception')
        } catch (error: any) {
            this.throw(error)
        }
    }

    set(...options: any[]) {
        try {
            this.gtagBuilder('set', ...options)
        } catch (error: any) {
            this.throw(error)
        }
    }

    private throw(error: Error) {
        if (this.settings.enableTracing || isDevMode() && console && console.error) { console.error(error) }
    }

    private constructOptionsDict(map: Map<string, any>): { [param: string]: any } | void {
        if (map.size <= 0) { return undefined }
        return Array.from(map).reduce((obj, [key, value]) => Object.defineProperty(obj, key, { value, enumerable: true }), {})
    }

    private get document(): Document {
        return this._document
    }
}