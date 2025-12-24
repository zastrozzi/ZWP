import * as CDKKeyCodes from '@angular/cdk/keycodes'

export interface KeyboardKey {
    keyCode: number
    label: string
    height: number
    width: number
}

const EMPTY_KEY_CODE = 0

const functionRowKeys: KeyboardKey[] = [
    { keyCode: CDKKeyCodes.ESCAPE, label: 'esc', height: 40, width: 65 },
    { keyCode: CDKKeyCodes.F1, label: 'F1', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.F2, label: 'F2', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.F3, label: 'F3', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.F4, label: 'F4', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.F5, label: 'F5', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.F6, label: 'F6', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.F7, label: 'F7', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.F8, label: 'F8', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.F9, label: 'F9', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.F10, label: 'F10', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.F11, label: 'F11', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.F12, label: 'F12', height: 40, width: 40 },
    { keyCode: EMPTY_KEY_CODE, label: '', height: 40, width: 40 }
]

const numberRowKeys: KeyboardKey[] = [
    { keyCode: CDKKeyCodes.TILDE, label: '§', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.ONE, label: '1', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.TWO, label: '2', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.THREE, label: '3', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.FOUR, label: '4', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.FIVE, label: '5', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.SIX, label: '6', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.SEVEN, label: '7', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.EIGHT, label: '8', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.NINE, label: '9', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.ZERO, label: '0', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.DASH, label: '-', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.EQUALS, label: '=', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.BACKSPACE, label: 'bcksp', height: 40, width: 65 },
]

const topLetterRowKeys: KeyboardKey[] = [
    { keyCode: CDKKeyCodes.TAB, label: 'tab', height: 40, width: 65 },
    { keyCode: CDKKeyCodes.Q, label: 'Q', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.W, label: 'W', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.E, label: 'E', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.R, label: 'R', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.T, label: 'T', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.Y, label: 'Y', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.U, label: 'U', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.I, label: 'I', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.O, label: 'O', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.P, label: 'P', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.OPEN_SQUARE_BRACKET, label: '[', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.CLOSE_SQUARE_BRACKET, label: ']', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.ENTER, label: '↵', height: 40, width: 40 },
]

const middleLetterRowKeys: KeyboardKey[] = [
    { keyCode: CDKKeyCodes.CAPS_LOCK, label: 'caps', height: 40, width: 75 },
    { keyCode: CDKKeyCodes.A, label: 'A', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.S, label: 'S', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.D, label: 'D', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.F, label: 'F', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.G, label: 'G', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.H, label: 'H', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.J, label: 'J', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.K, label: 'K', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.L, label: 'L', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.SEMICOLON, label: ';', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.SINGLE_QUOTE, label: `'`, height: 40, width: 40 },
    { keyCode: CDKKeyCodes.BACKSLASH, label: `\\`, height: 40, width: 40 },
    { keyCode: EMPTY_KEY_CODE, label: '', height: 40, width: 30 },
]

const bottomLetterRowKeys: KeyboardKey[] = [
    { keyCode: CDKKeyCodes.SHIFT, label: '⇧', height: 40, width: 55 },
    { keyCode: CDKKeyCodes.TILDE, label: '~', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.Z, label: 'Z', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.X, label: 'X', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.C, label: 'C', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.V, label: 'V', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.B, label: 'B', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.N, label: 'N', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.M, label: 'M', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.COMMA, label: ',', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.PERIOD, label: '.', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.SLASH, label: '/', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.SHIFT, label: '⇧', height: 40, width: 95 },
]

const bottomRowKeys: KeyboardKey[] = [
    { keyCode: EMPTY_KEY_CODE, label: '', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.CONTROL, label: '⌃', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.ALT, label: '⌥', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.META, label: '⌘', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.SPACE, label: 'space', height: 40, width: 200 },
    { keyCode: CDKKeyCodes.MAC_WK_CMD_RIGHT, label: '⌘', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.ALT, label: '⌥', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.LEFT_ARROW, label: '←', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.UP_ARROW, label: '↑', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.DOWN_ARROW, label: '↓', height: 40, width: 40 },
    { keyCode: CDKKeyCodes.RIGHT_ARROW, label: '→', height: 40, width: 40 }
]

export const UKMacKeyboardLayout = {
    functionRowKeys,
    numberRowKeys,
    topLetterRowKeys,
    middleLetterRowKeys,
    bottomLetterRowKeys,
    bottomRowKeys
}