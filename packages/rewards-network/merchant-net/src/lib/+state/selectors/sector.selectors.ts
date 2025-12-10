import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { Model } from '../../model'

const selectSectorState = createFeatureSelector<Reducers.SectorFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
        Identifiers.SECTOR_STATE_FEATURE_KEY
    )
)

const selectSectorFilters = createSelector(selectSectorState, (state) => state.filters)
const selectSectorRemotePagination = createSelector(selectSectorState, (state) => state.sectorsRemotePagination)
const selectSubsectorRemotePagination = createSelector(selectSectorState, (state) => state.subsectorsRemotePagination)
const selectSectorRemoteState = createSelector(selectSectorState, selectRemoteState)

const selectSelectedSectorId = createSelector(selectSectorState, (state) => state.selectedSectorId)

const sectorEntitySelectors = Reducers.sectorEntityAdapter.getSelectors()
const selectSectorEntityState = createSelector(selectSectorState, (state) => state.sectors)
const selectSectorIds = createSelector(selectSectorEntityState, sectorEntitySelectors.selectIds)
const selectSectorEntities = createSelector(selectSectorEntityState, sectorEntitySelectors.selectEntities)
const selectAllSectors = createSelector(selectSectorEntityState, sectorEntitySelectors.selectAll)
const selectSectorTotal = createSelector(selectSectorEntityState, sectorEntitySelectors.selectTotal)
const selectSectorById = (id: string) => createSelector(selectSectorEntities, (entities) => entities[id])

const selectedSector = createSelector(
    selectSectorEntities,
    selectSelectedSectorId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectFilteredSectors = createSelector(
    selectAllSectors,
    selectSectorFilters,
    (sectors, filters) => selectFilteredElements(sectors, filters, Model.Filters.sectorFilterEntityMap)
)

const selectPaginatedSectors = createSelector(
    selectAllSectors,
    selectSectorRemotePagination,
    (sectors, pagination) => selectPaginatedElements(sectors, pagination)
)

const selectPaginatedFilteredSectors = createSelector(
    selectFilteredSectors,
    selectSectorRemotePagination,
    (sectors, pagination) => selectPaginatedElements(sectors, pagination)
)

const selectTopLevelSectors = createSelector(
    selectAllSectors,
    (sectors) => sectors.filter(sector => !sector.parentId)
)

const selectTopLevelFilteredSectors = createSelector(
    selectTopLevelSectors,
    selectSectorFilters,
    (sectors, filters) => selectFilteredElements(sectors, filters, Model.Filters.sectorFilterEntityMap)
)

const selectTopLevelPaginatedSectors = createSelector(
    selectTopLevelSectors,
    selectSectorRemotePagination,
    (sectors, pagination) => selectPaginatedElements(sectors, pagination)
)

const selectTopLevelPaginatedFilteredSectors = createSelector(
    selectTopLevelFilteredSectors,
    selectSectorRemotePagination,
    (sectors, pagination) => selectPaginatedElements(sectors, pagination)
)

const findSubsectors = (sectors: Model.SectorResponse[], id: string): Model.NestedSectorResponse[] => {
    const subsectors = sectors.filter(sector => sector.parentId === id)
    return subsectors.map(subsector => ({
        ...subsector,
        children: findSubsectors(sectors, subsector.id)
    }))
}

const selectSubsectorsForSector = (sectorId: string) =>
    createSelector(
        selectFilteredSectors,
        (sectors => sectors.filter(sector => sector.parentId === sectorId))
    )

const selectSubsectorsForSectorNested = (sectorId: string) =>
        createSelector(
            selectFilteredSectors,
            (sectors => findSubsectors(sectors, sectorId))
        )

const selectTopLevelPaginatedFilteredSectorsWithSubsectorsNested = createSelector(
    selectTopLevelPaginatedFilteredSectors,
    selectFilteredSectors,
    (topLevelSectors, filteredSectors) => {
        return topLevelSectors.map(sector => ({
            ...sector,
            children: findSubsectors(filteredSectors, sector.id)
        }))
    }
)

export const SectorSelectors = {
    selectSectorState,
    selectSectorFilters,
    selectSectorRemotePagination,
    selectSubsectorRemotePagination,
    selectSectorRemoteState,
    selectSelectedSectorId,
    sectorEntitySelectors,
    selectSectorEntityState,
    selectSectorIds,
    selectSectorEntities,
    selectAllSectors,
    selectSectorTotal,
    selectSectorById,
    selectedSector,
    selectFilteredSectors,
    selectPaginatedSectors,
    selectPaginatedFilteredSectors,
    selectTopLevelSectors,
    selectTopLevelFilteredSectors,
    selectTopLevelPaginatedSectors,
    selectTopLevelPaginatedFilteredSectors,
    selectSubsectorsForSector,
    selectSubsectorsForSectorNested,
    selectTopLevelPaginatedFilteredSectorsWithSubsectorsNested
}