import { createAction, props } from "@ngrx/store"
import { createActionType } from "../../utils"
import { Identifiers } from "../identifiers"

const PERSISTENCE_ACTION_IDENTIFIERS = [
    Identifiers.ZWP_ACTION_IDENTIFIER, 
    Identifiers.PERSISTENCE_STATE_FEATURE_KEY
]
const REHYDRATE_STATE_REQUEST = createActionType(PERSISTENCE_ACTION_IDENTIFIERS, 'Rehydrate State Request')
const REHYDRATE_STATE_SUCCESS = createActionType(PERSISTENCE_ACTION_IDENTIFIERS, 'Rehydrate State Success')
const REHYDRATE_STATE_FAILURE = createActionType(PERSISTENCE_ACTION_IDENTIFIERS, 'Rehydrate State Failure')
const SERIALISE_PERSISTENT_STATE = createActionType(PERSISTENCE_ACTION_IDENTIFIERS, 'Serialise Persistent State')
const SERIALISE_PERSISTENCE_PROFILE_STATE = createActionType(PERSISTENCE_ACTION_IDENTIFIERS, 'Serialise Persistence Profile State')
const INITIATE_PERSISTENT_STATE = createActionType(PERSISTENCE_ACTION_IDENTIFIERS, 'Initiate Persistent State')
const INITIATE_PERSISTENCE_PROFILE_STATE = createActionType(PERSISTENCE_ACTION_IDENTIFIERS, 'Initiate Persistence Profile State')

const CLEAR_LOCAL_STORAGE = createActionType(PERSISTENCE_ACTION_IDENTIFIERS, 'Clear Local Storage')
const CLEAR_PERSISTENT_STATE_FOR_PERSISTENCE_PROFILE = createActionType(PERSISTENCE_ACTION_IDENTIFIERS, 'Clear Persistent State for Persistence Profile')
const CLEAR_PERSISTENT_STATE_FOR_MANY_PERSISTENCE_PROFILES = createActionType(PERSISTENCE_ACTION_IDENTIFIERS, 'Clear Persistent State for Many Persistence Profiles')

const rehydrateStateRequest = createAction(REHYDRATE_STATE_REQUEST, props<{featureKey: string, persistenceProfileId: string | null}>())
const rehydrateStateSuccess = createAction(REHYDRATE_STATE_SUCCESS, props<{featureKey: string, stateFromStorage: any, persistenceProfileId: string | null}>())
const rehydrateStateFailure = createAction(REHYDRATE_STATE_FAILURE, props<{featureKey: string, persistenceProfileId: string | null}>())


const serialisePersistentState = createAction(SERIALISE_PERSISTENT_STATE, props<{ stateUpdate: any }>())
const serialisePersistenceProfileState = createAction(SERIALISE_PERSISTENCE_PROFILE_STATE, props<{ stateUpdate: any }>())
const initiatePersistentState = createAction(INITIATE_PERSISTENT_STATE, props<{ state: any }>())
const initiatePersistenceProfileState = createAction(INITIATE_PERSISTENCE_PROFILE_STATE, props<{ persistenceProfileId: string }>())

const clearLocalStorage = createAction(CLEAR_LOCAL_STORAGE)
const clearPersistentStateForPersistenceProfile = createAction(CLEAR_PERSISTENT_STATE_FOR_PERSISTENCE_PROFILE, props<{ persistenceProfileId: string }>())
const clearPersistentStateForManyPersistenceProfiles = createAction(CLEAR_PERSISTENT_STATE_FOR_MANY_PERSISTENCE_PROFILES, props<{ persistenceProfileIds: string[] }>())

export const PersistenceActions = {
    rehydrateStateRequest,
    rehydrateStateSuccess,
    rehydrateStateFailure,
    serialisePersistentState,
    serialisePersistenceProfileState,
    initiatePersistentState,
    initiatePersistenceProfileState,
    clearLocalStorage,
    clearPersistentStateForPersistenceProfile,
    clearPersistentStateForManyPersistenceProfiles
}