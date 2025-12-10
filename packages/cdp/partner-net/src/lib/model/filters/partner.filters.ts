import { DateQueryFilter, EnumQueryFilter, Nullable, QueryFilterEntityMap, StringQueryFilter } from '@zwp/platform.common'
import { PartnerStatus } from '../enums'
import { PartnerResponse } from '../responses'

export interface PartnerFilters {
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
    name: Nullable<StringQueryFilter>
    logoUrl: Nullable<StringQueryFilter>
    status: Nullable<EnumQueryFilter<PartnerStatus>>
}

export const initialPartnerFilters: PartnerFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    name: null,
    logoUrl: null,
    status: null
}

export const partnerFilterEntityMap: QueryFilterEntityMap<
    PartnerFilters,
    PartnerResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    name: 'name',
    logoUrl: 'logoUrl',
    status: 'status'
}