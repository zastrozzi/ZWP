import { Breakpoints } from "@angular/cdk/layout"
import { ZWPScreenBreakpointDevice, ZWPScreenBreakpointDeviceMaxWidth, ZWPScreenBreakpointDeviceMinWidth, ZWPScreenBreakpointSize, ZWPScreenBreakpointSizeMaxWidth, ZWPScreenBreakpointSizeMinWidth, Nullable } from "../model"
import { transformEnum } from "./enum.utils"

export const screenBreakpointDeviceFromCDKBreakpoint = (breakpoint: string): Nullable<ZWPScreenBreakpointDevice> => {
    switch (breakpoint) {
        case Breakpoints.HandsetPortrait: return ZWPScreenBreakpointDevice.HANDSET_PORTRAIT
        case Breakpoints.HandsetLandscape: return ZWPScreenBreakpointDevice.HANDSET_LANDSCAPE
        case Breakpoints.TabletPortrait: return ZWPScreenBreakpointDevice.TABLET_PORTRAIT
        case Breakpoints.TabletLandscape: return ZWPScreenBreakpointDevice.TABLET_LANDSCAPE
        case Breakpoints.WebPortrait: return ZWPScreenBreakpointDevice.WEB_PORTRAIT
        case Breakpoints.WebLandscape: return ZWPScreenBreakpointDevice.WEB_LANDSCAPE
        default: return null
    }
}

export const screenBreakpointSizeFromCDKBreakpoint = (breakpoint: string): Nullable<ZWPScreenBreakpointSize> => {
    switch (breakpoint) {
        case Breakpoints.XSmall: return ZWPScreenBreakpointSize.EXTRA_SMALL
        case Breakpoints.Small: return ZWPScreenBreakpointSize.SMALL
        case Breakpoints.Medium: return ZWPScreenBreakpointSize.MEDIUM
        case Breakpoints.Large: return ZWPScreenBreakpointSize.LARGE
        case Breakpoints.XLarge: return ZWPScreenBreakpointSize.EXTRA_LARGE
        default: return null
    }
}

export const screenBreakpointDeviceMinWidth = (breakpointDevice: ZWPScreenBreakpointDevice): number => {
    return parseFloat(transformEnum(breakpointDevice, ZWPScreenBreakpointDevice, ZWPScreenBreakpointDeviceMinWidth))
}

export const screenBreakpointDeviceMaxWidth = (breakpointDevice: ZWPScreenBreakpointDevice): number => {
    return parseFloat(transformEnum(breakpointDevice, ZWPScreenBreakpointDevice, ZWPScreenBreakpointDeviceMaxWidth))
}

export const screenBreakpointDeviceIsPortrait = (breakpointDevice: ZWPScreenBreakpointDevice): boolean => {
    return [ZWPScreenBreakpointDevice.HANDSET_PORTRAIT, ZWPScreenBreakpointDevice.TABLET_PORTRAIT, ZWPScreenBreakpointDevice.WEB_PORTRAIT].includes(breakpointDevice)
}

export const screenBreakpointDeviceIsLandscape = (breakpointDevice: ZWPScreenBreakpointDevice): boolean => {
    return [ZWPScreenBreakpointDevice.HANDSET_LANDSCAPE, ZWPScreenBreakpointDevice.TABLET_LANDSCAPE, ZWPScreenBreakpointDevice.WEB_LANDSCAPE].includes(breakpointDevice)
}

export const screenBreakpointSizeMinWidth = (breakpointSize: ZWPScreenBreakpointSize): number => {
    return parseFloat(transformEnum(breakpointSize, ZWPScreenBreakpointSize, ZWPScreenBreakpointSizeMinWidth))
}

export const screenBreakpointSizeMaxWidth = (breakpointSize: ZWPScreenBreakpointSize): number => {
    return parseFloat(transformEnum(breakpointSize, ZWPScreenBreakpointSize, ZWPScreenBreakpointSizeMaxWidth))
}