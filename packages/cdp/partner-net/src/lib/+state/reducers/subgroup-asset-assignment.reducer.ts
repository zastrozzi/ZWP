import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { SubgroupAssetAssignmentLocalActions, SubgroupAssetAssignmentRemoteActions } from '../actions'
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

export interface SubgroupAssetAssignmentFeatureState extends BaseRemoteFeatureState {
    subgroupAssetAssignments: EntityState<Model.SubgroupAssetAssignmentResponse>
    selectedSubgroupAssetAssignmentId: Nullable<string>
    subgroupAssetAssignmentsRemotePagination: RemotePaginationState<Model.SubgroupAssetAssignmentResponse>
    filters: Model.SubgroupAssetAssignmentFilters
}

export const subgroupAssetAssignmentEntityAdapter: EntityAdapter<Model.SubgroupAssetAssignmentResponse> = createEntityAdapter<Model.SubgroupAssetAssignmentResponse>()

export const initialSubgroupAssetAssignmentFeatureState: SubgroupAssetAssignmentFeatureState = {
    ...initialBaseRemoteFeatureState,
    subgroupAssetAssignments: subgroupAssetAssignmentEntityAdapter.getInitialState(),
    selectedSubgroupAssetAssignmentId: null,
    subgroupAssetAssignmentsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'dbCreatedAt',
        total: 0,
    },
    filters: Model.initialSubgroupAssetAssignmentFilters,
}

export const subgroupAssetAssignmentReducer = createReducer(
    initialSubgroupAssetAssignmentFeatureState,
    on(SubgroupAssetAssignmentLocalActions.resetSubgroupAssetAssignmentState, () => initialSubgroupAssetAssignmentFeatureState),
    on(SubgroupAssetAssignmentLocalActions.initialiseSubgroupAssetAssignmentState, () => initialSubgroupAssetAssignmentFeatureState),
    on(SubgroupAssetAssignmentLocalActions.updateSubgroupAssetAssignmentFilters, (state, { filters }) => ({
        ...state,
        filters: { ...state.filters, ...filters },
    })),
    on(SubgroupAssetAssignmentLocalActions.resetSubgroupAssetAssignmentFilters, (state) => ({ ...state, filters: Model.initialSubgroupAssetAssignmentFilters })),
    on(SubgroupAssetAssignmentLocalActions.selectSubgroupAssetAssignment, (state, { subgroupAssetAssignmentId }) => ({ ...state, selectedSubgroupAssetAssignmentId: subgroupAssetAssignmentId })),
    on(SubgroupAssetAssignmentLocalActions.deselectSubgroupAssetAssignment, (state) => ({ ...state, selectedSubgroupAssetAssignmentId: null })),
    on(SubgroupAssetAssignmentLocalActions.resetPagination, (state) => ({
        ...state,
        subgroupAssetAssignmentsRemotePagination: { ...state.subgroupAssetAssignmentsRemotePagination, offset: 0 },
    })),
    on(remoteStateUpdateRequest(SubgroupAssetAssignmentRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(SubgroupAssetAssignmentRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(SubgroupAssetAssignmentRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),
    on(SubgroupAssetAssignmentRemoteActions.add.success, (state, { response }) => ({
        ...state,
        subgroupAssetAssignments: subgroupAssetAssignmentEntityAdapter.setOne(response, state.subgroupAssetAssignments),
    })),
    on(SubgroupAssetAssignmentRemoteActions.get.success, (state, { response }) => ({
        ...state,
        subgroupAssetAssignments: subgroupAssetAssignmentEntityAdapter.setOne(response, state.subgroupAssetAssignments),
        selectedSubgroupAssetAssignmentId: response.id,
    })),
    on(SubgroupAssetAssignmentRemoteActions.list.request, (state, { pagination }) => ({
        ...state,
        subgroupAssetAssignmentsRemotePagination: { ...state.subgroupAssetAssignmentsRemotePagination, ...pagination },
    })),
    on(SubgroupAssetAssignmentRemoteActions.list.success, (state, { response }) => ({
        ...state,
        subgroupAssetAssignments: subgroupAssetAssignmentEntityAdapter.setMany(response.results, state.subgroupAssetAssignments),
        subgroupAssetAssignmentsRemotePagination: {
            ...state.subgroupAssetAssignmentsRemotePagination,
            total: response.total,
        },
    })),
    on(SubgroupAssetAssignmentRemoteActions.update.success, (state, { response }) => ({
        ...state,
        subgroupAssetAssignments: subgroupAssetAssignmentEntityAdapter.updateOne({ id: response.id, changes: response }, state.subgroupAssetAssignments),
    })),
    on(SubgroupAssetAssignmentRemoteActions.delete.success, (state, { response }) => ({
        ...state,
        subgroupAssetAssignments: subgroupAssetAssignmentEntityAdapter.removeOne(response.subgroupAssetAssignmentId, state.subgroupAssetAssignments),
        selectedSubgroupAssetAssignmentId: state.selectedSubgroupAssetAssignmentId === response.subgroupAssetAssignmentId ? null : state.selectedSubgroupAssetAssignmentId,
    })),
    on(SubgroupAssetAssignmentRemoteActions.remove.success, (state, { response }) => ({
        ...state,
        subgroupAssetAssignments: subgroupAssetAssignmentEntityAdapter.removeOne(response.subgroupAssetAssignmentId, state.subgroupAssetAssignments),
        selectedSubgroupAssetAssignmentId: state.selectedSubgroupAssetAssignmentId === response.subgroupAssetAssignmentId ? null : state.selectedSubgroupAssetAssignmentId,
    }))
)
