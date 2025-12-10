import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { InvoiceLocalActions, InvoiceRemoteActions } from '../actions'
import { debounceTime, filter, map, of, switchMap, withLatestFrom } from 'rxjs'
import { Facades } from '../facades'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'InvoiceEffects', options: { skipMethodDebugger: true } })
export class InvoiceEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private invoiceAPI = inject(Services.INVOICE_API_SERVICE)
    private merchantFacade = inject(Facades.MerchantFacade)

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...InvoiceRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(InvoiceRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...InvoiceRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(InvoiceRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...InvoiceRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(InvoiceRemoteActions.identifiers)({ error: action.error }))
    ))

    createInvoice$ = createRemoteEffect(
        this.actions$,
        InvoiceRemoteActions.create,
        (action) => this.invoiceAPI.createInvoice(action.merchantId, action.request)
    )

    getInvoice$ = createRemoteEffect(
        this.actions$,
        InvoiceRemoteActions.get,
        (action) => this.invoiceAPI.getInvoice(action.invoiceId)
    )

    selectInvoice$ = createEffect(() => this.actions$.pipe(
        ofType(InvoiceLocalActions.selectInvoice),
        map((action) => InvoiceRemoteActions.get.request({ invoiceId: action.invoiceId }))
    ))

    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            InvoiceLocalActions.updateInvoiceFilters, 
            InvoiceLocalActions.resetInvoiceFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        debounceTime(200),
        map(() => InvoiceRemoteActions.list.request({ merchantId: 'auto', pagination: null }))
    ))

    listInvoices$ = createRemoteEffect(
        this.actions$,
        InvoiceRemoteActions.list,
        (action) => of(action).pipe(
            withLatestFrom(this.merchantFacade.selectedMerchantId$),
            switchMap(([action, merchantId]) => {
                return this.invoiceAPI.listInvoices(action.merchantId === 'auto' ? merchantId : action.merchantId, action.pagination)
            })
        )
    )

    updateInvoice$ = createRemoteEffect(
        this.actions$,
        InvoiceRemoteActions.update,
        (action) => this.invoiceAPI.updateInvoice(action.invoiceId, action.update)
    )

    deleteInvoice$ = createRemoteEffect(
        this.actions$,
        InvoiceRemoteActions.delete,
        (action) => this.invoiceAPI.deleteInvoice(action.invoiceId),
        (action) => ({ invoiceId: action.invoiceId })

    )

    ngrxOnInitEffects() {
        return InvoiceLocalActions.initialiseInvoiceState()
    }
}