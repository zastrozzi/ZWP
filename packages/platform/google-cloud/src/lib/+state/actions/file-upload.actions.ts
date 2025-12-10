import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    ResetRemoteFilters,
    UpdateRemoteFilters,
    createActionType,
    createRemoteActionGroup,
    createRemoteActionMap,
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const FILE_UPLOAD_ACTION_IDENTIFIERS = [
    Identifiers.PLATFORM_GOOGLE_CLOUD_ACTION_IDENTIFIER,
    Identifiers.FILE_UPLOAD_STATE_FEATURE_KEY
]

const resetFileUploadState = createAction(
    createActionType(FILE_UPLOAD_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseFileUploadState = createAction(
    createActionType(FILE_UPLOAD_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectFileUpload = createAction(
    createActionType(FILE_UPLOAD_ACTION_IDENTIFIERS, 'Select File Upload'),
    props<{ fileUploadId: string }>()
)

const deselectFileUpload = createAction(
    createActionType(FILE_UPLOAD_ACTION_IDENTIFIERS, 'Deselect File Upload')
)

const createFileUpload = createAction(
    createActionType(FILE_UPLOAD_ACTION_IDENTIFIERS, 'Create File Upload'),
    props<{ fileUpload: Model.Common.FileUpload }>()
)

const addManyFileUploads = createAction(
    createActionType(FILE_UPLOAD_ACTION_IDENTIFIERS, 'Add Many File Uploads'),
    props<{ fileUploads: Model.Common.FileUpload[] }>()
)

const updateFileUpload = createAction(
    createActionType(FILE_UPLOAD_ACTION_IDENTIFIERS, 'Update File Upload'),
    props<{ fileUploadId: string, changes: Partial<Model.Common.FileUpload> }>()
)

const deleteFileUpload = createAction(
    createActionType(FILE_UPLOAD_ACTION_IDENTIFIERS, 'Delete File Upload'),
    props<{ fileUploadId: string }>()
)

const noopAction = createAction(
    createActionType(FILE_UPLOAD_ACTION_IDENTIFIERS, 'Noop Action')
)

export const FileUploadLocalActions = {
    resetFileUploadState,
    initialiseFileUploadState,
    selectFileUpload,
    deselectFileUpload,
    createFileUpload,
    addManyFileUploads,
    updateFileUpload,
    deleteFileUpload,
    noopAction
}