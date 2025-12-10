import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { BrandLocalActions, BrandRemoteActions } from '../actions'
import {
    BaseRemoteFeatureState,
    Nullable,
    RemotePaginationState,
    initialBaseRemoteFeatureState,
    initialRemotePaginationState,
    remoteFailureState,
    remoteRequestState,
    remoteStateUpdateFailure,
    remoteStateUpdateRequest,
    remoteStateUpdateSuccess,
    remoteSuccessState,
} from '@zwp/platform.common'

export interface BrandFeatureState extends BaseRemoteFeatureState {
    brands: EntityState<Model.BrandResponse>
    selectedBrandId: Nullable<string>
    brandsRemotePagination: RemotePaginationState<Model.BrandResponse>
    filters: Model.Filters.BrandFilters
}

export const brandEntityAdapter: EntityAdapter<Model.BrandResponse> = createEntityAdapter<Model.BrandResponse>()

export const initialBrandFeatureState: BrandFeatureState = {
    ...initialBaseRemoteFeatureState,
    brands: brandEntityAdapter.getInitialState(),
    selectedBrandId: null,
    brandsRemotePagination: initialRemotePaginationState('name'),
    filters: Model.Filters.initialBrandFilters
}

export const brandReducer = createReducer(
    initialBrandFeatureState,
    on(BrandLocalActions.resetBrandState, () => initialBrandFeatureState),
    on(BrandLocalActions.initialiseBrandState, () => initialBrandFeatureState),
    on(BrandLocalActions.updateBrandFilters, (state, { filters }) => ({
        ...state,
        filters: {
            ...state.filters,
            ...filters,
        },
    })),
    on(BrandLocalActions.resetBrandFilters, (state) => ({ ...state, filters: Model.Filters.initialBrandFilters })),
    on(BrandLocalActions.selectBrand, (state, { brandId }) => ({ ...state, selectedBrandId: brandId })),
    on(BrandLocalActions.deselectBrand, (state) => ({ ...state, selectedBrandId: null })),
    on(BrandLocalActions.resetPagination, (state) => ({
        ...state,
        brandsRemotePagination: {
            ...state.brandsRemotePagination,
            offset: 0,
        },
    })),
    on(remoteStateUpdateRequest(BrandRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(BrandRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(BrandRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),

    on(BrandRemoteActions.listBrands.request, (state, { pagination }) => ({
        ...state,
        brandsRemotePagination: {
            ...state.brandsRemotePagination,
            ...pagination,
        },
    })),

    on(BrandRemoteActions.listBrands.success, (state, { response }) => ({
        ...state,
        brands: brandEntityAdapter.setMany(response.results, state.brands),
        brandsRemotePagination: {
            ...state.brandsRemotePagination,
            total: response.total,
        },
    })),

    on(BrandRemoteActions.getBrand.success, (state, { response }) => ({
        ...state,
        brands: brandEntityAdapter.setOne(response, state.brands),
        selectedBrandId: response.id,
    })),
    on(BrandRemoteActions.deleteBrand.success, (state, { brandId }) => ({
        ...state,
        brands: brandEntityAdapter.removeOne(brandId, state.brands),
        selectedBrandId: state.selectedBrandId === brandId ? null : state.selectedBrandId,
    }))
)
