import { InjectionToken } from '@angular/core'

const MENU_COMPONENT_TYPE_MAP = new Map<string, any>()

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ZWPMenuComponentTypeManager {
    // getComponent(aType: string): void
}

export function ZWPMenuComponent(aType: string) {
    return function _ZWPMenuComponent<T extends { new(...args: any[]): ZWPMenuComponentTypeManager}>(constr: T) {
        MENU_COMPONENT_TYPE_MAP.set(aType, constr)
    }
}
export function getZWPMenuComponent(aType: string) {
    return MENU_COMPONENT_TYPE_MAP.get(aType)
}

export const MENU_COMPONENT_DATA = new InjectionToken('ZWP_MENU_COMPONENT_DATA')