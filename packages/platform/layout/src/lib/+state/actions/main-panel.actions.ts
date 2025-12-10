import { createAction, props } from '@ngrx/store'
import { createActionType } from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { MainPanelTabEntity } from '../../model'

const MAIN_PANEL_ACTION_IDENTIFIERS = [
    Identifiers.PLATFORM_LAYOUT_ACTION_IDENTIFIER, 
    Identifiers.MAIN_PANEL_STATE_FEATURE_KEY
]

const resetMainPanelState = createAction(
    createActionType(MAIN_PANEL_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseMainPanelState = createAction(
    createActionType(MAIN_PANEL_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectMainPanelTab = createAction(
    createActionType(MAIN_PANEL_ACTION_IDENTIFIERS, 'Select Main Panel Tab'),
    props<{ tabId: string }>()
)

const deselectMainPanelTab = createAction(
    createActionType(MAIN_PANEL_ACTION_IDENTIFIERS, 'Deselect Main Panel Tab')
)

const addMainPanelTab = createAction(
    createActionType(MAIN_PANEL_ACTION_IDENTIFIERS, 'Add Main Panel Tab')
)

const createMainPanelTab = createAction(
    createActionType(MAIN_PANEL_ACTION_IDENTIFIERS, 'Create Main Panel Tab'),
    props<{ tab: MainPanelTabEntity }>()
)

const closeMainPanelTab = createAction(
    createActionType(MAIN_PANEL_ACTION_IDENTIFIERS, 'Close Main Panel Tab'),
    props<{ tabId: string }>()
)

const removeMainPanelTab = createAction(
    createActionType(MAIN_PANEL_ACTION_IDENTIFIERS, 'Remove Main Panel Tab'),
    props<{ tabId: string }>()
)

const updateMainPanelTab = createAction(
    createActionType(MAIN_PANEL_ACTION_IDENTIFIERS, 'Update Main Panel Tab'),
    props<{ tabId: string, changes: Partial<MainPanelTabEntity> }>()
)

export const MainPanelActions = {
    resetMainPanelState,
    initialiseMainPanelState,
    selectMainPanelTab,
    deselectMainPanelTab,
    addMainPanelTab,
    createMainPanelTab,
    closeMainPanelTab,
    removeMainPanelTab,
    updateMainPanelTab
}