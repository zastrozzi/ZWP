import { DateQueryFilter, EnumQueryFilter, Nullable, StringQueryFilter } from '@zwp/platform.common'
import { FilterMethod } from '../enums'

export interface UUIDFilterFilters {
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
    columnName: Nullable<StringQueryFilter>
    tableName: Nullable<StringQueryFilter>
    filterMethod: Nullable<EnumQueryFilter<FilterMethod>>
}

export const initialUUIDFilterFilters: UUIDFilterFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    columnName: null,
    tableName: null,
    filterMethod: null
}