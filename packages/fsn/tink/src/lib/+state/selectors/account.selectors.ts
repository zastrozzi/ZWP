import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import {
    createNamespacedFeatureKey,
    selectFilteredElements,
    selectPaginatedElements,
    selectRemoteState,
} from '@zwp/platform.common'
import { Model } from '../../model'

const selectAccountState = createFeatureSelector<Reducers.AccountFeatureState>(
    createNamespacedFeatureKey(Identifiers.FSN_TINK_ACTION_IDENTIFIER, Identifiers.ACCOUNT_STATE_FEATURE_KEY)
)

const selectAccountFilters = createSelector(selectAccountState, (state) => state.filters)
const selectAccountRemotePagination = createSelector(selectAccountState, (state) => state.accountsRemotePagination)
const selectAccountRemoteState = createSelector(selectAccountState, selectRemoteState)

const selectSelectedAccountId = createSelector(selectAccountState, (state) => state.selectedAccountId)

const accountEntitySelectors = Reducers.accountEntityAdapter.getSelectors()
const selectAccountEntityState = createSelector(selectAccountState, (state) => state.accounts)
const selectAccountIds = createSelector(selectAccountEntityState, accountEntitySelectors.selectIds)
const selectAccountEntities = createSelector(selectAccountEntityState, accountEntitySelectors.selectEntities)
const selectAllAccounts = createSelector(selectAccountEntityState, accountEntitySelectors.selectAll)
const selectAccountTotal = createSelector(selectAccountEntityState, accountEntitySelectors.selectTotal)
const selectAccountById = (id: string) => createSelector(selectAccountEntities, (entities) => entities[id])

const selectedAccount = createSelector(
    selectAccountEntities,
    selectSelectedAccountId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectFilteredAccounts = createSelector(selectAllAccounts, selectAccountFilters, (accounts, filters) =>
    selectFilteredElements(accounts, filters, Model.Filters.accountFilterEntityMap)
)

const selectPaginatedAccounts = createSelector(
    selectAllAccounts,
    selectAccountRemotePagination,
    (accounts, pagination) => selectPaginatedElements(accounts, pagination)
)

const selectPaginatedFilteredAccounts = createSelector(
    selectFilteredAccounts,
    selectAccountRemotePagination,
    (accounts, pagination) => selectPaginatedElements(accounts, pagination)
)

export const AccountSelectors = {
    selectAccountState,
    selectAccountFilters,
    selectAccountRemotePagination,
    selectAccountRemoteState,

    selectSelectedAccountId,

    accountEntitySelectors,
    selectAccountEntityState,
    selectAccountIds,
    selectAccountEntities,
    selectAllAccounts,
    selectAccountTotal,
    selectAccountById,
    selectedAccount,

    selectFilteredAccounts,
    selectPaginatedAccounts,
    selectPaginatedFilteredAccounts,
}
