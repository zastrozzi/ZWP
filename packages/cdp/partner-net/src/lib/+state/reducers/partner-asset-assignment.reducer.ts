import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { PartnerAssetAssignmentLocalActions, PartnerAssetAssignmentRemoteActions } from '../actions'
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

export interface PartnerAssetAssignmentFeatureState extends BaseRemoteFeatureState {
    partnerAssetAssignments: EntityState<Model.PartnerAssetAssignmentResponse>
    selectedPartnerAssetAssignmentId: Nullable<string>
    partnerAssetAssignmentsRemotePagination: RemotePaginationState<Model.PartnerAssetAssignmentResponse>
    filters: Model.PartnerAssetAssignmentFilters
}

export const partnerAssetAssignmentEntityAdapter: EntityAdapter<Model.PartnerAssetAssignmentResponse> = createEntityAdapter<Model.PartnerAssetAssignmentResponse>()

export const initialPartnerAssetAssignmentFeatureState: PartnerAssetAssignmentFeatureState = {
    ...initialBaseRemoteFeatureState,
    partnerAssetAssignments: partnerAssetAssignmentEntityAdapter.getInitialState(),
    selectedPartnerAssetAssignmentId: null,
    partnerAssetAssignmentsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'dbCreatedAt',
        total: 0,
    },
    filters: Model.initialPartnerAssetAssignmentFilters,
}

export const partnerAssetAssignmentReducer = createReducer(
    initialPartnerAssetAssignmentFeatureState,
    on(PartnerAssetAssignmentLocalActions.resetPartnerAssetAssignmentState, () => initialPartnerAssetAssignmentFeatureState),
    on(PartnerAssetAssignmentLocalActions.initialisePartnerAssetAssignmentState, () => initialPartnerAssetAssignmentFeatureState),
    on(PartnerAssetAssignmentLocalActions.updatePartnerAssetAssignmentFilters, (state, { filters }) => ({
        ...state,
        filters: { ...state.filters, ...filters },
    })),
    on(PartnerAssetAssignmentLocalActions.resetPartnerAssetAssignmentFilters, (state) => ({ ...state, filters: Model.initialPartnerAssetAssignmentFilters })),
    on(PartnerAssetAssignmentLocalActions.selectPartnerAssetAssignment, (state, { partnerAssetAssignmentId }) => ({ ...state, selectedPartnerAssetAssignmentId: partnerAssetAssignmentId })),
    on(PartnerAssetAssignmentLocalActions.deselectPartnerAssetAssignment, (state) => ({ ...state, selectedPartnerAssetAssignmentId: null })),
    on(PartnerAssetAssignmentLocalActions.resetPagination, (state) => ({
        ...state,
        partnerAssetAssignmentsRemotePagination: { ...state.partnerAssetAssignmentsRemotePagination, offset: 0 },
    })),
    on(remoteStateUpdateRequest(PartnerAssetAssignmentRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(PartnerAssetAssignmentRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(PartnerAssetAssignmentRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),
    on(PartnerAssetAssignmentRemoteActions.add.success, (state, { response }) => ({
        ...state,
        partnerAssetAssignments: partnerAssetAssignmentEntityAdapter.setOne(response, state.partnerAssetAssignments),
    })),
    on(PartnerAssetAssignmentRemoteActions.get.success, (state, { response }) => ({
        ...state,
        partnerAssetAssignments: partnerAssetAssignmentEntityAdapter.setOne(response, state.partnerAssetAssignments),
        selectedPartnerAssetAssignmentId: response.id,
    })),
    on(PartnerAssetAssignmentRemoteActions.list.request, (state, { pagination }) => ({
        ...state,
        partnerAssetAssignmentsRemotePagination: { ...state.partnerAssetAssignmentsRemotePagination, ...pagination },
    })),
    on(PartnerAssetAssignmentRemoteActions.list.success, (state, { response }) => ({
        ...state,
        partnerAssetAssignments: partnerAssetAssignmentEntityAdapter.setMany(response.results, state.partnerAssetAssignments),
        partnerAssetAssignmentsRemotePagination: {
            ...state.partnerAssetAssignmentsRemotePagination,
            total: response.total,
        },
    })),
    on(PartnerAssetAssignmentRemoteActions.update.success, (state, { response }) => ({
        ...state,
        partnerAssetAssignments: partnerAssetAssignmentEntityAdapter.updateOne({ id: response.id, changes: response }, state.partnerAssetAssignments),
    })),
    on(PartnerAssetAssignmentRemoteActions.delete.success, (state, { response }) => ({
        ...state,
        partnerAssetAssignments: partnerAssetAssignmentEntityAdapter.removeOne(response.partnerAssetAssignmentId, state.partnerAssetAssignments),
        selectedPartnerAssetAssignmentId: state.selectedPartnerAssetAssignmentId === response.partnerAssetAssignmentId ? null : state.selectedPartnerAssetAssignmentId,
    })),
    on(PartnerAssetAssignmentRemoteActions.remove.success, (state, { response }) => ({
        ...state,
        partnerAssetAssignments: partnerAssetAssignmentEntityAdapter.removeOne(response.partnerAssetAssignmentId, state.partnerAssetAssignments),
        selectedPartnerAssetAssignmentId: state.selectedPartnerAssetAssignmentId === response.partnerAssetAssignmentId ? null : state.selectedPartnerAssetAssignmentId,
    }))
)
