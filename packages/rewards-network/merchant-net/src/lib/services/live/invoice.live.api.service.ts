import { Injectable, inject } from '@angular/core'
import { Model } from '../../model'
import {
    HTTPMethod,
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    createHTTPParams,
    serialiseDateQueryFilter,
    serialiseEnumQueryFilter,
    serialiseNumberQueryFilter,
    serialisePaginatedQueryParams,
    serialiseStringQueryFilter,
    upsertHTTPParams,
} from '@zwp/platform.common'
import { Observable, map, take, throwError } from 'rxjs'
import { InvoiceAPIService } from '../abstract'
import { APIRoutes } from '../../api-routes'
import { MERCHANT_NET_API_BASE_URL, MERCHANT_NET_API_CONFIG } from '../../config'
import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'InvoiceLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class InvoiceLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements InvoiceAPIService
{
    private config = inject(MERCHANT_NET_API_CONFIG)
    private baseUrl = inject(MERCHANT_NET_API_BASE_URL)
    private invoiceFacade = inject(Facades.InvoiceFacade)

    createInvoice(
        merchantId: string,
        request: Model.CreateInvoiceRequest
    ): Observable<Model.InvoiceResponse> {
        const path = APIRoutes.merchantRoutes(this.baseUrl)
            .invoiceRoutesForMerchant(merchantId)
            .createInvoice()
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.POST,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }

    getInvoice(invoiceId: string): Observable<Model.InvoiceResponse> {
        const path = APIRoutes.invoiceRoutes(this.baseUrl).getInvoice(
            invoiceId
        )
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    listInvoices(
        merchantId: Nullable<string> = null,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.InvoiceResponse>>> = null
    ): Observable<PaginatedResponse<Model.InvoiceResponse>> {
        let path: string
        if (merchantId) {
            path = APIRoutes.merchantRoutes(this.baseUrl)
                .invoiceRoutesForMerchant(merchantId)
                .listInvoices()
        } else {
            path = APIRoutes.invoiceRoutes(this.baseUrl).listInvoices()
        }
        let params = serialisePaginatedQueryParams(
            pagination,
            this.invoiceFacade.invoiceRemotePagination$
        )
        this.invoiceFacade.invoiceFilters$
            .pipe(
                take(1),
                map((filters) => {
                    if (filters.dbCreatedAt) {
                        params = upsertHTTPParams(
                            params,
                            serialiseDateQueryFilter(
                                'db_created_at',
                                filters.dbCreatedAt
                            )
                        )
                    }
                    if (filters.dbUpdatedAt) {
                        params = upsertHTTPParams(
                            params,
                            serialiseDateQueryFilter(
                                'db_updated_at',
                                filters.dbUpdatedAt
                            )
                        )
                    }
                    if (filters.dbDeletedAt) {
                        params = upsertHTTPParams(
                            params,
                            serialiseDateQueryFilter(
                                'db_deleted_at',
                                filters.dbDeletedAt
                            )
                        )
                    }
                    if (filters.invoiceNumber) {
                        params = upsertHTTPParams(
                            params,
                            serialiseStringQueryFilter(
                                'invoice_number',
                                filters.invoiceNumber
                            )
                        )
                    }
                    if (filters.invoiceStatus) {
                        params = upsertHTTPParams(
                            params,
                            serialiseEnumQueryFilter(
                                'invoice_status',
                                filters.invoiceStatus
                            )
                        )
                    }
                    if (filters.invoiceDate) {
                        params = upsertHTTPParams(
                            params,
                            serialiseDateQueryFilter(
                                'invoice_date',
                                filters.invoiceDate
                            )
                        )
                    }
                    if (filters.dueDate) {
                        params = upsertHTTPParams(
                            params,
                            serialiseDateQueryFilter(
                                'due_date',
                                filters.dueDate
                            )
                        )
                    }
                })
            )
            .subscribe()
            .unsubscribe()
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader(),
            params
        )
    }

    updateInvoice(
        invoiceId: string,
        request: Model.UpdateInvoiceRequest
    ): Observable<Model.InvoiceResponse> {
        const path = APIRoutes.invoiceRoutes(this.baseUrl).updateInvoice(
            invoiceId
        )
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.PUT,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }

    deleteInvoice(invoiceId: string): Observable<void> {
        const path = APIRoutes.invoiceRoutes(this.baseUrl).deleteInvoice(
            invoiceId
        )
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.DELETE,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    createInvoiceLine(
        invoiceId: string,
        request: Model.CreateInvoiceLineRequest
    ): Observable<Model.InvoiceLineResponse> {
        const path = APIRoutes.invoiceRoutes(this.baseUrl)
            .invoiceLineRoutesForInvoice(invoiceId)
            .createInvoiceLine()
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.POST,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }

    getInvoiceLine(lineId: string): Observable<Model.InvoiceLineResponse> {
        const path = APIRoutes.invoiceLineRoutes(
            this.baseUrl
        ).getInvoiceLine(lineId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    listInvoiceLines(
        parent: { invoiceId: Nullable<string>; merchantId: Nullable<string> },
        pagination: Nullable<Partial<PaginatedQueryParams<Model.InvoiceLineResponse>>> = null
    ): Observable<PaginatedResponse<Model.InvoiceLineResponse>> {
        let path: string
        if (parent.invoiceId) {
            path = APIRoutes.invoiceRoutes(this.baseUrl)
                .invoiceLineRoutesForInvoice(parent.invoiceId)
                .listInvoiceLines()
        } else if (parent.merchantId) {
            path = APIRoutes.merchantRoutes(this.baseUrl)
                .invoiceRoutesForMerchant(parent.merchantId)
                .invoiceLineRoutesForMerchant()
                .listInvoiceLines()
        } else {
            path = APIRoutes.invoiceLineRoutes(
                this.baseUrl
            ).listInvoiceLines()
        }
        let params = serialisePaginatedQueryParams(
            pagination,
            this.invoiceFacade.invoiceLineRemotePagination$
        )
        this.invoiceFacade.invoiceLineFilters$
            .pipe(
                take(1),
                map((filters) => {
                    if (filters.dbCreatedAt) {
                        params = upsertHTTPParams(
                            params,
                            serialiseDateQueryFilter(
                                'db_created_at',
                                filters.dbCreatedAt
                            )
                        )
                    }
                    if (filters.dbUpdatedAt) {
                        params = upsertHTTPParams(
                            params,
                            serialiseDateQueryFilter(
                                'db_updated_at',
                                filters.dbUpdatedAt
                            )
                        )
                    }
                    if (filters.dbDeletedAt) {
                        params = upsertHTTPParams(
                            params,
                            serialiseDateQueryFilter(
                                'db_deleted_at',
                                filters.dbDeletedAt
                            )
                        )
                    }
                    if (filters.category) {
                        params = upsertHTTPParams(
                            params,
                            serialiseEnumQueryFilter(
                                'category',
                                filters.category
                            )
                        )
                    }
                    if (filters.lineValueAmount) {
                        params = upsertHTTPParams(
                            params,
                            serialiseNumberQueryFilter(
                                'line_value_amount',
                                filters.lineValueAmount
                            )
                        )
                    }
                    if (filters.lineValueCurrency) {
                        params = upsertHTTPParams(
                            params,
                            serialiseEnumQueryFilter(
                                'line_value_currency',
                                filters.lineValueCurrency
                            )
                        )
                    }
                })
            )
            .subscribe()
            .unsubscribe()
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader(),
            params
        )
    }

    updateInvoiceLine(
        lineId: string,
        request: Model.UpdateInvoiceLineRequest
    ): Observable<Model.InvoiceLineResponse> {
        const path = APIRoutes.invoiceLineRoutes(
            this.baseUrl
        ).updateInvoiceLine(lineId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.PUT,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }

    deleteInvoiceLine(lineId: string): Observable<void> {
        const path = APIRoutes.invoiceLineRoutes(
            this.baseUrl
        ).deleteInvoiceLine(lineId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.DELETE,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    createInvoicePayment(
        invoiceId: string,
        request: Model.CreateInvoicePaymentRequest
    ): Observable<Model.InvoicePaymentResponse> {
        const path = APIRoutes.invoiceRoutes(this.baseUrl)
            .invoicePaymentRoutesForInvoice(invoiceId)
            .createInvoicePayment()
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.POST,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }

    getInvoicePayment(
        paymentId: string
    ): Observable<Model.InvoicePaymentResponse> {
        const path = APIRoutes.invoicePaymentRoutes(
            this.baseUrl
        ).getInvoicePayment(paymentId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    listInvoicePayments(
        parent: { invoiceId: Nullable<string>; merchantId: Nullable<string> },
        pagination: Nullable<Partial<PaginatedQueryParams<Model.InvoicePaymentResponse>>> = null
    ): Observable<PaginatedResponse<Model.InvoicePaymentResponse>> {
        let path: string
        if (parent.invoiceId) {
            path = APIRoutes.invoiceRoutes(this.baseUrl)
                .invoicePaymentRoutesForInvoice(parent.invoiceId)
                .listInvoicePayments()
        } else if (parent.merchantId) {
            path = APIRoutes.merchantRoutes(this.baseUrl)
                .invoiceRoutesForMerchant(parent.merchantId)
                .invoicePaymentRoutesForMerchant()
                .listInvoicePayments()
        } else {
            path = APIRoutes.invoicePaymentRoutes(
                this.baseUrl
            ).listInvoicePayments()
        }
        let params = serialisePaginatedQueryParams(
            pagination,
            this.invoiceFacade.invoicePaymentRemotePagination$
        )
        this.invoiceFacade.invoicePaymentFilters$
            .pipe(
                take(1),
                map((filters) => {
                    if (filters.dbCreatedAt) {
                        params = upsertHTTPParams(
                            params,
                            serialiseDateQueryFilter(
                                'db_created_at',
                                filters.dbCreatedAt
                            )
                        )
                    }
                    if (filters.dbUpdatedAt) {
                        params = upsertHTTPParams(
                            params,
                            serialiseDateQueryFilter(
                                'db_updated_at',
                                filters.dbUpdatedAt
                            )
                        )
                    }
                    if (filters.dbDeletedAt) {
                        params = upsertHTTPParams(
                            params,
                            serialiseDateQueryFilter(
                                'db_deleted_at',
                                filters.dbDeletedAt
                            )
                        )
                    }
                    if (filters.paymentValueAmount) {
                        params = upsertHTTPParams(
                            params,
                            serialiseNumberQueryFilter(
                                'payment_value_amount',
                                filters.paymentValueAmount
                            )
                        )
                    }
                    if (filters.paymentValueCurrency) {
                        params = upsertHTTPParams(
                            params,
                            serialiseEnumQueryFilter(
                                'payment_value_currency',
                                filters.paymentValueCurrency
                            )
                        )
                    }
                    if (filters.paymentStatus) {
                        params = upsertHTTPParams(
                            params,
                            serialiseEnumQueryFilter(
                                'payment_status',
                                filters.paymentStatus
                            )
                        )
                    }
                    if (filters.paymentMethod) {
                        params = upsertHTTPParams(
                            params,
                            serialiseEnumQueryFilter(
                                'payment_method',
                                filters.paymentMethod
                            )
                        )
                    }
                    if (filters.paymentDate) {
                        params = upsertHTTPParams(
                            params,
                            serialiseDateQueryFilter(
                                'payment_date',
                                filters.paymentDate
                            )
                        )
                    }
                    if (filters.paymentReference) {
                        params = upsertHTTPParams(
                            params,
                            serialiseStringQueryFilter(
                                'payment_reference',
                                filters.paymentReference
                            )
                        )
                    }
                })
            )
            .subscribe()
            .unsubscribe()
        return this.accessTokenAuthedRequest(HTTPMethod.GET, path, null, params)
    }

    updateInvoicePayment(
        paymentId: string,
        request: Model.UpdateInvoicePaymentRequest
    ): Observable<Model.InvoicePaymentResponse> {
        const path = APIRoutes.invoicePaymentRoutes(
            this.baseUrl
        ).updateInvoicePayment(paymentId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.PUT,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }

    deleteInvoicePayment(paymentId: string): Observable<void> {
        const path = APIRoutes.invoicePaymentRoutes(
            this.baseUrl
        ).deleteInvoicePayment(paymentId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.DELETE,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }
}
