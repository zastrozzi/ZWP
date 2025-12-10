import { inject, Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from "@zwp/platform.common";
import { InvoiceLineLocalActions, InvoiceLineRemoteActions, InvoiceLocalActions, InvoiceRemoteActions, InvoicePaymentLocalActions, InvoicePaymentRemoteActions } from '../actions';
import { Selectors } from '../selectors'
import { Model } from "../../model";

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'InvoiceFacade', options: { skipMethodDebugger: true } })
export class InvoiceFacade {
    private store = inject(Store)

    invoiceFilters$ = this.store.pipe(select(Selectors.InvoiceSelectors.selectInvoiceFilters))
    invoiceRemotePagination$ = this.store.pipe(select(Selectors.InvoiceSelectors.selectInvoiceRemotePagination))
    invoiceRemoteState$ = this.store.pipe(select(Selectors.InvoiceSelectors.selectInvoiceRemoteState))

    invoiceLineFilters$ = this.store.pipe(select(Selectors.InvoiceLineSelectors.selectInvoiceLineFilters))
    invoiceLineRemotePagination$ = this.store.pipe(select(Selectors.InvoiceLineSelectors.selectInvoiceLineRemotePagination))
    invoiceLineRemoteState$ = this.store.pipe(select(Selectors.InvoiceLineSelectors.selectInvoiceLineRemoteState))

    invoicePaymentFilters$ = this.store.pipe(select(Selectors.InvoicePaymentSelectors.selectInvoicePaymentFilters))
    invoicePaymentRemotePagination$ = this.store.pipe(select(Selectors.InvoicePaymentSelectors.selectInvoicePaymentRemotePagination))
    invoicePaymentRemoteState$ = this.store.pipe(select(Selectors.InvoicePaymentSelectors.selectInvoicePaymentRemoteState))

    invoices$ = this.store.pipe(select(Selectors.InvoiceSelectors.selectAllInvoices))
    selectedInvoice$ = this.store.pipe(select(Selectors.InvoiceSelectors.selectedInvoice))
    selectedInvoiceId$ = this.store.pipe(select(Selectors.InvoiceSelectors.selectSelectedInvoiceId))
    invoicesForSelectedMerchant$ = this.store.pipe(select(Selectors.InvoiceSelectors.selectInvoicesForSelectedMerchant))

    invoiceLines$ = this.store.pipe(select(Selectors.InvoiceLineSelectors.selectAllInvoiceLines))
    selectedInvoiceLine$ = this.store.pipe(select(Selectors.InvoiceLineSelectors.selectedInvoiceLine))
    selectedInvoiceLineId$ = this.store.pipe(select(Selectors.InvoiceLineSelectors.selectSelectedInvoiceLineId))
    invoiceLinesForSelectedInvoice$ = this.store.pipe(select(Selectors.InvoiceLineSelectors.selectInvoiceLinesForSelectedInvoice))

    invoicePayments$ = this.store.pipe(select(Selectors.InvoicePaymentSelectors.selectAllInvoicePayments))
    selectedInvoicePayment$ = this.store.pipe(select(Selectors.InvoicePaymentSelectors.selectedInvoicePayment))
    selectedInvoicePaymentId$ = this.store.pipe(select(Selectors.InvoicePaymentSelectors.selectSelectedInvoicePaymentId))
    invoicePaymentsForSelectedInvoice$ = this.store.pipe(select(Selectors.InvoicePaymentSelectors.selectInvoicePaymentsForSelectedInvoice))

    invoiceById$ = (id: string) => this.store.pipe(select(Selectors.InvoiceSelectors.selectInvoiceById(id)))
    invoiceLineById$ = (id: string) => this.store.pipe(select(Selectors.InvoiceLineSelectors.selectInvoiceLineById(id)))
    invoicePaymentById$ = (id: string) => this.store.pipe(select(Selectors.InvoicePaymentSelectors.selectInvoicePaymentById(id)))
    
    createInvoice(merchantId: string, request: Model.CreateInvoiceRequest) {
        return this.store.dispatch(InvoiceRemoteActions.create.request({merchantId, request}))
    }

    getInvoice(invoiceId: string) {
        return this.store.dispatch(InvoiceRemoteActions.get.request({ invoiceId }))
    }

