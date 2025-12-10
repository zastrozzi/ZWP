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

const STORAGE_BUCKET_ACTION_IDENTIFIERS = [
    Identifiers.PLATFORM_GOOGLE_CLOUD_ACTION_IDENTIFIER,
    Identifiers.STORAGE_BUCKET_STATE_FEATURE_KEY,
]

const updateStorageBucketFilters = createAction(
    createActionType(STORAGE_BUCKET_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.StorageBucketFilters>>()
)

const resetStorageBucketFilters = createAction(
    createActionType(STORAGE_BUCKET_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetStorageBucketState = createAction(
    createActionType(STORAGE_BUCKET_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseStorageBucketState = createAction(
    createActionType(STORAGE_BUCKET_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectStorageBucket = createAction(
    createActionType(STORAGE_BUCKET_ACTION_IDENTIFIERS, 'Select Bucket'),
    props<{ bucketId: string }>()
)

const deselectStorageBucket = createAction(
    createActionType(STORAGE_BUCKET_ACTION_IDENTIFIERS, 'Deselect Bucket')
)

const resetPagination = createAction(
    createActionType(STORAGE_BUCKET_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const createStorageBucket = createRemoteActionGroup<
    { request: Model.Requests.CreateStorageBucketRequest },
    Model.Responses.StorageBucketResponse
>('Create Bucket', ...STORAGE_BUCKET_ACTION_IDENTIFIERS)

const getStorageBucket = createRemoteActionGroup<
    { bucketId: string },
    Model.Responses.StorageBucketResponse
>('Get Bucket', ...STORAGE_BUCKET_ACTION_IDENTIFIERS)

const listStorageBuckets = createRemoteActionGroup<
    {
        pagination: Nullable<Partial<PaginatedQueryParams<Model.Responses.StorageBucketResponse>>>
    },
    PaginatedResponse<Model.Responses.StorageBucketResponse>
>('List Buckets', ...STORAGE_BUCKET_ACTION_IDENTIFIERS)

const updateStorageBucket = createRemoteActionGroup<
    { bucketId: string; update: Model.Requests.UpdateStorageBucketRequest },
    Model.Responses.StorageBucketResponse
>('Update Bucket', ...STORAGE_BUCKET_ACTION_IDENTIFIERS)

const refreshStorageBuckets = createRemoteActionGroup<
    { limit: Nullable<number> },
    PaginatedResponse<Model.Responses.StorageBucketResponse>
>('Refresh Buckets', ...STORAGE_BUCKET_ACTION_IDENTIFIERS)

const deleteStorageBucket = createRemoteActionGroup<
    { bucketId: string },
    { bucketId: string }
>('Delete Bucket', ...STORAGE_BUCKET_ACTION_IDENTIFIERS)

export const StorageBucketLocalActions = {
    updateStorageBucketFilters,
    resetStorageBucketFilters,
    resetStorageBucketState,
    initialiseStorageBucketState,
    selectStorageBucket,
    deselectStorageBucket,
    resetPagination,
}

export const StorageBucketRemoteActions = createRemoteActionMap(
    STORAGE_BUCKET_ACTION_IDENTIFIERS,
    {
        createStorageBucket,
        getStorageBucket,
        listStorageBuckets,
        updateStorageBucket,
        refreshStorageBuckets,
        deleteStorageBucket
    }
)
