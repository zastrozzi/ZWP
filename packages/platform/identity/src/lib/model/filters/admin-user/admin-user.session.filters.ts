import { BooleanQueryFilter, DateQueryFilter, Nullable, QueryFilterEntityMap } from '@zwp/platform.common'
import { AdminUserSessionResponse } from '../../responses'

export interface AdminUserSessionFilters {
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>,
    isActive: Nullable<BooleanQueryFilter>
}

export const initialAdminUserSessionFilters: AdminUserSessionFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    isActive: null
}

export const adminUserSessionFilterEntityMap: QueryFilterEntityMap<
    AdminUserSessionFilters,
    AdminUserSessionResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    isActive: 'isActive'
}