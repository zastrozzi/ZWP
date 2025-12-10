import { DateQueryFilter, EnumQueryFilter, Nullable, QueryFilterEntityMap } from '@zwp/platform.common'
import { SubscriptionStatus } from '../enums'
import { PartnerSubscriptionResponse, SubgroupSubscriptionResponse } from '../responses'

export interface PartnerSubscriptionFilters {
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
    status: Nullable<EnumQueryFilter<SubscriptionStatus>>
}

export interface SubgroupSubscriptionFilters {
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
    status: Nullable<EnumQueryFilter<SubscriptionStatus>>
}

export const initialPartnerSubscriptionFilters: PartnerSubscriptionFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    status: null
}

export const initialSubgroupSubscriptionFilters: SubgroupSubscriptionFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    status: null
}

export const partnerSubscriptionFilterEntityMap: QueryFilterEntityMap<
    PartnerSubscriptionFilters,
    PartnerSubscriptionResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    status: 'status'
}

export const subgroupSubscriptionFilterEntityMap: QueryFilterEntityMap<
    SubgroupSubscriptionFilters,
    SubgroupSubscriptionResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    status: 'status'
}