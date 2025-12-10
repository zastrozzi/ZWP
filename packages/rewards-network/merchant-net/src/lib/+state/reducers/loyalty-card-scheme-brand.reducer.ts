import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { LoyaltyCardSchemeBrandLocalActions, LoyaltyCardSchemeBrandRemoteActions } from '../actions'
import {
    BaseRemoteFeatureState,
    Nullable,
    RemotePaginationState,
    decrementRemotePaginationStateTotalConditionally,
    incrementRemotePaginationStateTotal,
    incrementRemotePaginationStateTotalConditionally,
    initialBaseRemoteFeatureState,
    isUndefined,
    remoteFailureState,
    remoteRequestState,
    remoteStateUpdateFailure,
    remoteStateUpdateRequest,
    remoteStateUpdateSuccess,
    remoteSuccessState,
} from '@zwp/platform.common'

export interface LoyaltyCardSchemeBrandFeatureState extends BaseRemoteFeatureState {
    loyaltyCardSchemeBrands: EntityState<Model.LoyaltyCardSchemeBrandResponse>
    selectedLoyaltyCardSchemeBrandId: Nullable<string>
    loyaltyCardSchemeBrandsRemotePagination: RemotePaginationState<Model.LoyaltyCardSchemeBrandResponse>
    filters: Model.Filters.LoyaltyCardSchemeBrandFilters
}

export const loyaltyCardSchemeBrandEntityAdapter: EntityAdapter<Model.LoyaltyCardSchemeBrandResponse> =
    createEntityAdapter<Model.LoyaltyCardSchemeBrandResponse>()

export const initialLoyaltyCardSchemeBrandFeatureState: LoyaltyCardSchemeBrandFeatureState = {
    ...initialBaseRemoteFeatureState,
    loyaltyCardSchemeBrands: loyaltyCardSchemeBrandEntityAdapter.getInitialState(),
    selectedLoyaltyCardSchemeBrandId: null,
    loyaltyCardSchemeBrandsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: null,
        total: 0,
    },
    filters: Model.Filters.initialLoyaltyCardSchemeBrandFilters,
}

export const loyaltyCardSchemeBrandReducer = createReducer(
    initialLoyaltyCardSchemeBrandFeatureState,
    on(LoyaltyCardSchemeBrandLocalActions.resetLoyaltyCardSchemeBrandState, () => initialLoyaltyCardSchemeBrandFeatureState),
    on(LoyaltyCardSchemeBrandLocalActions.initialiseLoyaltyCardSchemeBrandState, () => initialLoyaltyCardSchemeBrandFeatureState),
    on(
        LoyaltyCardSchemeBrandLocalActions.updateLoyaltyCardSchemeBrandFilters,
        (state, { filters }) => ({
            ...state,
            filters: {
                ...state.filters,
                ...filters,
            },
        })
    ),
    on(
        LoyaltyCardSchemeBrandLocalActions.resetLoyaltyCardSchemeBrandFilters,
        (state) => ({
            ...state,
            filters: Model.Filters.initialLoyaltyCardSchemeBrandFilters,
        })
    ),
    on(LoyaltyCardSchemeBrandLocalActions.selectLoyaltyCardSchemeBrand, (state, { loyaltyCardSchemeBrandId }) => ({
        ...state,
        selectedLoyaltyCardSchemeBrandId: loyaltyCardSchemeBrandId,
    })),
    on(LoyaltyCardSchemeBrandLocalActions.deselectLoyaltyCardSchemeBrand, (state) => ({
        ...state,
        selectedLoyaltyCardSchemeBrandId: null,
    })),
    on(LoyaltyCardSchemeBrandLocalActions.resetPagination, (state) => ({
        ...state,
        loyaltyCardSchemeBrandsRemotePagination: {
            ...state.loyaltyCardSchemeBrandsRemotePagination,
            offset: 0,
        },
    })),
    on(remoteStateUpdateRequest(LoyaltyCardSchemeBrandRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(LoyaltyCardSchemeBrandRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(LoyaltyCardSchemeBrandRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),

    on(LoyaltyCardSchemeBrandRemoteActions.addBrandToLoyaltyCardScheme.success, (state, { response }) => ({
        ...state,
        loyaltyCardSchemeBrands: loyaltyCardSchemeBrandEntityAdapter.setOne(response, state.loyaltyCardSchemeBrands),
        loyaltyCardSchemeBrandsRemotePagination: incrementRemotePaginationStateTotalConditionally(state, {
            entityStateKey: 'loyaltyCardSchemeBrands',
            remotePaginationStateKey: 'loyaltyCardSchemeBrandsRemotePagination',
            ids: [response.id],
        })
    })),

    on(LoyaltyCardSchemeBrandRemoteActions.removeBrandFromLoyaltyCardScheme.success, (state, { loyaltyCardSchemeId, brandId }) => {
        const idsToRemove = Object.values(state.loyaltyCardSchemeBrands.entities)
        .compactMap((brand) => brand)
        .filter((brand) => brand.brandId === brandId && brand.cardSchemeId === loyaltyCardSchemeId)
        .map((brand) => brand.id)
        return {
            ...state,
            loyaltyCardSchemeBrands: loyaltyCardSchemeBrandEntityAdapter.removeMany(
                idsToRemove,
                state.loyaltyCardSchemeBrands
            ),
            loyaltyCardSchemeBrandsRemotePagination: decrementRemotePaginationStateTotalConditionally(state, {
                entityStateKey: 'loyaltyCardSchemeBrands',
                remotePaginationStateKey: 'loyaltyCardSchemeBrandsRemotePagination',
                ids: idsToRemove
            }),
        }
    }),

    on(LoyaltyCardSchemeBrandRemoteActions.getLoyaltyCardSchemeBrand.success, (state, { response }) => ({
        ...state,
        loyaltyCardSchemeBrands: loyaltyCardSchemeBrandEntityAdapter.setOne(response, state.loyaltyCardSchemeBrands),
        selectedLoyaltyCardSchemeBrandId: response.id,
    })),

    on(LoyaltyCardSchemeBrandRemoteActions.listLoyaltyCardSchemeBrands.request, (state, { pagination }) => ({
        ...state,
        loyaltyCardSchemeBrandsRemotePagination: {
            ...state.loyaltyCardSchemeBrandsRemotePagination,
            ...pagination
        },
    })),

    on(LoyaltyCardSchemeBrandRemoteActions.listLoyaltyCardSchemeBrands.success, (state, { response }) => ({
        ...state,
        loyaltyCardSchemeBrands: loyaltyCardSchemeBrandEntityAdapter.setMany(response.results, state.loyaltyCardSchemeBrands),
        loyaltyCardSchemeBrandsRemotePagination: {
            ...state.loyaltyCardSchemeBrandsRemotePagination,
            total: response.total,
        },
    }))
)
