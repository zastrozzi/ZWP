import { Comparer, createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { FileUploadLocalActions } from '../actions'
import {
    Nullable
} from '@zwp/platform.common'

export interface FileUploadFeatureState {
    fileUploads: EntityState<Model.Common.FileUpload>
    selectedFileUploadId: Nullable<string>
}

// const sortFileUploads: Comparer<Model.Common.FileUpload> = 

export const fileUploadEntityAdapter: EntityAdapter<Model.Common.FileUpload> =
    createEntityAdapter<Model.Common.FileUpload>({
        sortComparer: (a, b) => b.uploadStarted.valueOf() - a.uploadStarted.valueOf()
    })

export const initialFileUploadFeatureState: FileUploadFeatureState = {
    fileUploads: fileUploadEntityAdapter.getInitialState(),
    selectedFileUploadId: null,
}

export const fileUploadReducer = createReducer(
    initialFileUploadFeatureState,
    on(FileUploadLocalActions.resetFileUploadState, () => initialFileUploadFeatureState),
    on(FileUploadLocalActions.initialiseFileUploadState, () => initialFileUploadFeatureState),
    on(FileUploadLocalActions.selectFileUpload, (state, { fileUploadId }) => ({
        ...state,
        selectedFileUploadId: fileUploadId,
    })),
    on(FileUploadLocalActions.deselectFileUpload, (state) => ({
        ...state,
        selectedFileUploadId: null,
    })),
    on(FileUploadLocalActions.createFileUpload, (state, { fileUpload }) => ({
        ...state,
        fileUploads: fileUploadEntityAdapter.setOne(fileUpload, state.fileUploads),
    })),
    on(FileUploadLocalActions.addManyFileUploads, (state, { fileUploads }) => ({
        ...state,
        fileUploads: fileUploadEntityAdapter.setMany(fileUploads, state.fileUploads),
    })),
    on(FileUploadLocalActions.updateFileUpload, (state, { fileUploadId, changes }) => ({
        ...state,
        fileUploads: fileUploadEntityAdapter.updateOne(
            { id: fileUploadId, changes },
            state.fileUploads
        ),
    })),
    on(FileUploadLocalActions.deleteFileUpload, (state, { fileUploadId }) => ({
        ...state,
        fileUploads: fileUploadEntityAdapter.removeOne(fileUploadId, state.fileUploads),
    }))
)