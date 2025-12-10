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

export interface AccountFeatureState extends BaseRemoteFeatureState {
    accounts: EntityState<Model.ServerAPIModel.Account.TinkV2AccountResponse>
    selectedAccountId: Nullable<string>
    accountsRemotePagination: RemotePaginationState<Model.ServerAPIModel.Account.TinkV2AccountResponse>
    filters: Model.Filters.AccountFilters
}

export const accountEntityAdapter: EntityAdapter<Model.ServerAPIModel.Account.TinkV2AccountResponse> =
    createEntityAdapter<Model.ServerAPIModel.Account.TinkV2AccountResponse>()

export const initialAccountFeatureState: AccountFeatureState = {
    ...initialBaseRemoteFeatureState,
    accounts: accountEntityAdapter.getInitialState(),
    selectedAccountId: null,
    accountsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'dbCreatedAt',
        total: 0,
    },
    filters: Model.Filters.initialAccountFilters,
}

export const accountReducer = createReducer(
    initialAccountFeatureState,
    on(Actions.AccountLocalActions.resetAccountState, () => initialAccountFeatureState),
    on(Actions.AccountLocalActions.initialiseAccountState, () => initialAccountFeatureState),
    on(Actions.AccountLocalActions.updateAccountFilters, (state, { filters }) => ({
        ...state,
        filters: { ...state.filters, ...filters },
    })),
    on(Actions.AccountLocalActions.resetAccountFilters, (state) => ({
        ...state,
        filters: Model.Filters.initialAccountFilters,
    })),
    on(Actions.AccountLocalActions.selectAccount, (state, { accountId }) => ({
        ...state,
        selectedAccountId: accountId,
    })),
    on(Actions.AccountLocalActions.deselectAccount, (state) => ({ ...state, selectedAccountId: null })),
    on(Actions.AccountLocalActions.resetPagination, (state) => ({
        ...state,
        accountsRemotePagination: { ...state.accountsRemotePagination, offset: 0 },
    })),
    on(remoteStateUpdateRequest(Actions.AccountRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(Actions.AccountRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(Actions.AccountRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),
    on(Actions.AccountRemoteActions.getAccount.success, (state, { response }) => ({
        ...state,
        accounts: accountEntityAdapter.setOne(response, state.accounts),
    })),
    on(Actions.AccountRemoteActions.listAccounts.request, (state, { pagination }) => ({
        ...state,
        accountsRemotePagination: { ...state.accountsRemotePagination, ...pagination },
    })),
    on(Actions.AccountRemoteActions.listAccounts.success, (state, { response }) => ({
        ...state,
        accounts: accountEntityAdapter.setMany(response.results, state.accounts),
        accountsRemotePagination: {
            ...state.accountsRemotePagination,
            total: response.total,
        },
    })),
    on(Actions.AccountRemoteActions.deleteAccount.success, (state, { accountId }) => ({
        ...state,
        accounts: accountEntityAdapter.removeOne(accountId, state.accounts),
        accountsRemotePagination: decrementRemotePaginationStateTotalConditionally(state, {
            entityStateKey: 'accounts',
            remotePaginationStateKey: 'accountsRemotePagination',
            ids: [accountId],
        }),
        selectedAccountId: state.selectedAccountId === accountId ? null : state.selectedAccountId,
    }))
)
