import { DateQueryFilter, EnumQueryFilter, Nullable } from '@zwp/platform.common'
import { FilterRelation } from '../enums'

export interface FilterGroupFilters {
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
    relation: Nullable<EnumQueryFilter<FilterRelation>>
}

export const initialFilterGroupFilters: FilterGroupFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    relation: null
}