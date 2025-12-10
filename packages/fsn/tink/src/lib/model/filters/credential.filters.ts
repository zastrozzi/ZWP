import {
    BooleanQueryFilter,
    DateQueryFilter,
    EnumQueryFilter,
    StringQueryFilter,
    Nullable,
    QueryFilterEntityMap,
} from '@zwp/platform.common'
import { ServerAPIModel } from '../server-api'
import { ClientAPIModel } from '../client-api'

export interface CredentialFilters {
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
    sessionExpiryDate: Nullable<DateQueryFilter>
    status: Nullable<EnumQueryFilter<ClientAPIModel.ConnectivityV1.Credentials.CredentialsStatus>>
    statusUpdated: Nullable<DateQueryFilter>
    type: Nullable<EnumQueryFilter<ClientAPIModel.ConnectivityV1.Credentials.CredentialsType>>
    updated: Nullable<DateQueryFilter>
}

export const initialCredentialFilters: CredentialFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    sessionExpiryDate: null,
    status: null,
    statusUpdated: null,
    type: null,
    updated: null,
}

export const credentialFilterEntityMap: QueryFilterEntityMap<
    CredentialFilters,
    ServerAPIModel.Credentials.TinkV1CredentialsResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    sessionExpiryDate: 'sessionExpiryDate',
    status: 'status',
    statusUpdated: 'statusUpdated',
    type: 'type',
    updated: 'updated',
}
