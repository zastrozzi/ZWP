import { DateQueryFilter, EnumQueryFilter, Nullable, QueryFilterEntityMap, StringQueryFilter } from '@zwp/platform.common'
import { EnduserResponse } from '../../responses'
import { UserTitle } from '../../enums'

export interface EnduserFilters {
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>,
    firstName: Nullable<StringQueryFilter>,
    lastName: Nullable<StringQueryFilter>,
    dateOfBirth: Nullable<DateQueryFilter>,
    title: Nullable<EnumQueryFilter<UserTitle>>,
}

export const initialEnduserFilters: EnduserFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    firstName: null,
    lastName: null,
    dateOfBirth: null,
    title: null
}

export const enduserFilterEntityMap: QueryFilterEntityMap<
    EnduserFilters,
    EnduserResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    firstName: 'firstName',
    lastName: 'lastName',
    dateOfBirth: 'dateOfBirth',
    title: 'title'
}