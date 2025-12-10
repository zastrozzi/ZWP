import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { SubgroupLocalActions, SubgroupRemoteActions } from '../actions'
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

export interface SubgroupFeatureState extends BaseRemoteFeatureState {
    subgroups: EntityState<Model.SubgroupResponse>
    selectedSubgroupId: Nullable<string>
    subgroupsRemotePagination: RemotePaginationState<Model.SubgroupResponse>
    filters: Model.SubgroupFilters
}

export const subgroupEntityAdapter: EntityAdapter<Model.SubgroupResponse> = createEntityAdapter<Model.SubgroupResponse>()

export const initialSubgroupFeatureState: SubgroupFeatureState = {
    ...initialBaseRemoteFeatureState,
    subgroups: subgroupEntityAdapter.getInitialState(),
    selectedSubgroupId: null,
    subgroupsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'dbCreatedAt',
        total: 0,
    },
    filters: Model.initialSubgroupFilters,
}

export const subgroupReducer = createReducer(
    initialSubgroupFeatureState,
    on(SubgroupLocalActions.resetSubgroupState, () => initialSubgroupFeatureState),
    on(SubgroupLocalActions.initialiseSubgroupState, () => initialSubgroupFeatureState),
    on(SubgroupLocalActions.updateSubgroupFilters, (state, { filters }) => ({
        ...state,
        filters: { ...state.filters, ...filters },
    })),
    on(SubgroupLocalActions.resetSubgroupFilters, (state) => ({ ...state, filters: Model.initialSubgroupFilters })),
    on(SubgroupLocalActions.selectSubgroup, (state, { subgroupId }) => ({ ...state, selectedSubgroupId: subgroupId })),
    on(SubgroupLocalActions.deselectSubgroup, (state) => ({ ...state, selectedSubgroupId: null })),
    on(SubgroupLocalActions.resetPagination, (state) => ({
        ...state,
        subgroupsRemotePagination: { ...state.subgroupsRemotePagination, offset: 0 },
    })),
    on(remoteStateUpdateRequest(SubgroupRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(SubgroupRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(SubgroupRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),
    on(SubgroupRemoteActions.create.success, (state, { response }) => ({
        ...state,
        subgroups: subgroupEntityAdapter.setOne(response, state.subgroups),
    })),
    on(SubgroupRemoteActions.get.success, (state, { response }) => ({
        ...state,
        subgroups: subgroupEntityAdapter.setOne(response, state.subgroups),
        selectedSubgroupId: response.id,
    })),
    on(SubgroupRemoteActions.list.request, (state, { pagination }) => ({
        ...state,
        subgroupsRemotePagination: { ...state.subgroupsRemotePagination, ...pagination },
    })),
    on(SubgroupRemoteActions.list.success, (state, { response }) => ({
        ...state,
        subgroups: subgroupEntityAdapter.setMany(response.results, state.subgroups),
        subgroupsRemotePagination: {
            ...state.subgroupsRemotePagination,
            total: response.total,
        },
    })),
    on(SubgroupRemoteActions.update.success, (state, { response }) => ({
        ...state,
        subgroups: subgroupEntityAdapter.updateOne({ id: response.id, changes: response }, state.subgroups),
    })),
    on(SubgroupRemoteActions.delete.success, (state, { response }) => ({
        ...state,
        subgroups: subgroupEntityAdapter.removeOne(response.subgroupId, state.subgroups),
        selectedSubgroupId: state.selectedSubgroupId === response.subgroupId ? null : state.selectedSubgroupId,
    }))
)
