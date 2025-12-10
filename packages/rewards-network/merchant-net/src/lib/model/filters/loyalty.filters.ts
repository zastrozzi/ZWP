import { BarcodeType, DateQueryFilter, EnumQueryFilter, Nullable, QueryFilterEntityMap, StringQueryFilter } from "@zwp/platform.common";
import { LoyaltyCardSchemeStatus, LoyaltyCardStatus } from '../enums'
import { LoyaltyCardResponse, LoyaltyCardSchemeBrandResponse, LoyaltyCardSchemeResponse } from '../responses'

export interface LoyaltyCardSchemeFilters {
    status: Nullable<EnumQueryFilter<LoyaltyCardSchemeStatus>>,
    displayName: Nullable<StringQueryFilter>,
    barcodeType: Nullable<EnumQueryFilter<BarcodeType>>,

    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>
}

export interface LoyaltyCardSchemeBrandFilters {
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>
}

export interface LoyaltyCardFilters {
    status: Nullable<EnumQueryFilter<LoyaltyCardStatus>>,
    displayName: Nullable<StringQueryFilter>,
    barcodeData: Nullable<StringQueryFilter>,
    cardNumber: Nullable<StringQueryFilter>,
    cardPin: Nullable<StringQueryFilter>,

    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>
}

export const initialLoyaltyCardSchemeFilters: LoyaltyCardSchemeFilters = {
    status: null,
    displayName: null,
    barcodeType: null,

    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null
}

export const initialLoyaltyCardSchemeBrandFilters: LoyaltyCardSchemeBrandFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null
}

export const initialLoyaltyCardFilters: LoyaltyCardFilters = {
    status: null,
    displayName: null,
    barcodeData: null,
    cardNumber: null,
    cardPin: null,

    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null
}

export const loyaltyCardSchemeFilterEntityMap: QueryFilterEntityMap<LoyaltyCardSchemeFilters, LoyaltyCardSchemeResponse> = {
    status: 'status',
    displayName: 'displayName',
    barcodeType: 'barcodeType',

    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt'
}

export const loyaltyCardFilterEntityMap: QueryFilterEntityMap<LoyaltyCardFilters, LoyaltyCardResponse> = {
    status: 'status',
    displayName: 'displayName',
    barcodeData: 'barcodeData',
    cardNumber: 'cardNumber',
    cardPin: 'cardPin',

    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt'
}

export const loyaltyCardSchemeBrandFilterEntityMap: QueryFilterEntityMap<LoyaltyCardSchemeBrandFilters, LoyaltyCardSchemeBrandResponse> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt'
}