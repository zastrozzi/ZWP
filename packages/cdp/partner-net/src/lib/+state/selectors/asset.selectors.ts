import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import {
    createNamespacedFeatureKey,
    selectFilteredElements,
    selectPaginatedElements,
    selectRemoteState,
} from '@zwp/platform.common'
import { Model } from '../../model'

const selectAssetState = createFeatureSelector<Reducers.AssetFeatureState>(
    createNamespacedFeatureKey(Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER, Identifiers.ASSET_STATE_FEATURE_KEY)
)

const selectAssetFilters = createSelector(selectAssetState, (state) => state.filters)
const selectAssetRemotePagination = createSelector(selectAssetState, (state) => state.assetsRemotePagination)
const selectAssetRemoteState = createSelector(selectAssetState, selectRemoteState)

const selectSelectedAssetId = createSelector(selectAssetState, (state) => state.selectedAssetId)

const assetEntitySelectors = Reducers.assetEntityAdapter.getSelectors()
const selectAssetEntityState = createSelector(selectAssetState, (state) => state.assets)
const selectAssetIds = createSelector(selectAssetEntityState, assetEntitySelectors.selectIds)
const selectAssetEntities = createSelector(selectAssetEntityState, assetEntitySelectors.selectEntities)
const selectAllAssets = createSelector(selectAssetEntityState, assetEntitySelectors.selectAll)
const selectAssetTotal = createSelector(selectAssetEntityState, assetEntitySelectors.selectTotal)
const selectAssetById = (id: string) => createSelector(selectAssetEntities, (entities) => entities[id])

const selectedAsset = createSelector(
    selectAssetEntities,
    selectSelectedAssetId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectFilteredAssets = createSelector(selectAllAssets, selectAssetFilters, (assets, filters) =>
    selectFilteredElements(assets, filters, Model.assetFilterEntityMap)
)

const selectPaginatedAssets = createSelector(selectAllAssets, selectAssetRemotePagination, (assets, pagination) =>
    selectPaginatedElements(assets, pagination)
)

const selectPaginatedFilteredAssets = createSelector(
    selectFilteredAssets,
    selectAssetRemotePagination,
    (assets, pagination) => selectPaginatedElements(assets, pagination)
)

export const AssetSelectors = {
    selectAssetState,
    selectAssetFilters,
    selectAssetRemotePagination,
    selectAssetRemoteState,

    selectSelectedAssetId,

    assetEntitySelectors,
    selectAssetEntityState,
    selectAssetIds,
    selectAssetEntities,
    selectAllAssets,
    selectAssetTotal,
    selectAssetById,
    selectedAsset,

    selectFilteredAssets,
    selectPaginatedAssets,
    selectPaginatedFilteredAssets,
}
