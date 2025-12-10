import { AmountAndCurrency } from '@zwp/platform.common'
import { InvoiceLineCategory, InvoiceStatus, PaymentMethod, PaymentStatus } from '../enums'

export interface CreateInvoiceRequest {
    invoiceNumber: string
    invoiceDate: Date
    invoiceStatus: InvoiceStatus
    dueDate: Date
    paymentTerms: string
    notes?: string
}

export interface UpdateInvoiceRequest {
    invoiceNumber?: string
    invoiceDate?: Date
    invoiceStatus?: InvoiceStatus
    dueDate?: Date
    paymentTerms?: string
    notes?: string
}

export interface CreateInvoiceLineRequest {
    category: InvoiceLineCategory
    lineValue: AmountAndCurrency
    offerIds: string[]
}

export interface UpdateInvoiceLineRequest {
    category?: InvoiceLineCategory
    lineValue?: AmountAndCurrency
    offerIds?: string[]
}

export interface CreateInvoicePaymentRequest {
    paymentValue: AmountAndCurrency
    paymentStatus: PaymentStatus
    paymentMethod: PaymentMethod
    paymentDate: Date
    paymentReference?: string
}

export interface UpdateInvoicePaymentRequest {
    paymentValue?: AmountAndCurrency
    paymentStatus?: PaymentStatus
    paymentMethod?: PaymentMethod
    paymentDate?: Date
    paymentReference?: string
}