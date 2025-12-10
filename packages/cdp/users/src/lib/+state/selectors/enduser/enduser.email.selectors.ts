import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../../identifiers'
import { Reducers } from '../../reducers'
import { createNamespacedFeatureKey } from '@zwp/platform.common'

const selectEnduserEmailState = createFeatureSelector<Reducers.EnduserEmailFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.CDP_USERS_ACTION_IDENTIFIER,
        Identifiers.ENDUSER_EMAIL_STATE_FEATURE_KEY
    )
)
const selectEnduserEmailEntityState = createSelector(selectEnduserEmailState, (state) => state.enduserEmails)
const selectEnduserEmailFilters = createSelector(selectEnduserEmailState, (state) => state.filters)
const selectEnduserEmailRemotePagination = createSelector(selectEnduserEmailState, (state) => state.enduserEmailsRemotePagination)
const selectSelectedEnduserEmailId = createSelector(selectEnduserEmailState, (state) => state.selectedEnduserEmailId)
const enduserEmailEntitySelectors = Reducers.enduserEmailEntityAdapter.getSelectors()

const selectEnduserEmailIds = createSelector(selectEnduserEmailEntityState, enduserEmailEntitySelectors.selectIds)
const selectEnduserEmailEntities = createSelector(selectEnduserEmailEntityState, enduserEmailEntitySelectors.selectEntities)
const selectAllEnduserEmails = createSelector(selectEnduserEmailEntityState, enduserEmailEntitySelectors.selectAll)
const selectEnduserEmailTotal = createSelector(selectEnduserEmailEntityState, enduserEmailEntitySelectors.selectTotal)
const selectEnduserEmailById = (id: string) => createSelector(selectEnduserEmailEntities, (entities) => entities[id])

const selectFilteredEnduserEmails = createSelector(
    selectAllEnduserEmails,
    selectEnduserEmailFilters,
    (emails, filters) => emails.filter(email => {
        let include = true
        if (filters.enduserId) {
            include = include && email.enduserId === filters.enduserId
        }
        return include
    })
)

const selectedEnduserEmail = createSelector(
    selectEnduserEmailEntities,
    selectSelectedEnduserEmailId,
    (entities, selectedId) => selectedId && entities[selectedId]
)

export const EnduserEmailSelectors = {
    selectEnduserEmailState,
    selectEnduserEmailEntityState,
    selectEnduserEmailFilters,
    selectEnduserEmailRemotePagination,
    selectSelectedEnduserEmailId,
    enduserEmailEntitySelectors,
    selectEnduserEmailIds,
    selectEnduserEmailEntities,
    selectAllEnduserEmails,
    selectEnduserEmailTotal,
    selectEnduserEmailById,
    selectFilteredEnduserEmails,
    selectedEnduserEmail
}
