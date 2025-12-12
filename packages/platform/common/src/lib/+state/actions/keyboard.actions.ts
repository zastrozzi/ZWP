import { createAction, props } from "@ngrx/store"
import { createActionType } from "../../utils"
import { Identifiers } from "../identifiers"

const KEYBOARD_ACTION_IDENTIFIERS = [
    Identifiers.ZWP_ACTION_IDENTIFIER, 
    Identifiers.KEYBOARD_STATE_FEATURE_KEY
]
const recordKeydown = createAction(createActionType(KEYBOARD_ACTION_IDENTIFIERS, 'Record Keydown'), props<{ keyCode: number }>())
const recordKeyup = createAction(createActionType(KEYBOARD_ACTION_IDENTIFIERS, 'Record Keyup'), props<{ keyCode: number }>())
const recordKeydownString = createAction(createActionType(KEYBOARD_ACTION_IDENTIFIERS, 'Record Keydown String'), props<{ keyCode: string }>())
const recordKeyupString = createAction(createActionType(KEYBOARD_ACTION_IDENTIFIERS, 'Record Keyup String'), props<{ keyCode: string }>())
const setAltKeyActive = createAction(createActionType(KEYBOARD_ACTION_IDENTIFIERS, 'Set Alt Key Active'), props<{ active: boolean }>())
const setCtrlKeyActive = createAction(createActionType(KEYBOARD_ACTION_IDENTIFIERS, 'Set Ctrl Key Active'), props<{ active: boolean }>())
const setMetaKeyActive = createAction(createActionType(KEYBOARD_ACTION_IDENTIFIERS, 'Set Meta Key Active'), props<{ active: boolean }>())
const setShiftKeyActive = createAction(createActionType(KEYBOARD_ACTION_IDENTIFIERS, 'Set Shift Key Active'), props<{ active: boolean }>())

export const KeyboardActions = {
    recordKeydown,
    recordKeyup,
    recordKeydownString,
    recordKeyupString,
    setAltKeyActive,
    setCtrlKeyActive,
    setMetaKeyActive,
    setShiftKeyActive
}