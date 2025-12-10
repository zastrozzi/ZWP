import { Model } from '../../model'
import {
    Nullable,
    createActionType
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const UTILITY_DOCK_ACTION_IDENTIFIERS = [
    Identifiers.CDP_COMMON_ACTION_IDENTIFIER,
    Identifiers.UTILITY_DOCK_STATE_FEATURE_KEY,
]

const resetUtilityDockState = createAction(
    createActionType(UTILITY_DOCK_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseUtilityDockState = createAction(
    createActionType(UTILITY_DOCK_ACTION_IDENTIFIERS, 'Initialise State')
)

const openUtilityDockPanel = createAction(
    createActionType(UTILITY_DOCK_ACTION_IDENTIFIERS, 'Open Utility Dock Panel'),
    props<{ panelType: Model.UtilityDockPanelType }>()
)

const closeUtilityDockPanel = createAction(
    createActionType(UTILITY_DOCK_ACTION_IDENTIFIERS, 'Close Utility Dock Panel'),
    props<{ panelType: Model.UtilityDockPanelType }>()
)

const closeManyUtilityDockPanels = createAction(
    createActionType(UTILITY_DOCK_ACTION_IDENTIFIERS, 'Close Many Utility Dock Panels'),
    props<{ panelTypes: Model.UtilityDockPanelType[] }>()
)

const toggleUtilityDockPanel = createAction(
    createActionType(UTILITY_DOCK_ACTION_IDENTIFIERS, 'Toggle Utility Dock Panel'),
    props<{ panelType: Model.UtilityDockPanelType }>()
)

export const UtilityDockActions = {
    resetUtilityDockState,
    initialiseUtilityDockState,
    openUtilityDockPanel,
    closeUtilityDockPanel,
    closeManyUtilityDockPanels,
    toggleUtilityDockPanel
}