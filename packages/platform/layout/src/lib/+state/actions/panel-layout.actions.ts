import { createAction, props } from '@ngrx/store'
import { createActionType } from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { PanelDisplayMode, RightPanelEntity } from '../../model'

const REQUEST = 'REQUEST'
const FAILURE = 'FAILURE'
const SUCCESS = 'SUCCESS'

const PANEL_LAYOUT_ACTION_IDENTIFIERS = [
    Identifiers.PLATFORM_LAYOUT_ACTION_IDENTIFIER, 
    Identifiers.PANEL_LAYOUT_STATE_FEATURE_KEY
]
const PANEL_LAYOUT_REQUEST_ACTION_IDENTIFIERS = [...PANEL_LAYOUT_ACTION_IDENTIFIERS, REQUEST]
const PANEL_LAYOUT_FAILURE_ACTION_IDENTIFIERS = [...PANEL_LAYOUT_ACTION_IDENTIFIERS, FAILURE]
const PANEL_LAYOUT_SUCCESS_ACTION_IDENTIFIERS = [...PANEL_LAYOUT_ACTION_IDENTIFIERS, SUCCESS]

const collapseLeftPanel = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Collapse Left Panel'))
const expandLeftPanel = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Expand Left Panel'))
const closeLeftPanel = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Close Left Panel'))
const openLeftPanel = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Open Left Panel'))
const toggleLeftPanelOpen = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Toggle Left Panel Open'))
const setLeftPanelDisplayMode = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Set Left Panel Display Mode'), props<{ mode: PanelDisplayMode }>())
const setLeftPanelCollapsedSize = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Set Left Panel Collapsed Size'), props<{ size: number }>())
const setLeftPanelExpandedSize = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Set Left Panel Expanded Size'), props<{ size: number }>())
const focusLeftPanelDragHandle = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Focus Left Panel Drag Handle'))
const defocusLeftPanelDragHandle = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Defocus Left Panel Drag Handle'))

const collapseRightPanel = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Collapse Right Panel'))
const expandRightPanel = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Expand Right Panel'))
const closeRightPanel = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Close Right Panel'))
const openRightPanel = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Open Right Panel'))
const toggleRightPanelOpen = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Toggle Right Panel Open'))
const setRightPanelDisplayMode = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Set Right Panel Display Mode'), props<{ mode: PanelDisplayMode }>())
const setRightPanelCollapsedSize = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Set Right Panel Collapsed Size'), props<{ size: number }>())
const setRightPanelExpandedSize = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Set Right Panel Expanded Size'), props<{ size: number }>())
const focusRightPanelDragHandle = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Focus Right Panel Drag Handle'))
const defocusRightPanelDragHandle = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Defocus Right Panel Drag Handle'))

const collapseBottomPanel = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Collapse Bottom Panel'))
const expandBottomPanel = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Expand Bottom Panel'))
const closeBottomPanel = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Close Bottom Panel'))
const openBottomPanel = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Open Bottom Panel'))
const toggleBottomPanelOpen = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Toggle Bottom Panel Open'))
const setBottomPanelDisplayMode = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Set Bottom Panel Display Mode'), props<{ mode: PanelDisplayMode }>())
const setBottomPanelCollapsedSize = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Set Bottom Panel Collapsed Size'), props<{ size: number }>())
const setBottomPanelExpandedSize = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Set Bottom Panel Expanded Size'), props<{ size: number }>())
const focusBottomPanelDragHandle = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Focus Bottom Panel Drag Handle'))
const defocusBottomPanelDragHandle = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Defocus Bottom Panel Drag Handle'))

const setDetailPanelSize = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Set Detail Panel Size'), props<{ size: number }>())
const focusDetailPanelDragHandle = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Focus Detail Panel Drag Handle'))
const defocusDetailPanelDragHandle = createAction(createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Defocus Detail Panel Drag Handle'))

const createRightPanelRequest = createAction(
    createActionType(PANEL_LAYOUT_REQUEST_ACTION_IDENTIFIERS, 'Create Right Panel'), 
    props<{ rightPanelEntity: RightPanelEntity, allowsMultiple: boolean }>()
)

const createRightPanelFailure = createAction(
    createActionType(PANEL_LAYOUT_FAILURE_ACTION_IDENTIFIERS, 'Create Right Panel'), 
    props<{ rightPanelEntity: RightPanelEntity }>()
)

const createRightPanelSuccess = createAction(
    createActionType(PANEL_LAYOUT_SUCCESS_ACTION_IDENTIFIERS, 'Create Right Panel'), 
    props<{ rightPanelEntity: RightPanelEntity }>()
)

const removeRightPanelRequest = createAction(
    createActionType(PANEL_LAYOUT_REQUEST_ACTION_IDENTIFIERS, 'Remove Right Panel'), 
    props<{ id: string }>()
)

const removeRightPanelFailure = createAction(
    createActionType(PANEL_LAYOUT_FAILURE_ACTION_IDENTIFIERS, 'Remove Right Panel'), 
    props<{ id: string }>()
)

const removeRightPanelSuccess = createAction(
    createActionType(PANEL_LAYOUT_SUCCESS_ACTION_IDENTIFIERS, 'Remove Right Panel'), 
    props<{ id: string }>()
)

const removeAllRightPanels = createAction(
    createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Remove All Right Panels')
)

const removeRightPanelsForDataId = createAction(
    createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Remove Right Panels for Data ID'),
    props<{ id: string }>()
)

const removeRightPanelsForCategory = createAction(
    createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Remove Right Panels For Category'), 
    props<{ category: string }>()
)

const selectRightPanel = createAction(
    createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Select Right Panel'), 
    props<{ id: string }>()
)

const deselectRightPanel = createAction(
    createActionType(PANEL_LAYOUT_ACTION_IDENTIFIERS, 'Deselect Right Panel')
)

export const PanelLayoutActions = {
    collapseLeftPanel,
    expandLeftPanel,
    closeLeftPanel,
    openLeftPanel,
    toggleLeftPanelOpen,
    setLeftPanelDisplayMode,
    setLeftPanelCollapsedSize,
    setLeftPanelExpandedSize,
    focusLeftPanelDragHandle,
    defocusLeftPanelDragHandle,
    
    collapseRightPanel,
    expandRightPanel,
    closeRightPanel,
    openRightPanel,
    toggleRightPanelOpen,
    setRightPanelDisplayMode,
    setRightPanelCollapsedSize,
    setRightPanelExpandedSize,
    focusRightPanelDragHandle,
    defocusRightPanelDragHandle,

    collapseBottomPanel,
    expandBottomPanel,
    closeBottomPanel,
    openBottomPanel,
    toggleBottomPanelOpen,
    setBottomPanelDisplayMode,
    setBottomPanelCollapsedSize,
    setBottomPanelExpandedSize,
    focusBottomPanelDragHandle,
    defocusBottomPanelDragHandle,

    setDetailPanelSize,
    focusDetailPanelDragHandle,
    defocusDetailPanelDragHandle,

    createRightPanelRequest,
    createRightPanelFailure,
    createRightPanelSuccess,
    removeRightPanelRequest,
    removeRightPanelFailure,
    removeRightPanelSuccess,
    removeAllRightPanels,
    removeRightPanelsForCategory,
    removeRightPanelsForDataId,
    selectRightPanel,
    deselectRightPanel
}