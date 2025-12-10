import { Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { isNull, ZWPDebuggableInjectable, Nullable } from "@zwp/platform.common";
import { ZWPCookieBannerComponent } from "../components";
import { ZWPCookie, ZWPCookieListItem, ZWPCookieSameSite, ZWPCookieStatus, ZWPCookieStoreDeleteOptions, ZWPCookieStoreGetOptions } from "../model";
import { parseCookies } from "../utils";

@Injectable({providedIn: 'root'})
@ZWPDebuggableInjectable({ serviceName: 'ZWPCookieService', options: { skipMethodDebugger: true } })
export class ZWPCookieService {
    constructor(@Inject(DOCUMENT) private readonly _document: Document, private bannerOverlay: Overlay) {
        // super('ZWPCookieService', { skipMethodDebugger: true })
    }

    bannerOverlayRef: Nullable<OverlayRef> = null
    cookieConsentCallbacks = new Map<string, { allowCallback: () => void, denyCallback: () => void }>()

    openBanner() {
        // const dialogConfig = { ...DEFAULT_CONFIG }
        this.closeBanner()
        const overlayConfig = this.getBannerOverlayConfig()
        this.bannerOverlayRef = this.bannerOverlay.create(overlayConfig)
        const bannerPortal = new ComponentPortal(ZWPCookieBannerComponent)
        this.bannerOverlayRef.attach(bannerPortal)
        // this.overlayRef = chatOverlayRef
    }

    closeBanner() {
        if (!isNull(this.bannerOverlayRef)) { 
            this.bannerOverlayRef.detach() 
            this.bannerOverlayRef.dispose()
        }
    }

    getCookie(
        init?: ZWPCookieStoreGetOptions['name'] | ZWPCookieStoreGetOptions): ZWPCookie | undefined {
        if (init == null) { throw new TypeError('CookieStoreGetOptions must not be empty') } 
        else if (init instanceof Object && !Object.keys(init).length) { throw new TypeError('CookieStoreGetOptions must not be empty') }
        return (this.getCookies(init))[0]
    }

    getCookies(init?: ZWPCookieStoreGetOptions['name'] | ZWPCookieStoreGetOptions): ZWPCookie[] {
        const cookies = parseCookies(this.document.cookie)
        if (init == null || Object.keys(init).length === 0) { return cookies }
        let name: string | undefined
        let url
        if (typeof init === 'string') { name = init as string } 
        else {
            name = init.name
            url = init.url
        }
        if (url) { 
            const parsedURL = new URL(url, window.location.origin)
            if (window.location.href !== parsedURL.href || window.location.origin !== parsedURL.origin) { throw new TypeError('URL must match the document URL') }
            return cookies.slice(0, 1)
        }
        return cookies.filter((cookie) => cookie.name === name)
    }

    setCookie(init: Partial<ZWPCookieListItem> | string, possibleValue?: string) {
        const item: ZWPCookieListItem = {
            name: '',
            value: '',
            path: '/',
            secure: false,
            sameSite: ZWPCookieSameSite.STRICT,
            expires: null,
            domain: null
        }

        if (typeof init === 'string') {
            item.name = init
            item.value = possibleValue ?? ''
        } else {
            item.name = init.name
            item.value = init.value
            item.path = init.path ?? item.path
            item.secure = init.secure ?? item.secure
            item.sameSite = init.sameSite ?? item.sameSite
            item.expires = init.expires ?? item.expires
            item.domain = init.domain ?? item.domain

            if (item.path && !item.path.startsWith('/')) { throw new TypeError('Path must start with /') }
            if (item.domain?.startsWith('.')) { throw new TypeError('Domain must not start with .') }
            if (item.domain && item.domain !== window.location.hostname) { throw new TypeError('Domain must match current hostname') }
            if (item.name?.startsWith('__Host') && item.domain) { throw new TypeError('Domain must be empty when using __Host prefix') }
            if (item.name?.startsWith('__Host') && item.path !== '/') { throw new TypeError('Path must be / when using __Host prefix') }
            if (item.path && item.path.endsWith('/')) { item.path = item.path.slice(0, -1) }
            if (item.path === '') { item.path = '/' }
        }
        if (item.name === '' && item.value && item.value.includes('=')) { throw new TypeError('Cookie value cannot include = if the name is empty') }
        if (item.name && item.name.startsWith('__Host')) { item.secure = true }

        let cookieString = `${item.name}=${encodeURIComponent(item.value ?? '')}`

        if (item.domain) { cookieString += `; Domain=${item.domain}` }
        if (item.path) { cookieString += `; Path=${item.path}` }
        if (typeof item.expires === 'number') { cookieString += `; Expires=${new Date(item.expires).toUTCString()}` }
        else if (item.expires instanceof Date) { cookieString += `; Expires=${item.expires.toUTCString()}` }

        if ((item.name && item.name.startsWith('__Secure')) || item.secure) { 
            item.sameSite = ZWPCookieSameSite.LAX
            cookieString += '; Secure' 
        }

        switch (item.sameSite) {
            case ZWPCookieSameSite.LAX: cookieString += '; SameSite=Lax'; break;
            case ZWPCookieSameSite.STRICT: cookieString += '; SameSite=Strict'; break;
            case ZWPCookieSameSite.NONE: cookieString += '; SameSite=None'; break;
        }
        this.document.cookie = cookieString
    }

    deleteCookie(init: ZWPCookieStoreDeleteOptions['name'] | ZWPCookieStoreDeleteOptions) {
        const item: ZWPCookieListItem = {
            name: '',
            value: '',
            path: '/',
            secure: false,
            sameSite: ZWPCookieSameSite.STRICT,
            expires: null,
            domain: null
        }
        if (typeof init === 'string') { item.name = init }
        else {
            item.name = init.name
            item.path = init.path ?? item.path
            item.domain = init.domain ?? item.domain
        }
        // this.updateCookieStoreItemStatus(item.name, ZWPCookieStatus.DENY)
        item.expires = 0
        // console.log(item, 'deleteCookie')
        this.setCookie(item)
    }

    public registerCookieConsentCallbacks(name: string, allowCallback: () => void, denyCallback: () => void) {
        this.cookieConsentCallbacks.set(name, { allowCallback, denyCallback })
    }

    public triggerCookieConsentCallback(name: string, status: ZWPCookieStatus) {
        const callbacks = this.cookieConsentCallbacks.get(name)
        if (callbacks) {
            if (status === ZWPCookieStatus.ALLOW) { callbacks.allowCallback() }
            else if (status === ZWPCookieStatus.DENY) { callbacks.denyCallback() }
        }
    }

    private get document(): Document {
        return this._document
    }

    private getBannerOverlayConfig(): OverlayConfig {
        const positionStrategy = this.bannerOverlay.position().global().bottom('10px').centerHorizontally()

        const overlayConfig = new OverlayConfig({
            // hasBackdrop: config.hasBackdrop,
            // backdropClass: config.backdropClass,
            // panelClass: config.panelClass,
            scrollStrategy: this.bannerOverlay.scrollStrategies.noop(),
            width: 'auto',
            height: 'auto',
            maxWidth: '800px',
            positionStrategy: positionStrategy
        })

        return overlayConfig
    }

    // private get registeredCookies(): Map<string, ZWPCookieStoreItem> {
    //     return this.registeredCookies$.getValue()
    // }
}

