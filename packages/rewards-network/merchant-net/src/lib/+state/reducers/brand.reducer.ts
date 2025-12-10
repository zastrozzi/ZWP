import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { BrandLocalActions, BrandRemoteActions } from '../actions'
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

export interface BrandFeatureState extends BaseRemoteFeatureState {
    brands: EntityState<Model.BrandResponse>
    selectedBrandId: Nullable<string>
    brandsRemotePagination: RemotePaginationState<Model.BrandResponse>
    filters: Model.Filters.BrandFilters
}

export const brandEntityAdapter: EntityAdapter<Model.BrandResponse> =
    createEntityAdapter<Model.BrandResponse>()

export const initialBrandFeatureState: BrandFeatureState = {
    ...initialBaseRemoteFeatureState,
    brands: brandEntityAdapter.getInitialState(),
    selectedBrandId: null,
    brandsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'brandName',
        total: 0,
    },
    filters: Model.Filters.initialBrandFilters
}

export const brandReducer = createReducer(
    initialBrandFeatureState,
    on(
        BrandLocalActions.resetBrandState,
        () => initialBrandFeatureState
    ),
    on(
        BrandLocalActions.initialiseBrandState,
        () => initialBrandFeatureState
    ),
    on(
        BrandLocalActions.updateBrandFilters,
        BrandLocalActions.updateBrandFiltersForPaginatedListComponent,
        (state, { filters }) => ({
            ...state,
            filters: {
                ...state.filters,
                ...filters
            }
        })
    ),
    on(
        BrandLocalActions.resetBrandFilters, 
        BrandLocalActions.resetBrandFiltersForPaginatedListComponent,
        (state) => ({ ...state, filters: Model.Filters.initialBrandFilters })
    ),
    on(BrandLocalActions.selectBrand, (state, { brandId }) => ({ ...state, selectedBrandId: brandId })),
    on(BrandLocalActions.deselectBrand, (state) => ({ ...state, selectedBrandId: null })),
    on(BrandLocalActions.resetPagination, (state) => ({
        ...state,
        brandsRemotePagination: {
            ...state.brandsRemotePagination,
            offset: 0
        }
    })),
    on(remoteStateUpdateRequest(BrandRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(BrandRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(BrandRemoteActions.identifiers), (state, { error }) => remoteFailureState(state, error)),

    on(
        BrandRemoteActions.create.success,
        (state, { response }) => ({
            ...state,
            brands: brandEntityAdapter.setOne(response, state.brands)
        })
    ),

    on(
        BrandRemoteActions.get.success,
        (state, { response }) => ({
            ...state,
            brands: brandEntityAdapter.setOne(response, state.brands),
            selectedBrandId: response.id
        })
    ),

    on(
        BrandRemoteActions.list.request,
        (state, { pagination }) => ({
            ...state,
            brandsRemotePagination: {
                ...state.brandsRemotePagination,
                ...pagination
            }
        })
    ),

    on(
        BrandRemoteActions.list.success,
        (state, { response }) => ({
            ...state,
            brands: brandEntityAdapter.setMany(response.results, state.brands),
            brandsRemotePagination: {
                ...state.brandsRemotePagination,
                total: response.total
            }
        })
    ),

    on(
        BrandRemoteActions.update.success,
        (state, { response }) => ({
            ...state,
            brands: brandEntityAdapter.updateOne({ id: response.id, changes: response }, state.brands)
        })
    ),

    on(
        BrandRemoteActions.delete.success,
        (state, { response }) => ({
            ...state,
            brands: brandEntityAdapter.removeOne(response.brandId, state.brands),
            selectedBrandId: 
                state.selectedBrandId === response.brandId ? null : state.selectedBrandId
        })
    )
)