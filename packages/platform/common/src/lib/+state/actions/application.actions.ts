import { createAction, props } from "@ngrx/store"
import { ZWPScreenBreakpointDevice, ZWPScreenBreakpointSize } from "../../model"
import { createActionType } from "../../utils"
import { Identifiers } from "../identifiers"

const APPLICATION_ACTION_IDENTIFIERS = [
    Identifiers.ZWP_ACTION_IDENTIFIER, 
    Identifiers.APPLICATION_STATE_FEATURE_KEY
]
const setApplicationName = createAction(createActionType(APPLICATION_ACTION_IDENTIFIERS, 'Set Application Name'), props<{ applicationName: string }>())
const setApplicationVersion = createAction(createActionType(APPLICATION_ACTION_IDENTIFIERS, 'Set Application Version'), props<{ applicationVersion: string }>())
const setCurrentScreenBreakpointSize = createAction(createActionType(APPLICATION_ACTION_IDENTIFIERS, 'Set Current Screen Breakpoint Size'), props<{ breakpointSize: ZWPScreenBreakpointSize }>())
const setCurrentScreenBreakpointDevice = createAction(createActionType(APPLICATION_ACTION_IDENTIFIERS, 'Set Current Screen Breakpoint Device'), props<{ breakpointDevice: ZWPScreenBreakpointDevice }>())

export const ApplicationActions = {
    setApplicationName,
    setApplicationVersion,
    setCurrentScreenBreakpointSize,
    setCurrentScreenBreakpointDevice
}