import { createAction, props } from '@ngrx/store'
import { createActionType } from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { WindowEntity, WindowPosition } from '../../model'

const REQUEST = 'REQUEST'
const FAILURE = 'FAILURE'
const SUCCESS = 'SUCCESS'

const WINDOW_LAYOUT_ACTION_IDENTIFIERS = [
    Identifiers.PLATFORM_LAYOUT_ACTION_IDENTIFIER, 
    Identifiers.WINDOW_LAYOUT_STATE_FEATURE_KEY
]
const WINDOW_LAYOUT_REQUEST_ACTION_IDENTIFIERS = [...WINDOW_LAYOUT_ACTION_IDENTIFIERS, REQUEST]
const WINDOW_LAYOUT_FAILURE_ACTION_IDENTIFIERS = [...WINDOW_LAYOUT_ACTION_IDENTIFIERS, FAILURE]
const WINDOW_LAYOUT_SUCCESS_ACTION_IDENTIFIERS = [...WINDOW_LAYOUT_ACTION_IDENTIFIERS, SUCCESS]

const createRequest = createAction(createActionType(WINDOW_LAYOUT_REQUEST_ACTION_IDENTIFIERS, 'Create'), props<{ windowEntity: WindowEntity }>())
const createFailure = createAction(createActionType(WINDOW_LAYOUT_FAILURE_ACTION_IDENTIFIERS, 'Create'), props<{ windowEntity: WindowEntity }>())
const createSuccess = createAction(createActionType(WINDOW_LAYOUT_SUCCESS_ACTION_IDENTIFIERS, 'Create'), props<{ windowEntity: WindowEntity }>())

const restoreRequest = createAction(createActionType(WINDOW_LAYOUT_REQUEST_ACTION_IDENTIFIERS, 'Restore'), props<{ windowEntities: WindowEntity[] }>())
const restoreFailure = createAction(createActionType(WINDOW_LAYOUT_FAILURE_ACTION_IDENTIFIERS, 'Restore'), props<{ windowEntities: WindowEntity[] }>())
const restoreSuccess = createAction(createActionType(WINDOW_LAYOUT_SUCCESS_ACTION_IDENTIFIERS, 'Restore'), props<{ windowEntities: WindowEntity[] }>())

const update = createAction(createActionType(WINDOW_LAYOUT_ACTION_IDENTIFIERS, 'Update'), props<{ id: string, windowEntityUpdate: Partial<WindowEntity> }>())

const updatePositionRequest = createAction(createActionType(WINDOW_LAYOUT_REQUEST_ACTION_IDENTIFIERS, 'Update Position'), props<{ windowId: string, position: WindowPosition }>())
const updatePositionFailure = createAction(createActionType(WINDOW_LAYOUT_FAILURE_ACTION_IDENTIFIERS, 'Update Position'), props<{ windowId: string, position: WindowPosition }>())
const updatePositionSuccess = createAction(createActionType(WINDOW_LAYOUT_SUCCESS_ACTION_IDENTIFIERS, 'Update Position'), props<{ windowId: string, position: WindowPosition }>())

const expand = createAction(createActionType(WINDOW_LAYOUT_ACTION_IDENTIFIERS, 'Expand'), props<{ id: string }>())
const minimise = createAction(createActionType(WINDOW_LAYOUT_ACTION_IDENTIFIERS, 'Minimise'), props<{ id: string }>())
const remove = createAction(createActionType(WINDOW_LAYOUT_ACTION_IDENTIFIERS, 'Remove'), props<{ id: string }>())
const removeAll = createAction(createActionType(WINDOW_LAYOUT_ACTION_IDENTIFIERS, 'Remove All'))
const restoreAll = createAction(createActionType(WINDOW_LAYOUT_ACTION_IDENTIFIERS, 'Restore All'), props<{ windowEntities: WindowEntity[] }>())

export const WindowLayoutActions = {
    createRequest,
    createFailure,
    createSuccess,
    restoreRequest,
    restoreFailure,
    restoreSuccess,
    update,
    updatePositionRequest,
    updatePositionFailure,
    updatePositionSuccess,
    expand,
    minimise,
    remove,
    removeAll,
    restoreAll
}