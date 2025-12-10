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

const STORAGE_OBJECT_ACTION_IDENTIFIERS = [
    Identifiers.PLATFORM_GOOGLE_CLOUD_ACTION_IDENTIFIER,
    Identifiers.STORAGE_OBJECT_STATE_FEATURE_KEY,
]

const updateStorageObjectFilters = createAction(
    createActionType(STORAGE_OBJECT_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.StorageObjectFilters>>()
)

const resetStorageObjectFilters = createAction(
    createActionType(STORAGE_OBJECT_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetStorageObjectState = createAction(
    createActionType(STORAGE_OBJECT_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseStorageObjectState = createAction(
    createActionType(STORAGE_OBJECT_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectStorageObject = createAction(
    createActionType(STORAGE_OBJECT_ACTION_IDENTIFIERS, 'Select Object'),
    props<{ objectId: string }>()
)

const deselectStorageObject = createAction(
    createActionType(STORAGE_OBJECT_ACTION_IDENTIFIERS, 'Deselect Object')
)

const resetPagination = createAction(
    createActionType(STORAGE_OBJECT_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const uploadStorageObject = createRemoteActionGroup<
    { 
        bucketId: string,
        request: Model.Requests.UploadStorageObjectRequest 
    },
    Model.Responses.StorageObjectResponse
>('Upload Object', ...STORAGE_OBJECT_ACTION_IDENTIFIERS)

const getStorageObject = createRemoteActionGroup<
    { objectId: string },
    Model.Responses.StorageObjectResponse
>('Get Object', ...STORAGE_OBJECT_ACTION_IDENTIFIERS)

const listStorageObjects = createRemoteActionGroup<
    {
        bucketId: Nullable<string>, 
        pagination: Nullable<Partial<PaginatedQueryParams<Model.Responses.StorageObjectResponse>>>
    },
    PaginatedResponse<Model.Responses.StorageObjectResponse>
>('List Objects', ...STORAGE_OBJECT_ACTION_IDENTIFIERS)

const updateStorageObject = createRemoteActionGroup<
    { 
        objectId: string, 
        update: Model.Requests.UpdateStorageObjectRequest
    },
    Model.Responses.StorageObjectResponse
>('Update Object', ...STORAGE_OBJECT_ACTION_IDENTIFIERS)

const refreshStorageObjects = createRemoteActionGroup<
    { bucketId: string, limit: Nullable<number> },
    PaginatedResponse<Model.Responses.StorageObjectResponse>
>('Refresh Objects', ...STORAGE_OBJECT_ACTION_IDENTIFIERS)

const deleteStorageObject = createRemoteActionGroup<
    { objectId: string },
    { objectId: string }
>('Delete Object', ...STORAGE_OBJECT_ACTION_IDENTIFIERS)

const deleteManyStorageObjects = createRemoteActionGroup<
    { request: Model.Requests.DeleteManyStorageObjectsRequest },
    { objectIds: string[] }
>('Delete Many Objects', ...STORAGE_OBJECT_ACTION_IDENTIFIERS)

export const StorageObjectLocalActions = {
    updateStorageObjectFilters,
    resetStorageObjectFilters,
    resetStorageObjectState,
    initialiseStorageObjectState,
    selectStorageObject,
    deselectStorageObject,
    resetPagination,
}

export const StorageObjectRemoteActions = createRemoteActionMap(
    STORAGE_OBJECT_ACTION_IDENTIFIERS,
    {
        uploadStorageObject,
        getStorageObject,
        listStorageObjects,
        updateStorageObject,
        refreshStorageObjects,
        deleteStorageObject,
        deleteManyStorageObjects
    }
)
