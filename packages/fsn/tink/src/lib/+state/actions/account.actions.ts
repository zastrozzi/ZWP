import { Model } from '../../model'
import {
    DateQueryFilter,
    ZWPISO3166Alpha2,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    ResetRemoteFilters,
    UpdateRemoteFilters,
    createActionType,
    createRemoteActionCRUDMap,
    createRemoteActionGroup,
    createRemoteActionMap,
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const ACCOUNT_ACTION_IDENTIFIERS = [
    Identifiers.FSN_TINK_ACTION_IDENTIFIER,
    Identifiers.ACCOUNT_STATE_FEATURE_KEY,
]

const updateAccountFilters = createAction(
    createActionType(ACCOUNT_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.AccountFilters>>()
)

const resetAccountFilters = createAction(
    createActionType(ACCOUNT_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetAccountState = createAction(
    createActionType(ACCOUNT_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseAccountState = createAction(
    createActionType(ACCOUNT_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectAccount = createAction(
    createActionType(ACCOUNT_ACTION_IDENTIFIERS, 'Select Account'),
    props<{ accountId: string }>()
)

const deselectAccount = createAction(
    createActionType(ACCOUNT_ACTION_IDENTIFIERS, 'Deselect Account')
)

const resetPagination = createAction(
    createActionType(ACCOUNT_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const getAccount = createRemoteActionGroup<
    { accountId: string },
    Model.ServerAPIModel.Account.TinkV2AccountResponse
>('Get Account', ...ACCOUNT_ACTION_IDENTIFIERS)

const listAccounts = createRemoteActionGroup<
    {
        tinkUserId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Account.TinkV2AccountResponse>>>
    },
    PaginatedResponse<Model.ServerAPIModel.Account.TinkV2AccountResponse>
>('List Accounts', ...ACCOUNT_ACTION_IDENTIFIERS)

const deleteAccount = createRemoteActionGroup<
    { accountId: string },
    { accountId: string }
>('Delete Account', ...ACCOUNT_ACTION_IDENTIFIERS)

const refreshAccounts = createRemoteActionGroup<
    { 
        tinkUserId: string
    },
    {
        tinkUserId: string
    }
>('Refresh Accounts', ...ACCOUNT_ACTION_IDENTIFIERS)

const refreshAccount = createRemoteActionGroup<
    { 
        accountId: string
    },
    {
        accountId: string
    }
>('Refresh Account', ...ACCOUNT_ACTION_IDENTIFIERS)

const refreshAccountBalance = createRemoteActionGroup<
    { 
        accountId: string
    },
    {
        accountId: string
    }
>('Refresh Account Balance', ...ACCOUNT_ACTION_IDENTIFIERS)

export const AccountLocalActions = {
    updateAccountFilters,
    resetAccountFilters,
    resetAccountState,
    initialiseAccountState,
    selectAccount,
    deselectAccount,
    resetPagination
}

export const AccountRemoteActions = createRemoteActionMap(
    ACCOUNT_ACTION_IDENTIFIERS,
    {
        getAccount,
        listAccounts,
        deleteAccount,
        refreshAccounts,
        refreshAccount,
        refreshAccountBalance
    }
)