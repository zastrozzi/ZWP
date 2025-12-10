import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { MainPanelTabEntity } from '../../model'
import { Nullable } from '@zwp/platform.common'
import { createReducer, on } from '@ngrx/store'
import { MainPanelActions } from '../actions'

export interface MainPanelFeatureState {
    tabs: EntityState<MainPanelTabEntity>
    selectedTabId: Nullable<string>
}

export const mainPanelTabEntityAdapter: EntityAdapter<MainPanelTabEntity> = createEntityAdapter<MainPanelTabEntity>()

export const initialMainPanelFeatureState: MainPanelFeatureState = {
    tabs: mainPanelTabEntityAdapter.getInitialState(),
    selectedTabId: null,
}

export const mainPanelReducer = createReducer(
    initialMainPanelFeatureState,
    on(MainPanelActions.resetMainPanelState, () => initialMainPanelFeatureState),
    on(MainPanelActions.initialiseMainPanelState, () => initialMainPanelFeatureState),
    on(MainPanelActions.selectMainPanelTab, (state, { tabId }) => ({
        ...state,
        selectedTabId: tabId,
    })),
    on(MainPanelActions.deselectMainPanelTab, (state) => ({
        ...state,
        selectedTabId: null,
    })),
    on(MainPanelActions.createMainPanelTab, (state, { tab }) => ({
        ...state,
        tabs: mainPanelTabEntityAdapter.setOne(tab, state.tabs)
    })),
    on(MainPanelActions.removeMainPanelTab, (state, { tabId }) => ({
        ...state,
        tabs: mainPanelTabEntityAdapter.removeOne(tabId, state.tabs),
    })),
    on(MainPanelActions.updateMainPanelTab, (state, { tabId, changes }) => ({
        ...state,
        tabs: mainPanelTabEntityAdapter.updateOne(
            { id: tabId, changes },
            state.tabs
        ),
    }))
)