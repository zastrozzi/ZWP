import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { Model } from '../../model'

const selectStorageBucketState = createFeatureSelector<Reducers.StorageBucketFeatureState>(
    createNamespacedFeatureKey(Identifiers.PLATFORM_GOOGLE_CLOUD_ACTION_IDENTIFIER, Identifiers.STORAGE_BUCKET_STATE_FEATURE_KEY)
)

const selectStorageBucketFilters = createSelector(selectStorageBucketState, (state) => state.filters)
const selectStorageBucketRemotePagination = createSelector(selectStorageBucketState, (state) => state.bucketsRemotePagination)
const selectStorageBucketRemoteState = createSelector(selectStorageBucketState, selectRemoteState)

const selectSelectedStorageBucketId = createSelector(selectStorageBucketState, (state) => state.selectedBucketId)

const storageBucketEntitySelectors = Reducers.storageBucketEntityAdapter.getSelectors()
const selectStorageBucketEntityState = createSelector(selectStorageBucketState, (state) => state.buckets)
const selectStorageBucketIds = createSelector(selectStorageBucketEntityState, storageBucketEntitySelectors.selectIds)
const selectStorageBucketEntities = createSelector(selectStorageBucketEntityState, storageBucketEntitySelectors.selectEntities)
const selectAllStorageBuckets = createSelector(selectStorageBucketEntityState, storageBucketEntitySelectors.selectAll)
const selectStorageBucketTotal = createSelector(selectStorageBucketEntityState, storageBucketEntitySelectors.selectTotal)
const selectStorageBucketById = (id: string) => createSelector(selectStorageBucketEntities, (entities) => entities[id])

const selectedStorageBucket = createSelector(
    selectStorageBucketEntities,
    selectSelectedStorageBucketId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectFilteredStorageBuckets = createSelector(
    selectAllStorageBuckets,
    selectStorageBucketFilters,
    (storageBuckets, filters) => selectFilteredElements(storageBuckets, filters, Model.Filters.storageBucketFilterEntityMap)
)

const selectPaginatedStorageBuckets = createSelector(
    selectAllStorageBuckets,
    selectStorageBucketRemotePagination,
    (storageBuckets, pagination) => selectPaginatedElements(storageBuckets, pagination)
)

const selectPaginatedFilteredStorageBuckets = createSelector(
    selectFilteredStorageBuckets,
    selectStorageBucketRemotePagination,
    (storageBuckets, pagination) => selectPaginatedElements(storageBuckets, pagination)
)

export const StorageBucketSelectors = {
    selectStorageBucketState,
    selectStorageBucketFilters,
    selectStorageBucketRemotePagination,
    selectStorageBucketRemoteState,

    selectSelectedStorageBucketId,

    storageBucketEntitySelectors,
    selectStorageBucketEntityState,
    selectStorageBucketIds,
    selectStorageBucketEntities,
    selectAllStorageBuckets,
    selectStorageBucketTotal,
    selectStorageBucketById,
    selectedStorageBucket,

    selectFilteredStorageBuckets,
    selectPaginatedStorageBuckets,
    selectPaginatedFilteredStorageBuckets
}