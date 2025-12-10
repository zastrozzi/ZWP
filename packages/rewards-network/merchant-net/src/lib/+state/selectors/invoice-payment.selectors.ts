import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectRemoteState } from '@zwp/platform.common'
import { InvoiceSelectors } from './invoice.selectors'

const selectInvoicePaymentState = createFeatureSelector<Reducers.InvoicePaymentFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
        Identifiers.INVOICE_PAYMENT_STATE_FEATURE_KEY
    )
)
const selectInvoicePaymentFilters = createSelector(selectInvoicePaymentState, (state) => state.filters)
const selectInvoicePaymentRemotePagination = createSelector(selectInvoicePaymentState, (state) => state.invoicePaymentsRemotePagination)
const selectInvoicePaymentRemoteState = createSelector(selectInvoicePaymentState, selectRemoteState)

const selectSelectedInvoicePaymentId = createSelector(selectInvoicePaymentState, (state) => state.selectedInvoicePaymentId)

const invoicePaymentEntitySelectors = Reducers.invoicePaymentEntityAdapter.getSelectors()
const selectInvoicePaymentEntityState = createSelector(selectInvoicePaymentState, (state) => state.invoicePayments)
const selectInvoicePaymentIds = createSelector(selectInvoicePaymentEntityState, invoicePaymentEntitySelectors.selectIds)
const selectInvoicePaymentEntities = createSelector(selectInvoicePaymentEntityState, invoicePaymentEntitySelectors.selectEntities)
const selectAllInvoicePayments = createSelector(selectInvoicePaymentEntityState, invoicePaymentEntitySelectors.selectAll)
const selectInvoicePaymentTotal = createSelector(selectInvoicePaymentEntityState, invoicePaymentEntitySelectors.selectTotal)
const selectInvoicePaymentById = (id: string) => createSelector(selectInvoicePaymentEntities, (entities) => entities[id])

const selectedInvoicePayment = createSelector(
    selectInvoicePaymentEntities,
    selectSelectedInvoicePaymentId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectInvoicePaymentsForSelectedInvoice = createSelector(
    InvoiceSelectors.selectSelectedInvoiceId,
    selectAllInvoicePayments,
    (invoiceId, invoicePayments) => invoicePayments.filter(invoicePayment => invoicePayment.invoiceId === invoiceId)
)

export const InvoicePaymentSelectors = {
    selectInvoicePaymentState,
    selectInvoicePaymentFilters,
    selectInvoicePaymentRemotePagination,
    selectInvoicePaymentRemoteState,

    selectSelectedInvoicePaymentId,
    
    invoicePaymentEntitySelectors,
    selectInvoicePaymentEntityState,
    selectInvoicePaymentIds,
    selectInvoicePaymentEntities,
    selectAllInvoicePayments,
    selectInvoicePaymentTotal,
    selectInvoicePaymentById,
    selectedInvoicePayment,

    selectInvoicePaymentsForSelectedInvoice
}
