import {
    BooleanQueryFilter,
    DateQueryFilter,
    EnumQueryFilter,
    StringQueryFilter,
    Nullable,
    QueryFilterEntityMap,
    ISO4217CurrencyCode,
} from '@zwp/platform.common'
import { ServerAPIModel } from '../server-api'
import { ClientAPIModel } from '../client-api'
import { CurrencyDenominatedAmountFilter } from './common.filters'

export interface TransactionFilters {
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
    // amount: Nullable<CurrencyDenominatedAmountFilter>
    bookedDateTime: Nullable<DateQueryFilter>
    // categories: Nullable<ClientAPIModel.DataV2.Transaction.Categories>
    // counterparties: Nullable<ClientAPIModel.DataV2.Transaction.Counterparties>
    // dates: Nullable<ClientAPIModel.DataV2.Transaction.Dates>
    // descriptions: Nullable<ClientAPIModel.DataV2.Transaction.Descriptions>
    // merchantInformation: Nullable<ClientAPIModel.DataV2.Transaction.MerchantInformation>
    reference: Nullable<StringQueryFilter>
    status: Nullable<EnumQueryFilter<ClientAPIModel.DataV2.Transaction.TransactionStatus>>
    transactionDateTime: Nullable<DateQueryFilter>
    // types: Nullable<ClientAPIModel.DataV2.Transaction.TransactionTypes>
    valueDateTime: Nullable<DateQueryFilter>
}

export const initialTransactionFilters: TransactionFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    // amount: null,
    bookedDateTime: null,
    // categories: null,
    // counterparties: null,
    // dates: null,
    // descriptions: null,
    // merchantInformation: null,
    reference: null,
    status: null,
    transactionDateTime: null,
    // types: null,
    valueDateTime: null,
}

export const transactionFilterEntityMap: QueryFilterEntityMap<
    TransactionFilters,
    ServerAPIModel.Transaction.TinkV2TransactionResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    // amount: 'amount',
    bookedDateTime: 'bookedDateTime',
    // categories: 'categories',
    // counterparties: 'counterparties',
    // dates: 'dates',
    // descriptions: 'descriptions',
    // merchantInformation: 'merchantInformation',
    reference: 'reference',
    status: 'status',
    transactionDateTime: 'transactionDateTime',
    // types: 'types',
    valueDateTime: 'valueDateTime',
}
