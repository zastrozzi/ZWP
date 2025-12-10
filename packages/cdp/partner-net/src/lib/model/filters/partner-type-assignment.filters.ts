import { DateQueryFilter, Nullable, QueryFilterEntityMap } from '@zwp/platform.common'
import { PartnerTypeAssignmentResponse } from '../responses'

export interface PartnerTypeAssignmentFilters {
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
}

export const initialPartnerTypeAssignmentFilters: PartnerTypeAssignmentFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null
}

export const partnerTypeAssignmentFilterEntityMap: QueryFilterEntityMap<
    PartnerTypeAssignmentFilters,
    PartnerTypeAssignmentResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt'
}