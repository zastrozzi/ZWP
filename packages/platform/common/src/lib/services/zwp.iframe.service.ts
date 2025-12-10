import { inject, Injectable } from '@angular/core'
import { ZWPDebuggableInjectable } from '../decorators'
import { Nullable } from '../model'
import { isNull, isUndefined } from '../utils'
import { ZWPLoggingService, ZWP_LOGGING_SERVICE } from './zwp.logging.service'
import { ZWPPlatformService } from './zwp.platform.service'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'ZWPIFrameService', options: { skipMethodDebugger: true } })
export class ZWPIFrameService {
    private readonly loggingService: ZWPLoggingService = inject(ZWP_LOGGING_SERVICE)
    private readonly platformService: ZWPPlatformService = inject(ZWPPlatformService)

    getIFrameElement(identifier: string, checkParentFirst: boolean = false): Nullable<HTMLIFrameElement> {
        const el = checkParentFirst ? this.getIFrameElementFromParentWindow(identifier) : this.getIFrameElementFromWindow(identifier)
        if (isNull(el)) { return checkParentFirst ? this.getIFrameElementFromWindow(identifier) : this.getIFrameElementFromParentWindow(identifier) }
        return el
    }

    createIFrameElement(identifier: string, visible: boolean): Nullable<HTMLIFrameElement> {
        if (this.platformService.isBrowser() && this.platformService.hasDocument()) {
            const el = this.platformService.document()?.createElement('iframe')
            if (!isUndefined(el)) {
                el.id = identifier
                el.style.display = visible ? 'block' : 'none'
                this.platformService.document()?.body.appendChild(el)
                this.loggingService.debug(`Created iframe element with id '${identifier}'`, el)
                return el
            }
        }
        return null
    }

    private getIFrameElementFromParentWindow(identifier: string): Nullable<HTMLIFrameElement> {
        if (this.platformService.isBrowser() && this.platformService.hasWindow()) {
            const parentWindow = this.platformService.window()?.parent
            if (!isUndefined(parentWindow)) {
                const el = parentWindow.document.getElementById(identifier)
                if (!isUndefined(el) && this.isIFrameElement(el)) { return el }
            }
        }
        return null
    }

    private getIFrameElementFromWindow(identifier: string): Nullable<HTMLIFrameElement> {
        if (this.platformService.isBrowser() && this.platformService.hasDocument()) {
            const el = this.platformService.document()?.getElementById(identifier)
            if (!isUndefined(el) && this.isIFrameElement(el)) { return el }
        }
        return null
    }

    private isIFrameElement(element: Nullable<HTMLElement>): element is HTMLIFrameElement {
        return !isNull(element) && element instanceof HTMLIFrameElement
    }
}