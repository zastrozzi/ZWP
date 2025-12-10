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

const selectAccountConsentState = createFeatureSelector<Reducers.AccountConsentFeatureState>(
    createNamespacedFeatureKey(Identifiers.FSN_TINK_ACTION_IDENTIFIER, Identifiers.ACCOUNT_CONSENT_STATE_FEATURE_KEY)
)

const selectAccountConsentFilters = createSelector(selectAccountConsentState, (state) => state.filters)
const selectAccountConsentRemotePagination = createSelector(
    selectAccountConsentState,
    (state) => state.accountConsentsRemotePagination
)
const selectAccountConsentRemoteState = createSelector(selectAccountConsentState, selectRemoteState)

const selectSelectedAccountConsentId = createSelector(
    selectAccountConsentState,
    (state) => state.selectedAccountConsentId
)

const accountConsentEntitySelectors = Reducers.accountConsentEntityAdapter.getSelectors()
const selectAccountConsentEntityState = createSelector(selectAccountConsentState, (state) => state.accountConsents)
const selectAccountConsentIds = createSelector(selectAccountConsentEntityState, accountConsentEntitySelectors.selectIds)
const selectAccountConsentEntities = createSelector(
    selectAccountConsentEntityState,
    accountConsentEntitySelectors.selectEntities
)
const selectAllAccountConsents = createSelector(
    selectAccountConsentEntityState,
    accountConsentEntitySelectors.selectAll
)
const selectAccountConsentTotal = createSelector(
    selectAccountConsentEntityState,
    accountConsentEntitySelectors.selectTotal
)
const selectAccountConsentById = (id: string) =>
    createSelector(selectAccountConsentEntities, (entities) => entities[id])

const selectedAccountConsent = createSelector(
    selectAccountConsentEntities,
    selectSelectedAccountConsentId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectFilteredAccountConsents = createSelector(
    selectAllAccountConsents,
    selectAccountConsentFilters,
    (accountConsents, filters) =>
        selectFilteredElements(accountConsents, filters, Model.Filters.accountConsentFilterEntityMap)
)

const selectPaginatedAccountConsents = createSelector(
    selectAllAccountConsents,
    selectAccountConsentRemotePagination,
    (accountConsents, pagination) => selectPaginatedElements(accountConsents, pagination)
)

const selectPaginatedFilteredAccountConsents = createSelector(
    selectFilteredAccountConsents,
    selectAccountConsentRemotePagination,
    (accountConsents, pagination) => selectPaginatedElements(accountConsents, pagination)
)

export const AccountConsentSelectors = {
    selectAccountConsentState,
    selectAccountConsentFilters,
    selectAccountConsentRemotePagination,
    selectAccountConsentRemoteState,

    selectSelectedAccountConsentId,

    accountConsentEntitySelectors,
    selectAccountConsentEntityState,
    selectAccountConsentIds,
    selectAccountConsentEntities,
    selectAllAccountConsents,
    selectAccountConsentTotal,
    selectAccountConsentById,
    selectedAccountConsent,

    selectFilteredAccountConsents,
    selectPaginatedAccountConsents,
    selectPaginatedFilteredAccountConsents,
}
