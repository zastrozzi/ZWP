import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import {
    selectRemoteState,
    createNamespacedFeatureKey,
    selectPaginatedElements,
    selectFilteredElements,
} from '@zwp/platform.common'
import { Model } from '../../model'
import { BrandSelectors } from './brand.selectors'

const selectStoreCardState = createFeatureSelector<Reducers.StoreCardFeatureState>(
    createNamespacedFeatureKey(Identifiers.REWARDS_NETWORK_TILLO_ACTION_IDENTIFIER, Identifiers.STORE_CARD_FEATURE_KEY)
)

const selectStoreCardFilters = createSelector(selectStoreCardState, (state) => state.filters)
const selectStoreCardRemotePagination = createSelector(selectStoreCardState, (state) => state.storeCardRemotePagination)
const selectStoreCardRemoteState = createSelector(selectStoreCardState, selectRemoteState)

const selectSelectedStoreCardId = createSelector(selectStoreCardState, (state) => state.selectedStoreCardId)

const storeCardEntitySelectors = Reducers.storeCardEntityAdaptor.getSelectors()
const selectStoreCardEntityState = createSelector(selectStoreCardState, (state) => state.storeCards)
const selectStoreCardIds = createSelector(selectStoreCardEntityState, storeCardEntitySelectors.selectIds)
const selectStoreCardEntities = createSelector(selectStoreCardEntityState, storeCardEntitySelectors.selectEntities)
const selectAllStoreCards = createSelector(selectStoreCardEntityState, storeCardEntitySelectors.selectAll)
const selectStoreCardTotal = createSelector(selectStoreCardEntityState, storeCardEntitySelectors.selectTotal)
const selectStoreCardById = (id: string) => createSelector(selectStoreCardEntities, (entities) => entities[id])

const selectedStoreCard = createSelector(
    selectStoreCardEntities,
    selectSelectedStoreCardId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectStoreCardsForSelectedTilloBrand = createSelector(
    BrandSelectors.selectSelectedBrandId,
    selectAllStoreCards,
    (brandId, storeCards) => storeCards.filter((storeCard) => storeCard.brandId === brandId)
)

const selectStoreCardsForTilloBrand = (tilloBrandId: string) =>
    createSelector(selectAllStoreCards, (storeCards) =>
        storeCards.filter((storeCard) => storeCard.brandId === tilloBrandId)
    )

const selectFilteredStoreCards = createSelector(selectAllStoreCards, selectStoreCardFilters, (storeCards, filters) =>
    selectFilteredElements(storeCards, filters, Model.Filters.storeCardFilterEntityMap)
)

const selectPaginatedStoreCards = createSelector(
    selectAllStoreCards,
    selectStoreCardRemotePagination,
    (storeCard, pagination) => selectPaginatedElements(storeCard, pagination)
)

const selectPaginatedFilteredStoreCards = createSelector(
    selectFilteredStoreCards,
    selectStoreCardRemotePagination,
    (storeCards, pagination) => selectPaginatedElements(storeCards, pagination)
)

const selectFilteredStoreCardsForSelectedTilloBrand = createSelector(
    selectStoreCardsForSelectedTilloBrand,
    selectStoreCardFilters,
    (storeCards, filters) =>
        selectFilteredElements(storeCards, filters, Model.Filters.storeCardFilterEntityMap)
)

const selectPaginatedStoreCardsForSelectedTilloBrand = createSelector(
    selectStoreCardsForSelectedTilloBrand,
    selectStoreCardRemotePagination,
    (storeCards, pagination) => selectPaginatedElements(storeCards, pagination)
)

const selectPaginatedFilteredStoreCardsForSelectedTilloBrand = createSelector(
    selectFilteredStoreCardsForSelectedTilloBrand,
    selectStoreCardRemotePagination,
    (storeCards, pagination) => selectPaginatedElements(storeCards, pagination)
)

const selectFilteredStoreCardsForTilloBrand = (tilloBrandId: string) =>
    createSelector(
        selectStoreCardsForTilloBrand(tilloBrandId),
        selectStoreCardFilters,
        (storeCards, filters) =>
            selectFilteredElements(storeCards, filters, Model.Filters.storeCardFilterEntityMap)
    )

const selectPaginatedStoreCardsForTilloBrand = (tilloBrandId: string) =>
    createSelector(
        selectStoreCardsForTilloBrand(tilloBrandId),
        selectStoreCardRemotePagination,
        (storeCards, pagination) => selectPaginatedElements(storeCards, pagination)
    )

const selectPaginatedFilteredStoreCardsForTilloBrand = (tilloBrandId: string) =>
    createSelector(
        selectFilteredStoreCardsForTilloBrand(tilloBrandId),
        selectStoreCardRemotePagination,
        (storeCards, pagination) => selectPaginatedElements(storeCards, pagination)
    )

export const StoreCardSelectors = {
    selectStoreCardState,
    selectStoreCardFilters,
    selectStoreCardRemotePagination,
    selectStoreCardRemoteState,
    selectSelectedStoreCardId,
    storeCardEntitySelectors,
    selectStoreCardEntityState,
    selectStoreCardIds,
    selectStoreCardEntities,
    selectAllStoreCards,
    selectStoreCardTotal,
    selectStoreCardById,
    selectedStoreCard,
    selectStoreCardsForSelectedTilloBrand,
    selectFilteredStoreCards,
    selectPaginatedStoreCards,
    selectPaginatedFilteredStoreCards,
    selectFilteredStoreCardsForSelectedTilloBrand,
    selectPaginatedStoreCardsForSelectedTilloBrand,
    selectPaginatedFilteredStoreCardsForSelectedTilloBrand,
    selectStoreCardsForTilloBrand,
    selectFilteredStoreCardsForTilloBrand,
    selectPaginatedStoreCardsForTilloBrand,
    selectPaginatedFilteredStoreCardsForTilloBrand
}
