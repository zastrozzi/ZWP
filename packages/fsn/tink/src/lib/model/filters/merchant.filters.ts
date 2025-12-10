import {
    BooleanQueryFilter,
    DateQueryFilter,
    EnumQueryFilter,
    StringQueryFilter,
    Nullable,
    QueryFilterEntityMap,
    ZWPISO3166Alpha2,
} from '@zwp/platform.common'
import { ServerAPIModel } from '../server-api'
import { ClientAPIModel } from '../client-api'

export interface MerchantFilters {
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
    categoryCode: Nullable<EnumQueryFilter<ClientAPIModel.PartnerIntegration.Merchants.MerchantCategoryCode>>
    countryCode: Nullable<EnumQueryFilter<ZWPISO3166Alpha2>>
    name: Nullable<StringQueryFilter>
    organizationNumber: Nullable<StringQueryFilter>
    status: Nullable<EnumQueryFilter<ClientAPIModel.PartnerIntegration.Merchants.MerchantStatus>>
    url: Nullable<StringQueryFilter>
}

export const initialMerchantFilters: MerchantFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    categoryCode: null,
    countryCode: null,
    name: null,
    organizationNumber: null,
    status: null,
    url: null,
}

export const merchantFilterEntityMap: QueryFilterEntityMap<
    MerchantFilters,
    ServerAPIModel.Merchant.TinkMerchantResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    categoryCode: 'categoryCode',
    countryCode: 'countryCode',
    name: 'name',
    organizationNumber: 'organizationNumber',
    status: 'status',
    url: 'url',
}
