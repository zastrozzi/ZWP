import { BooleanQueryFilter, DateQueryFilter, Nullable, QueryFilterEntityMap } from '@zwp/platform.common'
import { EnduserSessionResponse } from '../../responses'

export interface EnduserSessionFilters {
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>,
    isActive: Nullable<BooleanQueryFilter>
}

export const initialEnduserSessionFilters: EnduserSessionFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    isActive: null
}

export const enduserSessionFilterEntityMap: QueryFilterEntityMap<
    EnduserSessionFilters,
    EnduserSessionResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    isActive: 'isActive'
}