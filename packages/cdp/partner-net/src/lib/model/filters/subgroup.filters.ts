import { DateQueryFilter, EnumQueryFilter, Nullable, QueryFilterEntityMap, StringQueryFilter } from '@zwp/platform.common'
import { PartnerStatus } from '../enums'
import { SubgroupResponse } from '../responses'

export interface SubgroupFilters {
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
    name: Nullable<StringQueryFilter>
    status: Nullable<EnumQueryFilter<PartnerStatus>>
}

export const initialSubgroupFilters: SubgroupFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    name: null,
    status: null
}

export const subgroupFilterEntityMap: QueryFilterEntityMap<
    SubgroupFilters,
    SubgroupResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    name: 'name',
    status: 'status'
}