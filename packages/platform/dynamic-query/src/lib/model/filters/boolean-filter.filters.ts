import { DateQueryFilter, EnumQueryFilter, Nullable, StringQueryFilter } from '@zwp/platform.common'
import { FilterMethod } from '../enums'

export interface BooleanFilterFilters {
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
    columnName: Nullable<StringQueryFilter>
    tableName: Nullable<StringQueryFilter>
    filterMethod: Nullable<EnumQueryFilter<FilterMethod>>
}

export const initialBooleanFilterFilters: BooleanFilterFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    columnName: null,
    tableName: null,
    filterMethod: null
}