import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { Model } from '../../model'
import { StorageBucketSelectors } from './storage-bucket.selectors'

const selectStorageObjectState = createFeatureSelector<Reducers.StorageObjectFeatureState>(
    createNamespacedFeatureKey(Identifiers.PLATFORM_GOOGLE_CLOUD_ACTION_IDENTIFIER, Identifiers.STORAGE_OBJECT_STATE_FEATURE_KEY)
)

const selectStorageObjectFilters = createSelector(selectStorageObjectState, (state) => state.filters)
const selectStorageObjectRemotePagination = createSelector(selectStorageObjectState, (state) => state.objectsRemotePagination)
const selectStorageObjectRemoteState = createSelector(selectStorageObjectState, selectRemoteState)

const selectSelectedStorageObjectId = createSelector(selectStorageObjectState, (state) => state.selectedObjectId)

const storageObjectEntitySelectors = Reducers.storageObjectEntityAdapter.getSelectors()
const selectStorageObjectEntityState = createSelector(selectStorageObjectState, (state) => state.objects)
const selectStorageObjectIds = createSelector(selectStorageObjectEntityState, storageObjectEntitySelectors.selectIds)
const selectStorageObjectEntities = createSelector(selectStorageObjectEntityState, storageObjectEntitySelectors.selectEntities)
const selectAllStorageObjects = createSelector(selectStorageObjectEntityState, storageObjectEntitySelectors.selectAll)
const selectStorageObjectTotal = createSelector(selectStorageObjectEntityState, storageObjectEntitySelectors.selectTotal)
const selectStorageObjectById = (id: string) => createSelector(selectStorageObjectEntities, (entities) => entities[id])

const selectedStorageObject = createSelector(
    selectStorageObjectEntities,
    selectSelectedStorageObjectId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectStorageObjectsForSelectedStorageBucket = createSelector(
    StorageBucketSelectors.selectSelectedStorageBucketId,
    selectAllStorageObjects,
    (selectedStorageBucketId, storageObjects) => storageObjects.filter(storageObject => storageObject.storageBucketId === selectedStorageBucketId)
)

const selectStorageObjectsForStorageBucket = (storageBucketId: string) => createSelector(
    selectAllStorageObjects,
    (storageObjects) => storageObjects.filter(storageObject => storageObject.storageBucketId === storageBucketId)
)

const selectFilteredStorageObjects = createSelector(
    selectAllStorageObjects,
    selectStorageObjectFilters,
    (storageObjects, filters) => selectFilteredElements(storageObjects, filters, Model.Filters.storageObjectFilterEntityMap)
)

const selectPaginatedStorageObjects = createSelector(
    selectAllStorageObjects,
    selectStorageObjectRemotePagination,
    (storageObjects, pagination) => selectPaginatedElements(storageObjects, pagination)
)

const selectPaginatedFilteredStorageObjects = createSelector(
    selectFilteredStorageObjects,
    selectStorageObjectRemotePagination,
    (storageObjects, pagination) => selectPaginatedElements(storageObjects, pagination)
)

const selectFilteredStorageObjectsForSelectedStorageBucket = createSelector(
    selectStorageObjectsForSelectedStorageBucket,
    selectStorageObjectFilters,
    (storageObjects, filters) => selectFilteredElements(storageObjects, filters, Model.Filters.storageObjectFilterEntityMap)
)

const selectPaginatedFilteredStorageObjectsForSelectedStorageBucket = createSelector(
    selectFilteredStorageObjectsForSelectedStorageBucket,
    selectStorageObjectRemotePagination,
    (storageObjects, pagination) => selectPaginatedElements(storageObjects, pagination)
)

export const StorageObjectSelectors = {
    selectStorageObjectState,
    selectStorageObjectFilters,
    selectStorageObjectRemotePagination,
    selectStorageObjectRemoteState,

    selectSelectedStorageObjectId,

    storageObjectEntitySelectors,
    selectStorageObjectEntityState,
    selectStorageObjectIds,
    selectStorageObjectEntities,
    selectAllStorageObjects,
    selectStorageObjectTotal,
    selectStorageObjectById,
    selectedStorageObject,
    selectStorageObjectsForSelectedStorageBucket,
    selectStorageObjectsForStorageBucket,

    selectFilteredStorageObjects,
    selectPaginatedStorageObjects,
    selectPaginatedFilteredStorageObjects,
    selectFilteredStorageObjectsForSelectedStorageBucket,
    selectPaginatedFilteredStorageObjectsForSelectedStorageBucket
}