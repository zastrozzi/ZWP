import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class InvoiceAPIService {
    abstract createInvoice(
        merchantId: string,
        request: Model.CreateInvoiceRequest
    ): Observable<Model.InvoiceResponse>

    abstract getInvoice(invoiceId: string): Observable<Model.InvoiceResponse>

    abstract listInvoices(
        merchantId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.InvoiceResponse>>>
    ): Observable<PaginatedResponse<Model.InvoiceResponse>>

    abstract updateInvoice(
        invoiceId: string,
        request: Model.UpdateInvoiceRequest
    ): Observable<Model.InvoiceResponse>

    abstract deleteInvoice(invoiceId: string): Observable<void>

    abstract createInvoiceLine(
        invoiceId: string,
        request: Model.CreateInvoiceLineRequest
    ): Observable<Model.InvoiceLineResponse>

    abstract getInvoiceLine(
        lineId: string
    ): Observable<Model.InvoiceLineResponse>

    abstract listInvoiceLines(
        parent: {
            invoiceId: Nullable<string>
            merchantId: Nullable<string>
        },
        pagination: Nullable<Partial<PaginatedQueryParams<Model.InvoiceLineResponse>>>
    ): Observable<PaginatedResponse<Model.InvoiceLineResponse>>

    abstract updateInvoiceLine(
        lineId: string,
        request: Model.UpdateInvoiceLineRequest
    ): Observable<Model.InvoiceLineResponse>

    abstract deleteInvoiceLine(lineId: string): Observable<void>

    abstract createInvoicePayment(
        invoiceId: string,
        request: Model.CreateInvoicePaymentRequest
    ): Observable<Model.InvoicePaymentResponse>

    abstract getInvoicePayment(
        paymentId: string
    ): Observable<Model.InvoicePaymentResponse>

    abstract listInvoicePayments(
        parent: {
            invoiceId: Nullable<string>
            merchantId: Nullable<string>
        },
        pagination: Nullable<Partial<PaginatedQueryParams<Model.InvoicePaymentResponse>>>
    ): Observable<PaginatedResponse<Model.InvoicePaymentResponse>>

    abstract updateInvoicePayment(
        paymentId: string,
        request: Model.UpdateInvoicePaymentRequest
    ): Observable<Model.InvoicePaymentResponse>
    
    abstract deleteInvoicePayment(paymentId: string): Observable<void>
}

export const INVOICE_API_SERVICE = new InjectionToken<InvoiceAPIService>(
    'rewards-network.merchant-net.invoice.api.service'
)
