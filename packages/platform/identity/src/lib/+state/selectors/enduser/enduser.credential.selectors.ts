import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../../identifiers'
import { Reducers } from '../../reducers'
import { createNamespacedFeatureKey, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { Model } from '../../../model'
import { EnduserSelectors } from './enduser.selectors'

const selectEnduserCredentialState = createFeatureSelector<Reducers.EnduserCredentialFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
        Identifiers.ENDUSER_CREDENTIAL_STATE_FEATURE_KEY
    )
)
const selectEnduserCredentialEntityState = createSelector(selectEnduserCredentialState, (state) => state.enduserCredentials)
const selectEnduserCredentialFilters = createSelector(selectEnduserCredentialState, (state) => state.filters)
const selectEnduserCredentialRemotePagination = createSelector(selectEnduserCredentialState, (state) => state.enduserCredentialsRemotePagination)
const selectEnduserCredentialRemoteState = createSelector(selectEnduserCredentialState, selectRemoteState)
const selectSelectedEnduserCredentialId = createSelector(selectEnduserCredentialState, (state) => state.selectedEnduserCredentialId)
const enduserCredentialEntitySelectors = Reducers.enduserCredentialEntityAdapter.getSelectors()

const selectEnduserCredentialIds = createSelector(selectEnduserCredentialEntityState, enduserCredentialEntitySelectors.selectIds)
const selectEnduserCredentialEntities = createSelector(selectEnduserCredentialEntityState, enduserCredentialEntitySelectors.selectEntities)
const selectAllEnduserCredentials = createSelector(selectEnduserCredentialEntityState, enduserCredentialEntitySelectors.selectAll)
const selectEnduserCredentialTotal = createSelector(selectEnduserCredentialEntityState, enduserCredentialEntitySelectors.selectTotal)
const selectEnduserCredentialById = (id: string) => createSelector(selectEnduserCredentialEntities, (entities) => entities[id])

const selectFilteredEnduserCredentials = createSelector(
    selectAllEnduserCredentials,
    selectEnduserCredentialFilters,
    (credentials, filters) => selectFilteredElements(credentials, filters, Model.Filters.enduserCredentialFilterEntityMap)
)

const selectPaginatedEnduserCredentials = createSelector(
    selectAllEnduserCredentials,
    selectEnduserCredentialRemotePagination,
    (credentials, pagination) => selectPaginatedElements(credentials, pagination)
)

const selectPaginatedFilteredEnduserCredentials = createSelector(
    selectFilteredEnduserCredentials,
    selectEnduserCredentialRemotePagination,
    (credentials, pagination) => selectPaginatedElements(credentials, pagination)
)

const selectEnduserCredentialsForSelectedEnduser = createSelector(
    EnduserSelectors.selectSelectedEnduserId,
    selectAllEnduserCredentials,
    (selectedEnduserId, credentials) => credentials.filter(credential => credential.enduserId === selectedEnduserId)
)

const selectEnduserCredentialsForEnduser = (enduserId: string) => createSelector(
    selectAllEnduserCredentials,
    (credentials) => credentials.filter(credential => credential.enduserId === enduserId)
)

const selectFilteredEnduserCredentialsForSelectedEnduser = createSelector(
    selectEnduserCredentialsForSelectedEnduser,
    selectEnduserCredentialFilters,
    (credentials, filters) => selectFilteredElements(credentials, filters, Model.Filters.enduserCredentialFilterEntityMap)
)

const selectPaginatedEnduserCredentialsForSelectedEnduser = createSelector(
    selectEnduserCredentialsForSelectedEnduser,
    selectEnduserCredentialRemotePagination,
    (credentials, pagination) => selectPaginatedElements(credentials, pagination)
)

const selectPaginatedFilteredEnduserCredentialsForSelectedEnduser = createSelector(
    selectFilteredEnduserCredentialsForSelectedEnduser,
    selectEnduserCredentialRemotePagination,
    (credentials, pagination) => selectPaginatedElements(credentials, pagination)
)

const selectedEnduserCredential = createSelector(
    selectEnduserCredentialEntities,
    selectSelectedEnduserCredentialId,
    (entities, selectedId) => selectedId && entities[selectedId]
)

export const EnduserCredentialSelectors = {
    selectEnduserCredentialState,
    selectEnduserCredentialEntityState,
    selectEnduserCredentialFilters,
    selectEnduserCredentialRemotePagination,
    selectEnduserCredentialRemoteState,
    selectSelectedEnduserCredentialId,
    enduserCredentialEntitySelectors,
    selectEnduserCredentialIds,
    selectEnduserCredentialEntities,
    selectAllEnduserCredentials,
    selectEnduserCredentialTotal,
    selectEnduserCredentialById,
    selectFilteredEnduserCredentials,
    selectPaginatedEnduserCredentials,
    selectPaginatedFilteredEnduserCredentials,
    selectEnduserCredentialsForSelectedEnduser,
    selectEnduserCredentialsForEnduser,
    selectFilteredEnduserCredentialsForSelectedEnduser,
    selectPaginatedEnduserCredentialsForSelectedEnduser,
    selectPaginatedFilteredEnduserCredentialsForSelectedEnduser,
    selectedEnduserCredential
}