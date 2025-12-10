import { BooleanQueryFilter, DateQueryFilter, Nullable, QueryFilterEntityMap, StringQueryFilter } from '@zwp/platform.common'
import { EnduserEmailResponse } from '../../responses'

export interface EnduserEmailFilters {
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>,
    emailAddressValue: Nullable<StringQueryFilter>,
    isVerified: Nullable<BooleanQueryFilter>
}

export const initialEnduserEmailFilters: EnduserEmailFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    emailAddressValue: null,
    isVerified: null
}

export const enduserEmailFilterEntityMap: QueryFilterEntityMap<
    EnduserEmailFilters,
    EnduserEmailResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    emailAddressValue: 'emailAddressValue',
    isVerified: 'isVerified'
}