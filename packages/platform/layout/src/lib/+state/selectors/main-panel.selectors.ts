import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { MainPanelFeatureState, mainPanelTabEntityAdapter } from '../reducers'
import { createNamespacedFeatureKey } from '@zwp/platform.common'
import { MainPanelTabEntityWithState } from '../../model'

const selectMainPanelState = createFeatureSelector<MainPanelFeatureState>(
    createNamespacedFeatureKey(Identifiers.PLATFORM_LAYOUT_ACTION_IDENTIFIER, Identifiers.MAIN_PANEL_STATE_FEATURE_KEY)
)

const selectSelectedMainPanelTabId = createSelector(selectMainPanelState, (state) => state.selectedTabId)
const mainPanelTabEntitySelectors = mainPanelTabEntityAdapter.getSelectors()
const selectMainPanelTabEntityState = createSelector(selectMainPanelState, (state) => state.tabs)
const selectMainPanelTabIds = createSelector(selectMainPanelTabEntityState, mainPanelTabEntitySelectors.selectIds)
const selectMainPanelTabEntities = createSelector(selectMainPanelTabEntityState, mainPanelTabEntitySelectors.selectEntities)
const selectAllMainPanelTabs = createSelector(selectMainPanelTabEntityState, mainPanelTabEntitySelectors.selectAll)
const selectMainPanelTabTotal = createSelector(selectMainPanelTabEntityState, mainPanelTabEntitySelectors.selectTotal)
const selectMainPanelTabsIsEmpty = createSelector(selectMainPanelTabTotal, (total) => total === 0)

const selectAllMainPanelTabsWithState = createSelector(
    selectAllMainPanelTabs,
    selectSelectedMainPanelTabId,
    (tabs, selectedId) => {
        return tabs.map((tab) => ({
            ...tab,
            isActive: tab.id === selectedId
        } as MainPanelTabEntityWithState))
    }
)

const getMainPanelTabById = (id: string) => createSelector(selectMainPanelTabEntities, (entities) => entities[id])

const selectedMainPanelTab = createSelector(
    selectMainPanelTabEntities,
    selectSelectedMainPanelTabId,
    (entities, selectedId) => entities[selectedId ?? '']
)

export const MainPanelTabSelectors = {
    selectMainPanelState,
    selectSelectedMainPanelTabId,
    mainPanelTabEntitySelectors,
    selectMainPanelTabEntityState,
    selectMainPanelTabIds,
    selectMainPanelTabEntities,
    selectAllMainPanelTabs,
    selectMainPanelTabTotal,
    selectMainPanelTabsIsEmpty,
    getMainPanelTabById,
    selectedMainPanelTab,
    selectAllMainPanelTabsWithState
}