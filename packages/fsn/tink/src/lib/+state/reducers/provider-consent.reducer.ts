import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { Actions } from '../actions'
import {
    BaseRemoteFeatureState,
    Nullable,
    RemotePaginationState,
    decrementRemotePaginationStateTotalConditionally,
    initialBaseRemoteFeatureState,
    remoteFailureState,
    remoteRequestState,
    remoteStateUpdateFailure,
    remoteStateUpdateRequest,
    remoteStateUpdateSuccess,
    remoteSuccessState,
} from '@zwp/platform.common'

export interface ProviderConsentFeatureState extends BaseRemoteFeatureState {
    providerConsents: EntityState<Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse>
    selectedProviderConsentId: Nullable<string>
    providerConsentsRemotePagination: RemotePaginationState<Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse>
    filters: Model.Filters.ProviderConsentFilters
}

export const providerConsentEntityAdapter: EntityAdapter<Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse> =
    createEntityAdapter<Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse>()

export const initialProviderConsentFeatureState: ProviderConsentFeatureState = {
    ...initialBaseRemoteFeatureState,
    providerConsents: providerConsentEntityAdapter.getInitialState(),
    selectedProviderConsentId: null,
    providerConsentsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'dbCreatedAt',
        total: 0,
    },
    filters: Model.Filters.initialProviderConsentFilters,
}

export const providerConsentReducer = createReducer(
    initialProviderConsentFeatureState,
    on(Actions.ProviderConsentLocalActions.resetProviderConsentState, () => initialProviderConsentFeatureState),
    on(Actions.ProviderConsentLocalActions.initialiseProviderConsentState, () => initialProviderConsentFeatureState),
    on(Actions.ProviderConsentLocalActions.updateProviderConsentFilters, (state, { filters }) => ({
        ...state,
        filters: { ...state.filters, ...filters },
    })),
    on(Actions.ProviderConsentLocalActions.resetProviderConsentFilters, (state) => ({
        ...state,
        filters: Model.Filters.initialProviderConsentFilters,
    })),
    on(Actions.ProviderConsentLocalActions.selectProviderConsent, (state, { providerConsentId }) => ({
        ...state,
        selectedProviderConsentId: providerConsentId,
    })),
    on(Actions.ProviderConsentLocalActions.deselectProviderConsent, (state) => ({
        ...state,
        selectedProviderConsentId: null,
    })),
    on(Actions.ProviderConsentLocalActions.resetPagination, (state) => ({
        ...state,
        providerConsentsRemotePagination: { ...state.providerConsentsRemotePagination, offset: 0 },
    })),
    on(remoteStateUpdateRequest(Actions.ProviderConsentRemoteActions.identifiers), (state) =>
        remoteRequestState(state)
    ),
    on(remoteStateUpdateSuccess(Actions.ProviderConsentRemoteActions.identifiers), (state) =>
        remoteSuccessState(state)
    ),
    on(remoteStateUpdateFailure(Actions.ProviderConsentRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),
    on(Actions.ProviderConsentRemoteActions.getProviderConsent.success, (state, { response }) => ({
        ...state,
        providerConsents: providerConsentEntityAdapter.setOne(response, state.providerConsents),
        selectedProviderConsentId: response.id,
    })),
    on(Actions.ProviderConsentRemoteActions.listProviderConsents.request, (state, { pagination }) => ({
        ...state,
        providerConsentsRemotePagination: {
            ...state.providerConsentsRemotePagination,
            ...pagination,
        },
    })),
    on(Actions.ProviderConsentRemoteActions.listProviderConsents.success, (state, { response }) => ({
        ...state,
        providerConsents: providerConsentEntityAdapter.setMany(response.results, state.providerConsents),
        providerConsentsRemotePagination: {
            ...state.providerConsentsRemotePagination,
            total: response.total,
        },
    })),
    on(Actions.ProviderConsentRemoteActions.deleteProviderConsent.success, (state, { providerConsentId }) => ({
        ...state,
        providerConsentsRemotePagination: decrementRemotePaginationStateTotalConditionally(state, {
            entityStateKey: 'providerConsents',
            remotePaginationStateKey: 'providerConsentsRemotePagination',
            ids: [providerConsentId],
        }),
        providerConsents: providerConsentEntityAdapter.removeOne(providerConsentId, state.providerConsents),
        selectedProviderConsentId:
            state.selectedProviderConsentId === providerConsentId ? null : state.selectedProviderConsentId,
    })),
    on(Actions.ProviderConsentRemoteActions.extendProviderConsent.success, (state, { response }) => ({
        ...state,
        providerConsents: providerConsentEntityAdapter.setOne(response, state.providerConsents),
        selectedProviderConsentId: response.id,
    }))
)
