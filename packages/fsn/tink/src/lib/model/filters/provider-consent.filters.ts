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

export interface ProviderConsentFilters {
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
    sessionExpiryDate: Nullable<DateQueryFilter>
    sessionExtendable: Nullable<BooleanQueryFilter>
    status: Nullable<EnumQueryFilter<ClientAPIModel.ConnectivityV1.ProviderConsent.ProviderConsentStatus>>
    statusUpdated: Nullable<DateQueryFilter>
}

export const initialProviderConsentFilters: ProviderConsentFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    sessionExpiryDate: null,
    sessionExtendable: null,
    status: null,
    statusUpdated: null,
}

export const providerConsentFilterEntityMap: QueryFilterEntityMap<
    ProviderConsentFilters,
    ServerAPIModel.Consent.TinkV1ProviderConsentResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    sessionExpiryDate: 'sessionExpiryDate',
    sessionExtendable: 'sessionExtendable',
    status: 'status',
    statusUpdated: 'statusUpdated',
}
