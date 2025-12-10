import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { InvoicePaymentLocalActions, InvoicePaymentRemoteActions } from '../actions'
import { debounceTime, filter, map } from 'rxjs'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'InvoicePaymentEffects', options: { skipMethodDebugger: true } })
export class InvoicePaymentEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private invoiceAPI = inject(Services.INVOICE_API_SERVICE)

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...InvoicePaymentRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(InvoicePaymentRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...InvoicePaymentRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(InvoicePaymentRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...InvoicePaymentRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(InvoicePaymentRemoteActions.identifiers)({ error: action.error }))
    ))

    createInvoicePayment$ = createRemoteEffect(
        this.actions$,
        InvoicePaymentRemoteActions.create,
        (action) => this.invoiceAPI.createInvoicePayment(action.invoiceId, action.request)
    )

    getInvoicePayment$ = createRemoteEffect(
        this.actions$,
        InvoicePaymentRemoteActions.get,
        (action) => this.invoiceAPI.getInvoicePayment(action.paymentId)
    )

    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            InvoicePaymentLocalActions.updateInvoicePaymentFilters, 
            InvoicePaymentLocalActions.resetInvoicePaymentFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        debounceTime(200),
        map(() => InvoicePaymentRemoteActions.list.request({ invoiceId: null, merchantId: null, pagination: null }))
    ))

    listInvoicePayments$ = createRemoteEffect(
        this.actions$,
        InvoicePaymentRemoteActions.list,
        (action) => this.invoiceAPI.listInvoicePayments({ invoiceId: action.invoiceId, merchantId: action.merchantId }, action.pagination)
    )

    updateInvoicePayment$ = createRemoteEffect(
        this.actions$,
        InvoicePaymentRemoteActions.update,
        (action) => this.invoiceAPI.updateInvoicePayment(action.paymentId, action.update)
    )

    deleteInvoicePayment$ = createRemoteEffect(
        this.actions$,
        InvoicePaymentRemoteActions.delete,
        (action) => this.invoiceAPI.deleteInvoicePayment(action.paymentId),
        (action) => ({ paymentId: action.paymentId })

    )

    ngrxOnInitEffects() {
        return InvoicePaymentLocalActions.initialiseInvoicePaymentState()
    }
}