import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { SubgroupEnduserSubscriptionLocalActions, SubgroupEnduserSubscriptionRemoteActions } from '../actions'
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

export interface SubgroupEnduserSubscriptionFeatureState extends BaseRemoteFeatureState {
    subgroupEnduserSubscriptions: EntityState<Model.SubgroupSubscriptionResponse>
    selectedSubgroupEnduserSubscriptionId: Nullable<string>
    subgroupEnduserSubscriptionsRemotePagination: RemotePaginationState<Model.SubgroupSubscriptionResponse>
    filters: Model.SubgroupSubscriptionFilters
}

export const subgroupEnduserSubscriptionEntityAdapter: EntityAdapter<Model.SubgroupSubscriptionResponse> =
    createEntityAdapter<Model.SubgroupSubscriptionResponse>()

export const initialSubgroupEnduserSubscriptionFeatureState: SubgroupEnduserSubscriptionFeatureState = {
    ...initialBaseRemoteFeatureState,
    subgroupEnduserSubscriptions: subgroupEnduserSubscriptionEntityAdapter.getInitialState(),
    selectedSubgroupEnduserSubscriptionId: null,
    subgroupEnduserSubscriptionsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'dbCreatedAt',
        total: 0,
    },
    filters: Model.initialSubgroupSubscriptionFilters,
}

export const subgroupEnduserSubscriptionReducer = createReducer(
    initialSubgroupEnduserSubscriptionFeatureState,
    on(
        SubgroupEnduserSubscriptionLocalActions.resetSubgroupEnduserSubscriptionState,
        () => initialSubgroupEnduserSubscriptionFeatureState
    ),
    on(
        SubgroupEnduserSubscriptionLocalActions.initialiseSubgroupEnduserSubscriptionState,
        () => initialSubgroupEnduserSubscriptionFeatureState
    ),
    on(SubgroupEnduserSubscriptionLocalActions.updateSubgroupEnduserSubscriptionFilters, (state, { filters }) => ({
        ...state,
        filters: { ...state.filters, ...filters },
    })),
    on(SubgroupEnduserSubscriptionLocalActions.resetSubgroupEnduserSubscriptionFilters, (state) => ({
        ...state,
        filters: Model.initialSubgroupSubscriptionFilters,
    })),
    on(
        SubgroupEnduserSubscriptionLocalActions.selectSubgroupEnduserSubscription,
        (state, { subgroupEnduserSubscriptionId }) => ({
            ...state,
            selectedSubgroupEnduserSubscriptionId: subgroupEnduserSubscriptionId,
        })
    ),
    on(SubgroupEnduserSubscriptionLocalActions.deselectSubgroupEnduserSubscription, (state) => ({
        ...state,
        selectedSubgroupEnduserSubscriptionId: null,
    })),
    on(SubgroupEnduserSubscriptionLocalActions.resetPagination, (state) => ({
        ...state,
        subgroupEnduserSubscriptionsRemotePagination: {
            ...state.subgroupEnduserSubscriptionsRemotePagination,
            offset: 0,
        },
    })),
    on(remoteStateUpdateRequest(SubgroupEnduserSubscriptionRemoteActions.identifiers), (state) =>
        remoteRequestState(state)
    ),
    on(remoteStateUpdateSuccess(SubgroupEnduserSubscriptionRemoteActions.identifiers), (state) =>
        remoteSuccessState(state)
    ),
    on(remoteStateUpdateFailure(SubgroupEnduserSubscriptionRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),
    on(SubgroupEnduserSubscriptionRemoteActions.add.success, (state, { response }) => ({
        ...state,
        subgroupEnduserSubscriptions: subgroupEnduserSubscriptionEntityAdapter.setOne(
            response,
            state.subgroupEnduserSubscriptions
        ),
    })),
    on(SubgroupEnduserSubscriptionRemoteActions.get.success, (state, { response }) => ({
        ...state,
        subgroupEnduserSubscriptions: subgroupEnduserSubscriptionEntityAdapter.setOne(
            response,
            state.subgroupEnduserSubscriptions
        ),
        selectedSubgroupEnduserSubscriptionId: response.id,
    })),
    on(SubgroupEnduserSubscriptionRemoteActions.list.request, (state, { pagination }) => ({
        ...state,
        subgroupEnduserSubscriptionsRemotePagination: { ...state.subgroupEnduserSubscriptionsRemotePagination, ...pagination },
    })),
    on(SubgroupEnduserSubscriptionRemoteActions.list.success, (state, { response }) => ({
        ...state,
        subgroupEnduserSubscriptions: subgroupEnduserSubscriptionEntityAdapter.setMany(
            response.results,
            state.subgroupEnduserSubscriptions
        ),
        subgroupEnduserSubscriptionsRemotePagination: {
            ...state.subgroupEnduserSubscriptionsRemotePagination,
            total: response.total,
        },
    })),
    on(SubgroupEnduserSubscriptionRemoteActions.update.success, (state, { response }) => ({
        ...state,
        subgroupEnduserSubscriptions: subgroupEnduserSubscriptionEntityAdapter.updateOne(
            { id: response.id, changes: response },
            state.subgroupEnduserSubscriptions
        ),
    })),
    on(SubgroupEnduserSubscriptionRemoteActions.delete.success, (state, { response }) => ({
        ...state,
        subgroupEnduserSubscriptions: subgroupEnduserSubscriptionEntityAdapter.removeOne(
            response.subgroupEnduserSubscriptionId,
            state.subgroupEnduserSubscriptions
        ),
        selectedSubgroupEnduserSubscriptionId:
            state.selectedSubgroupEnduserSubscriptionId === response.subgroupEnduserSubscriptionId
                ? null
                : state.selectedSubgroupEnduserSubscriptionId,
    })),
    on(SubgroupEnduserSubscriptionRemoteActions.remove.success, (state, { response }) => ({
        ...state,
        subgroupEnduserSubscriptions: subgroupEnduserSubscriptionEntityAdapter.removeOne(
            response.subgroupEnduserSubscriptionId,
            state.subgroupEnduserSubscriptions
        ),
        selectedSubgroupEnduserSubscriptionId:
            state.selectedSubgroupEnduserSubscriptionId === response.subgroupEnduserSubscriptionId
                ? null
                : state.selectedSubgroupEnduserSubscriptionId,
    }))
)
