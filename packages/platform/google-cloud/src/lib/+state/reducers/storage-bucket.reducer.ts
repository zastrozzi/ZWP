import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { StorageBucketLocalActions, StorageBucketRemoteActions } from '../actions'
import {
  BaseRemoteFeatureState,
  Nullable,
  RemotePaginationState,
  initialBaseRemoteFeatureState,
  remoteFailureState,
  remoteRequestState,
  remoteStateUpdateFailure,
  remoteStateUpdateRequest,
  remoteStateUpdateSuccess,
  remoteSuccessState,
} from '@zwp/platform.common'

export interface StorageBucketFeatureState extends BaseRemoteFeatureState {
    buckets: EntityState<Model.Responses.StorageBucketResponse>
    selectedBucketId: Nullable<string>
    bucketsRemotePagination: RemotePaginationState<Model.Responses.StorageBucketResponse>
    filters: Model.Filters.StorageBucketFilters
}

export const storageBucketEntityAdapter: EntityAdapter<Model.Responses.StorageBucketResponse> =
    createEntityAdapter<Model.Responses.StorageBucketResponse>()

export const initialStorageBucketFeatureState: StorageBucketFeatureState = {
    ...initialBaseRemoteFeatureState,
    buckets: storageBucketEntityAdapter.getInitialState(),
    selectedBucketId: null,
    bucketsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'dbCreatedAt',
        total: 0,
    },
    filters: Model.Filters.initialStorageBucketFilters
}

export const storageBucketReducer = createReducer(
    initialStorageBucketFeatureState,
    on(StorageBucketLocalActions.resetStorageBucketState, () => initialStorageBucketFeatureState),
    on(StorageBucketLocalActions.initialiseStorageBucketState, () => initialStorageBucketFeatureState),
    on(StorageBucketLocalActions.updateStorageBucketFilters, (state, { filters }) => ({
        ...state,
        filters: { ...state.filters, ...filters },
    })),
    on(StorageBucketLocalActions.resetStorageBucketFilters, (state) => ({ ...state, filters: Model.Filters.initialStorageBucketFilters })),
    on(StorageBucketLocalActions.selectStorageBucket, (state, { bucketId }) => ({ ...state, selectedBucketId: bucketId })),
    on(StorageBucketLocalActions.deselectStorageBucket, (state) => ({ ...state, selectedBucketId: null })),
    on(StorageBucketLocalActions.resetPagination, (state) => ({
        ...state,
        bucketsRemotePagination: { ...state.bucketsRemotePagination, offset: 0 },
    })),
    on(remoteStateUpdateRequest(StorageBucketRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(StorageBucketRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(StorageBucketRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),
    on(StorageBucketRemoteActions.createStorageBucket.success, (state, { response }) => ({
        ...state,
        buckets: storageBucketEntityAdapter.setOne(response, state.buckets)
    })),
    on(StorageBucketRemoteActions.getStorageBucket.success, (state, { response }) => ({
        ...state,
        buckets: storageBucketEntityAdapter.setOne(response, state.buckets),
        selectedBucketId: response.id
    })),
    on(StorageBucketRemoteActions.listStorageBuckets.request, (state, { pagination }) => ({
        ...state,
        bucketsRemotePagination: {
            ...state.bucketsRemotePagination,
            ...pagination
        }
    })),
    on(StorageBucketRemoteActions.listStorageBuckets.success, (state, { response }) => ({
        ...state,
        buckets: storageBucketEntityAdapter.setMany(response.results, state.buckets),
        bucketsRemotePagination: {
            ...state.bucketsRemotePagination,
            total: response.total,
        },
    })),
    on(StorageBucketRemoteActions.updateStorageBucket.success, (state, { response }) => ({
        ...state,
        buckets: storageBucketEntityAdapter.updateOne({ id: response.id, changes: response }, state.buckets)
    })),
    on(StorageBucketRemoteActions.refreshStorageBuckets.success, (state, { response }) => ({
        ...state,
        buckets: storageBucketEntityAdapter.setMany(response.results, state.buckets),
        bucketsRemotePagination: {
            ...state.bucketsRemotePagination,
            total: response.total,
        },
    })),
    on(StorageBucketRemoteActions.deleteStorageBucket.success, (state, { response }) => ({
        ...state,
        buckets: storageBucketEntityAdapter.removeOne(response.bucketId, state.buckets),
        selectedBucketId: state.selectedBucketId === response.bucketId ? null : state.selectedBucketId,
    }))
)