import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectRemoteState } from '@zwp/platform.common'
import { MerchantSelectors } from './merchant.selectors'

const selectInvoiceState = createFeatureSelector<Reducers.InvoiceFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
        Identifiers.INVOICE_STATE_FEATURE_KEY
    )
)
const selectInvoiceFilters = createSelector(selectInvoiceState, (state) => state.filters)
const selectInvoiceRemotePagination = createSelector(selectInvoiceState, (state) => state.invoicesRemotePagination)
const selectInvoiceRemoteState = createSelector(selectInvoiceState, selectRemoteState)

const selectSelectedInvoiceId = createSelector(selectInvoiceState, (state) => state.selectedInvoiceId)

const invoiceEntitySelectors = Reducers.invoiceEntityAdapter.getSelectors()
const selectInvoiceEntityState = createSelector(selectInvoiceState, (state) => state.invoices)
const selectInvoiceIds = createSelector(selectInvoiceEntityState, invoiceEntitySelectors.selectIds)
const selectInvoiceEntities = createSelector(selectInvoiceEntityState, invoiceEntitySelectors.selectEntities)
const selectAllInvoices = createSelector(selectInvoiceEntityState, invoiceEntitySelectors.selectAll)
const selectInvoiceTotal = createSelector(selectInvoiceEntityState, invoiceEntitySelectors.selectTotal)
const selectInvoiceById = (id: string) => createSelector(selectInvoiceEntities, (entities) => entities[id])

const selectedInvoice = createSelector(
    selectInvoiceEntities,
    selectSelectedInvoiceId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectInvoicesForSelectedMerchant = createSelector(
    MerchantSelectors.selectSelectedMerchantId,
    selectAllInvoices,
    (merchantId, invoices) => invoices.filter(invoice => invoice.merchantId === merchantId)
)

export const InvoiceSelectors = {
    selectInvoiceState,
    selectInvoiceFilters,
    selectInvoiceRemotePagination,
    selectInvoiceRemoteState,

    selectSelectedInvoiceId,
    
    invoiceEntitySelectors,
    selectInvoiceEntityState,
    selectInvoiceIds,
    selectInvoiceEntities,
    selectAllInvoices,
    selectInvoiceTotal,
    selectInvoiceById,
    selectedInvoice,

    selectInvoicesForSelectedMerchant
}
