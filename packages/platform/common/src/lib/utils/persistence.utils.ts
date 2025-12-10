import { Action, INIT, UPDATE } from "@ngrx/store";
import { RECOMPUTE } from '@ngrx/store-devtools'
import { PersistenceActions, PersistenceProfileActions } from "../+state/actions";
import { DiffingUtils } from "./diffing.utils";


export const buildPersistableStateUpdate = (stateDiff: any, persistentState: any) => {
    
    return Object.keys(stateDiff).reduce((acc, stateDiffKey) => {
        if (DiffingUtils.hasProperty(persistentState, stateDiffKey)) {
            if (DiffingUtils.isTrue(persistentState[stateDiffKey])) {
                acc[stateDiffKey] = stateDiff[stateDiffKey]
                return acc
            }
            if (DiffingUtils.isNonEmptyObject(persistentState[stateDiffKey])) {
                const update = buildPersistableStateUpdate(stateDiff[stateDiffKey], persistentState[stateDiffKey])
                if (DiffingUtils.isNonEmptyObject(update)) {
                    acc[stateDiffKey] = update
                }
                return acc
            }
        }
        return acc
    }, DiffingUtils.makeObjectWithoutPrototype())
}

const INTERNAL_NGRX_ACTION_TYPES: string[] = [
    INIT,
    UPDATE,
    RECOMPUTE
]

const INTERNAL_PERSISTENCE_ACTION_TYPES = [
    PersistenceActions.rehydrateStateRequest.type,
    PersistenceActions.rehydrateStateSuccess.type,
    PersistenceActions.rehydrateStateFailure.type,
    PersistenceActions.serialisePersistentState.type,
    PersistenceActions.serialisePersistenceProfileState.type,
    PersistenceActions.clearLocalStorage.type,
    PersistenceActions.clearPersistentStateForPersistenceProfile.type,
    PersistenceActions.clearPersistentStateForManyPersistenceProfiles.type,
    PersistenceActions.initiatePersistentState.type,
    PersistenceActions.initiatePersistenceProfileState.type
]

const INTERNAL_PERSISTENCE_PROFILE_ACTION_TYPES = [
    PersistenceProfileActions.create.type,
    PersistenceProfileActions.remove.type,
    PersistenceProfileActions.removeAllRequest.type,
    PersistenceProfileActions.removeAllSuccess.type,
    PersistenceProfileActions.setSelected.type
]

export const isInternalNgrxAction = (action: Action): boolean => {
    return INTERNAL_NGRX_ACTION_TYPES.includes(action.type)
}

export const isNgrxUpdateAction = (action: Action): boolean => {
    return action.type === UPDATE
}


export const isInternalPersistenceAction = (action: Action): boolean => {
    return INTERNAL_PERSISTENCE_ACTION_TYPES.includes(action.type)
}

export const isInternalPersistenceProfileAction = (action: Action): boolean => {
    return INTERNAL_PERSISTENCE_PROFILE_ACTION_TYPES.includes(action.type)
}

export const isCreatePersistenceProfileAction = (action: Action): action is ReturnType<typeof PersistenceProfileActions.create> => {
    return action.type === PersistenceProfileActions.create.type
}

export function isRehydrateStateSuccess(action: Action): action is ReturnType<typeof PersistenceActions.rehydrateStateSuccess> {
    return action.type === PersistenceActions.rehydrateStateSuccess.type
}

export const rootStateWithPersistence = (state: any, action: Action) => {
    if (isRehydrateStateSuccess(action)) {
        // console.log(action.featureKey, action.stateFromStorage)
    }
    return isRehydrateStateSuccess(action) ? {...state, [action.featureKey]: {...state[action.featureKey], ...action.stateFromStorage }} : state
}