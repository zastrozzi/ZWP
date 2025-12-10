import { DOCUMENT, isPlatformBrowser, isPlatformWorkerApp, isPlatformWorkerUi } from '@angular/common'
import { inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core'
import { ZWPDebuggableInjectable } from '../decorators/zwp.debuggable.decorator'
import { Nullable } from '../model'
import { isNull, isUndefined } from '../utils'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({serviceName: 'ZWPPlatformService', options: { skipMethodDebugger: true }})
export class ZWPPlatformService {
    private readonly _document = inject(DOCUMENT)
    private readonly platformId = inject(PLATFORM_ID)
    private readonly _windowMessageListeners = new Map<string, (event: MessageEvent) => void>()
    
    readonly renderer: Nullable<Renderer2> = null

    constructor(rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null)
        // super('ZWPPlatformService', { skipMethodDebugger: true })
    }

    isBrowser(): boolean { return isPlatformBrowser(this.platformId) }
    isWorkerApp(): boolean { return isPlatformWorkerApp(this.platformId) }
    isWorkerUi(): boolean { return isPlatformWorkerUi(this.platformId) }
    hasLocation(): boolean { return !isNull(this.location()) }
    hasNavigator(): boolean { return !isNull(this.navigator()) }
    hasWindow(): boolean { return !isNull(this.window()) }
    hasDocument(): boolean { return !isNull(this.document()) }

    hasCookiesEnabled(): boolean {
        const nav = this.navigator(false)
        if (isNull(nav)) { return false }
        return nav.cookieEnabled
    }

    hasStorageEnabled(): boolean { return typeof Storage !== 'undefined' }

    resetBrowserHistory(): void {
        if (this.isBrowser() && this.hasLocation() && this.hasWindow() && this.hasDocument()) {
            this.window()?.history.replaceState({}, this.document()?.title ?? '', (this.location()?.origin ?? '') + (this.location()?.pathname ?? ''))
        }
    }

    addWindowMessageListener(name: string, listener: (event: MessageEvent) => void): void {
        if (!this.isBrowser() || !this.hasWindow()) { return }
        if (this._windowMessageListeners.has(name)) { return }
        this._windowMessageListeners.set(name, listener)
        this.window()?.addEventListener('message', listener, false)
    }

    removeWindowMessageListener(name: string): void {
        if (!this.isBrowser() || !this.hasWindow()) { return }
        if (!this._windowMessageListeners.has(name)) { return }
        const listener = this._windowMessageListeners.get(name)
        if (isUndefined(listener)) { return }
        this.window()?.removeEventListener('message', listener, false)
        this._windowMessageListeners.delete(name)
    }


    navigator(throwIfNull: boolean = false): Nullable<Navigator> {
        const win = this.window(throwIfNull)
        if (isNull(win)) { return null }
        if (isNull(win.navigator) && throwIfNull) { throw new Error('Unable to access window.navigator') }
        return win.navigator
    }

    location(throwIfNull: boolean = false): Nullable<Location> {
        const win = this.window(throwIfNull)
        if (isNull(win)) { return null }
        if (isNull(win.location) && throwIfNull) { throw new Error('Unable to access window.location') }
        return win.location
    }

    window(throwIfNull: boolean = false): Nullable<Window> {
        const doc = this.document(throwIfNull)
        if (isNull(doc)) { return null }
        if (isNull(doc.defaultView) && throwIfNull) { throw new Error('Unable to access document.defaultView') }
        return doc.defaultView
    }

    document(throwIfNull: boolean = false): Nullable<Document> {
        if (isNull(this._document) && throwIfNull) { throw new Error('Unable to access document') }
        return this._document
    }
}