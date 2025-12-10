import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { StorageObjectLocalActions, StorageObjectRemoteActions } from '../actions'
import {
    BaseRemoteFeatureState,
    Nullable,
    RemotePaginationState,
    decrementRemotePaginationStateTotalConditionally,
    incrementRemotePaginationStateTotal,
    incrementRemotePaginationStateTotalConditionally,
    initialBaseRemoteFeatureState,
    remoteFailureState,
    remoteRequestState,
    remoteStateUpdateFailure,
    remoteStateUpdateRequest,
    remoteStateUpdateSuccess,
    remoteSuccessState,
} from '@zwp/platform.common'

export interface StorageObjectFeatureState extends BaseRemoteFeatureState {
    objects: EntityState<Model.Responses.StorageObjectResponse>
    selectedObjectId: Nullable<string>
    objectsRemotePagination: RemotePaginationState<Model.Responses.StorageObjectResponse>
    filters: Model.Filters.StorageObjectFilters
}

export const storageObjectEntityAdapter: EntityAdapter<Model.Responses.StorageObjectResponse> =
    createEntityAdapter<Model.Responses.StorageObjectResponse>()

export const initialStorageObjectFeatureState: StorageObjectFeatureState = {
    ...initialBaseRemoteFeatureState,
    objects: storageObjectEntityAdapter.getInitialState(),
    selectedObjectId: null,
    objectsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'dbCreatedAt',
        total: 0,
    },
    filters: Model.Filters.initialStorageObjectFilters,
}

export const storageObjectReducer = createReducer(
    initialStorageObjectFeatureState,
    on(StorageObjectLocalActions.resetStorageObjectState, () => initialStorageObjectFeatureState),
    on(StorageObjectLocalActions.initialiseStorageObjectState, () => initialStorageObjectFeatureState),
    on(StorageObjectLocalActions.updateStorageObjectFilters, (state, { filters }) => ({
        ...state,
        filters: { ...state.filters, ...filters },
    })),
    on(StorageObjectLocalActions.resetStorageObjectFilters, (state) => ({
        ...state,
        filters: Model.Filters.initialStorageObjectFilters,
    })),
    on(StorageObjectLocalActions.selectStorageObject, (state, { objectId }) => ({
        ...state,
        selectedObjectId: objectId,
    })),
    on(StorageObjectLocalActions.deselectStorageObject, (state) => ({ ...state, selectedObjectId: null })),
    on(StorageObjectLocalActions.resetPagination, (state) => ({
        ...state,
        objectsRemotePagination: { ...state.objectsRemotePagination, offset: 0 },
    })),
    on(remoteStateUpdateRequest(StorageObjectRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(StorageObjectRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(StorageObjectRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),
    on(StorageObjectRemoteActions.uploadStorageObject.success, (state, { response }) => ({
        ...state,
        objects: storageObjectEntityAdapter.setOne(response, state.objects),
        objectsRemotePagination: incrementRemotePaginationStateTotalConditionally(state, {
            entityStateKey: 'objects',
            remotePaginationStateKey: 'objectsRemotePagination',
            ids: [response.id],
        })
    })),
    on(StorageObjectRemoteActions.getStorageObject.success, (state, { response }) => ({
        ...state,
        objects: storageObjectEntityAdapter.setOne(response, state.objects),
        selectedObjectId: response.id,
    })),
    on(StorageObjectRemoteActions.listStorageObjects.request, (state, { pagination }) => ({
        ...state,
        objectsRemotePagination: {
            ...state.objectsRemotePagination,
            ...pagination,
        },
    })),
    on(StorageObjectRemoteActions.listStorageObjects.success, (state, { response }) => ({
        ...state,
        objects: storageObjectEntityAdapter.setMany(response.results, state.objects),
        objectsRemotePagination: {
            ...state.objectsRemotePagination,
            total: response.total,
        },
    })),
    on(StorageObjectRemoteActions.updateStorageObject.success, (state, { response }) => ({
        ...state,
        objects: storageObjectEntityAdapter.updateOne({ id: response.id, changes: response }, state.objects),
    })),
    on(StorageObjectRemoteActions.refreshStorageObjects.success, (state, { response }) => ({
        ...state,
        objects: storageObjectEntityAdapter.setMany(response.results, state.objects),
        objectsRemotePagination: {
            ...state.objectsRemotePagination,
            total: response.total,
        },
    })),
    on(StorageObjectRemoteActions.deleteStorageObject.success, (state, { objectId }) => ({
        ...state,
        objectsRemotePagination: decrementRemotePaginationStateTotalConditionally(state, {
            entityStateKey: 'objects',
            remotePaginationStateKey: 'objectsRemotePagination',
            ids: [objectId],
        }),
        objects: storageObjectEntityAdapter.removeOne(objectId, state.objects),
        selectedObjectId: state.selectedObjectId === objectId ? null : state.selectedObjectId,
    })),
    on(StorageObjectRemoteActions.deleteManyStorageObjects.success, (state, { objectIds }) => ({
        ...state,
        objectsRemotePagination: decrementRemotePaginationStateTotalConditionally(state, {
            entityStateKey: 'objects',
            remotePaginationStateKey: 'objectsRemotePagination',
            ids: objectIds,
        }),
        objects: storageObjectEntityAdapter.removeMany(objectIds, state.objects),
        selectedObjectId:
            state.selectedObjectId && objectIds.includes(state.selectedObjectId) ? null : state.selectedObjectId,
    }))
)
