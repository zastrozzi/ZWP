import {
    BooleanQueryFilter,
    DateQueryFilter,
    EnumQueryFilter,
    StringQueryFilter,
    Nullable,
    QueryFilterEntityMap,
    ISO4217CurrencyCode,
    ZWPISO3166Alpha2,
    NumberQueryFilter,
} from '@zwp/platform.common'
import { ServerAPIModel } from '../server-api'
import { ClientAPIModel } from '../client-api'

export interface NotificationSettingsFilters {
    balance: Nullable<BooleanQueryFilter>
    budget: Nullable<BooleanQueryFilter>
    doubleCharge: Nullable<BooleanQueryFilter>
    einvoices: Nullable<BooleanQueryFilter>
    fraud: Nullable<BooleanQueryFilter>
    income: Nullable<BooleanQueryFilter>
    largeExpense: Nullable<BooleanQueryFilter>
    leftToSpend: Nullable<BooleanQueryFilter>
    loanUpdate: Nullable<BooleanQueryFilter>
    summaryMonthly: Nullable<BooleanQueryFilter>
    summaryWeekly: Nullable<BooleanQueryFilter>
    transaction: Nullable<BooleanQueryFilter>
    unusualAccount: Nullable<BooleanQueryFilter>
    unusualCategory: Nullable<BooleanQueryFilter>
}

export interface UserProfileFilters {
    currency: Nullable<EnumQueryFilter<ISO4217CurrencyCode>>
    locale: Nullable<EnumQueryFilter<ClientAPIModel.Common.TinkLocale>>
    market: Nullable<EnumQueryFilter<ZWPISO3166Alpha2>>
    notificationSettings: Nullable<NotificationSettingsFilters>
    periodAdjustedDay: Nullable<NumberQueryFilter>
    periodMode: Nullable<EnumQueryFilter<ClientAPIModel.Common.PeriodMode>>
    timeZone: Nullable<StringQueryFilter>
}

export interface UserFilters {
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
    created: Nullable<DateQueryFilter>
    // flags: Nullable<EnumQueryFilter<ClientAPIModel.General.User.UserFlags>>
    nationalId: Nullable<StringQueryFilter>
    // profile: Nullable<UserProfileFilters>
    username: Nullable<StringQueryFilter>
}

export const initialUserFilters: UserFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    created: null,
    // flags: null,
    nationalId: null,
    // profile: null,
    username: null,
}

export const userFilterEntityMap: QueryFilterEntityMap<
    UserFilters,
    ServerAPIModel.User.TinkUserResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    created: 'created',
    // flags: 'flags',
    nationalId: 'nationalId',
    // profile: 'profile',
    username: 'username',
}

