import { DateQueryFilter, Nullable, QueryFilterEntityMap, StringQueryFilter } from '@zwp/platform.common'
import { AdminUserResponse } from '../../responses'

export interface AdminUserFilters {
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>,
    firstName: Nullable<StringQueryFilter>,
    lastName: Nullable<StringQueryFilter>,
    role: Nullable<StringQueryFilter>
}

export const initialAdminUserFilters: AdminUserFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    firstName: null,
    lastName: null,
    role: null
}

export const adminUserFilterEntityMap: QueryFilterEntityMap<
    AdminUserFilters,
    AdminUserResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    firstName: 'firstName',
    lastName: 'lastName',
    role: 'role'
}