import { EnvironmentInjector, inject, Injectable } from "@angular/core";
import { Action, Store } from "@ngrx/store";
import { v4 } from "uuid";
import { HistoryStoreActions } from "../+state/actions";
import { HistoryStoreActionMap, HistoryStoredActionEntity, HistoryStoredActionStatus, HistoryStoreFeatureActionGroup } from "../model";
import { DiffingUtils, arrayDistinctUpsert, isUndefined } from "../utils";
import { ZWPDebuggableInjectable } from '../decorators/zwp.debuggable.decorator'

@Injectable({providedIn: 'root'})
@ZWPDebuggableInjectable({serviceName: 'ZWPHistoryService', options: { skipMethodDebugger: true }})
export class ZWPHistoryService {
    constructor(private injector: EnvironmentInjector) {
        // super('ZWPHistoryService', { skipMethodDebugger: true })
    }

    private _store: Store | undefined

    private historyStoreActionMap: HistoryStoreActionMap = {} 

    registerActionGroup(actionGroup: HistoryStoreFeatureActionGroup) {
        // const x = this.historyStoreActionMap[actionGroup.featureName]
        if (!isUndefined(this.historyStoreActionMap[actionGroup.featureName])) {
            arrayDistinctUpsert(this.historyStoreActionMap[actionGroup.featureName], ...actionGroup.actions)
            
        } else {
            this.historyStoreActionMap[actionGroup.featureName] = actionGroup.actions
        }
    }

    registerActionsGroups(actionGroups: HistoryStoreFeatureActionGroup[]) {
        actionGroups.forEach(group => this.registerActionGroup(group))
        // console.log(this.historyStoreActionMap, 'map')
    }

    actionIsHistoryRecordable(action: Action): boolean {
        let isRecordable = false
        Object.values(this.historyStoreActionMap).forEach(actionGroup => {
            [...actionGroup ?? []].some((typeOrActionCreator) => {
                if (typeof typeOrActionCreator === 'string') {
                    if (typeOrActionCreator === action.type) { isRecordable = true }
                }
                if (typeOrActionCreator.type === action.type) { isRecordable = true }
            })
        })
        return isRecordable
    }

    processHistoryRecordableAction(action: Action, state: any, newState: any) {
        const stateAdditionsDiff = DiffingUtils.calculateDiff(state, newState, true)
        const stateRemovalsDiff = DiffingUtils.calculateDiff(newState, state, true)
        
        const entity: HistoryStoredActionEntity = { 
            id: v4(), 
            status: HistoryStoredActionStatus.DONE, 
            actionType: action.type,
            stateAdditions: stateAdditionsDiff, 
            stateRemovals: stateRemovalsDiff 
        }
        this.store.dispatch(HistoryStoreActions.record({ entity }))
    }

    processUndoSuccess(id: string) {
        this.store.dispatch(HistoryStoreActions.undoSuccess({ id }))
    }

    processRedoSuccess(id: string) {
        this.store.dispatch(HistoryStoreActions.redoSuccess({ id }))
    }
    
    get store(): Store {
        if (this._store !== undefined) {
            return this._store
        }
        return this.injector.runInContext(() => {
            this._store = inject(Store)
            return this._store
        })
    }
}