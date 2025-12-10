import { Provider, APP_INITIALIZER, isDevMode } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { ZWP_GOOGLE_ANALYTICS_SETTINGS, ZWP_GOOGLE_ANALYTICS_GTAG_BUILDER, ZWPGoogleAnalyticsSettings, ZWPGoogleAnalyticsGTagBuilder } from "../model";
import { isUndefined } from "@zwp/platform.common";
import { ZWPCookieCategory, ZWPPrivacyFacade } from "@zwp/platform.privacy";

const delayPromise = (ms: number) => new Promise(r => setTimeout(r, ms));

export const zwpGoogleAnalyticsInitialiserFactory = (document: Document, settings: ZWPGoogleAnalyticsSettings, gtagBuilder: ZWPGoogleAnalyticsGTagBuilder, privacyFacade: ZWPPrivacyFacade) => {
    // eslint-disable-next-line no-async-promise-executor
    
    return async () => {
        // eslint-disable-next-line no-async-promise-executor
        const load = new Promise(async () => {
            await delayPromise(settings.initDelay ?? 0)
            // console.log('Google Analytics Initialiser Factory')
            if (isUndefined(settings.trackingCode)) { 
                if (!isDevMode()) { throw new Error('No tracking code found during ZWP Google Analytics Init.') }
                return
            }
            if (isUndefined(gtagBuilder)) { 
                if (!isDevMode()) { throw new Error('No GTag builder found during ZWP Google Analytics Init.') }
                return
            }
    
            if (isUndefined(document)) { 
                if (!isDevMode()) { throw new Error('Accessing Browser Document interface failed during ZWP Google Analytics Init.') }
                return
            }
    
            settings.uri = settings.uri || 'https://www.googletagmanager.com/gtag/js?id=' + settings.trackingCode
            if (isUndefined(settings.initCommands)) { settings.initCommands = [
                
            ] }
    
            if (isUndefined(settings.initCommands.find(x => x.command === 'config'))) {
                settings.initCommands.unshift({ command: 'config', values: [settings.trackingCode] })
            }
    
            if (isUndefined(settings.initCommands.find(x => x.command === 'js'))) {
                settings.initCommands.unshift({ command: 'js', values: [new Date()] })
            }
    
            settings.initCommands.unshift({ command: 'consent', values: ['default', { 'ad_storage': 'denied', 'analytics_storage': 'denied' }] })
    
            privacyFacade.registerCookie('_ga', ZWPCookieCategory.ANALYTICS, 'Google Analytics Cookie', 
                () => { gtagBuilder('consent', 'update', { 'ad_storage': 'granted', 'analytics_storage': 'granted' })},
                () => { 
                    gtagBuilder('consent', 'update', { 'ad_storage': 'denied', 'analytics_storage': 'denied' })
                    privacyFacade.deleteCookie('_ga')
                }
            )
    
            privacyFacade.registerCookie(`_ga_${settings.trackingCode.slice(2)}`, ZWPCookieCategory.ANALYTICS, 'Google Analytics Storage Cookie',
                () => { gtagBuilder('consent', 'update', { 'ad_storage': 'granted', 'analytics_storage': 'granted' })},
                () => { 
                    gtagBuilder('consent', 'update', { 'ad_storage': 'denied', 'analytics_storage': 'denied' })
                    privacyFacade.deleteCookie(`_ga_${settings.trackingCode.slice(2)}`)
                }
            )
            
            for (const command of settings.initCommands) {
                gtagBuilder(command.command, ...command.values)
            }
    
            const script = document.createElement('script')
            script.async = true
            script.src = settings.uri
    
            if (!isUndefined(settings.nonce)) { script.setAttribute('nonce', settings.nonce) }
            const head = document.getElementsByTagName('head')[0]
            head.appendChild(script)
            
        })
    }
}

export const ZWP_GOOGLE_ANALYTICS_INITIALISER: Provider = {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: zwpGoogleAnalyticsInitialiserFactory,
    deps: [DOCUMENT, ZWP_GOOGLE_ANALYTICS_SETTINGS, ZWP_GOOGLE_ANALYTICS_GTAG_BUILDER, ZWPPrivacyFacade]
}

