import { createAction, props } from "@ngrx/store"
import { PersistenceProfileEntity } from "../../model"
import { createActionType } from "../../utils"
import { Identifiers } from "../identifiers"

const PERSISTENCE_PROFILE_ACTION_IDENTIFIERS = [
    Identifiers.ZWP_ACTION_IDENTIFIER, 
    Identifiers.PERSISTENCE_PROFILE_STATE_FEATURE_KEY
]
const setSelected = createAction(createActionType(PERSISTENCE_PROFILE_ACTION_IDENTIFIERS, 'Set Selected'), props<{ id: string | null }>())
const create = createAction(createActionType(PERSISTENCE_PROFILE_ACTION_IDENTIFIERS, 'Create'), props<{ persistenceProfile: PersistenceProfileEntity }>())
const remove = createAction(createActionType(PERSISTENCE_PROFILE_ACTION_IDENTIFIERS, 'Remove'), props<{ id: string }>())
const removeAllRequest = createAction(createActionType(PERSISTENCE_PROFILE_ACTION_IDENTIFIERS, 'Remove All Request'))
const removeAllSuccess = createAction(createActionType(PERSISTENCE_PROFILE_ACTION_IDENTIFIERS, 'Remove All Success'))

export const PersistenceProfileActions = {
    setSelected,
    create,
    remove,
    removeAllRequest,
    removeAllSuccess
}

