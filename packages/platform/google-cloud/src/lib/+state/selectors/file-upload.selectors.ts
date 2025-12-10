import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey } from '@zwp/platform.common'
import { Model } from '../../model'

const selectFileUploadState = createFeatureSelector<Reducers.FileUploadFeatureState>(
    createNamespacedFeatureKey(Identifiers.PLATFORM_GOOGLE_CLOUD_ACTION_IDENTIFIER, Identifiers.FILE_UPLOAD_STATE_FEATURE_KEY)
)

const selectSelectedFileUploadId = createSelector(selectFileUploadState, (state) => state.selectedFileUploadId)
const fileUploadEntitySelectors = Reducers.fileUploadEntityAdapter.getSelectors()
const selectFileUploadEntityState = createSelector(selectFileUploadState, (state) => state.fileUploads)
const selectFileUploadIds = createSelector(selectFileUploadEntityState, fileUploadEntitySelectors.selectIds)
const selectFileUploadEntities = createSelector(selectFileUploadEntityState, fileUploadEntitySelectors.selectEntities)
const selectAllFileUploads = createSelector(selectFileUploadEntityState, fileUploadEntitySelectors.selectAll)
const selectFileUploadTotal = createSelector(selectFileUploadEntityState, fileUploadEntitySelectors.selectTotal)
const selectFileUploadsIsEmpty = createSelector(selectFileUploadTotal, (total) => total === 0)

const selectFileUploadById = (id: string) => createSelector(selectFileUploadEntities, (entities) => entities[id])

const selectedFileUpload = createSelector(
    selectFileUploadEntities,
    selectSelectedFileUploadId,
    (entities, selectedId) => entities[selectedId ?? '']
)

export const FileUploadSelectors = {
    selectFileUploadState,
    selectSelectedFileUploadId,
    fileUploadEntitySelectors,
    selectFileUploadEntityState,
    selectFileUploadIds,
    selectFileUploadEntities,
    selectAllFileUploads,
    selectFileUploadTotal,
    selectFileUploadsIsEmpty,
    selectFileUploadById,
    selectedFileUpload
}