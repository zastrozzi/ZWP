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

const selectCredentialState = createFeatureSelector<Reducers.CredentialFeatureState>(
    createNamespacedFeatureKey(Identifiers.FSN_TINK_ACTION_IDENTIFIER, Identifiers.CREDENTIAL_STATE_FEATURE_KEY)
)

const selectCredentialFilters = createSelector(selectCredentialState, (state) => state.filters)
const selectCredentialRemotePagination = createSelector(
    selectCredentialState,
    (state) => state.credentialsRemotePagination
)
const selectCredentialRemoteState = createSelector(selectCredentialState, selectRemoteState)

const selectSelectedCredentialId = createSelector(selectCredentialState, (state) => state.selectedCredentialId)

const credentialEntitySelectors = Reducers.credentialEntityAdapter.getSelectors()
const selectCredentialEntityState = createSelector(selectCredentialState, (state) => state.credentials)
const selectCredentialIds = createSelector(selectCredentialEntityState, credentialEntitySelectors.selectIds)
const selectCredentialEntities = createSelector(selectCredentialEntityState, credentialEntitySelectors.selectEntities)
const selectAllCredentials = createSelector(selectCredentialEntityState, credentialEntitySelectors.selectAll)
const selectCredentialTotal = createSelector(selectCredentialEntityState, credentialEntitySelectors.selectTotal)
const selectCredentialById = (id: string) => createSelector(selectCredentialEntities, (entities) => entities[id])

const selectedCredential = createSelector(
    selectCredentialEntities,
    selectSelectedCredentialId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectFilteredCredentials = createSelector(
    selectAllCredentials,
    selectCredentialFilters,
    (credentials, filters) => selectFilteredElements(credentials, filters, Model.Filters.credentialFilterEntityMap)
)

const selectPaginatedCredentials = createSelector(
    selectAllCredentials,
    selectCredentialRemotePagination,
    (credentials, pagination) => selectPaginatedElements(credentials, pagination)
)

const selectPaginatedFilteredCredentials = createSelector(
    selectFilteredCredentials,
    selectCredentialRemotePagination,
    (credentials, pagination) => selectPaginatedElements(credentials, pagination)
)

export const CredentialSelectors = {
    selectCredentialState,
    selectCredentialFilters,
    selectCredentialRemotePagination,
    selectCredentialRemoteState,

    selectSelectedCredentialId,

    credentialEntitySelectors,
    selectCredentialEntityState,
    selectCredentialIds,
    selectCredentialEntities,
    selectAllCredentials,
    selectCredentialTotal,
    selectCredentialById,
    selectedCredential,

    selectFilteredCredentials,
    selectPaginatedCredentials,
    selectPaginatedFilteredCredentials,
}
