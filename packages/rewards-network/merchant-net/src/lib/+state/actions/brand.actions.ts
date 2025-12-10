import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    ResetRemoteFilters,
    ResetRemoteFiltersWithContext,
    UpdateRemoteFilters,
    UpdateRemoteFiltersWithContext,
    createActionType,
    createRemoteActionCRUDMap,
    createRemoteActionGroup
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const BRAND_ACTION_IDENTIFIERS = [
    Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
    Identifiers.BRAND_STATE_FEATURE_KEY
]

const updateBrandFilters = createAction(
    createActionType(BRAND_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.BrandFilters>>()
)

const resetBrandFilters = createAction(
    createActionType(BRAND_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const updateBrandFiltersForPaginatedListComponent = createAction(
    createActionType(BRAND_ACTION_IDENTIFIERS, 'Update Filters With Context'),
    props<UpdateRemoteFiltersWithContext<Model.Filters.BrandFilters, Model.BrandPaginatedListComponentContext>>()
)

const resetBrandFiltersForPaginatedListComponent = createAction(
    createActionType(BRAND_ACTION_IDENTIFIERS, 'Reset Filters With Context'),
    props<ResetRemoteFiltersWithContext<Model.BrandPaginatedListComponentContext>>()
)

const resetBrandState = createAction(
    createActionType(BRAND_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseBrandState = createAction(
    createActionType(BRAND_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectBrand = createAction(
    createActionType(BRAND_ACTION_IDENTIFIERS, 'Select Brand'),
    props<{ brandId: string }>()
)

const deselectBrand = createAction(
    createActionType(BRAND_ACTION_IDENTIFIERS, 'Deselect Brand')
)

const resetPagination = createAction(
    createActionType(BRAND_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const createBrand = createRemoteActionGroup<
    { merchantId: string; request: Model.CreateBrandRequest },
    Model.BrandResponse
>('Create Brand', ...BRAND_ACTION_IDENTIFIERS)

const getBrand = createRemoteActionGroup<
    { brandId: string },
    Model.BrandResponse
>('Get Brand', ...BRAND_ACTION_IDENTIFIERS)

const listBrands = createRemoteActionGroup<
    { merchantId: Nullable<string> | 'auto'; pagination: Nullable<Partial<PaginatedQueryParams<Model.BrandResponse>>> },
    PaginatedResponse<Model.BrandResponse>
>('List Brands', ...BRAND_ACTION_IDENTIFIERS)

const updateBrand = createRemoteActionGroup<
    { brandId: string; update: Model.UpdateBrandRequest },
    Model.BrandResponse
>('Update Brand', ...BRAND_ACTION_IDENTIFIERS)

const deleteBrand = createRemoteActionGroup<
    { brandId: string },
    { brandId: string }
>('Delete Brand', ...BRAND_ACTION_IDENTIFIERS)

export const BrandLocalActions = {
    updateBrandFilters,
    resetBrandFilters,
    updateBrandFiltersForPaginatedListComponent,
    resetBrandFiltersForPaginatedListComponent,
    resetBrandState,
    initialiseBrandState,
    selectBrand,
    deselectBrand,
    resetPagination
}

export const BrandRemoteActions = createRemoteActionCRUDMap(
    BRAND_ACTION_IDENTIFIERS,
    {
        create: createBrand,
        get: getBrand,
        list: listBrands,
        update: updateBrand,
        delete: deleteBrand
    }
)