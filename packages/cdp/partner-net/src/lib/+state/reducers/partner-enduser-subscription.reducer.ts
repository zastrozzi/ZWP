import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { PartnerEnduserSubscriptionLocalActions, PartnerEnduserSubscriptionRemoteActions } from '../actions'
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

export interface PartnerEnduserSubscriptionFeatureState extends BaseRemoteFeatureState {
    partnerEnduserSubscriptions: EntityState<Model.PartnerSubscriptionResponse>
    selectedPartnerEnduserSubscriptionId: Nullable<string>
    partnerEnduserSubscriptionsRemotePagination: RemotePaginationState<Model.PartnerSubscriptionResponse>
    filters: Model.PartnerSubscriptionFilters
}

export const partnerEnduserSubscriptionEntityAdapter: EntityAdapter<Model.PartnerSubscriptionResponse> =
    createEntityAdapter<Model.PartnerSubscriptionResponse>()

export const initialPartnerEnduserSubscriptionFeatureState: PartnerEnduserSubscriptionFeatureState = {
    ...initialBaseRemoteFeatureState,
    partnerEnduserSubscriptions: partnerEnduserSubscriptionEntityAdapter.getInitialState(),
    selectedPartnerEnduserSubscriptionId: null,
    partnerEnduserSubscriptionsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'dbCreatedAt',
        total: 0,
    },
    filters: Model.initialPartnerSubscriptionFilters,
}

export const partnerEnduserSubscriptionReducer = createReducer(
    initialPartnerEnduserSubscriptionFeatureState,
    on(
        PartnerEnduserSubscriptionLocalActions.resetPartnerEnduserSubscriptionState,
        () => initialPartnerEnduserSubscriptionFeatureState
    ),
    on(
        PartnerEnduserSubscriptionLocalActions.initialisePartnerEnduserSubscriptionState,
        () => initialPartnerEnduserSubscriptionFeatureState
    ),
    on(PartnerEnduserSubscriptionLocalActions.updatePartnerEnduserSubscriptionFilters, (state, { filters }) => ({
        ...state,
        filters: { ...state.filters, ...filters },
    })),
    on(PartnerEnduserSubscriptionLocalActions.resetPartnerEnduserSubscriptionFilters, (state) => ({
        ...state,
        filters: Model.initialPartnerSubscriptionFilters,
    })),
    on(
        PartnerEnduserSubscriptionLocalActions.selectPartnerEnduserSubscription,
        (state, { partnerEnduserSubscriptionId }) => ({
            ...state,
            selectedPartnerEnduserSubscriptionId: partnerEnduserSubscriptionId,
        })
    ),
    on(PartnerEnduserSubscriptionLocalActions.deselectPartnerEnduserSubscription, (state) => ({
        ...state,
        selectedPartnerEnduserSubscriptionId: null,
    })),
    on(PartnerEnduserSubscriptionLocalActions.resetPagination, (state) => ({
        ...state,
        partnerEnduserSubscriptionsRemotePagination: {
            ...state.partnerEnduserSubscriptionsRemotePagination,
            offset: 0,
        },
    })),
    on(remoteStateUpdateRequest(PartnerEnduserSubscriptionRemoteActions.identifiers), (state) =>
        remoteRequestState(state)
    ),
    on(remoteStateUpdateSuccess(PartnerEnduserSubscriptionRemoteActions.identifiers), (state) =>
        remoteSuccessState(state)
    ),
    on(remoteStateUpdateFailure(PartnerEnduserSubscriptionRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),
    on(PartnerEnduserSubscriptionRemoteActions.add.success, (state, { response }) => ({
        ...state,
        partnerEnduserSubscriptions: partnerEnduserSubscriptionEntityAdapter.setOne(
            response,
            state.partnerEnduserSubscriptions
        ),
    })),
    on(PartnerEnduserSubscriptionRemoteActions.get.success, (state, { response }) => ({
        ...state,
        partnerEnduserSubscriptions: partnerEnduserSubscriptionEntityAdapter.setOne(
            response,
            state.partnerEnduserSubscriptions
        ),
        selectedPartnerEnduserSubscriptionId: response.id,
    })),
    on(PartnerEnduserSubscriptionRemoteActions.list.request, (state, { pagination }) => ({
        ...state,
        partnerEnduserSubscriptionsRemotePagination: { ...state.partnerEnduserSubscriptionsRemotePagination, ...pagination },
    })),
    on(PartnerEnduserSubscriptionRemoteActions.list.success, (state, { response }) => ({
        ...state,
        partnerEnduserSubscriptions: partnerEnduserSubscriptionEntityAdapter.setMany(
            response.results,
            state.partnerEnduserSubscriptions
        ),
        partnerEnduserSubscriptionsRemotePagination: {
            ...state.partnerEnduserSubscriptionsRemotePagination,
            total: response.total,
        },
    })),
    on(PartnerEnduserSubscriptionRemoteActions.update.success, (state, { response }) => ({
        ...state,
        partnerEnduserSubscriptions: partnerEnduserSubscriptionEntityAdapter.updateOne(
            { id: response.id, changes: response },
            state.partnerEnduserSubscriptions
        ),
    })),
    on(PartnerEnduserSubscriptionRemoteActions.delete.success, (state, { response }) => ({
        ...state,
        partnerEnduserSubscriptions: partnerEnduserSubscriptionEntityAdapter.removeOne(
            response.partnerEnduserSubscriptionId,
            state.partnerEnduserSubscriptions
        ),
        selectedPartnerEnduserSubscriptionId:
            state.selectedPartnerEnduserSubscriptionId === response.partnerEnduserSubscriptionId
                ? null
                : state.selectedPartnerEnduserSubscriptionId,
    })),
    on(PartnerEnduserSubscriptionRemoteActions.remove.success, (state, { response }) => ({
        ...state,
        partnerEnduserSubscriptions: partnerEnduserSubscriptionEntityAdapter.removeOne(
            response.partnerEnduserSubscriptionId,
            state.partnerEnduserSubscriptions
        ),
        selectedPartnerEnduserSubscriptionId:
            state.selectedPartnerEnduserSubscriptionId === response.partnerEnduserSubscriptionId
                ? null
                : state.selectedPartnerEnduserSubscriptionId,
    }))
)
