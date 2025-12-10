import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { PartnerLocalActions, PartnerRemoteActions } from '../actions'
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

export interface PartnerFeatureState extends BaseRemoteFeatureState {
    partners: EntityState<Model.PartnerResponse>
    selectedPartnerId: Nullable<string>
    partnersRemotePagination: RemotePaginationState<Model.PartnerResponse>
    filters: Model.PartnerFilters
}

export const partnerEntityAdapter: EntityAdapter<Model.PartnerResponse> = createEntityAdapter<Model.PartnerResponse>()

export const initialPartnerFeatureState: PartnerFeatureState = {
    ...initialBaseRemoteFeatureState,
    partners: partnerEntityAdapter.getInitialState(),
    selectedPartnerId: null,
    partnersRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'dbCreatedAt',
        total: 0,
    },
    filters: Model.initialPartnerFilters,
}

export const partnerReducer = createReducer(
    initialPartnerFeatureState,
    on(PartnerLocalActions.resetPartnerState, () => initialPartnerFeatureState),
    on(PartnerLocalActions.initialisePartnerState, () => initialPartnerFeatureState),
    on(PartnerLocalActions.updatePartnerFilters, (state, { filters }) => ({
        ...state,
        filters: { ...state.filters, ...filters },
    })),
    on(PartnerLocalActions.resetPartnerFilters, (state) => ({ ...state, filters: Model.initialPartnerFilters })),
    on(PartnerLocalActions.selectPartner, (state, { partnerId }) => ({ ...state, selectedPartnerId: partnerId })),
    on(PartnerLocalActions.deselectPartner, (state) => ({ ...state, selectedPartnerId: null })),
    on(PartnerLocalActions.resetPagination, (state) => ({
        ...state,
        partnersRemotePagination: { ...state.partnersRemotePagination, offset: 0 },
    })),
    on(remoteStateUpdateRequest(PartnerRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(PartnerRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(PartnerRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),
    on(PartnerRemoteActions.create.success, (state, { response }) => ({
        ...state,
        partners: partnerEntityAdapter.setOne(response, state.partners),
    })),
    on(PartnerRemoteActions.get.success, (state, { response }) => ({
        ...state,
        partners: partnerEntityAdapter.setOne(response, state.partners),
        selectedPartnerId: response.id,
    })),
    on(PartnerRemoteActions.list.request, (state, { pagination }) => ({
        ...state,
        partnersRemotePagination: { ...state.partnersRemotePagination, ...pagination },
    })),
    on(PartnerRemoteActions.list.success, (state, { response }) => ({
        ...state,
        partners: partnerEntityAdapter.setMany(response.results, state.partners),
        partnersRemotePagination: {
            ...state.partnersRemotePagination,
            total: response.total,
        },
    })),
    on(PartnerRemoteActions.update.success, (state, { response }) => ({
        ...state,
        partners: partnerEntityAdapter.updateOne({ id: response.id, changes: response }, state.partners),
    })),
    on(PartnerRemoteActions.delete.success, (state, { response }) => ({
        ...state,
        partners: partnerEntityAdapter.removeOne(response.partnerId, state.partners),
        selectedPartnerId: state.selectedPartnerId === response.partnerId ? null : state.selectedPartnerId,
    }))
)
