import { createActionType } from '@zwp/platform.common'
import { Model } from '../../model'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const EIM_32712_INDUSTRY_ACTION_IDENTIFIERS = [
    Identifiers.UKGOV_HMRC_ACTION_IDENTIFIER,
    Identifiers.EIM32712_INDUSTRY_STATE_FEATURE_KEY
]

const selectEIM32712Industry = createAction(
    createActionType(EIM_32712_INDUSTRY_ACTION_IDENTIFIERS, 'Select'),
    props<{ industry: Model.EIM32712Industry }>()
)

const deselectEIM32712Industry = createAction(
    createActionType(EIM_32712_INDUSTRY_ACTION_IDENTIFIERS, 'Deselect')
)

export const EIM32712IndustryActions = {
    selectEIM32712Industry,
    deselectEIM32712Industry
}