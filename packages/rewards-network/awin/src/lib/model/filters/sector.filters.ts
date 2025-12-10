import { DateQueryFilter, EnumQueryFilter, Nullable, QueryFilterEntityMap, StringQueryFilter } from "@zwp/platform.common";
import { SectorStatus } from '../enums'
import { SectorResponse } from '../responses'

export interface SectorFilters {
    name: Nullable<StringQueryFilter>,
    status: Nullable<EnumQueryFilter<SectorStatus>>,
    
    
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>
}

export const initialSectorFilters: SectorFilters = {
    name: null,
    status: null,
    
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null
}

export const sectorFilterEntityMap: QueryFilterEntityMap<
    SectorFilters,
    SectorResponse
> = {
    name: 'name',
    status: 'status', // ASK JONO
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt'
}