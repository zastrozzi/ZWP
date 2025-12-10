import { BooleanQueryFilter, DateQueryFilter, Nullable, QueryFilterEntityMap, StringQueryFilter } from '@zwp/platform.common'
import { AdminUserEmailResponse } from '../../responses'

export interface AdminUserEmailFilters {
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>,
    emailAddressValue: Nullable<StringQueryFilter>,
    isVerified: Nullable<BooleanQueryFilter>
}

export const initialAdminUserEmailFilters: AdminUserEmailFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    emailAddressValue: null,
    isVerified: null
}

export const adminUserEmailFilterEntityMap: QueryFilterEntityMap<
    AdminUserEmailFilters,
    AdminUserEmailResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    emailAddressValue: 'emailAddressValue',
    isVerified: 'isVerified'
}