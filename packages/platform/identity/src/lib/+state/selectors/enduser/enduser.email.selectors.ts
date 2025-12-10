import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../../identifiers'
import { Reducers } from '../../reducers'
import { createNamespacedFeatureKey, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { Model } from '../../../model'
import { EnduserSelectors } from './enduser.selectors'

const selectEnduserEmailState = createFeatureSelector<Reducers.EnduserEmailFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
        Identifiers.ENDUSER_EMAIL_STATE_FEATURE_KEY
    )
)
const selectEnduserEmailEntityState = createSelector(selectEnduserEmailState, (state) => state.enduserEmails)
const selectEnduserEmailFilters = createSelector(selectEnduserEmailState, (state) => state.filters)
const selectEnduserEmailRemotePagination = createSelector(selectEnduserEmailState, (state) => state.enduserEmailsRemotePagination)
const selectEnduserEmailRemoteState = createSelector(selectEnduserEmailState, selectRemoteState)
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
    (emails, filters) => selectFilteredElements(emails, filters, Model.Filters.enduserEmailFilterEntityMap)
)

const selectPaginatedEnduserEmails = createSelector(
    selectAllEnduserEmails,
    selectEnduserEmailRemotePagination,
    (emails, pagination) => selectPaginatedElements(emails, pagination)
)

const selectPaginatedFilteredEnduserEmails = createSelector(
    selectFilteredEnduserEmails,
    selectEnduserEmailRemotePagination,
    (emails, pagination) => selectPaginatedElements(emails, pagination)
)

const selectEnduserEmailsForSelectedEnduser = createSelector(
    EnduserSelectors.selectSelectedEnduserId,
    selectAllEnduserEmails,
    (selectedEnduserId, emails) => emails.filter(email => email.enduserId === selectedEnduserId)
)

const selectEnduserEmailsForEnduser = (enduserId: string) => createSelector(
    selectAllEnduserEmails,
    (emails) => emails.filter(email => email.enduserId === enduserId)
)

const selectFilteredEnduserEmailsForSelectedEnduser = createSelector(
    selectEnduserEmailsForSelectedEnduser,
    selectEnduserEmailFilters,
    (emails, filters) => selectFilteredElements(emails, filters, Model.Filters.enduserEmailFilterEntityMap)
)

const selectPaginatedEnduserEmailsForSelectedEnduser = createSelector(
    selectEnduserEmailsForSelectedEnduser,
    selectEnduserEmailRemotePagination,
    (emails, pagination) => selectPaginatedElements(emails, pagination)
)

const selectPaginatedFilteredEnduserEmailsForSelectedEnduser = createSelector(
    selectFilteredEnduserEmailsForSelectedEnduser,
    selectEnduserEmailRemotePagination,
    (emails, pagination) => selectPaginatedElements(emails, pagination)
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
    selectEnduserEmailRemoteState,
    selectSelectedEnduserEmailId,
    enduserEmailEntitySelectors,
    selectEnduserEmailIds,
    selectEnduserEmailEntities,
    selectAllEnduserEmails,
    selectEnduserEmailTotal,
    selectEnduserEmailById,
    selectFilteredEnduserEmails,
    selectPaginatedEnduserEmails,
    selectPaginatedFilteredEnduserEmails,
    selectEnduserEmailsForSelectedEnduser,
    selectEnduserEmailsForEnduser,
    selectFilteredEnduserEmailsForSelectedEnduser,
    selectPaginatedEnduserEmailsForSelectedEnduser,
    selectPaginatedFilteredEnduserEmailsForSelectedEnduser,
    selectedEnduserEmail
}