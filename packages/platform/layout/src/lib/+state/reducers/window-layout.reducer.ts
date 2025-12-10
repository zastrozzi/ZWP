import { PersistentState } from "@zwp/platform.common";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { WindowEntity } from "../../model";
import { WindowLayoutActions } from "../actions";

export type WindowLayoutFeatureState = EntityState<WindowEntity>

export const persistentWindowLayoutState: PersistentState<WindowLayoutFeatureState> = {
    ids: true,
    entities: true
}

export const windowEntityAdapter: EntityAdapter<WindowEntity> = createEntityAdapter<WindowEntity>()

export const initialWindowLayoutFeatureState: WindowLayoutFeatureState = windowEntityAdapter.getInitialState({
    
})

export const windowLayoutReducer = createReducer(
    initialWindowLayoutFeatureState,
    on(WindowLayoutActions.createSuccess, (state, { windowEntity }) => windowEntityAdapter.setOne(windowEntity, state)),
    on(WindowLayoutActions.update, (state, { id, windowEntityUpdate }) => windowEntityAdapter.updateOne({ id: id, changes: windowEntityUpdate }, state)),
    on(WindowLayoutActions.updatePositionSuccess, (state, { windowId, position }) => windowEntityAdapter.updateOne({ id: windowId, changes: { position: position } }, state)),
    on(WindowLayoutActions.expand, (state, { id }) => windowEntityAdapter.updateOne({ id: id, changes: { isExpanded: true } }, state)),
    on(WindowLayoutActions.minimise, (state, { id }) => windowEntityAdapter.updateOne({ id: id, changes: { isExpanded: false } }, state)),
    on(WindowLayoutActions.remove, (state, { id }) => windowEntityAdapter.removeOne(id, state)),
    on(WindowLayoutActions.removeAll, (state) => windowEntityAdapter.removeAll(state))
)