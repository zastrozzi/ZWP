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

const selectProviderState = createFeatureSelector<Reducers.ProviderFeatureState>(
    createNamespacedFeatureKey(Identifiers.FSN_TINK_ACTION_IDENTIFIER, Identifiers.PROVIDER_STATE_FEATURE_KEY)
)

const selectProviderFilters = createSelector(selectProviderState, (state) => state.filters)
const selectProviderRemotePagination = createSelector(selectProviderState, (state) => state.providersRemotePagination)
const selectProviderRemoteState = createSelector(selectProviderState, selectRemoteState)

const selectSelectedProviderId = createSelector(selectProviderState, (state) => state.selectedProviderId)

const providerEntitySelectors = Reducers.providerEntityAdapter.getSelectors()
const selectProviderEntityState = createSelector(selectProviderState, (state) => state.providers)
const selectProviderIds = createSelector(selectProviderEntityState, providerEntitySelectors.selectIds)
const selectProviderEntities = createSelector(selectProviderEntityState, providerEntitySelectors.selectEntities)
const selectAllProviders = createSelector(selectProviderEntityState, providerEntitySelectors.selectAll)
const selectProviderTotal = createSelector(selectProviderEntityState, providerEntitySelectors.selectTotal)
const selectProviderById = (id: string) => createSelector(selectProviderEntities, (entities) => entities[id])

const selectedProvider = createSelector(
    selectProviderEntities,
    selectSelectedProviderId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectFilteredProviders = createSelector(selectAllProviders, selectProviderFilters, (providers, filters) =>
    selectFilteredElements(providers, filters, Model.Filters.providerFilterEntityMap)
)

const selectPaginatedProviders = createSelector(
    selectAllProviders,
    selectProviderRemotePagination,
    (providers, pagination) => selectPaginatedElements(providers, pagination)
)

const selectPaginatedFilteredProviders = createSelector(
    selectFilteredProviders,
    selectProviderRemotePagination,
    (providers, pagination) => selectPaginatedElements(providers, pagination)
)

export const ProviderSelectors = {
    selectProviderState,
    selectProviderFilters,
    selectProviderRemotePagination,
    selectProviderRemoteState,

    selectSelectedProviderId,

    providerEntitySelectors,
    selectProviderEntityState,
    selectProviderIds,
    selectProviderEntities,
    selectAllProviders,
    selectProviderTotal,
    selectProviderById,
    selectedProvider,

    selectFilteredProviders,
    selectPaginatedProviders,
    selectPaginatedFilteredProviders,
}
