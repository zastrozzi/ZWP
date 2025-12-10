import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { OfferLocalActions, OfferRemoteActions } from '../actions'
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

export interface OfferFeatureState extends BaseRemoteFeatureState {
    offers: EntityState<Model.OfferResponse>
    selectedOfferId: Nullable<string>
    offersRemotePagination: RemotePaginationState<Model.OfferResponse>
    filters: Model.Filters.OfferFilters
}

export const offerEntityAdapter: EntityAdapter<Model.OfferResponse> =
    createEntityAdapter<Model.OfferResponse>()

export const initialOfferFeatureState: OfferFeatureState = {
    ...initialBaseRemoteFeatureState,
    offers: offerEntityAdapter.getInitialState(),
    selectedOfferId: null,
    offersRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: null,
        total: 0,
    },
    filters: Model.Filters.initialOfferFilters
}

export const offerReducer = createReducer(
    initialOfferFeatureState,
    on(
        OfferLocalActions.resetOfferState,
        () => initialOfferFeatureState
    ),
    on(
        OfferLocalActions.initialiseOfferState,
        () => initialOfferFeatureState
    ),
    on(
        OfferLocalActions.updateOfferFilters, (state, { filters }) => ({
            ...state,
            filters: {
                ...state.filters,
                ...filters
            }
        })
    ),
    on(OfferLocalActions.resetOfferFilters, (state) => ({ ...state, filters: Model.Filters.initialOfferFilters })),
    on(OfferLocalActions.selectOffer, (state, { offerId }) => ({ ...state, selectedOfferId: offerId })),
    on(OfferLocalActions.deselectOffer, (state) => ({ ...state, selectedOfferId: null })),
    on(OfferLocalActions.resetPagination, (state) => ({
        ...state,
        offersRemotePagination: {
            ...state.offersRemotePagination,
            offset: 0
        }
    })),
    on(remoteStateUpdateRequest(OfferRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(OfferRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(OfferRemoteActions.identifiers), (state, { error }) => remoteFailureState(state, error)),

    on(
        OfferRemoteActions.create.success,
        (state, { response }) => ({
            ...state,
            offers: offerEntityAdapter.setOne(response, state.offers)
        })
    ),

    on(
        OfferRemoteActions.get.success,
        (state, { response }) => ({
            ...state,
            offers: offerEntityAdapter.setOne(response, state.offers),
            selectedOfferId: response.id
        })
    ),

    on(
        OfferRemoteActions.list.request,
        (state, { pagination }) => ({
            ...state,
            offersRemotePagination: {
                ...state.offersRemotePagination,
                ...pagination
            }
        })
    ),

    on(
        OfferRemoteActions.list.success,
        (state, { response }) => ({
            ...state,
            offers: offerEntityAdapter.setAll(response.results, state.offers),
            offersRemotePagination: {
                ...state.offersRemotePagination,
                total: response.total
            }
        })
    ),

    on(
        OfferRemoteActions.update.success,
        (state, { response }) => ({
            ...state,
            offers: offerEntityAdapter.updateOne({ id: response.id, changes: response }, state.offers)
        })
    ),

    on(
        OfferRemoteActions.delete.success,
        (state, { response }) => ({
            ...state,
            offers: offerEntityAdapter.removeOne(response.offerId, state.offers),
            selectedOfferId: 
                state.selectedOfferId === response.offerId ? null : state.selectedOfferId
        })
    )
)