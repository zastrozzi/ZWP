import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { PartnerTypeAssignmentLocalActions, PartnerTypeAssignmentRemoteActions } from '../actions'
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

export interface PartnerTypeAssignmentFeatureState extends BaseRemoteFeatureState {
    partnerTypeAssignments: EntityState<Model.PartnerTypeAssignmentResponse>
    selectedPartnerTypeAssignmentId: Nullable<string>
    partnerTypeAssignmentsRemotePagination: RemotePaginationState<Model.PartnerTypeAssignmentResponse>
    filters: Model.PartnerTypeAssignmentFilters
}

export const partnerTypeAssignmentEntityAdapter: EntityAdapter<Model.PartnerTypeAssignmentResponse> = createEntityAdapter<Model.PartnerTypeAssignmentResponse>()

export const initialPartnerTypeAssignmentFeatureState: PartnerTypeAssignmentFeatureState = {
    ...initialBaseRemoteFeatureState,
    partnerTypeAssignments: partnerTypeAssignmentEntityAdapter.getInitialState(),
    selectedPartnerTypeAssignmentId: null,
    partnerTypeAssignmentsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'dbCreatedAt',
        total: 0,
    },
    filters: Model.initialPartnerTypeAssignmentFilters,
}

export const partnerTypeAssignmentReducer = createReducer(
    initialPartnerTypeAssignmentFeatureState,
    on(PartnerTypeAssignmentLocalActions.resetPartnerTypeAssignmentState, () => initialPartnerTypeAssignmentFeatureState),
    on(PartnerTypeAssignmentLocalActions.initialisePartnerTypeAssignmentState, () => initialPartnerTypeAssignmentFeatureState),
    on(PartnerTypeAssignmentLocalActions.updatePartnerTypeAssignmentFilters, (state, { filters }) => ({
        ...state,
        filters: { ...state.filters, ...filters },
    })),
    on(PartnerTypeAssignmentLocalActions.resetPartnerTypeAssignmentFilters, (state) => ({ ...state, filters: Model.initialPartnerTypeAssignmentFilters })),
    on(PartnerTypeAssignmentLocalActions.selectPartnerTypeAssignment, (state, { partnerTypeAssignmentId }) => ({ ...state, selectedPartnerTypeAssignmentId: partnerTypeAssignmentId })),
    on(PartnerTypeAssignmentLocalActions.deselectPartnerTypeAssignment, (state) => ({ ...state, selectedPartnerTypeAssignmentId: null })),
    on(PartnerTypeAssignmentLocalActions.resetPagination, (state) => ({
        ...state,
        partnerTypeAssignmentsRemotePagination: { ...state.partnerTypeAssignmentsRemotePagination, offset: 0 },
    })),
    on(remoteStateUpdateRequest(PartnerTypeAssignmentRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(PartnerTypeAssignmentRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(PartnerTypeAssignmentRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),
    on(PartnerTypeAssignmentRemoteActions.add.success, (state, { response }) => ({
        ...state,
        partnerTypeAssignments: partnerTypeAssignmentEntityAdapter.setOne(response, state.partnerTypeAssignments),
    })),
    on(PartnerTypeAssignmentRemoteActions.get.success, (state, { response }) => ({
        ...state,
        partnerTypeAssignments: partnerTypeAssignmentEntityAdapter.setOne(response, state.partnerTypeAssignments),
        selectedPartnerTypeAssignmentId: response.id,
    })),
    on(PartnerTypeAssignmentRemoteActions.list.request, (state, { pagination }) => ({
        ...state,
        partnerTypeAssignmentsRemotePagination: { ...state.partnerTypeAssignmentsRemotePagination, ...pagination },
    })),
    on(PartnerTypeAssignmentRemoteActions.list.success, (state, { response }) => ({
        ...state,
        partnerTypeAssignments: partnerTypeAssignmentEntityAdapter.setMany(response.results, state.partnerTypeAssignments),
        partnerTypeAssignmentsRemotePagination: {
            ...state.partnerTypeAssignmentsRemotePagination,
            total: response.total,
        },
    })),
    on(PartnerTypeAssignmentRemoteActions.delete.success, (state, { response }) => ({
        ...state,
        partnerTypeAssignments: partnerTypeAssignmentEntityAdapter.removeOne(response.partnerTypeAssignmentId, state.partnerTypeAssignments),
        selectedPartnerTypeAssignmentId: state.selectedPartnerTypeAssignmentId === response.partnerTypeAssignmentId ? null : state.selectedPartnerTypeAssignmentId,
    })),
    on(PartnerTypeAssignmentRemoteActions.remove.success, (state, { response }) => ({
        ...state,
        partnerTypeAssignments: partnerTypeAssignmentEntityAdapter.removeOne(response.partnerTypeAssignmentId, state.partnerTypeAssignments),
        selectedPartnerTypeAssignmentId: state.selectedPartnerTypeAssignmentId === response.partnerTypeAssignmentId ? null : state.selectedPartnerTypeAssignmentId,
    }))
)
