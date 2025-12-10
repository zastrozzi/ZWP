import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { OfferLayoutElementLocalActions, OfferLayoutElementRemoteActions } from '../actions'
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

export interface OfferLayoutElementFeatureState extends BaseRemoteFeatureState {
    offerLayoutElements: EntityState<Model.OfferLayoutElementResponse>
    selectedOfferLayoutElementId: Nullable<string>
    offerLayoutElementsRemotePagination: RemotePaginationState<Model.OfferLayoutElementResponse>
    filters: Model.Filters.OfferLayoutElementFilters
}

export const offerLayoutElementEntityAdapter: EntityAdapter<Model.OfferLayoutElementResponse> =
    createEntityAdapter<Model.OfferLayoutElementResponse>()

export const initialOfferLayoutElementFeatureState: OfferLayoutElementFeatureState = {
    ...initialBaseRemoteFeatureState,
    offerLayoutElements: offerLayoutElementEntityAdapter.getInitialState(),
    selectedOfferLayoutElementId: null,
    offerLayoutElementsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: null,
        total: 0,
    },
    filters: Model.Filters.initialOfferLayoutElementFilters
}

export const offerLayoutElementReducer = createReducer(
    initialOfferLayoutElementFeatureState,
    on(
        OfferLayoutElementLocalActions.resetOfferLayoutElementState,
        () => initialOfferLayoutElementFeatureState
    ),
    on(
        OfferLayoutElementLocalActions.initialiseOfferLayoutElementState,
        () => initialOfferLayoutElementFeatureState
    ),
    on(
        OfferLayoutElementLocalActions.updateOfferLayoutElementFilters, (state, { filters }) => ({
            ...state,
            filters: {
                ...state.filters,
                ...filters
            }
        })
    ),
    on(OfferLayoutElementLocalActions.resetOfferLayoutElementFilters, (state) => ({ ...state, filters: Model.Filters.initialOfferLayoutElementFilters })),
    on(OfferLayoutElementLocalActions.selectOfferLayoutElement, (state, { offerLayoutElementId }) => ({ ...state, selectedOfferLayoutElementId: offerLayoutElementId })),
    on(OfferLayoutElementLocalActions.deselectOfferLayoutElement, (state) => ({ ...state, selectedOfferLayoutElementId: null })),
    on(OfferLayoutElementLocalActions.resetPagination, (state) => ({
        ...state,
        offerLayoutElementsRemotePagination: {
            ...state.offerLayoutElementsRemotePagination,
            offset: 0
        }
    })),
    on(remoteStateUpdateRequest(OfferLayoutElementRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(OfferLayoutElementRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(OfferLayoutElementRemoteActions.identifiers), (state, { error }) => remoteFailureState(state, error)),

    on(
        OfferLayoutElementRemoteActions.create.success,
        (state, { response }) => ({
            ...state,
            offerLayoutElements: offerLayoutElementEntityAdapter.setOne(response, state.offerLayoutElements)
        })
    ),

    on(
        OfferLayoutElementRemoteActions.get.success,
        (state, { response }) => ({
            ...state,
            offerLayoutElements: offerLayoutElementEntityAdapter.setOne(response, state.offerLayoutElements),
            selectedOfferLayoutElementId: response.id
        })
    ),

    on(
        OfferLayoutElementRemoteActions.list.request,
        (state, { pagination }) => ({
            ...state,
            offerLayoutElementsRemotePagination: {
                ...state.offerLayoutElementsRemotePagination,
                ...pagination
            }
        })
    ),

    on(
        OfferLayoutElementRemoteActions.list.success,
        (state, { response }) => ({
            ...state,
            offerLayoutElements: offerLayoutElementEntityAdapter.setAll(response.results, state.offerLayoutElements),
            offerLayoutElementsRemotePagination: {
                ...state.offerLayoutElementsRemotePagination,
                total: response.total
            }
        })
    ),

    on(
        OfferLayoutElementRemoteActions.update.success,
        (state, { response }) => ({
            ...state,
            offerLayoutElements: offerLayoutElementEntityAdapter.updateOne({ id: response.id, changes: response }, state.offerLayoutElements)
        })
    ),

    on(
        OfferLayoutElementRemoteActions.delete.success,
        (state, { response }) => ({
            ...state,
            offerLayoutElements: offerLayoutElementEntityAdapter.removeOne(response.offerLayoutElementId, state.offerLayoutElements),
            selectedOfferLayoutElementId: 
                state.selectedOfferLayoutElementId === response.offerLayoutElementId ? null : state.selectedOfferLayoutElementId
        })
    )
)