import { InjectionToken } from '@angular/core'

const UTILITY_PANEL_COMPONENT_TYPE_MAP = new Map<string, any>()

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ZWPUtilityPanelComponentTypeManager {
    // getComponent(aType: string): void
}

export function ZWPUtilityPanelComponent(aType: string) {
    return function _ZWPUtilityPanelComponent<T extends { new(...args: any[]): ZWPUtilityPanelComponentTypeManager}>(constr: T) {
        UTILITY_PANEL_COMPONENT_TYPE_MAP.set(aType, constr)
    }
}
export function getZWPUtilityPanelComponent(aType: string) {
    return UTILITY_PANEL_COMPONENT_TYPE_MAP.get(aType)
}

export const UTILITY_PANEL_COMPONENT_DATA = new InjectionToken('ZWP_UTILITY_PANEL_COMPONENT_DATA')