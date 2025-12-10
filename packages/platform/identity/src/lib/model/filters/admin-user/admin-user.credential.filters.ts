import { BooleanQueryFilter, DateQueryFilter, EnumQueryFilter, Nullable, QueryFilterEntityMap } from '@zwp/platform.common'
import { CredentialType } from '../../enums'
import { AdminUserCredentialResponse } from '../../responses'

export interface AdminUserCredentialFilters {
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>,
    credentialType: Nullable<EnumQueryFilter<CredentialType>>,
    isValid: Nullable<BooleanQueryFilter>
}

export const initialAdminUserCredentialFilters: AdminUserCredentialFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    credentialType: null,
    isValid: null
}

export const adminUserCredentialFilterEntityMap: QueryFilterEntityMap<
    AdminUserCredentialFilters,
    AdminUserCredentialResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    credentialType: 'credentialType',
    isValid: 'isValid'
}