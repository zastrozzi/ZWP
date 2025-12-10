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
    createRemoteActionMap,
} from '@zwp/platform.common'
import { RewardsNetworkTillo } from '@zwp/rewards-network.tillo'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const BRAND_TILLO_BRAND_ACTION_IDENTIFIERS = [
    Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
    Identifiers.BRAND_TILLO_BRAND_STATE_FEATURE_KEY,
]

const updateBrandTilloBrandFilters = createAction(
    createActionType(BRAND_TILLO_BRAND_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.BrandTilloBrandFilters>>()
)

const resetBrandTilloBrandFilters = createAction(
    createActionType(BRAND_TILLO_BRAND_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetBrandTilloBrandState = createAction(createActionType(BRAND_TILLO_BRAND_ACTION_IDENTIFIERS, 'Reset State'))

const initialiseBrandTilloBrandState = createAction(
    createActionType(BRAND_TILLO_BRAND_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectBrandTilloBrand = createAction(
    createActionType(BRAND_TILLO_BRAND_ACTION_IDENTIFIERS, 'Select Brand Tillo Brand'),
    props<{ brandTilloBrandId: string }>()
)

const deselectBrandTilloBrand = createAction(
    createActionType(BRAND_TILLO_BRAND_ACTION_IDENTIFIERS, 'Deselect Brand Tillo Brand')
)

const resetPagination = createAction(createActionType(BRAND_TILLO_BRAND_ACTION_IDENTIFIERS, 'Reset Pagination'))

const onboardTilloBrand = createRemoteActionGroup<
    { tilloBrandId: string; parent: { brandId: Nullable<string>; merchantId: Nullable<string> } },
    Model.BrandTilloBrandResponse
>('Onboard Tillo Brand', ...BRAND_TILLO_BRAND_ACTION_IDENTIFIERS)

const getBrandTilloBrand = createRemoteActionGroup<{ brandTilloBrandId: string }, Model.BrandTilloBrandResponse>(
    'Get Brand Tillo Brand',
    ...BRAND_TILLO_BRAND_ACTION_IDENTIFIERS
)

const listBrandTilloBrands = createRemoteActionGroup<
    {
        parent: { brandId: Nullable<string>; merchantId: Nullable<string>; tilloBrandId: Nullable<string> }
        pagination: Nullable<Partial<PaginatedQueryParams<Model.BrandTilloBrandResponse>>>
    },
    PaginatedResponse<Model.BrandTilloBrandResponse>
>('List Brand Tillo Brands', ...BRAND_TILLO_BRAND_ACTION_IDENTIFIERS)

const deleteBrandTilloBrand = createRemoteActionGroup<{ brandTilloBrandId: string, force: boolean }, { brandTilloBrandId: string }>(
    'Delete Brand Tillo Brand',
    ...BRAND_TILLO_BRAND_ACTION_IDENTIFIERS
)

const listTilloBrands = createRemoteActionGroup<
    {
        parent: { brandId: Nullable<string>; brandTilloBrandId: Nullable<string>; merchantId: Nullable<string> }
        pagination: Nullable<Partial<PaginatedQueryParams<RewardsNetworkTillo.Model.BrandResponse>>>
    },
    PaginatedResponse<RewardsNetworkTillo.Model.BrandResponse>
>('List Tillo Brands', ...BRAND_TILLO_BRAND_ACTION_IDENTIFIERS)

export const BrandTilloBrandLocalActions = {
    updateBrandTilloBrandFilters,
    resetBrandTilloBrandFilters,
    resetBrandTilloBrandState,
    initialiseBrandTilloBrandState,
    selectBrandTilloBrand,
    deselectBrandTilloBrand,
    resetPagination,
}

export const BrandTilloBrandRemoteActions = createRemoteActionMap(BRAND_TILLO_BRAND_ACTION_IDENTIFIERS, {
    onboardTilloBrand,
    getBrandTilloBrand,
    listBrandTilloBrands,
    deleteBrandTilloBrand,
    listTilloBrands
})
