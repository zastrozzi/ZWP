import { createAction, props } from '@ngrx/store'
import { createActionType } from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { TableLayoutEntity } from '../../model'

const TABLE_LAYOUT_ACTION_IDENTIFIERS = [
    Identifiers.PLATFORM_LAYOUT_ACTION_IDENTIFIER, 
    Identifiers.TABLE_LAYOUT_STATE_FEATURE_KEY
]

const resetTableLayoutState = createAction(
    createActionType(TABLE_LAYOUT_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseTableLayoutState = createAction(
    createActionType(TABLE_LAYOUT_ACTION_IDENTIFIERS, 'Initialise State')
)

export const TableLayoutActions = {
    resetTableLayoutState,
    initialiseTableLayoutState
}