import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Identifiers } from "../identifiers";
import { WindowLayoutFeatureState, windowEntityAdapter } from "../reducers";
import { createNamespacedFeatureKey } from '@zwp/platform.common'

const windowLayoutState = createFeatureSelector<WindowLayoutFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_LAYOUT_ACTION_IDENTIFIER,
        Identifiers.WINDOW_LAYOUT_STATE_FEATURE_KEY
    )
)
const windowEntitySelectors = windowEntityAdapter.getSelectors()

const windowIds = createSelector(windowLayoutState, (state) => windowEntitySelectors.selectIds(state))
const windowEntities = createSelector(windowLayoutState, (state) => windowEntitySelectors.selectEntities(state))
const allWindows = createSelector(windowLayoutState, (state) => windowEntitySelectors.selectAll(state))
const totalWindows = createSelector(windowLayoutState, (state) => windowEntitySelectors.selectTotal(state))

const getWindowById = (id: string) => createSelector(windowEntities, (entities) => entities[id])

export const WindowLayoutSelectors = {
    windowIds,
    windowEntities,
    allWindows,
    totalWindows,
    getWindowById
}