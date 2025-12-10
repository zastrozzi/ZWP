import { Injectable, InjectionToken } from '@angular/core'
import { stringInputToObject } from '../utils'
import { InputColorFormat, InputColor } from '../model'
import { ZWPDebuggableInjectable } from '../decorators'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'ZWPColorAdapterService', options: { skipMethodDebugger: true } })
export class ZWPColorAdapterService {

    sameColor(a: InputColor, b: InputColor) {
        if (a == null && b == null) return true
        if (a != null && b != null) return a.rgba === b.rgba
        return false
    }

    format(c: InputColor, format: InputColorFormat): string {
        return c.toString(format)
    }

    parse(value: string): InputColor | null {
        const obj = stringInputToObject(value)
        if (obj) {
            return new InputColor(obj.r, obj.g, obj.b, obj.a)
        }
        return null
    }
}



export type ZWPColorFormats = {
    display: {
        inputColor: InputColorFormat
    }
}

export const DEFAULT_ZWP_COLOR_FORMATS: ZWPColorFormats = {
    display: {
        inputColor: 'hex'
    }
}

export const ZWP_COLOR_FORMATS = new InjectionToken<ZWPColorFormats>('zwp.color-formats')