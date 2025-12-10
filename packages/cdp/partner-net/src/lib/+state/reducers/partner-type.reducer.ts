import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { PartnerTypeLocalActions, PartnerTypeRemoteActions } from '../actions'
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

export interface PartnerTypeFeatureState extends BaseRemoteFeatureState {
    partnerTypes: EntityState<Model.PartnerTypeResponse>
    selectedPartnerTypeId: Nullable<string>
    partnerTypesRemotePagination: RemotePaginationState<Model.PartnerTypeResponse>
    filters: Model.PartnerTypeFilters
}

export const partnerTypeEntityAdapter: EntityAdapter<Model.PartnerTypeResponse> = createEntityAdapter<Model.PartnerTypeResponse>()

export const initialPartnerTypeFeatureState: PartnerTypeFeatureState = {
    ...initialBaseRemoteFeatureState,
    partnerTypes: partnerTypeEntityAdapter.getInitialState(),
    selectedPartnerTypeId: null,
    partnerTypesRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'dbCreatedAt',
        total: 0,
    },
    filters: Model.initialPartnerTypeFilters,
}

export const partnerTypeReducer = createReducer(
    initialPartnerTypeFeatureState,
    on(PartnerTypeLocalActions.resetPartnerTypeState, () => initialPartnerTypeFeatureState),
    on(PartnerTypeLocalActions.initialisePartnerTypeState, () => initialPartnerTypeFeatureState),
    on(PartnerTypeLocalActions.updatePartnerTypeFilters, (state, { filters }) => ({
        ...state,
        filters: { ...state.filters, ...filters },
    })),
    on(PartnerTypeLocalActions.resetPartnerTypeFilters, (state) => ({ ...state, filters: Model.initialPartnerTypeFilters })),
    on(PartnerTypeLocalActions.selectPartnerType, (state, { partnerTypeId }) => ({ ...state, selectedPartnerTypeId: partnerTypeId })),
    on(PartnerTypeLocalActions.deselectPartnerType, (state) => ({ ...state, selectedPartnerTypeId: null })),
    on(PartnerTypeLocalActions.resetPagination, (state) => ({
        ...state,
        partnerTypesRemotePagination: { ...state.partnerTypesRemotePagination, offset: 0 },
    })),
    on(remoteStateUpdateRequest(PartnerTypeRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(PartnerTypeRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(PartnerTypeRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),
    on(PartnerTypeRemoteActions.create.success, (state, { response }) => ({
        ...state,
        partnerTypes: partnerTypeEntityAdapter.setOne(response, state.partnerTypes),
    })),
    on(PartnerTypeRemoteActions.get.success, (state, { response }) => ({
        ...state,
        partnerTypes: partnerTypeEntityAdapter.setOne(response, state.partnerTypes),
        selectedPartnerTypeId: response.id,
    })),
    on(PartnerTypeRemoteActions.list.request, (state, { pagination }) => ({
        ...state,
        partnerTypesRemotePagination: { ...state.partnerTypesRemotePagination, ...pagination },
    })),
    on(PartnerTypeRemoteActions.list.success, (state, { response }) => ({
        ...state,
        partnerTypes: partnerTypeEntityAdapter.setMany(response.results, state.partnerTypes),
        partnerTypesRemotePagination: {
            ...state.partnerTypesRemotePagination,
            total: response.total,
        },
    })),
    on(PartnerTypeRemoteActions.update.success, (state, { response }) => ({
        ...state,
        partnerTypes: partnerTypeEntityAdapter.updateOne({ id: response.id, changes: response }, state.partnerTypes),
    })),
    on(PartnerTypeRemoteActions.delete.success, (state, { response }) => ({
        ...state,
        partnerTypes: partnerTypeEntityAdapter.removeOne(response.partnerTypeId, state.partnerTypes),
        selectedPartnerTypeId: state.selectedPartnerTypeId === response.partnerTypeId ? null : state.selectedPartnerTypeId,
    }))
)
