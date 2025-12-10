import { DateQueryFilter, EnumQueryFilter, ISO4217CurrencyCode, Nullable, NumberQueryFilter, QueryFilterEntityMap, StringQueryFilter } from "@zwp/platform.common";
import { InvoiceLineCategory, InvoiceStatus, PaymentMethod, PaymentStatus } from '../enums'
import { InvoiceLineResponse, InvoicePaymentResponse, InvoiceResponse } from '../responses'

export interface InvoiceFilters {
    invoiceNumber: Nullable<StringQueryFilter>,
    invoiceDate: Nullable<DateQueryFilter>,
    invoiceStatus: Nullable<EnumQueryFilter<InvoiceStatus>>,
    dueDate: Nullable<DateQueryFilter>,

    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>
}

export interface InvoiceLineFilters {
    category: Nullable<EnumQueryFilter<InvoiceLineCategory>>,
    lineValueCurrency: Nullable<EnumQueryFilter<ISO4217CurrencyCode>>,
    lineValueAmount: Nullable<NumberQueryFilter>,

    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>
}

export interface InvoicePaymentFilters {
    paymentValueCurrency: Nullable<EnumQueryFilter<ISO4217CurrencyCode>>,
    paymentValueAmount: Nullable<NumberQueryFilter>,
    paymentStatus: Nullable<EnumQueryFilter<PaymentStatus>>,
    paymentMethod: Nullable<EnumQueryFilter<PaymentMethod>>,
    paymentDate: Nullable<DateQueryFilter>,
    paymentReference: Nullable<StringQueryFilter>,

    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>
}

export const initialInvoiceFilters: InvoiceFilters = {
    invoiceNumber: null,
    invoiceDate: null,
    invoiceStatus: null,
    dueDate: null,

    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null
}

export const initialInvoiceLineFilters: InvoiceLineFilters = {
    category: null,
    lineValueCurrency: null,
    lineValueAmount: null,

    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null
}

export const initialInvoicePaymentFilters: InvoicePaymentFilters = {
    paymentValueCurrency: null,
    paymentValueAmount: null,
    paymentStatus: null,
    paymentMethod: null,
    paymentDate: null,
    paymentReference: null,

    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null
}

export const invoiceFilterEntityMap: QueryFilterEntityMap<InvoiceFilters, InvoiceResponse> = {
    invoiceNumber: 'invoiceNumber',
    invoiceDate: 'invoiceDate',
    invoiceStatus: 'invoiceStatus',
    dueDate: 'dueDate',

    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt'
}

export const invoiceLineFilterEntityMap: QueryFilterEntityMap<InvoiceLineFilters, InvoiceLineResponse> = {
    category: 'category',
    lineValueCurrency: 'lineValue.currency',
    lineValueAmount: 'lineValue.amount',

    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt'
}

export const invoicePaymentFilterEntityMap: QueryFilterEntityMap<InvoicePaymentFilters, InvoicePaymentResponse> = {
    paymentValueCurrency: 'paymentValue.currency',
    paymentValueAmount: 'paymentValue.amount',
    paymentStatus: 'paymentStatus',
    paymentMethod: 'paymentMethod',
    paymentDate: 'paymentDate',
    paymentReference: 'paymentReference',

    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt'
}
