import { inject, Injectable, OnDestroy } from '@angular/core'
import { BehaviorSubject, filter, Subject, Subscription } from 'rxjs'
import { ZWPDebuggableInjectable } from '../decorators'
import { GeometryRect, BrowserPopupRef, BrowserPopupEvent, BrowserPopupEventType, Undefinable } from '../model'
import { isFalse, isNil, isNull, isObjectWithProperty, isString, isUndefined } from '../utils'
import { ZWP_LOGGING_SERVICE } from './zwp.logging.service'
import { ZWPPeriodicEventService } from './zwp.periodic-event.service'
import { ZWPPlatformService } from './zwp.platform.service'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'ZWPPopupService', options: { skipMethodDebugger: true } })
export class ZWPPopupService implements OnDestroy {
    private readonly platformService: ZWPPlatformService = inject(ZWPPlatformService)
    private readonly periodicEventService: ZWPPeriodicEventService = inject(ZWPPeriodicEventService)
    private readonly loggingService = inject(ZWP_LOGGING_SERVICE)
    private readonly _popupsBlocked = new BehaviorSubject<Undefinable<boolean>>(undefined)
    private readonly _popups = new Map<string, BrowserPopupRef>()

    private readonly _popupEvents = new Subject<BrowserPopupEvent>()
    private readonly subscriptions = new Subscription()

    popupEvents$(name: string) {
        return this._popupEvents.asObservable().pipe(filter((event) => event.refId === name))
    }

    constructor() {
        //
        this.periodicEventService.create('checkPopupStates', 1000, false)
        const checkPopupStatesSub = this.periodicEventService.getEvents$('checkPopupStates').subscribe((event) => {
            if (isFalse(event.running)) { return }
            this._popups.forEach((popupRef) => {
                if (isUndefined(popupRef.window)) { return }
                if (popupRef.window.closed) {
                    this.sendMessageToMainWindow(popupRef.name, BrowserPopupEventType.POPUP_CLOSE, null)
                }
            })
            
        })
        this.subscriptions.add(checkPopupStatesSub)
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    openPopup(name: string, url: string, position: Partial<GeometryRect> = {}, eventHandler: (popupEvent: BrowserPopupEvent) => void = () => { return }) {
        if (this.popupsAreBlocked() === true) { return eventHandler({ type: BrowserPopupEventType.POPUPS_BLOCKED, refId: name, payload: null }) }
        if (this._popups.has(name)) { 
            this._popupEvents.next({ type: BrowserPopupEventType.POPUP_ALREADY_EXISTS, refId: name, payload: null })
            return eventHandler({ type: BrowserPopupEventType.POPUP_ALREADY_EXISTS, refId: name, payload: null })
        }
        const popupPosition = this.makePopupPosition(position)
        const popupPositionString = this.makePopupPositionString(popupPosition)
        // const navigator = this.platformService.navigator()?.permissions
        // console.log('navigator permissions', navigator)
        const popupWindow = this.platformService.window()?.open(url, '_blank', popupPositionString)
        if (isNil(popupWindow)) { 
            this._popupsBlocked.next(true)
            this._popupEvents.next({ type: BrowserPopupEventType.POPUPS_BLOCKED, refId: name, payload: null })
            return eventHandler({ type: BrowserPopupEventType.POPUPS_BLOCKED, refId: name, payload: null })
        }
        const messageListener = (event: MessageEvent) => {
            console.log('messageListener', event)
            if (isNil(event) || isNil(event.data) || isNil(event.data.type) || isNil(event.data.refId) || event.data.refId !== name) { return }
            this._popupEvents.next({ type: event.data.type, refId: name, payload: event.data.payload })
            // this.sendMessageToMainWindow(name, event.data.type, event.data.payload)
        }
        this.platformService.addWindowMessageListener(name, messageListener)
        const popupRef: BrowserPopupRef = { name, url, position: popupPosition, window: popupWindow, eventHandler }
        this._popups.set(name, popupRef)
        this.periodicEventService.start('checkPopupStates')
        this._popupEvents.next({ type: BrowserPopupEventType.POPUP_OPEN, refId: name, payload: null })
        return eventHandler({ type: BrowserPopupEventType.POPUP_OPEN, refId: name, payload: null })
    }

    closePopup(name: string): void {
        const popup = this._popups.get(name)
        if (isUndefined(popup) || isUndefined(popup.window)) { throw new Error(`Popup with name '${name}' does not exist`)}
        popup.window.close()
        this.platformService.removeWindowMessageListener(name)
        popup.eventHandler({ type: BrowserPopupEventType.POPUP_CLOSE, refId: name, payload: null })
        this._popups.delete(name)
        
    }

    closeAllPopups(): void {
        this._popups.forEach((popup) => {
            this.closePopup(popup.name)
        })
    }

    getPopup(name: string): Undefinable<BrowserPopupRef> {
        return this._popups.get(name)
    }

    isPopupOpen(name: string): boolean {
        const popup = this._popups.get(name)
        if (isUndefined(popup) || isUndefined(popup.window)) { return false }
        return isFalse(popup.window.closed)
    }

    currentWindowIsPopup(): boolean {
        if (!this.platformService.isBrowser() || !this.platformService.hasWindow()) { return false }
        return !isNull(this.platformService.window()?.opener) && this.platformService.window()?.opener !== this.platformService.window()
    }

    sendMessageToMainWindow(popupName: string, type: BrowserPopupEventType, payload: any): void {
        // console.log('sendMessageToMainWindow', popupName, type, payload)
        // if (!this.platformService.isBrowser() || !this.platformService.hasWindow()) { return }
        // const platformWindow = this.platformService.window()
        // console.log('mainWindow', platformWindow)
        // if (isNull(platformWindow) || isNil(platformWindow.opener)) { throw new Error('Unable to access platform window') }
        // const href = platformWindow?.location.href
        console.log('sendMessageToMainWindow', popupName, type, payload)
        const message = { type: type, refId: popupName, payload }
        this._popupEvents.next(message)
        const popup = this._popups.get(popupName)
        if (isUndefined(popup)) { 
            this.platformService.window()?.opener.postMessage(message, this.platformService.window()?.location.href)
            return
         }
        if (type === BrowserPopupEventType.POPUP_CLOSE) { this.closePopup(popupName) }
        else { popup.eventHandler(message) }
        
    }

    

    private popupsAreBlocked(): boolean {
        const currentValue = this._popupsBlocked.getValue()
        return currentValue ?? false
    }

    private makePopupPosition(initialPosition: Partial<GeometryRect>): GeometryRect {
        const platformWindow = this.platformService.window()
        if (isNull(platformWindow)) { throw new Error('Unable to access platform window') }
        // if (isUndefined(initialConfig.name) || isUndefined(initialConfig.url)) { throw new Error('Popup name is required') }
        const defaultPosition: GeometryRect = { width: 500, height: 500, top: 50, left: 50, bottom: 50, right: 50 }
        const position: GeometryRect = { ...defaultPosition, ...initialPosition }
        position.left = platformWindow.screenLeft + (platformWindow.outerWidth - position.width) / 2
        position.top = platformWindow.screenTop + (platformWindow.outerHeight - position.height) / 2
        position.right = platformWindow.screenLeft + (platformWindow.outerWidth + position.width) / 2
        position.bottom = platformWindow.screenTop + (platformWindow.outerHeight + position.height) / 2
        return position
    }

    private makePopupPositionString(position: GeometryRect): string {
        return `width=${position.width},height=${position.height},top=${position.top},left=${position.left},bottom=${position.bottom},right=${position.right}`
    }
}