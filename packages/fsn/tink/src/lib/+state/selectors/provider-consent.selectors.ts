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

const selectProviderConsentState = createFeatureSelector<Reducers.ProviderConsentFeatureState>(
    createNamespacedFeatureKey(Identifiers.FSN_TINK_ACTION_IDENTIFIER, Identifiers.PROVIDER_CONSENT_STATE_FEATURE_KEY)
)

const selectProviderConsentFilters = createSelector(selectProviderConsentState, (state) => state.filters)
const selectProviderConsentRemotePagination = createSelector(
    selectProviderConsentState,
    (state) => state.providerConsentsRemotePagination
)
const selectProviderConsentRemoteState = createSelector(selectProviderConsentState, selectRemoteState)

const selectSelectedProviderConsentId = createSelector(
    selectProviderConsentState,
    (state) => state.selectedProviderConsentId
)

const providerConsentEntitySelectors = Reducers.providerConsentEntityAdapter.getSelectors()
const selectProviderConsentEntityState = createSelector(selectProviderConsentState, (state) => state.providerConsents)
const selectProviderConsentIds = createSelector(
    selectProviderConsentEntityState,
    providerConsentEntitySelectors.selectIds
)
const selectProviderConsentEntities = createSelector(
    selectProviderConsentEntityState,
    providerConsentEntitySelectors.selectEntities
)
const selectAllProviderConsents = createSelector(
    selectProviderConsentEntityState,
    providerConsentEntitySelectors.selectAll
)
const selectProviderConsentTotal = createSelector(
    selectProviderConsentEntityState,
    providerConsentEntitySelectors.selectTotal
)
const selectProviderConsentById = (id: string) =>
    createSelector(selectProviderConsentEntities, (entities) => entities[id])

const selectedProviderConsent = createSelector(
    selectProviderConsentEntities,
    selectSelectedProviderConsentId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectFilteredProviderConsents = createSelector(
    selectAllProviderConsents,
    selectProviderConsentFilters,
    (providerConsents, filters) =>
        selectFilteredElements(providerConsents, filters, Model.Filters.providerConsentFilterEntityMap)
)

const selectPaginatedProviderConsents = createSelector(
    selectAllProviderConsents,
    selectProviderConsentRemotePagination,
    (providerConsents, pagination) => selectPaginatedElements(providerConsents, pagination)
)

const selectPaginatedFilteredProviderConsents = createSelector(
    selectFilteredProviderConsents,
    selectProviderConsentRemotePagination,
    (providerConsents, pagination) => selectPaginatedElements(providerConsents, pagination)
)

export const ProviderConsentSelectors = {
    selectProviderConsentState,
    selectProviderConsentFilters,
    selectProviderConsentRemotePagination,
    selectProviderConsentRemoteState,

    selectSelectedProviderConsentId,

    providerConsentEntitySelectors,
    selectProviderConsentEntityState,
    selectProviderConsentIds,
    selectProviderConsentEntities,
    selectAllProviderConsents,
    selectProviderConsentTotal,
    selectProviderConsentById,
    selectedProviderConsent,

    selectFilteredProviderConsents,
    selectPaginatedProviderConsents,
    selectPaginatedFilteredProviderConsents,
}
