import { InjectionToken } from '@angular/core'

const WINDOW_COMPONENT_TYPE_MAP = new Map<string, any>()

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ZWPWindowComponentTypeManager {
    // getComponent(aType: string): void
}

export function ZWPWindowComponent(aType: string) {
    return function _ZWPWindowComponent<T extends { new(...args: any[]): ZWPWindowComponentTypeManager}>(constr: T) {
        WINDOW_COMPONENT_TYPE_MAP.set(aType, constr)
    }
}
export function getZWPWindowComponent(aType: string) {
    return WINDOW_COMPONENT_TYPE_MAP.get(aType)
}

export const WINDOW_COMPONENT_DATA = new InjectionToken('ZWP_WINDOW_COMPONENT_DATA')