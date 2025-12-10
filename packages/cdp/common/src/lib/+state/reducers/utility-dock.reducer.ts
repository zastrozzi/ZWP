import { Nullable } from '@zwp/platform.common'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { UtilityDockActions } from '../actions'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'

export interface UtilityDockFeatureState {
    panels: EntityState<Model.UtilityDockPanel>
}

const utilityDockEntitySelectType = (entity: Model.UtilityDockPanel) => entity.type
export const utilityDockEntityAdapter: EntityAdapter<Model.UtilityDockPanel> = createEntityAdapter<Model.UtilityDockPanel>({
    selectId: utilityDockEntitySelectType
})

export const initialUtilityDockState: UtilityDockFeatureState = {
    panels: utilityDockEntityAdapter.getInitialState()
}

const initialUtilityDockEntity = (panelType: Model.UtilityDockPanelType, isExpanded: boolean = false): Model.UtilityDockPanel => ({
    type: panelType,
    isExpanded: isExpanded
})

const initialUtilityDockEntities: Model.UtilityDockPanel[] = [
    initialUtilityDockEntity(Model.UtilityDockPanelType.uploads),
    initialUtilityDockEntity(Model.UtilityDockPanelType.clipboard),
    initialUtilityDockEntity(Model.UtilityDockPanelType.notifications)
]

export const utilityDockReducer = createReducer(
    initialUtilityDockState,
    on(UtilityDockActions.resetUtilityDockState, (state) => ({
        ...initialUtilityDockState,
        panels: utilityDockEntityAdapter.setAll(initialUtilityDockEntities, state.panels)
    })),
    on(UtilityDockActions.initialiseUtilityDockState, (state) => ({
        ...initialUtilityDockState,
        panels: utilityDockEntityAdapter.setAll(initialUtilityDockEntities, state.panels)
    })),
    on(UtilityDockActions.openUtilityDockPanel, (state, { panelType }) => ({
        ...state,
        panels: utilityDockEntityAdapter.updateOne({
            id: panelType as unknown as string, changes: { isExpanded: true }
        }, state.panels)
    })),
    on(UtilityDockActions.closeUtilityDockPanel, (state, { panelType }) => ({
        ...state,
        panels: utilityDockEntityAdapter.updateOne({
            id: panelType as unknown as string, changes: { isExpanded: false }
        }, state.panels)
    })),
    on(UtilityDockActions.closeManyUtilityDockPanels, (state, { panelTypes }) => ({
        ...state,
        panels: utilityDockEntityAdapter.updateMany(panelTypes.map(panelType => ({
            id: panelType as unknown as string, changes: { isExpanded: false }
        })), state.panels)
    }))
)