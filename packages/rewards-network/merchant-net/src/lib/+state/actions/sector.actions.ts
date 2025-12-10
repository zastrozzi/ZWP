import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    ResetRemoteFilters,
    UpdateRemoteFilters,
    createActionType,
    createRemoteActionCRUDMap,
    createRemoteActionGroup
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const SECTOR_ACTION_IDENTIFIERS = [
    Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
    Identifiers.SECTOR_STATE_FEATURE_KEY
]

const updateSectorFilters = createAction(
    createActionType(SECTOR_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.SectorFilters>>()
)

const resetSectorFilters = createAction(
    createActionType(SECTOR_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetSectorState = createAction(
    createActionType(SECTOR_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseSectorState = createAction(
    createActionType(SECTOR_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectSector = createAction(
    createActionType(SECTOR_ACTION_IDENTIFIERS, 'Select Sector'),
    props<{ sectorId: string }>()
)

const deselectSector = createAction(
    createActionType(SECTOR_ACTION_IDENTIFIERS, 'Deselect Sector')
)

const resetPagination = createAction(
    createActionType(SECTOR_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const createSector = createRemoteActionGroup<
    { parentId: Nullable<string>; request: Model.CreateSectorRequest },
    Model.SectorResponse
>('Create Sector', ...SECTOR_ACTION_IDENTIFIERS)

const getSector = createRemoteActionGroup<
    { sectorId: string },
    Model.SectorResponse
>('Get Sector', ...SECTOR_ACTION_IDENTIFIERS)

const listSectors = createRemoteActionGroup<
{ 
    parent: {
        sectorId: Nullable<string>,
        brandId: Nullable<string>,
    },
    pagination: Nullable<Partial<PaginatedQueryParams<Model.SectorResponse>>> 
},
    PaginatedResponse<Model.SectorResponse>
>('List Sectors', ...SECTOR_ACTION_IDENTIFIERS)

const listSubsectors = createRemoteActionGroup<
    { sectorId: string, pagination: Nullable<Partial<PaginatedQueryParams<Model.SectorResponse>>> },
    PaginatedResponse<Model.SectorResponse>
>('List Subsectors', ...SECTOR_ACTION_IDENTIFIERS)


const updateSector = createRemoteActionGroup<
    { sectorId: string; update: Model.UpdateSectorRequest },
    Model.SectorResponse
>('Update Sector', ...SECTOR_ACTION_IDENTIFIERS)

const deleteSector = createRemoteActionGroup<
    { sectorId: string },
    { sectorId: string }
>('Delete Sector', ...SECTOR_ACTION_IDENTIFIERS)

export const SectorLocalActions = {
    updateSectorFilters,
    resetSectorFilters,
    resetSectorState,
    initialiseSectorState,
    selectSector,
    deselectSector,
    resetPagination
}

export const SectorRemoteActions = createRemoteActionCRUDMap(
    SECTOR_ACTION_IDENTIFIERS,
    {
        create: createSector,
        get: getSector,
        list: listSectors,
        update: updateSector,
        delete: deleteSector,
        listSubsectors: listSubsectors
    }
)