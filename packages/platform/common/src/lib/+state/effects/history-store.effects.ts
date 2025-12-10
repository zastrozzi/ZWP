import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { filter, map, switchMap, take, withLatestFrom } from "rxjs"
import { ZWPDebuggableInjectable } from '../../decorators'
import { HistoryStoredActionStatus } from "../../model"
import { isUndefined } from "../../utils"
import { HistoryStoreActions } from "../actions"
import { ZWPHistoryStoreFacade } from "../facades"


@Injectable({providedIn: 'root'})
@ZWPDebuggableInjectable({serviceName: 'ZWPHistoryStoreEffects', options: { skipMethodDebugger: true }})
export class ZWPHistoryStoreEffects {
    constructor(private actions$: Actions, private historyStoreFacade: ZWPHistoryStoreFacade) {
        // super('ZWPHistoryStoreEffects', { skipMethodDebugger: true })
    }

    undoRequest$ = createEffect(() => this.actions$.pipe(
        ofType(HistoryStoreActions.undoRequest),
        switchMap(action => this.historyStoreFacade.storedActionById$(action.id).pipe(
            take(1),
            filter(storedAction => !isUndefined(storedAction)),
            map(storedAction => ({ actionId: action.id, storedAction: storedAction }))
        )),
        map(withStoredAction => {
            if (isUndefined(withStoredAction.storedAction)) { return HistoryStoreActions.undoFailure({ id: withStoredAction.actionId }) }
            if (withStoredAction.storedAction?.status !== HistoryStoredActionStatus.DONE) { return HistoryStoreActions.undoFailure({ id: withStoredAction.actionId }) }
            return HistoryStoreActions.undo({ entity: withStoredAction.storedAction })
        })
    ))

    undoSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(HistoryStoreActions.undoSuccess),
        map(action => HistoryStoreActions.updateStatus({ id: action.id, status: HistoryStoredActionStatus.UNDONE }))
    ))

    redoRequest$ = createEffect(() => this.actions$.pipe(
        ofType(HistoryStoreActions.redoRequest),
        switchMap(action => this.historyStoreFacade.storedActionById$(action.id).pipe(
            take(1),
            filter(storedAction => !isUndefined(storedAction)),
            map(storedAction => ({ actionId: action.id, storedAction: storedAction }))
        )),
        map(withStoredAction => {
            if (isUndefined(withStoredAction.storedAction)) { return HistoryStoreActions.redoFailure({ id: withStoredAction.actionId }) }
            if (withStoredAction.storedAction?.status !== HistoryStoredActionStatus.UNDONE) { return HistoryStoreActions.redoFailure({ id: withStoredAction.actionId }) }
            return HistoryStoreActions.redo({ entity: withStoredAction.storedAction })
        })
    ))

    redoSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(HistoryStoreActions.redoSuccess),
        map(action => HistoryStoreActions.updateStatus({ id: action.id, status: HistoryStoredActionStatus.DONE }))
    ))

    undoNext$ = createEffect(() => this.actions$.pipe(
        ofType(HistoryStoreActions.undoNext),
        withLatestFrom(this.historyStoreFacade.nextUndoActionId$),
        map(([, nextId]) => nextId),
        filter(nextId => !isUndefined(nextId)),
        map(id => HistoryStoreActions.undoRequest({ id: id as string }))
    ))

    redoNext$ = createEffect(() => this.actions$.pipe(
        ofType(HistoryStoreActions.redoNext),
        withLatestFrom(this.historyStoreFacade.nextRedoActionId$),
        map(([, nextId]) => nextId),
        filter(nextId => !isUndefined(nextId)),
        map(id => HistoryStoreActions.redoRequest({ id: id as string }))
    ))
}