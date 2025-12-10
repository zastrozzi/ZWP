import { inject } from "@angular/core"
import { ActionReducer, MetaReducer } from "@ngrx/store"
import { ZWPPersistenceService } from "../../services"
import { isCreatePersistenceProfileAction, isInternalNgrxAction, isInternalPersistenceAction, isInternalPersistenceProfileAction, isNgrxUpdateAction, matchesActionType, rootStateWithPersistence } from "../../utils"
import { HistoryStoreActions, KeyboardActions } from "../actions"

export function persistenceMetaReducerFactory(): MetaReducer {
    const service = inject(ZWPPersistenceService)
    
    return (reducer: ActionReducer<any>) => (state, action) => {
        const newState = reducer(rootStateWithPersistence(state, action), action) 

        if (isCreatePersistenceProfileAction(action)) {
            service.processPersistenceProfileCreate(action.persistenceProfile.id)
        }

        if (isNgrxUpdateAction(action)) {
            service.processPersistentStateNgrxUpdate(newState)
        }

        if (
            !isInternalNgrxAction(action) && 
            !isInternalPersistenceAction(action) && 
            !isInternalPersistenceProfileAction(action) &&
            !matchesActionType(action, KeyboardActions) &&
            !matchesActionType(action, HistoryStoreActions)
        ) {
            service.processStateDiff(state, newState)
        }
        if (isInternalPersistenceProfileAction(action)) {
            service.processPersistenceProfileStateDiff(state, newState)
        }
        
        
        return newState
    }
}