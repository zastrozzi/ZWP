import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    ResetRemoteFilters,
    UpdateRemoteFilters,
    createActionType,
    createRemoteActionCRUDMap,
    createRemoteActionMap,
    createRemoteActionGroup
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const ACCOUNT_ACTION_IDENTIFIERS = [
    Identifiers.REWARDS_NETWORK_AFFILIATE_WINDOW_ACTION_IDENTIFIER, 
    Identifiers.ACCOUNT_STATE_FEATURE_KEY
]

const updateAccountFilters = createAction(
    createActionType(ACCOUNT_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.CategoryFilters>>()   
)

const listAccounts = createRemoteActionGroup<
    { pagination: Nullable<Partial<PaginatedQueryParams<Model.AccountResponse>>> },
    PaginatedResponse<Model.AccountResponse>
>('List Accounts', ...ACCOUNT_ACTION_IDENTIFIERS)

const getAccount = createRemoteActionGroup<
    { accountId: string },
    Model.AccountResponse
>('Get Account', ...ACCOUNT_ACTION_IDENTIFIERS)

const deleteAccount = createRemoteActionGroup<
    {accountId: string},
    {accountId: string}
>('Delete Account', ...ACCOUNT_ACTION_IDENTIFIERS)

export const AccountLocalActions = {}

export const AccountRemoteActions = createRemoteActionMap(
    ACCOUNT_ACTION_IDENTIFIERS,
    {
        list: listAccounts,
        get: getAccount,
        delete: deleteAccount,
    }
)