import { Injectable } from '@angular/core'
import { Model } from '../../model'
import {
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { InvoiceAPIService } from '../abstract'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'InvoiceMockAPIService', options: { skipMethodDebugger: true } })
export class InvoiceMockAPIService implements InvoiceAPIService {
    createInvoice(_merchantId: string, _request: Model.CreateInvoiceRequest): Observable<Model.InvoiceResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    getInvoice(_invoiceId: string): Observable<Model.InvoiceResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listInvoices(_merchantId: Nullable<string>, _pagination: Nullable<Partial<PaginatedQueryParams<Model.InvoiceResponse>>>): Observable<PaginatedResponse<Model.InvoiceResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    updateInvoice(_invoiceId: string, _request: Model.UpdateInvoiceRequest): Observable<Model.InvoiceResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteInvoice(_invoiceId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }

    createInvoiceLine(_invoiceId: string, _request: Model.CreateInvoiceLineRequest): Observable<Model.InvoiceLineResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    getInvoiceLine(_lineId: string): Observable<Model.InvoiceLineResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listInvoiceLines(_parent: { invoiceId: Nullable<string>; merchantId: Nullable<string> }, _pagination: Nullable<Partial<PaginatedQueryParams<Model.InvoiceLineResponse>>>): Observable<PaginatedResponse<Model.InvoiceLineResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    updateInvoiceLine(_lineId: string, _request: Model.UpdateInvoiceLineRequest): Observable<Model.InvoiceLineResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteInvoiceLine(_lineId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }

    createInvoicePayment(_invoiceId: string, _request: Model.CreateInvoicePaymentRequest): Observable<Model.InvoicePaymentResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    getInvoicePayment(_paymentId: string): Observable<Model.InvoicePaymentResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listInvoicePayments(_parent: { invoiceId: Nullable<string>; merchantId: Nullable<string> }, _pagination: Nullable<Partial<PaginatedQueryParams<Model.InvoicePaymentResponse>>>): Observable<PaginatedResponse<Model.InvoicePaymentResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    updateInvoicePayment(_paymentId: string, _request: Model.UpdateInvoicePaymentRequest): Observable<Model.InvoicePaymentResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteInvoicePayment(_paymentId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }
}