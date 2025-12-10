import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { BrandTilloBrandLocalActions, BrandTilloBrandRemoteActions } from '../actions'
import {
  BaseRemoteFeatureState,
  Nullable,
  RemotePaginationState,
  decrementRemotePaginationStateTotalConditionally,
  initialBaseRemoteFeatureState,
  remoteFailureState,
  remoteRequestState,
  remoteStateUpdateFailure,
  remoteStateUpdateRequest,
  remoteStateUpdateSuccess,
  remoteSuccessState,
} from '@zwp/platform.common'

export interface BrandTilloBrandFeatureState extends BaseRemoteFeatureState {
    brandTilloBrands: EntityState<Model.BrandTilloBrandResponse>
    selectedBrandTilloBrandId: Nullable<string>
    brandTilloBrandsRemotePagination: RemotePaginationState<Model.BrandTilloBrandResponse>
    filters: Model.Filters.BrandTilloBrandFilters
}

export const brandTilloBrandEntityAdapter: EntityAdapter<Model.BrandTilloBrandResponse> =
    createEntityAdapter<Model.BrandTilloBrandResponse>()

export const initialBrandTilloBrandFeatureState: BrandTilloBrandFeatureState = {
    ...initialBaseRemoteFeatureState,
    brandTilloBrands: brandTilloBrandEntityAdapter.getInitialState(),
    selectedBrandTilloBrandId: null,
    brandTilloBrandsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'dbCreatedAt',
        total: 0,
    },
    filters: Model.Filters.initialBrandTilloBrandFilters
}

export const brandTilloBrandReducer = createReducer(
    initialBrandTilloBrandFeatureState,
    on(BrandTilloBrandLocalActions.resetBrandTilloBrandState, () => initialBrandTilloBrandFeatureState),
    on(BrandTilloBrandLocalActions.initialiseBrandTilloBrandState, () => initialBrandTilloBrandFeatureState),
    on(BrandTilloBrandLocalActions.updateBrandTilloBrandFilters, (state, { filters }) => ({
        ...state,
        filters: { ...state.filters, ...filters },
    })),
    on(BrandTilloBrandLocalActions.resetBrandTilloBrandFilters, (state) => ({
        ...state,
        filters: Model.Filters.initialBrandTilloBrandFilters,
    })),
    on(BrandTilloBrandLocalActions.selectBrandTilloBrand, (state, { brandTilloBrandId }) => ({
        ...state,
        selectedBrandTilloBrandId: brandTilloBrandId,
    })),
    on(BrandTilloBrandLocalActions.deselectBrandTilloBrand, (state) => ({
        ...state,
        selectedBrandTilloBrandId: null,
    })),
    on(BrandTilloBrandLocalActions.resetPagination, (state) => ({
        ...state,
        brandTilloBrandsRemotePagination: { ...state.brandTilloBrandsRemotePagination, offset: 0 }
    })),
    on(remoteStateUpdateRequest(BrandTilloBrandRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(BrandTilloBrandRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(BrandTilloBrandRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),
    on(BrandTilloBrandRemoteActions.onboardTilloBrand.success, (state, { response }) => ({
        ...state,
        brandTilloBrands: brandTilloBrandEntityAdapter.setOne(response, state.brandTilloBrands),
    })),
    on(BrandTilloBrandRemoteActions.getBrandTilloBrand.success, (state, { response }) => ({
        ...state,
        brandTilloBrands: brandTilloBrandEntityAdapter.setOne(response, state.brandTilloBrands)
    })),
    on(BrandTilloBrandRemoteActions.listBrandTilloBrands.request, (state, { pagination }) => ({
        ...state,
        brandTilloBrandsRemotePagination: {
            ...state.brandTilloBrandsRemotePagination,
            ...pagination
        }
    })),
    on(BrandTilloBrandRemoteActions.listBrandTilloBrands.success, (state, { response }) => ({
        ...state,
        brandTilloBrands: brandTilloBrandEntityAdapter.setMany(response.results, state.brandTilloBrands),
        brandTilloBrandsRemotePagination: {
            ...state.brandTilloBrandsRemotePagination,
            total: response.total
        }
    })),
    on(BrandTilloBrandRemoteActions.deleteBrandTilloBrand.success, (state, { brandTilloBrandId }) => ({
        ...state,
        brandTilloBrands: brandTilloBrandEntityAdapter.removeOne(brandTilloBrandId, state.brandTilloBrands),
        brandTilloBrandsRemotePagination: decrementRemotePaginationStateTotalConditionally(state, {
            entityStateKey: 'brandTilloBrands',
            remotePaginationStateKey: 'brandTilloBrandsRemotePagination',
            ids: [brandTilloBrandId]
        }),
        selectedBrandTilloBrandId: state.selectedBrandTilloBrandId === brandTilloBrandId ? null : state.selectedBrandTilloBrandId
    }))
)