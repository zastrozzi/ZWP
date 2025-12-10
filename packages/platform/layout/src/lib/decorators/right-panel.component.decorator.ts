import { InjectionToken } from '@angular/core'

const RIGHT_PANEL_COMPONENT_TYPE_MAP = new Map<string, any>()

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ZWPRightPanelComponentTypeManager {
    // getComponent(aType: string): void
}

export function ZWPRightPanelComponent(aType: string) {
    return function _ZWPRightPanelComponent<T extends { new(...args: any[]): ZWPRightPanelComponentTypeManager}>(constr: T) {
        RIGHT_PANEL_COMPONENT_TYPE_MAP.set(aType, constr)
    }
}
export function getZWPRightPanelComponent(aType: string) {
    return RIGHT_PANEL_COMPONENT_TYPE_MAP.get(aType)
}

export const RIGHT_PANEL_COMPONENT_DATA = new InjectionToken('ZWP_RIGHT_PANEL_COMPONENT_DATA')