    listInvoices(merchantId: Nullable<string> | 'auto' = null, pagination: Nullable<Partial<PaginatedQueryParams<Model.InvoiceResponse>>> = null) {
        return this.store.dispatch(InvoiceRemoteActions.list.request({ merchantId, pagination }))
    }

    selectInvoice(invoiceId: string) {
        return this.store.dispatch(InvoiceLocalActions.selectInvoice({ invoiceId }))
    }

    updateInvoice(invoiceId: string, update: Model.UpdateInvoiceRequest) {
        return this.store.dispatch(InvoiceRemoteActions.update.request({ invoiceId, update }))
    }

    deleteInvoice(invoiceId: string) {
        return this.store.dispatch(InvoiceRemoteActions.delete.request({ invoiceId }))
    }

    updateInvoiceFilters(filters: Partial<Model.Filters.InvoiceFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(InvoiceLocalActions.updateInvoiceFilters({ filters, triggerRemoteFetch }))
    }

    resetInvoiceFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(InvoiceLocalActions.resetInvoiceFilters({ triggerRemoteFetch }))
    }

    resetInvoicePagination() {
        return this.store.dispatch(InvoiceLocalActions.resetPagination())
    }

    createInvoiceLine(invoiceId: string, request: Model.CreateInvoiceLineRequest) {
        return this.store.dispatch(InvoiceLineRemoteActions.create.request({invoiceId, request}))
    }

    getInvoiceLine(lineId: string) {
        return this.store.dispatch(InvoiceLineRemoteActions.get.request({ lineId }))
    }

    listInvoiceLines(invoiceId: Nullable<string> | 'auto' = null, merchantId: Nullable<string> | 'auto' = null, pagination: Nullable<Partial<PaginatedQueryParams<Model.InvoiceLineResponse>>> = null) {
        return this.store.dispatch(InvoiceLineRemoteActions.list.request({ invoiceId, merchantId, pagination }))
    }

    selectInvoiceLine(lineId: string) {
        return this.store.dispatch(InvoiceLineLocalActions.selectInvoiceLine({ lineId }))
    }

    updateInvoiceLine(lineId: string, update: Model.UpdateInvoiceLineRequest) {
        return this.store.dispatch(InvoiceLineRemoteActions.update.request({ lineId, update }))
    }

    deleteInvoiceLine(lineId: string) {
        return this.store.dispatch(InvoiceLineRemoteActions.delete.request({ lineId }))
    }

    updateInvoiceLineFilters(filters: Partial<Model.Filters.InvoiceLineFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(InvoiceLineLocalActions.updateInvoiceLineFilters({ filters, triggerRemoteFetch }))
    }

    resetInvoiceLineFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(InvoiceLineLocalActions.resetInvoiceLineFilters({ triggerRemoteFetch }))
    }

    createInvoicePayment(invoiceId: string, request: Model.CreateInvoicePaymentRequest) {
        return this.store.dispatch(InvoicePaymentRemoteActions.create.request({invoiceId, request}))
    }

    getInvoicePayment(paymentId: string) {
        return this.store.dispatch(InvoicePaymentRemoteActions.get.request({ paymentId }))
    }

    listInvoicePayments(invoiceId: Nullable<string> | 'auto' = null, merchantId: Nullable<string> | 'auto' = null, pagination: Nullable<Partial<PaginatedQueryParams<Model.InvoicePaymentResponse>>> = null) {
        return this.store.dispatch(InvoicePaymentRemoteActions.list.request({ invoiceId, merchantId, pagination }))
    }

    selectInvoicePayment(paymentId: string) {
        return this.store.dispatch(InvoicePaymentLocalActions.selectInvoicePayment({ paymentId }))
    }

    updateInvoicePayment(paymentId: string, update: Model.UpdateInvoicePaymentRequest) {
        return this.store.dispatch(InvoicePaymentRemoteActions.update.request({ paymentId, update }))
    }

    deleteInvoicePayment(paymentId: string) {
        return this.store.dispatch(InvoicePaymentRemoteActions.delete.request({ paymentId }))
    }

    updateInvoicePaymentFilters(filters: Partial<Model.Filters.InvoicePaymentFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(InvoicePaymentLocalActions.updateInvoicePaymentFilters({ filters, triggerRemoteFetch }))
    }

    resetInvoicePaymentFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(InvoicePaymentLocalActions.resetInvoicePaymentFilters({ triggerRemoteFetch }))
    }
}