import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    ResetRemoteFilters,
    UpdateRemoteFilters,
    createActionType,
    createRemoteActionCRUDMap,
    createRemoteActionGroup,
    createRemoteActionMap,
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const DATA_GENERATION_ACTION_IDENTIFIERS = [
    Identifiers.PLATFORM_DUMMY_DATA_ACTION_IDENTIFIER,
    Identifiers.DATA_GENERATION_STATE_FEATURE_KEY
]

const generateProjects = createAction(
    createActionType(DATA_GENERATION_ACTION_IDENTIFIERS, 'Generate Projects'),
    props<{ count: number }>()
)

const clearProjects = createAction(
    createActionType(DATA_GENERATION_ACTION_IDENTIFIERS, 'Clear Projects')
)

export const DataGenerationActions = {
    generateProjects,
    clearProjects
}