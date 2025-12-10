import { DateQueryFilter, Nullable, QueryFilterEntityMap } from '@zwp/platform.common'
import { BrandTilloBrandResponse } from '../responses'

export interface BrandTilloBrandFilters {
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>
}

export const initialBrandTilloBrandFilters: BrandTilloBrandFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null
}

export const brandTilloBrandFilterEntityMap: QueryFilterEntityMap<BrandTilloBrandFilters, BrandTilloBrandResponse> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt'
}