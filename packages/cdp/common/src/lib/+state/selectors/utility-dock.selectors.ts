import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey } from '@zwp/platform.common'
import { Model } from '../../model'

const selectUtilityDockState = createFeatureSelector<Reducers.UtilityDockFeatureState>(
    createNamespacedFeatureKey(Identifiers.CDP_COMMON_ACTION_IDENTIFIER, Identifiers.UTILITY_DOCK_STATE_FEATURE_KEY)
)

const utilityDockEntitySelectors = Reducers.utilityDockEntityAdapter.getSelectors()
const selectUtilityDockEntityState = createSelector(selectUtilityDockState, (state) => state.panels)
const selectUtilityDockIds = createSelector(selectUtilityDockEntityState, utilityDockEntitySelectors.selectIds)
const selectUtilityDockEntities = createSelector(selectUtilityDockEntityState, utilityDockEntitySelectors.selectEntities)
const selectAllUtilityDockPanels = createSelector(selectUtilityDockEntityState, utilityDockEntitySelectors.selectAll)
const selectUtilityDocksTotal = createSelector(selectUtilityDockEntityState, utilityDockEntitySelectors.selectTotal)
const selectUtilityDockPanelById = (id: string) => createSelector(selectUtilityDockEntities, (entities) => entities[id])
const selectUtilityDockPanel = (panelType: Model.UtilityDockPanelType) => createSelector(
    selectUtilityDockEntities,
    (entities) => entities[panelType as unknown as string]
)
const selectUtilityDockPanelIsExpanded = (panelType: Model.UtilityDockPanelType) => createSelector(
    selectUtilityDockPanel(panelType),
    (panel) => !!panel && panel?.isExpanded
)

const selectAnyUtilityDockPanelIsExpanded = createSelector(
    selectAllUtilityDockPanels,
    (panels) => panels.some((panel) => panel.isExpanded)
)

export const UtilityDockSelectors = {
    selectUtilityDockState,
    utilityDockEntitySelectors,
    selectUtilityDockEntityState,
    selectUtilityDockIds,
    selectUtilityDockEntities,
    selectAllUtilityDockPanels,
    selectUtilityDocksTotal,
    selectUtilityDockPanelById,
    selectUtilityDockPanel,
    selectUtilityDockPanelIsExpanded,
    selectAnyUtilityDockPanelIsExpanded
}