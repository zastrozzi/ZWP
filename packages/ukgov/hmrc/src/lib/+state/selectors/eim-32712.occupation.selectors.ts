import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, filterDateQuery, filterEnumQuery, filterNumberQuery, filterStringQuery, selectRemoteState } from '@zwp/platform.common'
import { Model } from '../../model'

const selectOccupationState = createFeatureSelector<Reducers.EIM32712OccupationFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.UKGOV_HMRC_ACTION_IDENTIFIER,
        Identifiers.EIM32712_OCCUPATION_STATE_FEATURE_KEY
    )
)
const selectOccupationEntityState = createSelector(selectOccupationState, (state) => state.occupations)
const selectOccupationFilters = createSelector(selectOccupationState, (state) => state.filters)
const selectOccupationRemotePagination = createSelector(selectOccupationState, (state) => state.occupationsRemotePagination)
const selectOccupationRemoteState = createSelector(selectOccupationState, selectRemoteState)
const selectSelectedOccupationId = createSelector(selectOccupationState, (state) => state.selectedOccupationId)
const occupationEntitySelectors = Reducers.eim32712OccupationAdapter.getSelectors()

const selectOccupationIndustryFilters = createSelector(selectOccupationFilters, (filters) => filters.industry)
const selectOccupationIndustryFiltersInValue = createSelector(selectOccupationIndustryFilters, (industry) => industry?.in)

const selectOccupationIds = createSelector(selectOccupationEntityState, occupationEntitySelectors.selectIds)
const selectOccupationEntities = createSelector(selectOccupationEntityState, occupationEntitySelectors.selectEntities)
const selectAllOccupations = createSelector(selectOccupationEntityState, occupationEntitySelectors.selectAll)
const selectOccupationTotal = createSelector(selectOccupationEntityState, occupationEntitySelectors.selectTotal)
const selectOccupationById = (id: string) => createSelector(selectOccupationEntities, (entities) => entities[id])

const selectFilteredOccupations = createSelector(
    selectAllOccupations,
    selectOccupationFilters,
    (occupations, filters) => {
        return occupations.filter((occupation) => {
            let include = true
            if (filters.industry) { include = include && filterEnumQuery(filters.industry, occupation.industry) }
            if (filters.name) { include = include && filterStringQuery(filters.name, occupation.name) }
            if (filters.deduction) { include = include && filterNumberQuery(filters.deduction, occupation.deduction) }
            if (filters.dbCreatedAt && occupation.dbCreatedAt) { include = include && filterDateQuery(filters.dbCreatedAt, occupation.dbCreatedAt) }
            if (filters.dbUpdatedAt && occupation.dbUpdatedAt) { include = include && filterDateQuery(filters.dbUpdatedAt, occupation.dbUpdatedAt) }
            if (filters.dbDeletedAt && occupation.dbDeletedAt) { include = include && filterDateQuery(filters.dbDeletedAt, occupation.dbDeletedAt) }
            return include
        })
    }
)

export const selectedOccupation = createSelector(
    selectOccupationEntities,
    selectSelectedOccupationId,
    (entities, id) => id ? entities[id] : null
)

export const EIM32712OccupationSelectors = {
    selectOccupationState,
    selectOccupationEntityState,
    selectOccupationFilters,
    selectOccupationIndustryFilters,
    selectOccupationIndustryFiltersInValue,
    selectOccupationRemotePagination,
    selectOccupationRemoteState,
    selectSelectedOccupationId,
    selectOccupationIds,
    selectOccupationEntities,
    selectAllOccupations,
    selectOccupationTotal,
    selectOccupationById,
    selectFilteredOccupations,
    selectedOccupation
}