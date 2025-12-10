import { Injectable } from "@angular/core"
import { select, Store } from "@ngrx/store"

import { ZWPDebuggableInjectable } from '../../decorators/zwp.debuggable.decorator'
import { HistoryStoreActions } from "../actions"
import { HistoryStoreSelectors } from "../selectors"

@Injectable()
@ZWPDebuggableInjectable({serviceName: 'ZWPHistoryStoreFacade', options: { skipMethodDebugger: true }})
export class ZWPHistoryStoreFacade {
    constructor(private store: Store) {
        // super('ZWPHistoryStoreFacade', { skipMethodDebugger: true })
    }

    storedActionIds$ = this.store.pipe(select(HistoryStoreSelectors.storedActionIds))
    storedActionEntities$ = this.store.pipe(select(HistoryStoreSelectors.storedActionEntities))
    storedActions$ = this.store.pipe(select(HistoryStoreSelectors.storedActions))
    storedActionsCount$ = this.store.pipe(select(HistoryStoreSelectors.storedActionsCount))
    nextUndoActionId$ = this.store.pipe(select(HistoryStoreSelectors.nextUndoActionId))
    nextRedoActionId$ = this.store.pipe(select(HistoryStoreSelectors.nextRedoActionId))
    canUndo$ = this.store.pipe(select(HistoryStoreSelectors.canUndo))
    canRedo$ = this.store.pipe(select(HistoryStoreSelectors.canRedo))

    storedActionById$ = (id: string) => this.store.pipe(select(HistoryStoreSelectors.storedActionById(id)))

    undoAction(id: string) {
        this.store.dispatch(HistoryStoreActions.undoRequest({ id }))
    }

    redoAction(id: string) {
        this.store.dispatch(HistoryStoreActions.redoRequest({ id }))
    }

    undoNext() { this.store.dispatch(HistoryStoreActions.undoNext()) }
    redoNext() { this.store.dispatch(HistoryStoreActions.redoNext()) }
}