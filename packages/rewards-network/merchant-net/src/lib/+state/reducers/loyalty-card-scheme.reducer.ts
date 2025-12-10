import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { LoyaltyCardSchemeLocalActions, LoyaltyCardSchemeRemoteActions } from '../actions'
import {
    BaseRemoteFeatureState,
    Nullable,
    RemotePaginationState,
    decrementRemotePaginationStateTotalConditionally,
    incrementRemotePaginationStateTotalConditionally,
    initialBaseRemoteFeatureState,
    remoteFailureState,
    remoteRequestState,
    remoteStateUpdateFailure,
    remoteStateUpdateRequest,
    remoteStateUpdateSuccess,
    remoteSuccessState,
} from '@zwp/platform.common'

export interface LoyaltyCardSchemeFeatureState extends BaseRemoteFeatureState {
    loyaltyCardSchemes: EntityState<Model.LoyaltyCardSchemeResponse>
    selectedLoyaltyCardSchemeId: Nullable<string>
    loyaltyCardSchemesRemotePagination: RemotePaginationState<Model.LoyaltyCardSchemeResponse>
    filters: Model.Filters.LoyaltyCardSchemeFilters
}

export const loyaltyCardSchemeEntityAdapter: EntityAdapter<Model.LoyaltyCardSchemeResponse> =
    createEntityAdapter<Model.LoyaltyCardSchemeResponse>()

export const initialLoyaltyCardSchemeFeatureState: LoyaltyCardSchemeFeatureState = {
    ...initialBaseRemoteFeatureState,
    loyaltyCardSchemes: loyaltyCardSchemeEntityAdapter.getInitialState(),
    selectedLoyaltyCardSchemeId: null,
    loyaltyCardSchemesRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: null,
        total: 0,
    },
    filters: Model.Filters.initialLoyaltyCardSchemeFilters,
}

export const loyaltyCardSchemeReducer = createReducer(
    initialLoyaltyCardSchemeFeatureState,
    on(LoyaltyCardSchemeLocalActions.resetLoyaltyCardSchemeState, () => initialLoyaltyCardSchemeFeatureState),
    on(LoyaltyCardSchemeLocalActions.initialiseLoyaltyCardSchemeState, () => initialLoyaltyCardSchemeFeatureState),
    on(
        LoyaltyCardSchemeLocalActions.updateLoyaltyCardSchemeFilters,
        LoyaltyCardSchemeLocalActions.updateLoyaltyCardSchemeFiltersForPaginatedListComponent,
        (state, { filters }) => ({
            ...state,
            filters: {
                ...state.filters,
                ...filters,
            },
        })
    ),
    on(
        LoyaltyCardSchemeLocalActions.resetLoyaltyCardSchemeFilters,
        LoyaltyCardSchemeLocalActions.resetLoyaltyCardSchemeFiltersForPaginatedListComponent,
        (state) => ({
            ...state,
            filters: Model.Filters.initialLoyaltyCardSchemeFilters,
        })
    ),
    on(LoyaltyCardSchemeLocalActions.selectLoyaltyCardScheme, (state, { loyaltyCardSchemeId }) => ({
        ...state,
        selectedLoyaltyCardSchemeId: loyaltyCardSchemeId,
    })),
    on(LoyaltyCardSchemeLocalActions.deselectLoyaltyCardScheme, (state) => ({
        ...state,
        selectedLoyaltyCardSchemeId: null,
    })),
    on(LoyaltyCardSchemeLocalActions.resetPagination, (state) => ({
        ...state,
        loyaltyCardSchemesRemotePagination: {
            ...state.loyaltyCardSchemesRemotePagination,
            offset: 0,
        },
    })),
    on(remoteStateUpdateRequest(LoyaltyCardSchemeRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(LoyaltyCardSchemeRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(LoyaltyCardSchemeRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),

    on(LoyaltyCardSchemeRemoteActions.create.success, (state, { response }) => ({
        ...state,
        loyaltyCardSchemes: loyaltyCardSchemeEntityAdapter.setOne(response, state.loyaltyCardSchemes),
        loyaltyCardSchemesRemotePagination: incrementRemotePaginationStateTotalConditionally(state, {
            entityStateKey: 'loyaltyCardSchemes',
            remotePaginationStateKey: 'loyaltyCardSchemesRemotePagination',
            ids: [response.id],
        })
    })),

    on(LoyaltyCardSchemeRemoteActions.get.success, (state, { response }) => ({
        ...state,
        loyaltyCardSchemes: loyaltyCardSchemeEntityAdapter.setOne(response, state.loyaltyCardSchemes),
        selectedLoyaltyCardSchemeId: response.id,
    })),

    on(LoyaltyCardSchemeRemoteActions.list.request, (state, { pagination }) => ({
        ...state,
        loyaltyCardSchemesRemotePagination: {
            ...state.loyaltyCardSchemesRemotePagination,
            ...pagination
        },
    })),

    on(LoyaltyCardSchemeRemoteActions.list.success, (state, { response }) => ({
        ...state,
        loyaltyCardSchemes: loyaltyCardSchemeEntityAdapter.setMany(response.results, state.loyaltyCardSchemes),
        loyaltyCardSchemesRemotePagination: {
            ...state.loyaltyCardSchemesRemotePagination,
            total: response.total,
        },
    })),

    on(LoyaltyCardSchemeRemoteActions.update.success, (state, { response }) => ({
        ...state,
        loyaltyCardSchemes: loyaltyCardSchemeEntityAdapter.updateOne(
            { id: response.id, changes: response },
            state.loyaltyCardSchemes
        ),
    })),

    on(LoyaltyCardSchemeRemoteActions.delete.success, (state, { loyaltyCardSchemeId }) => ({
        ...state,
        loyaltyCardSchemes: loyaltyCardSchemeEntityAdapter.removeOne(
            loyaltyCardSchemeId,
            state.loyaltyCardSchemes
        ),
        loyaltyCardSchemesRemotePagination: decrementRemotePaginationStateTotalConditionally(state, {
            entityStateKey: 'loyaltyCardSchemes',
            remotePaginationStateKey: 'loyaltyCardSchemesRemotePagination',
            ids: [loyaltyCardSchemeId],
        }),
        selectedLoyaltyCardSchemeId:
            state.selectedLoyaltyCardSchemeId === loyaltyCardSchemeId
                ? null
                : state.selectedLoyaltyCardSchemeId,
    }))
)
