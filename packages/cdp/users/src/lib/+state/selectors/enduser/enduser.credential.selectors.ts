import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../../identifiers'
import { Reducers } from '../../reducers'
import { createNamespacedFeatureKey } from '@zwp/platform.common'

const selectEnduserCredentialState = createFeatureSelector<Reducers.EnduserCredentialFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.CDP_USERS_ACTION_IDENTIFIER,
        Identifiers.ENDUSER_CREDENTIAL_STATE_FEATURE_KEY
    )
)
const selectEnduserCredentialEntityState = createSelector(selectEnduserCredentialState, (state) => state.enduserCredentials)
const selectEnduserCredentialFilters = createSelector(selectEnduserCredentialState, (state) => state.filters)
const selectEnduserCredentialRemotePagination = createSelector(selectEnduserCredentialState, (state) => state.enduserCredentialsRemotePagination)
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
    (credentials, filters) => credentials.filter(credential => {
        let include = true
        if (filters.enduserId) {
            include = include && credential.enduserId === filters.enduserId
        }
        return include
    })
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
    selectSelectedEnduserCredentialId,
    enduserCredentialEntitySelectors,
    selectEnduserCredentialIds,
    selectEnduserCredentialEntities,
    selectAllEnduserCredentials,
    selectEnduserCredentialTotal,
    selectEnduserCredentialById,
    selectFilteredEnduserCredentials,
    selectedEnduserCredential
}