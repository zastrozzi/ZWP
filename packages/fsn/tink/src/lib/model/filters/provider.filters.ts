import {
    BooleanQueryFilter,
    DateQueryFilter,
    EnumQueryFilter,
    StringQueryFilter,
    Nullable,
    QueryFilterEntityMap,
    ZWPISO3166Alpha2,
    ISO4217ActiveCurrencyCode,
    NumberQueryFilter,
} from '@zwp/platform.common'
import { ServerAPIModel } from '../server-api'
import { ClientAPIModel } from '../client-api'

export interface ProviderFilters {
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
    accessType: Nullable<EnumQueryFilter<ClientAPIModel.ConnectivityV1.Provider.AccessType>>
    authenticationFlow: Nullable<EnumQueryFilter<ClientAPIModel.ConnectivityV1.Provider.AuthenticationFlow>>
    authenticationUserType: Nullable<EnumQueryFilter<ClientAPIModel.ConnectivityV1.Provider.AuthenticationUserType>>
    capabilities: Nullable<EnumQueryFilter<ClientAPIModel.ConnectivityV1.Provider.Capability>>
    credentialType: Nullable<EnumQueryFilter<ClientAPIModel.ConnectivityV1.Credentials.CredentialsType>>
    currency: Nullable<EnumQueryFilter<ISO4217ActiveCurrencyCode>>
    displayDescription: Nullable<StringQueryFilter>
    displayName: Nullable<StringQueryFilter>
    financialInstitutionName: Nullable<StringQueryFilter>
    groupDisplayName: Nullable<StringQueryFilter>
    hasAuthenticationOptions: Nullable<BooleanQueryFilter>
    keywords: Nullable<StringQueryFilter>
    market: Nullable<EnumQueryFilter<ZWPISO3166Alpha2>>
    multiFactor: Nullable<BooleanQueryFilter>
    name: Nullable<StringQueryFilter>
    pisCapabilities: Nullable<EnumQueryFilter<ClientAPIModel.ConnectivityV1.Provider.PISCapability>>
    popular: Nullable<BooleanQueryFilter>
    rank: Nullable<NumberQueryFilter>
    // releaseStatus: Nullable<EnumQueryFilter<ClientAPIModel.ConnectivityV1.Provider.ReleaseStatus>>,
    status: Nullable<EnumQueryFilter<ClientAPIModel.ConnectivityV1.Provider.ProviderStatus>>
    transactional: Nullable<BooleanQueryFilter>
    type: Nullable<EnumQueryFilter<ClientAPIModel.ConnectivityV1.Provider.ProviderType>>
}

export const initialProviderFilters: ProviderFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    accessType: null,
    authenticationFlow: null,
    authenticationUserType: null,
    capabilities: null,
    credentialType: null,
    currency: null,
    displayDescription: null,
    displayName: null,
    financialInstitutionName: null,
    groupDisplayName: null,
    hasAuthenticationOptions: null,
    keywords: null,
    market: null,
    multiFactor: null,
    name: null,
    pisCapabilities: null,
    popular: null,
    rank: null,
    // releaseStatus: null,
    status: null,
    transactional: null,
    type: null,
}

export const providerFilterEntityMap: QueryFilterEntityMap<
    ProviderFilters,
    ServerAPIModel.Provider.TinkV1ProviderResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    accessType: 'accessType',
    authenticationFlow: 'authenticationFlow',
    authenticationUserType: 'authenticationUserType',
    capabilities: 'capabilities',
    credentialType: 'credentialsType',
    currency: 'currency',
    displayDescription: 'displayDescription',
    displayName: 'displayName',
    financialInstitutionName: 'financialInstitutionName',
    groupDisplayName: 'groupDisplayName',
    hasAuthenticationOptions: 'hasAuthenticationOptions',
    keywords: 'keywords',
    market: 'market',
    multiFactor: 'multiFactor',
    name: 'name',
    pisCapabilities: 'pisCapabilities',
    popular: 'popular',
    rank: 'rank',
    // releaseStatus: 'releaseStatus', // TODO
    status: 'status',
    transactional: 'transactional',
    type: 'type',
}
