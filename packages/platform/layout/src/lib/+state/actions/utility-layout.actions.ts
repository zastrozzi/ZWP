import { createAction, props } from '@ngrx/store'
import { createActionType } from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { UtilityPanelEntity } from '../../model'

const REQUEST = 'REQUEST'
const FAILURE = 'FAILURE'
const SUCCESS = 'SUCCESS'

const UTILITY_LAYOUT_ACTION_IDENTIFIERS = [
    Identifiers.PLATFORM_LAYOUT_ACTION_IDENTIFIER, 
    Identifiers.UTILITY_LAYOUT_STATE_FEATURE_KEY
]
const UTILITY_LAYOUT_REQUEST_ACTION_IDENTIFIERS = [...UTILITY_LAYOUT_ACTION_IDENTIFIERS, REQUEST]
const UTILITY_LAYOUT_FAILURE_ACTION_IDENTIFIERS = [...UTILITY_LAYOUT_ACTION_IDENTIFIERS, FAILURE]
const UTILITY_LAYOUT_SUCCESS_ACTION_IDENTIFIERS = [...UTILITY_LAYOUT_ACTION_IDENTIFIERS, SUCCESS]

const closeUtilityPanel = createAction(
    createActionType(UTILITY_LAYOUT_ACTION_IDENTIFIERS, 'Close Utility Panel'),
    props<{ utilityPanelId: string }>()
)

const openUtilityPanel = createAction(
    createActionType(UTILITY_LAYOUT_ACTION_IDENTIFIERS, 'Open Utility Panel'),
    props<{ utilityPanelId: string }>()
)

const toggleUtilityPanelOpen = createAction(
    createActionType(UTILITY_LAYOUT_ACTION_IDENTIFIERS, 'Toggle Utility Panel Open'),
    props<{ utilityPanelId: string }>()
)

export const UtilityLayoutActions = {
    closeUtilityPanel,
    openUtilityPanel,
    toggleUtilityPanelOpen
}