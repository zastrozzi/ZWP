import { DateQueryFilter, GeometricPoint2DQueryFilter, Nullable, QueryFilterEntityMap, StringQueryFilter } from '@zwp/platform.common'
import { LocationResponse } from '../responses'

export interface LocationFilters {
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
    name: Nullable<StringQueryFilter>
    geometry: Nullable<GeometricPoint2DQueryFilter>
}

export const initialLocationFilters: LocationFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    name: null,
    geometry: null
}

export const locationFilterEntityMap: QueryFilterEntityMap<
    LocationFilters,
    LocationResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    name: 'name',
    geometry: 'geometry'
}