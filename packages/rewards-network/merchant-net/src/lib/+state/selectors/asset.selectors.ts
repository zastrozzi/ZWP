import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectRemoteState } from '@zwp/platform.common'
import { MerchantSelectors } from './merchant.selectors'

const selectAssetState = createFeatureSelector<Reducers.AssetFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
        Identifiers.ASSET_STATE_FEATURE_KEY
    )
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

const selectAssetsForSelectedMerchant = createSelector(
    MerchantSelectors.selectSelectedMerchantId,
    selectAllAssets,
    (merchantId, assets) => assets.filter(asset => asset.merchantId === merchantId)
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

    selectAssetsForSelectedMerchant
}
