import { DateQueryFilter, EnumQueryFilter, Nullable, StringQueryFilter } from '@zwp/platform.common'
import { FilterMethod, NumericDataType } from '../enums'

export interface NumericFilterFilters {
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
    columnName: Nullable<StringQueryFilter>
    tableName: Nullable<StringQueryFilter>
    filterMethod: Nullable<EnumQueryFilter<FilterMethod>>
    numericDataType: Nullable<EnumQueryFilter<NumericDataType>>
}

export const initialNumericFilterFilters: NumericFilterFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    columnName: null,
    tableName: null,
    filterMethod: null,
    numericDataType: null
}