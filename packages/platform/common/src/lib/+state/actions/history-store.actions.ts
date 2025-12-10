import { createAction, props } from "@ngrx/store"
import { HistoryStoredActionEntity, HistoryStoredActionStatus } from "../../model"
import { createActionType, createFailureActionType, createRequestActionType, createSuccessActionType } from "../../utils"
import { Identifiers } from "../identifiers"

const HISTORY_STORE_ACTION_IDENTIFIERS = [
    Identifiers.ZWP_ACTION_IDENTIFIER, 
    Identifiers.HISTORY_STORE_STATE_FEATURE_KEY
]
const record = createAction(createActionType(HISTORY_STORE_ACTION_IDENTIFIERS, 'Record'), props<{ entity: HistoryStoredActionEntity }>())
const remove = createAction(createActionType(HISTORY_STORE_ACTION_IDENTIFIERS, 'Remove'), props<{ id: string }>())
const updateStatus = createAction(createActionType(HISTORY_STORE_ACTION_IDENTIFIERS, 'Update Status'), props<{ id: string, status: HistoryStoredActionStatus }>())

const undoRequest = createAction(createRequestActionType(HISTORY_STORE_ACTION_IDENTIFIERS, 'Undo'), props<{ id: string }>())
const undo = createAction(createActionType(HISTORY_STORE_ACTION_IDENTIFIERS, 'Undo'), props<{ entity: HistoryStoredActionEntity }>())
const undoSuccess = createAction(createSuccessActionType(HISTORY_STORE_ACTION_IDENTIFIERS, 'Undo'), props<{ id: string }>())
const undoFailure = createAction(createFailureActionType(HISTORY_STORE_ACTION_IDENTIFIERS, 'Undo'), props<{ id: string }>())
const redoRequest = createAction(createRequestActionType(HISTORY_STORE_ACTION_IDENTIFIERS, 'Redo'), props<{ id: string }>())
const redo = createAction(createActionType(HISTORY_STORE_ACTION_IDENTIFIERS, 'Redo'), props<{ entity: HistoryStoredActionEntity }>())
const redoSuccess = createAction(createSuccessActionType(HISTORY_STORE_ACTION_IDENTIFIERS, 'Redo'), props<{ id: string }>())
const redoFailure = createAction(createFailureActionType(HISTORY_STORE_ACTION_IDENTIFIERS, 'Redo'), props<{ id: string }>())
const undoNext = createAction(createActionType(HISTORY_STORE_ACTION_IDENTIFIERS, 'Undo Next'))
const redoNext = createAction(createActionType(HISTORY_STORE_ACTION_IDENTIFIERS, 'Redo Next'))

export const HistoryStoreActions = {
    record,
    remove,
    updateStatus,
    undoRequest,
    undo,
    undoSuccess,
    undoFailure,
    redoRequest,
    redo,
    redoSuccess,
    redoFailure,
    undoNext,
    redoNext
}