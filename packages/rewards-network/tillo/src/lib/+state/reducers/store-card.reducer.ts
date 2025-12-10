import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { StoreCardLocalActions, StoreCardRemoteActions } from '../actions'
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

export interface StoreCardFeatureState extends BaseRemoteFeatureState {
    storeCards: EntityState<Model.StoreCardResponse>,
    selectedStoreCardId: Nullable<string>,
    storeCardRemotePagination: RemotePaginationState<Model.StoreCardResponse>
    filters: Model.Filters.StoreCardFilters
}

export const storeCardEntityAdaptor: EntityAdapter<Model.StoreCardResponse> = 
    createEntityAdapter<Model.StoreCardResponse>()

export const initialStoreCardFeatureState: StoreCardFeatureState = {
    ...initialBaseRemoteFeatureState,
    storeCards: storeCardEntityAdaptor.getInitialState(),
    selectedStoreCardId: null,
    storeCardRemotePagination: initialRemotePaginationState('dbCreatedAt'),
    filters: Model.Filters.initialStoreCardFilters
}

export const storeCardReducer = createReducer(
    initialStoreCardFeatureState,
    on(StoreCardLocalActions.resetStoreState, () => initialStoreCardFeatureState),
    on(StoreCardLocalActions.initialiseStoreCardState, () => initialStoreCardFeatureState),
    on(StoreCardLocalActions.updateStoreCardFilters, (state, { filters }) => ({
        ...state,
        filters: {
            ...state.filters,
            ...filters
        }
    }) ),
    on(StoreCardLocalActions.resetStoreCardFilters, (state) => ({
        ...state,
        filters: Model.Filters.initialStoreCardFilters
    })),
    on(StoreCardLocalActions.selectStoreCard, (state, { storeCardId }) => ({
        ...state,
        selectedStoreCardId: storeCardId
    })),
    on(StoreCardLocalActions.deselectStoreCard, (state) => ({ ...state, selectedStoreCardId: null })),
    on(StoreCardLocalActions.resetPagination, (state) => ({
        ...state,
        storeCardRemotePagination: {
            ...state.storeCardRemotePagination,
            offset: 0
        }
    })),
    on(remoteStateUpdateRequest(StoreCardRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(StoreCardRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(StoreCardRemoteActions.identifiers), (state, { error }) => remoteFailureState(state, error)),
    
    on(
        StoreCardRemoteActions.listStoreCards.request, (state, { pagination }) => ({
        ...state,
        storeCardRemotePagination: {
            ...state.storeCardRemotePagination,
            ...pagination
        }
    })),

    on(
        StoreCardRemoteActions.listStoreCards.success, (state, { response }) => ({
        ...state,
        storeCards: storeCardEntityAdaptor.setMany(response.results, state.storeCards),
        storeCardRemotePagination: {
            ...state.storeCardRemotePagination,
            total: response.total
        }
    })),

    on(
        StoreCardRemoteActions.getStoreCard.success, (state, { response }) => ({
        ...state,
        storeCards: storeCardEntityAdaptor.setOne(response, state.storeCards),
        selectedStoreCardId: response.id
    })),

    on(
        StoreCardRemoteActions.updateStoreCard.success, (state, { response }) => ({
            ...state,
            storeCards: storeCardEntityAdaptor.updateOne({ id: response.id, changes: response }, state.storeCards)
    })),

    on(
        StoreCardRemoteActions.createStoreCard.success, (state, { response }) => ({
            ...state,
            storeCards: storeCardEntityAdaptor.setOne(response, state.storeCards)
        })
    ),

    on(
        StoreCardRemoteActions.deleteStoreCard.success, (state, { response }) => ({
            ...state,
            storeCards: storeCardEntityAdaptor.removeOne(response.storeCardId, state.storeCards),
            selectedStoreCardId:
                state.selectedStoreCardId === response.storeCardId ? null : state.selectedStoreCardId
        })
    )

)