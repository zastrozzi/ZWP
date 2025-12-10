import { DateQueryFilter, EnumQueryFilter, Nullable, NumberQueryFilter, QueryFilterEntityMap, StringQueryFilter } from "@zwp/platform.common";
import { LayoutElementType, OfferStatus, OfferWeekday } from '../enums'
import { OfferResponse } from '../responses'

export interface OfferFilters {
    title: Nullable<StringQueryFilter>,
    category: Nullable<StringQueryFilter>,
    // operand: Nullable<NumberQueryFilter>,
    purchaseMax: Nullable<NumberQueryFilter>,
    purchaseMin: Nullable<NumberQueryFilter>,
    rewardMax: Nullable<NumberQueryFilter>,
    daysOfWeek: Nullable<EnumQueryFilter<OfferWeekday>>,
    startDate: Nullable<DateQueryFilter>,
    endDate: Nullable<DateQueryFilter>,
    status: Nullable<EnumQueryFilter<OfferStatus>>,

    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>
}

export interface OfferLayoutFilters {
    layoutName: Nullable<StringQueryFilter>,

    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>
}

export interface OfferLayoutElementFilters {
    elementType: Nullable<EnumQueryFilter<LayoutElementType>>,

    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>
}

export const initialOfferFilters: OfferFilters = {
    title: null,
    category: null,
    // operand: null,
    purchaseMax: null,
    purchaseMin: null,
    rewardMax: null,
    daysOfWeek: null,
    startDate: null,
    endDate: null,
    status: null,

    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null
}

export const initialOfferLayoutFilters: OfferLayoutFilters = {
    layoutName: null,

    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null
}

export const initialOfferLayoutElementFilters: OfferLayoutElementFilters = {
    elementType: null,

    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null
}

export const offerFilterEntityMap: QueryFilterEntityMap<OfferFilters, OfferResponse> = {
    title: 'title',
    category: 'category',
    // operand: 'operand',
    purchaseMax: 'purchaseMax',
    purchaseMin: 'purchaseMin',
    rewardMax: 'rewardMax',
    daysOfWeek: 'daysOfWeek',
    startDate: 'startDate',
    endDate: 'endDate',
    status: 'status',

    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt'
}