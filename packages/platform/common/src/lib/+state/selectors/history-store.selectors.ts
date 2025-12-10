import { createFeatureSelector, createSelector } from "@ngrx/store"
import { createNamespacedFeatureKey, isUndefined } from "../../utils"
import { Identifiers } from "../identifiers"
import { HistoryStoreFeatureState, historyStoredActionEntityAdapter } from "../reducers"

const state = createFeatureSelector<HistoryStoreFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.ZWP_ACTION_IDENTIFIER,
        Identifiers.HISTORY_STORE_STATE_FEATURE_KEY
    )
)
const historyStoredActionEntitySelectors = historyStoredActionEntityAdapter.getSelectors()
const undoActionIds = createSelector(state, s => s.undoActionIds)
const redoActionIds = createSelector(state, s => s.redoActionIds)
const nextUndoActionId = createSelector(undoActionIds, ids => ids.length > 0 ? ids[0] : undefined)
const nextRedoActionId = createSelector(redoActionIds, ids => ids.length > 0 ? ids[0] : undefined)
const canUndo = createSelector(nextUndoActionId, next => !isUndefined(next))
const canRedo = createSelector(nextRedoActionId, next => !isUndefined(next))

const storedActionIds = createSelector(state, s => historyStoredActionEntitySelectors.selectIds(s))
const storedActionEntities = createSelector(state, s => historyStoredActionEntitySelectors.selectEntities(s))
const storedActions = createSelector(state, s => historyStoredActionEntitySelectors.selectAll(s))
const storedActionsCount = createSelector(state, s => historyStoredActionEntitySelectors.selectTotal(s))

const storedActionById = (id: string) => createSelector(storedActionEntities, entities => entities[id])

export const HistoryStoreSelectors = {
    storedActionIds,
    storedActionEntities,
    storedActions,
    storedActionsCount,
    storedActionById,
    nextUndoActionId,
    nextRedoActionId,
    canUndo,
    canRedo
}