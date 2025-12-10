import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    ResetRemoteFilters,
    UpdateRemoteFilters,
    createActionType,
    createRemoteActionCRUDMap,
    createRemoteActionGroup,
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const ASSET_ACTION_IDENTIFIERS = [
    Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER,
    Identifiers.ASSET_STATE_FEATURE_KEY,
]

const updateAssetFilters = createAction(
    createActionType(ASSET_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.AssetFilters>>()
)

const resetAssetFilters = createAction(
    createActionType(ASSET_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetAssetState = createAction(
    createActionType(ASSET_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseAssetState = createAction(
    createActionType(ASSET_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectAsset = createAction(
    createActionType(ASSET_ACTION_IDENTIFIERS, 'Select Asset'),
    props<{ assetId: string }>()
)

const deselectAsset = createAction(
    createActionType(ASSET_ACTION_IDENTIFIERS, 'Deselect Asset')
)

const resetPagination = createAction(
    createActionType(ASSET_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const createAsset = createRemoteActionGroup<
    { request: Model.CreateAssetRequest },
    Model.AssetResponse
>('Create Asset', ...ASSET_ACTION_IDENTIFIERS)

const getAsset = createRemoteActionGroup<
    { assetId: string },
    Model.AssetResponse
>('Get Asset', ...ASSET_ACTION_IDENTIFIERS)

const listAssets = createRemoteActionGroup<
    {
        parentId: Nullable<string> | 'auto'
        parentType: 'partner' | 'subgroup' | 'none'
        pagination: Nullable<Partial<PaginatedQueryParams<Model.AssetResponse>>>
    },
    PaginatedResponse<Model.AssetResponse>
>('List Assets', ...ASSET_ACTION_IDENTIFIERS)

const updateAsset = createRemoteActionGroup<
    { assetId: string; update: Model.UpdateAssetRequest },
    Model.AssetResponse
>('Update Asset', ...ASSET_ACTION_IDENTIFIERS)

const deleteAsset = createRemoteActionGroup<
    { assetId: string, force: boolean },
    { assetId: string }
>('Delete Asset', ...ASSET_ACTION_IDENTIFIERS)

export const AssetLocalActions = {
    updateAssetFilters,
    resetAssetFilters,
    resetAssetState,
    initialiseAssetState,
    selectAsset,
    deselectAsset,
    resetPagination,
}

export const AssetRemoteActions = createRemoteActionCRUDMap(
    ASSET_ACTION_IDENTIFIERS,
    {
        create: createAsset,
        get: getAsset,
        list: listAssets,
        update: updateAsset,
        delete: deleteAsset,
    }
)
