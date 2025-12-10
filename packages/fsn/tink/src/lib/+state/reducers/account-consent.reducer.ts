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

export interface AccountConsentFeatureState extends BaseRemoteFeatureState {
    accountConsents: EntityState<Model.ServerAPIModel.Consent.TinkV1AccountConsentResponse>
    selectedAccountConsentId: Nullable<string>
    accountConsentsRemotePagination: RemotePaginationState<Model.ServerAPIModel.Consent.TinkV1AccountConsentResponse>
    filters: Model.Filters.AccountConsentFilters
}

export const accountConsentEntityAdapter: EntityAdapter<Model.ServerAPIModel.Consent.TinkV1AccountConsentResponse> =
    createEntityAdapter<Model.ServerAPIModel.Consent.TinkV1AccountConsentResponse>()

export const initialAccountConsentFeatureState: AccountConsentFeatureState = {
    ...initialBaseRemoteFeatureState,
    accountConsents: accountConsentEntityAdapter.getInitialState(),
    selectedAccountConsentId: null,
    accountConsentsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'dbCreatedAt',
        total: 0,
    },
    filters: Model.Filters.initialAccountConsentFilters,
}

export const accountConsentReducer = createReducer(
    initialAccountConsentFeatureState,
    on(Actions.AccountConsentLocalActions.resetAccountConsentState, () => initialAccountConsentFeatureState),
    on(Actions.AccountConsentLocalActions.initialiseAccountConsentState, () => initialAccountConsentFeatureState),
    on(Actions.AccountConsentLocalActions.updateAccountConsentFilters, (state, { filters }) => ({
        ...state,
        filters: { ...state.filters, ...filters },
    })),
    on(Actions.AccountConsentLocalActions.resetAccountConsentFilters, (state) => ({
        ...state,
        filters: Model.Filters.initialAccountConsentFilters,
    })),
    on(Actions.AccountConsentLocalActions.selectAccountConsent, (state, { accountConsentId }) => ({
        ...state,
        selectedAccountConsentId: accountConsentId,
    })),
    on(Actions.AccountConsentLocalActions.deselectAccountConsent, (state) => ({
        ...state,
        selectedAccountConsentId: null,
    })),
    on(Actions.AccountConsentLocalActions.resetPagination, (state) => ({
        ...state,
        accountConsentsRemotePagination: { ...state.accountConsentsRemotePagination, offset: 0 },
    })),
    on(remoteStateUpdateRequest(Actions.AccountConsentRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(Actions.AccountConsentRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(Actions.AccountConsentRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),
    on(Actions.AccountConsentRemoteActions.getAccountConsent.success, (state, { response }) => ({
        ...state,
        accountConsents: accountConsentEntityAdapter.setOne(response, state.accountConsents),
        selectedAccountConsentId: response.id,
    })),
    on(Actions.AccountConsentRemoteActions.listAccountConsents.request, (state, { pagination }) => ({
        ...state,
        accountConsentsRemotePagination: {
            ...state.accountConsentsRemotePagination,
            ...pagination,
        },
    })),
    on(Actions.AccountConsentRemoteActions.listAccountConsents.success, (state, { response }) => ({
        ...state,
        accountConsents: accountConsentEntityAdapter.setMany(response.results, state.accountConsents),
        accountConsentsRemotePagination: {
            ...state.accountConsentsRemotePagination,
            total: response.total,
        },
    })),
    on(Actions.AccountConsentRemoteActions.deleteAccountConsent.success, (state, { accountConsentId }) => ({
        ...state,
        accountConsentsRemotePagination: decrementRemotePaginationStateTotalConditionally(state, {
            entityStateKey: 'accountConsents',
            remotePaginationStateKey: 'accountConsentsRemotePagination',
            ids: [accountConsentId],
        }),
        accountConsents: accountConsentEntityAdapter.removeOne(accountConsentId, state.accountConsents),
        selectedAccountConsentId:
            state.selectedAccountConsentId === accountConsentId ? null : state.selectedAccountConsentId,
    }))
)
