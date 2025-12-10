import { Model } from '../../model';
import {
    
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    ResetRemoteFilters,
    UpdateRemoteFilters,
    createActionType,
    createRemoteActionGroup,
    createRemoteActionMap
} from '@zwp/platform.common';
import { Identifiers } from '../identifiers';
import { createAction, props } from '@ngrx/store';

const BRAND_ACTION_IDENTIFIERS = [
    Identifiers.REWARDS_NETWORK_TILLO_ACTION_IDENTIFIER,
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

const listBrands = createRemoteActionGroup<
    { pagination: Nullable<Partial<PaginatedQueryParams<Model.BrandResponse>>> },
    PaginatedResponse<Model.BrandResponse>>
    ('List Brands', ...BRAND_ACTION_IDENTIFIERS)

const getBrand = createRemoteActionGroup<
    { brandId: string },
    Model.BrandResponse>    
    ('Get Brand', ...BRAND_ACTION_IDENTIFIERS)

const deleteBrand = createRemoteActionGroup<
    {brandId: string},
    {brandId: string}>
    ('Delete Brand', ...BRAND_ACTION_IDENTIFIERS)

const restoreBrand =  createRemoteActionGroup<
    { brandId: string },
    Model.BrandResponse>
    ('Restore Brand', ...BRAND_ACTION_IDENTIFIERS)

export const BrandLocalActions = {
    updateBrandFilters,
    resetBrandFilters,
    resetBrandState,
    initialiseBrandState,
    selectBrand,
    deselectBrand,
    resetPagination
}

export const BrandRemoteActions = createRemoteActionMap(
    BRAND_ACTION_IDENTIFIERS,
    {
        listBrands,
        getBrand,
        deleteBrand,
        restoreBrand
    }
)