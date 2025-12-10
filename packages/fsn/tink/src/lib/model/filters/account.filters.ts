import {
    BooleanQueryFilter,
    DateQueryFilter,
    EnumQueryFilter,
    Nullable,
    QueryFilterEntityMap,
    StringQueryFilter,
} from '@zwp/platform.common'
import { ServerAPIModel } from '../server-api'
import { ClientAPIModel } from '../client-api'

export interface AccountFilters {
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
    // balances: Nullable<ClientAPIModel.Common.Balances>,
    customerSegment: Nullable<EnumQueryFilter<ClientAPIModel.DataV2.Account.CustomerSegment>>
    // dates: Nullable<ClientAPIModel.Common.Dates>,
    // identifiers: Nullable<ClientAPIModel.DataV2.Account.Identifiers>,
    name: Nullable<StringQueryFilter>
    type: Nullable<EnumQueryFilter<ClientAPIModel.DataV2.Account.AccountType>>
}

export const initialAccountFilters: AccountFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    // balances: null,
    customerSegment: null,
    // dates: null,
    // identifiers: null,
    name: null,
    type: null,
}

export const accountFilterEntityMap: QueryFilterEntityMap<
    AccountFilters,
    ServerAPIModel.Account.TinkV2AccountResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    // balances: 'balances',
    customerSegment: 'customerSegment',
    // dates: 'dates',
    // identifiers: 'identifiers',
    name: 'name',
    type: 'type',
}
