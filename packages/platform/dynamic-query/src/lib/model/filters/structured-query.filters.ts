import { DateQueryFilter, Nullable, StringQueryFilter } from '@zwp/platform.common'

export interface StructuredQueryFilters {
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
    name: Nullable<StringQueryFilter>
}

export const initialStructuredQueryFilters: StructuredQueryFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    name: null
}