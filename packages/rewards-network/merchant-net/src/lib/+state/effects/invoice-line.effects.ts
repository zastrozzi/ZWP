import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { InvoiceLineLocalActions, InvoiceLineRemoteActions } from '../actions'
import { debounceTime, filter, map, of, switchMap, withLatestFrom } from 'rxjs'
import { Facades } from '../facades'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'InvoiceLineEffects', options: { skipMethodDebugger: true } })
export class InvoiceLineEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private invoiceAPI = inject(Services.INVOICE_API_SERVICE)
    private invoiceFacade = inject(Facades.InvoiceFacade)
    private merchantFacade = inject(Facades.MerchantFacade)

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...InvoiceLineRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(InvoiceLineRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...InvoiceLineRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(InvoiceLineRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...InvoiceLineRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(InvoiceLineRemoteActions.identifiers)({ error: action.error }))
    ))

    createInvoiceLine$ = createRemoteEffect(
        this.actions$,
        InvoiceLineRemoteActions.create,
        (action) => this.invoiceAPI.createInvoiceLine(action.invoiceId, action.request)
    )

    getInvoiceLine$ = createRemoteEffect(
        this.actions$,
        InvoiceLineRemoteActions.get,
        (action) => this.invoiceAPI.getInvoiceLine(action.lineId)
    )

    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            InvoiceLineLocalActions.updateInvoiceLineFilters, 
            InvoiceLineLocalActions.resetInvoiceLineFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        debounceTime(200),
        map(() => InvoiceLineRemoteActions.list.request({ invoiceId: 'auto', merchantId: 'auto', pagination: null }))
    ))

    listInvoiceLines$ = createRemoteEffect(
        this.actions$,
        InvoiceLineRemoteActions.list,
        (action) => of(action).pipe(
            withLatestFrom(
                this.invoiceFacade.selectedInvoiceId$,
                this.merchantFacade.selectedMerchantId$
            ),
            switchMap(([action, invoiceId, merchantId]) => {
                return this.invoiceAPI.listInvoiceLines({ 
                    invoiceId: action.invoiceId === 'auto' ? invoiceId : action.invoiceId, 
                    merchantId: action.merchantId === 'auto' ? merchantId : action.merchantId
                }, action.pagination)
            })
        )
    )

    updateInvoiceLine$ = createRemoteEffect(
        this.actions$,
        InvoiceLineRemoteActions.update,
        (action) => this.invoiceAPI.updateInvoiceLine(action.lineId, action.update)
    )

    deleteInvoiceLine$ = createRemoteEffect(
        this.actions$,
        InvoiceLineRemoteActions.delete,
        (action) => this.invoiceAPI.deleteInvoiceLine(action.lineId),
        (action) => ({ lineId: action.lineId })

    )

    ngrxOnInitEffects() {
        return InvoiceLineLocalActions.initialiseInvoiceLineState()
    }
}