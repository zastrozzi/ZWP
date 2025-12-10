import { DateQueryFilter, Nullable, QueryFilterEntityMap, StringQueryFilter } from '@zwp/platform.common'
import { PartnerTypeResponse } from '../responses'

export interface PartnerTypeFilters {
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
    name: Nullable<StringQueryFilter>
}

export const initialPartnerTypeFilters: PartnerTypeFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    name: null
}

export const partnerTypeFilterEntityMap: QueryFilterEntityMap<
    PartnerTypeFilters,
    PartnerTypeResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    name: 'name'
}