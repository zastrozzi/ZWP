import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { AssetLocalActions, AssetRemoteActions } from '../actions'
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

export interface AssetFeatureState extends BaseRemoteFeatureState {
    assets: EntityState<Model.AssetResponse>
    selectedAssetId: Nullable<string>
    assetsRemotePagination: RemotePaginationState<Model.AssetResponse>
    filters: Model.AssetFilters
}

export const assetEntityAdapter: EntityAdapter<Model.AssetResponse> = createEntityAdapter<Model.AssetResponse>()

export const initialAssetFeatureState: AssetFeatureState = {
    ...initialBaseRemoteFeatureState,
    assets: assetEntityAdapter.getInitialState(),
    selectedAssetId: null,
    assetsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'dbCreatedAt',
        total: 0,
    },
    filters: Model.initialAssetFilters,
}

export const assetReducer = createReducer(
    initialAssetFeatureState,
    on(AssetLocalActions.resetAssetState, () => initialAssetFeatureState),
    on(AssetLocalActions.initialiseAssetState, () => initialAssetFeatureState),
    on(AssetLocalActions.updateAssetFilters, (state, { filters }) => ({
        ...state,
        filters: { ...state.filters, ...filters },
    })),
    on(AssetLocalActions.resetAssetFilters, (state) => ({ ...state, filters: Model.initialAssetFilters })),
    on(AssetLocalActions.selectAsset, (state, { assetId }) => ({ ...state, selectedAssetId: assetId })),
    on(AssetLocalActions.deselectAsset, (state) => ({ ...state, selectedAssetId: null })),
    on(AssetLocalActions.resetPagination, (state) => ({
        ...state,
        assetsRemotePagination: { ...state.assetsRemotePagination, offset: 0 },
    })),
    on(remoteStateUpdateRequest(AssetRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(AssetRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(AssetRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),
    on(AssetRemoteActions.create.success, (state, { response }) => ({
        ...state,
        assets: assetEntityAdapter.setOne(response, state.assets),
    })),
    on(AssetRemoteActions.get.success, (state, { response }) => ({
        ...state,
        assets: assetEntityAdapter.setOne(response, state.assets),
        selectedAssetId: response.id,
    })),
    on(AssetRemoteActions.list.request, (state, { pagination }) => ({
        ...state,
        assetsRemotePagination: { ...state.assetsRemotePagination, ...pagination },
    })),
    on(AssetRemoteActions.list.success, (state, { response }) => ({
        ...state,
        assets: assetEntityAdapter.setMany(response.results, state.assets),
        assetsRemotePagination: {
            ...state.assetsRemotePagination,
            total: response.total,
        },
    })),
    on(AssetRemoteActions.update.success, (state, { response }) => ({
        ...state,
        assets: assetEntityAdapter.updateOne({ id: response.id, changes: response }, state.assets),
    })),
    on(AssetRemoteActions.delete.success, (state, { response }) => ({
        ...state,
        assets: assetEntityAdapter.removeOne(response.assetId, state.assets),
        selectedAssetId: state.selectedAssetId === response.assetId ? null : state.selectedAssetId,
    }))
)
