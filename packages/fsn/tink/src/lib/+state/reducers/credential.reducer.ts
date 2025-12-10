import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { Actions } from '../actions'
import {
    BaseRemoteFeatureState,
    Nullable,
    RemotePaginationState,
    decrementRemotePaginationStateTotalConditionally,
    incrementRemotePaginationStateTotal,
    incrementRemotePaginationStateTotalConditionally,
    initialBaseRemoteFeatureState,
    remoteFailureState,
    remoteRequestState,
    remoteStateUpdateFailure,
    remoteStateUpdateRequest,
    remoteStateUpdateSuccess,
    remoteSuccessState,
} from '@zwp/platform.common'

export interface CredentialFeatureState extends BaseRemoteFeatureState {
    credentials: EntityState<Model.ServerAPIModel.Credentials.TinkV1CredentialsResponse>
    selectedCredentialId: Nullable<string>
    credentialsRemotePagination: RemotePaginationState<Model.ServerAPIModel.Credentials.TinkV1CredentialsResponse>
    filters: Model.Filters.CredentialFilters
}

export const credentialEntityAdapter: EntityAdapter<Model.ServerAPIModel.Credentials.TinkV1CredentialsResponse> =
    createEntityAdapter<Model.ServerAPIModel.Credentials.TinkV1CredentialsResponse>()

export const initialCredentialFeatureState: CredentialFeatureState = {
    ...initialBaseRemoteFeatureState,
    credentials: credentialEntityAdapter.getInitialState(),
    selectedCredentialId: null,
    credentialsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'dbCreatedAt',
        total: 0,
    },
    filters: Model.Filters.initialCredentialFilters,
}

export const credentialReducer = createReducer(
    initialCredentialFeatureState,
    on(Actions.CredentialLocalActions.resetCredentialState, () => initialCredentialFeatureState),
    on(Actions.CredentialLocalActions.initialiseCredentialState, () => initialCredentialFeatureState),
    on(Actions.CredentialLocalActions.updateCredentialFilters, (state, { filters }) => ({
        ...state,
        filters: { ...state.filters, ...filters },
    })),
    on(Actions.CredentialLocalActions.resetCredentialFilters, (state) => ({
        ...state,
        filters: Model.Filters.initialCredentialFilters,
    })),
    on(Actions.CredentialLocalActions.selectCredential, (state, { credentialId }) => ({
        ...state,
        selectedCredentialId: credentialId,
    })),
    on(Actions.CredentialLocalActions.deselectCredential, (state) => ({ ...state, selectedCredentialId: null })),
    on(Actions.CredentialLocalActions.resetPagination, (state) => ({
        ...state,
        credentialsRemotePagination: { ...state.credentialsRemotePagination, offset: 0 },
    })),
    on(remoteStateUpdateRequest(Actions.CredentialRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(Actions.CredentialRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(Actions.CredentialRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),
    on(Actions.CredentialRemoteActions.getCredential.success, (state, { response }) => ({
        ...state,
        credentials: credentialEntityAdapter.setOne(response, state.credentials),
    })),
    on(Actions.CredentialRemoteActions.listCredentials.request, (state, { pagination }) => ({
        ...state,
        credentialsRemotePagination: { ...state.credentialsRemotePagination, ...pagination },
    })),
    on(Actions.CredentialRemoteActions.listCredentials.success, (state, { response }) => ({
        ...state,
        credentials: credentialEntityAdapter.setMany(response.results, state.credentials),
        credentialsRemotePagination: {
            ...state.credentialsRemotePagination,
            total: response.total,
        },
    })),
    on(Actions.CredentialRemoteActions.deleteCredential.success, (state, { credentialId }) => ({
        ...state,
        credentials: credentialEntityAdapter.removeOne(credentialId, state.credentials),
        credentialsRemotePagination: decrementRemotePaginationStateTotalConditionally(state, {
            entityStateKey: 'credentials',
            remotePaginationStateKey: 'credentialsRemotePagination',
            ids: [credentialId],
        }),
        selectedCredentialId: state.selectedCredentialId === credentialId ? null : state.selectedCredentialId,
    }))
)
