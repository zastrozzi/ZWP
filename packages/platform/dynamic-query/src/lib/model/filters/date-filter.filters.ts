import { DateQueryFilter, EnumQueryFilter, Nullable, StringQueryFilter } from '@zwp/platform.common'
import { FilterMethod } from '../enums'

export interface DateFilterFilters {
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
    columnName: Nullable<StringQueryFilter>
    tableName: Nullable<StringQueryFilter>
    filterMethod: Nullable<EnumQueryFilter<FilterMethod>>
}

export const initialDateFilterFilters: DateFilterFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    columnName: null,
    tableName: null,
    filterMethod: null
}