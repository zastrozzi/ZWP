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

export interface ProviderFeatureState extends BaseRemoteFeatureState {
    providers: EntityState<Model.ServerAPIModel.Provider.TinkV1ProviderResponse>
    selectedProviderId: Nullable<string>
    providersRemotePagination: RemotePaginationState<Model.ServerAPIModel.Provider.TinkV1ProviderResponse>
    filters: Model.Filters.ProviderFilters
}

export const providerEntityAdapter: EntityAdapter<Model.ServerAPIModel.Provider.TinkV1ProviderResponse> =
    createEntityAdapter<Model.ServerAPIModel.Provider.TinkV1ProviderResponse>()

export const initialProviderFeatureState: ProviderFeatureState = {
    ...initialBaseRemoteFeatureState,
    providers: providerEntityAdapter.getInitialState(),
    selectedProviderId: null,
    providersRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'dbCreatedAt',
        total: 0,
    },
    filters: Model.Filters.initialProviderFilters,
}

export const providerReducer = createReducer(
    initialProviderFeatureState,
    on(Actions.ProviderLocalActions.resetProviderState, () => initialProviderFeatureState),
    on(Actions.ProviderLocalActions.initialiseProviderState, () => initialProviderFeatureState),
    on(Actions.ProviderLocalActions.updateProviderFilters, (state, { filters }) => ({
        ...state,
        filters: { ...state.filters, ...filters },
    })),
    on(Actions.ProviderLocalActions.resetProviderFilters, (state) => ({
        ...state,
        filters: Model.Filters.initialProviderFilters,
    })),
    on(Actions.ProviderLocalActions.selectProvider, (state, { providerId }) => ({
        ...state,
        selectedProviderId: providerId,
    })),
    on(Actions.ProviderLocalActions.deselectProvider, (state) => ({ ...state, selectedProviderId: null })),
    on(Actions.ProviderLocalActions.resetPagination, (state) => ({
        ...state,
        providersRemotePagination: { ...state.providersRemotePagination, offset: 0 },
    })),
    on(remoteStateUpdateRequest(Actions.ProviderRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(Actions.ProviderRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(Actions.ProviderRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),
    on(Actions.ProviderRemoteActions.getProvider.success, (state, { response }) => ({
        ...state,
        providers: providerEntityAdapter.setOne(response, state.providers),
    })),
    on(Actions.ProviderRemoteActions.listProviders.request, (state, { pagination }) => ({
        ...state,
        providersRemotePagination: { ...state.providersRemotePagination, ...pagination },
    })),
    on(Actions.ProviderRemoteActions.listProviders.success, (state, { response }) => ({
        ...state,
        providers: providerEntityAdapter.setMany(response.results, state.providers),
        providersRemotePagination: {
            ...state.providersRemotePagination,
            total: response.total,
        },
    })),
    on(Actions.ProviderRemoteActions.deleteProvider.success, (state, { providerId }) => ({
        ...state,
        providers: providerEntityAdapter.removeOne(providerId, state.providers),
        providersRemotePagination: decrementRemotePaginationStateTotalConditionally(state, {
            entityStateKey: 'providers',
            remotePaginationStateKey: 'providersRemotePagination',
            ids: [providerId],
        }),
        selectedProviderId: state.selectedProviderId === providerId ? null : state.selectedProviderId,
    }))
)
