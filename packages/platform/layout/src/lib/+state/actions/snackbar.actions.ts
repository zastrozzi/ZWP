import { createAction, props } from '@ngrx/store'
import { createActionType } from '@zwp/platform.common'
import { Identifiers } from '../identifiers'

const SNACKBAR_LAYOUT_ACTION_IDENTIFIERS = [
    Identifiers.PLATFORM_LAYOUT_ACTION_IDENTIFIER, 
    Identifiers.SNACKBAR_LAYOUT_STATE_FEATURE_KEY
]
const showSnackbar = createAction(createActionType(SNACKBAR_LAYOUT_ACTION_IDENTIFIERS, 'Show Snackbar'), props<{ message: string, duration: number }>())

export const SnackbarActions = {
    showSnackbar
}