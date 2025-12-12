import { ALT, CONTROL, META, SHIFT, MAC_WK_CMD_LEFT, MAC_WK_CMD_RIGHT } from '@angular/cdk/keycodes'
import { Injectable } from "@angular/core"
import { EventManager } from "@angular/platform-browser"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { filter, fromEvent, map } from "rxjs"
import { ZWPDebuggableInjectable } from '../../decorators'
import { KeyboardActions } from "../actions"

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'ZWPKeyboardEffects', options: { skipMethodDebugger: true } })
export class ZWPKeyboardEffects {
    constructor(private actions$: Actions, private eventManager: EventManager) {
        // super('ZWPKeyboardEffects', { skipMethodDebugger: true })
    }

    // handleAltKeyDown$ = createEffect(() => fromEvent<KeyboardEvent>(document, 'keydown').pipe(
    //     filter(e => e.keyCode === ALT),
    //     map(() => KeyboardActions.setAltKeyActive({ active: true }))
    // ))

    handleKeyup$ = createEffect(() => fromEvent<KeyboardEvent>(document, 'keyup').pipe(
        filter(e => !e.repeat),
        map(e => KeyboardActions.recordKeyup({ keyCode: e.keyCode }))
    ))

    handleKeydown$ = createEffect(() => fromEvent<KeyboardEvent>(document, 'keydown').pipe(
        filter(e => !e.repeat),
        map(e => KeyboardActions.recordKeydown({ keyCode: e.keyCode }))
    ))

    // handleKeyupString$ = createEffect(() => fromEvent<KeyboardEvent>(document, 'keyup').pipe(
    //     map(e => KeyboardActions.recordKeyupString({ keyCode: e.code }))
    // ))

    // handleKeydownString$ = createEffect(() => fromEvent<KeyboardEvent>(document, 'keydown').pipe(
    //     map(e => KeyboardActions.recordKeydownString({ keyCode: e.code }))
    // ))

    handleAltKeyDown$ = createEffect(() => this.actions$.pipe(
        ofType(KeyboardActions.recordKeydown),
        filter(e => e.keyCode === ALT),
        map(() => KeyboardActions.setAltKeyActive({ active: true }))
    ))

    handleCtrlKeyDown$ = createEffect(() => this.actions$.pipe(
        ofType(KeyboardActions.recordKeydown),
        filter(e => e.keyCode === CONTROL),
        map(() => KeyboardActions.setCtrlKeyActive({ active: true }))
    ))

    handleMetaKeyDown$ = createEffect(() => this.actions$.pipe(
        ofType(KeyboardActions.recordKeydown),
        filter(e => e.keyCode === META || e.keyCode === MAC_WK_CMD_LEFT || e.keyCode === MAC_WK_CMD_RIGHT),
        map(() => KeyboardActions.setMetaKeyActive({ active: true }))
    ))

    handleShiftKeyDown$ = createEffect(() => this.actions$.pipe(
        ofType(KeyboardActions.recordKeydown),
        filter(e => e.keyCode === SHIFT),
        map(() => KeyboardActions.setShiftKeyActive({ active: true }))
    ))

    handleAltKeyUp$ = createEffect(() => this.actions$.pipe(
        ofType(KeyboardActions.recordKeyup),
        filter(e => e.keyCode === ALT),
        map(() => KeyboardActions.setAltKeyActive({ active: false }))
    ))

    handleCtrlKeyUp$ = createEffect(() => this.actions$.pipe(
        ofType(KeyboardActions.recordKeyup),
        filter(e => e.keyCode === CONTROL),
        map(() => KeyboardActions.setCtrlKeyActive({ active: false }))
    ))

    handleMetaKeyUp$ = createEffect(() => this.actions$.pipe(
        ofType(KeyboardActions.recordKeyup),
        filter(e => e.keyCode === META || e.keyCode === MAC_WK_CMD_LEFT || e.keyCode === MAC_WK_CMD_RIGHT),
        map(() => KeyboardActions.setMetaKeyActive({ active: false }))
    ))

    handleShiftKeyUp$ = createEffect(() => this.actions$.pipe(
        ofType(KeyboardActions.recordKeyup),
        filter(e => e.keyCode === SHIFT),
        map(() => KeyboardActions.setShiftKeyActive({ active: false }))
    ))
}