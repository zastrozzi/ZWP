import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { OfferLayoutLocalActions, OfferLayoutRemoteActions } from '../actions'
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

export interface OfferLayoutFeatureState extends BaseRemoteFeatureState {
    offerLayouts: EntityState<Model.OfferLayoutResponse>
    selectedOfferLayoutId: Nullable<string>
    offerLayoutsRemotePagination: RemotePaginationState<Model.OfferLayoutResponse>
    filters: Model.Filters.OfferLayoutFilters
}

export const offerLayoutEntityAdapter: EntityAdapter<Model.OfferLayoutResponse> =
    createEntityAdapter<Model.OfferLayoutResponse>()

export const initialOfferLayoutFeatureState: OfferLayoutFeatureState = {
    ...initialBaseRemoteFeatureState,
    offerLayouts: offerLayoutEntityAdapter.getInitialState(),
    selectedOfferLayoutId: null,
    offerLayoutsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: null,
        total: 0,
    },
    filters: Model.Filters.initialOfferLayoutFilters
}

export const offerLayoutReducer = createReducer(
    initialOfferLayoutFeatureState,
    on(
        OfferLayoutLocalActions.resetOfferLayoutState,
        () => initialOfferLayoutFeatureState
    ),
    on(
        OfferLayoutLocalActions.initialiseOfferLayoutState,
        () => initialOfferLayoutFeatureState
    ),
    on(
        OfferLayoutLocalActions.updateOfferLayoutFilters, (state, { filters }) => ({
            ...state,
            filters: {
                ...state.filters,
                ...filters
            }
        })
    ),
    on(OfferLayoutLocalActions.resetOfferLayoutFilters, (state) => ({ ...state, filters: Model.Filters.initialOfferLayoutFilters })),
    on(OfferLayoutLocalActions.selectOfferLayout, (state, { offerLayoutId }) => ({ ...state, selectedOfferLayoutId: offerLayoutId })),
    on(OfferLayoutLocalActions.deselectOfferLayout, (state) => ({ ...state, selectedOfferLayoutId: null })),
    on(OfferLayoutLocalActions.resetPagination, (state) => ({
        ...state,
        offerLayoutsRemotePagination: {
            ...state.offerLayoutsRemotePagination,
            offset: 0
        }
    })),
    on(remoteStateUpdateRequest(OfferLayoutRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(OfferLayoutRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(OfferLayoutRemoteActions.identifiers), (state, { error }) => remoteFailureState(state, error)),

    on(
        OfferLayoutRemoteActions.create.success,
        (state, { response }) => ({
            ...state,
            offerLayouts: offerLayoutEntityAdapter.setOne(response, state.offerLayouts)
        })
    ),

    on(
        OfferLayoutRemoteActions.get.success,
        (state, { response }) => ({
            ...state,
            offerLayouts: offerLayoutEntityAdapter.setOne(response, state.offerLayouts),
            selectedOfferLayoutId: response.id
        })
    ),

    on(
        OfferLayoutRemoteActions.list.request,
        (state, { pagination }) => ({
            ...state,
            offerLayoutsRemotePagination: {
                ...state.offerLayoutsRemotePagination,
                ...pagination
            }
        })
    ),

    on(
        OfferLayoutRemoteActions.list.success,
        (state, { response }) => ({
            ...state,
            offerLayouts: offerLayoutEntityAdapter.setAll(response.results, state.offerLayouts),
            offerLayoutsRemotePagination: {
                ...state.offerLayoutsRemotePagination,
                total: response.total
            }
        })
    ),

    on(
        OfferLayoutRemoteActions.update.success,
        (state, { response }) => ({
            ...state,
            offerLayouts: offerLayoutEntityAdapter.updateOne({ id: response.id, changes: response }, state.offerLayouts)
        })
    ),

    on(
        OfferLayoutRemoteActions.delete.success,
        (state, { response }) => ({
            ...state,
            offerLayouts: offerLayoutEntityAdapter.removeOne(response.offerLayoutId, state.offerLayouts),
            selectedOfferLayoutId: 
                state.selectedOfferLayoutId === response.offerLayoutId ? null : state.selectedOfferLayoutId
        })
    )
)