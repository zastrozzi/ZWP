import { Injectable } from "@angular/core";
import { ZWPDebuggableInjectable } from '../decorators'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'ZWPScrollbarService', options: { skipMethodDebugger: true } })
export class ZWPScrollbarService {
    constructor() {
        // super('ZWPScrollbarService', { skipMethodDebugger: true })
    }
}