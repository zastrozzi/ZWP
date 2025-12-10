import { AmountAndCurrency } from '@zwp/platform.common'
import { InvoiceLineCategory, InvoiceStatus, PaymentMethod, PaymentStatus } from '../enums'

export interface InvoiceResponse {
    id: string
    dbCreatedAt?: Date
    dbUpdatedAt?: Date
    dbDeletedAt?: Date
    
    invoiceNumber: string
    invoiceDate: Date
    invoiceStatus: InvoiceStatus
    dueDate: Date
    paymentTerms: string
    notes?: string

    merchantId: string
}

export interface InvoiceLineResponse {
    id: string
    dbCreatedAt?: Date
    dbUpdatedAt?: Date
    dbDeletedAt?: Date

    
    category: InvoiceLineCategory
    lineValue: AmountAndCurrency

    invoiceId: string
    offerIds: string[]
}

export interface InvoicePaymentResponse {
    id: string
    dbCreatedAt?: Date
    dbUpdatedAt?: Date
    dbDeletedAt?: Date

    
    paymentValue: AmountAndCurrency
    paymentStatus: PaymentStatus
    paymentMethod: PaymentMethod
    paymentDate: Date
    paymentReference?: string

    invoiceId: string
}