import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { HistoryStoredActionEntity, HistoryStoredActionStatus } from '../../model'
import { HistoryStoreActions } from '../actions'

export interface HistoryStoreFeatureState extends EntityState<HistoryStoredActionEntity> {
    undoActionIds: string[]
    redoActionIds: string[]
}

export const historyStoredActionEntityAdapter: EntityAdapter<HistoryStoredActionEntity> = createEntityAdapter<HistoryStoredActionEntity>()

export const initialHistoryStoreFeatureState: HistoryStoreFeatureState = historyStoredActionEntityAdapter.getInitialState({
    undoActionIds: [],
    redoActionIds: []
})

export const historyStoreReducer = createReducer(
    initialHistoryStoreFeatureState,
    on(HistoryStoreActions.record, (state, { entity }) => historyStoredActionEntityAdapter.setOne(entity, {...state, undoActionIds: [entity.id, ...state.undoActionIds]})),
    on(HistoryStoreActions.remove, (state, { id }) => historyStoredActionEntityAdapter.removeOne(id, state)),
    on(HistoryStoreActions.updateStatus, (state, { id, status }) => historyStoredActionEntityAdapter.updateOne(
        {id: id, changes: { status: status }}, 
        {
            ...state,
            undoActionIds: status === HistoryStoredActionStatus.UNDONE ? state.undoActionIds.slice(1) : [id, ...state.undoActionIds],
            redoActionIds: status === HistoryStoredActionStatus.DONE ? state.redoActionIds.slice(1) : [id, ...state.redoActionIds]
        }
    ))
)