import { BooleanQueryFilter, DateQueryFilter, EnumQueryFilter, Nullable, QueryFilterEntityMap } from '@zwp/platform.common'
import { CredentialType } from '../../enums'
import { EnduserCredentialResponse } from '../../responses'

export interface EnduserCredentialFilters {
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>,
    credentialType: Nullable<EnumQueryFilter<CredentialType>>,
    isValid: Nullable<BooleanQueryFilter>
}

export const initialEnduserCredentialFilters: EnduserCredentialFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    credentialType: null,
    isValid: null
}

export const enduserCredentialFilterEntityMap: QueryFilterEntityMap<
    EnduserCredentialFilters,
    EnduserCredentialResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    credentialType: 'credentialType',
    isValid: 'isValid'
}