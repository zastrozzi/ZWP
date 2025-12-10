import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { LoyaltyCardLocalActions, LoyaltyCardRemoteActions } from '../actions'
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

export interface LoyaltyCardFeatureState extends BaseRemoteFeatureState {
    loyaltyCards: EntityState<Model.LoyaltyCardResponse>
    selectedLoyaltyCardId: Nullable<string>
    loyaltyCardsRemotePagination: RemotePaginationState<Model.LoyaltyCardResponse>
    filters: Model.Filters.LoyaltyCardFilters
}

export const loyaltyCardEntityAdapter: EntityAdapter<Model.LoyaltyCardResponse> =
    createEntityAdapter<Model.LoyaltyCardResponse>()

export const initialLoyaltyCardFeatureState: LoyaltyCardFeatureState = {
    ...initialBaseRemoteFeatureState,
    loyaltyCards: loyaltyCardEntityAdapter.getInitialState(),
    selectedLoyaltyCardId: null,
    loyaltyCardsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: null,
        total: 0,
    },
    filters: Model.Filters.initialLoyaltyCardFilters
}

export const loyaltyCardReducer = createReducer(
    initialLoyaltyCardFeatureState,
    on(
        LoyaltyCardLocalActions.resetLoyaltyCardState,
        () => initialLoyaltyCardFeatureState
    ),
    on(
        LoyaltyCardLocalActions.initialiseLoyaltyCardState,
        () => initialLoyaltyCardFeatureState
    ),
    on(
        LoyaltyCardLocalActions.updateLoyaltyCardFilters, (state, { filters }) => ({
            ...state,
            filters: {
                ...state.filters,
                ...filters
            }
        })
    ),
    on(LoyaltyCardLocalActions.resetLoyaltyCardFilters, (state) => ({ ...state, filters: Model.Filters.initialLoyaltyCardFilters })),
    on(LoyaltyCardLocalActions.selectLoyaltyCard, (state, { loyaltyCardId }) => ({ ...state, selectedLoyaltyCardId: loyaltyCardId })),
    on(LoyaltyCardLocalActions.deselectLoyaltyCard, (state) => ({ ...state, selectedLoyaltyCardId: null })),
    on(LoyaltyCardLocalActions.resetPagination, (state) => ({
        ...state,
        loyaltyCardsRemotePagination: {
            ...state.loyaltyCardsRemotePagination,
            offset: 0
        }
    })),
    on(remoteStateUpdateRequest(LoyaltyCardRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(LoyaltyCardRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(LoyaltyCardRemoteActions.identifiers), (state, { error }) => remoteFailureState(state, error)),

    on(
        LoyaltyCardRemoteActions.create.success,
        (state, { response }) => ({
            ...state,
            loyaltyCards: loyaltyCardEntityAdapter.setOne(response, state.loyaltyCards)
        })
    ),

    on(
        LoyaltyCardRemoteActions.get.success,
        (state, { response }) => ({
            ...state,
            loyaltyCards: loyaltyCardEntityAdapter.setOne(response, state.loyaltyCards),
            selectedLoyaltyCardId: response.id
        })
    ),

    on(
        LoyaltyCardRemoteActions.list.request,
        (state, { pagination }) => ({
            ...state,
            loyaltyCardsRemotePagination: {
                ...state.loyaltyCardsRemotePagination,
                ...pagination
            }
        })
    ),

    on(
        LoyaltyCardRemoteActions.list.success,
        (state, { response }) => ({
            ...state,
            loyaltyCards: loyaltyCardEntityAdapter.setAll(response.results, state.loyaltyCards),
            loyaltyCardsRemotePagination: {
                ...state.loyaltyCardsRemotePagination,
                total: response.total
            }
        })
    ),

    on(
        LoyaltyCardRemoteActions.update.success,
        (state, { response }) => ({
            ...state,
            loyaltyCards: loyaltyCardEntityAdapter.updateOne({ id: response.id, changes: response }, state.loyaltyCards)
        })
    ),

    on(
        LoyaltyCardRemoteActions.delete.success,
        (state, { loyaltyCardId }) => ({
            ...state,
            loyaltyCards: loyaltyCardEntityAdapter.removeOne(loyaltyCardId, state.loyaltyCards),
            selectedLoyaltyCardId: state.selectedLoyaltyCardId === loyaltyCardId ? null : state.selectedLoyaltyCardId
        })
    )
)