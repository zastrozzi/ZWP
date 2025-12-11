import { Model } from '../../model'
import { Identifiers } from '../identifiers'
import { createActionType, Nullable } from '@zwp/platform.common'
import { createAction, props } from '@ngrx/store'

const FILE_DATA_ACTION_IDENTIFIERS = [
    Identifiers.PLATFORM_FILES_ACTION_IDENTIFIER,
    Identifiers.FILE_DATA_STATE_FEATURE_KEY
]

const create = createAction(
    createActionType(FILE_DATA_ACTION_IDENTIFIERS, 'Create'),
    props<{ item: Model.FileDataItem }>()
)

const createMany = createAction(
    createActionType(FILE_DATA_ACTION_IDENTIFIERS, 'Create Many'), 
    props<{ items: Model.FileDataItem[] }>()
)

const remove = createAction(
    createActionType(FILE_DATA_ACTION_IDENTIFIERS, 'Remove'), 
    props<{ id: string }>()
)

const updateParent = createAction(
    createActionType(FILE_DATA_ACTION_IDENTIFIERS, 'Update Parent'), 
    props<{ itemId: string, previousParentId: Nullable<string>, parentId: Nullable<string> }>()
)

const updateParents = createAction(
    createActionType(FILE_DATA_ACTION_IDENTIFIERS, 'Update Parents'), 
    props<{ updates: {itemId: string, parentId: Nullable<string>}[] }>()
)

const updateParentsFailure = createAction(
    createActionType(FILE_DATA_ACTION_IDENTIFIERS, 'Update Parents Failure'), 
    props<{ reason: string }>()
)

export const FileDataActions = {
    create,
    createMany,
    remove,
    updateParent,
    updateParents,
    updateParentsFailure
}