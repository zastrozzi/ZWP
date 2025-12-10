import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectRemoteState } from '@zwp/platform.common'
import { InvoiceSelectors } from './invoice.selectors'

const selectInvoiceLineState = createFeatureSelector<Reducers.InvoiceLineFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
        Identifiers.INVOICE_LINE_STATE_FEATURE_KEY
    )
)
const selectInvoiceLineFilters = createSelector(selectInvoiceLineState, (state) => state.filters)
const selectInvoiceLineRemotePagination = createSelector(selectInvoiceLineState, (state) => state.invoiceLinesRemotePagination)
const selectInvoiceLineRemoteState = createSelector(selectInvoiceLineState, selectRemoteState)

const selectSelectedInvoiceLineId = createSelector(selectInvoiceLineState, (state) => state.selectedInvoiceLineId)

const invoiceLineEntitySelectors = Reducers.invoiceLineEntityAdapter.getSelectors()
const selectInvoiceLineEntityState = createSelector(selectInvoiceLineState, (state) => state.invoiceLines)
const selectInvoiceLineIds = createSelector(selectInvoiceLineEntityState, invoiceLineEntitySelectors.selectIds)
const selectInvoiceLineEntities = createSelector(selectInvoiceLineEntityState, invoiceLineEntitySelectors.selectEntities)
const selectAllInvoiceLines = createSelector(selectInvoiceLineEntityState, invoiceLineEntitySelectors.selectAll)
const selectInvoiceLineTotal = createSelector(selectInvoiceLineEntityState, invoiceLineEntitySelectors.selectTotal)
const selectInvoiceLineById = (id: string) => createSelector(selectInvoiceLineEntities, (entities) => entities[id])

const selectedInvoiceLine = createSelector(
    selectInvoiceLineEntities,
    selectSelectedInvoiceLineId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectInvoiceLinesForSelectedInvoice = createSelector(
    InvoiceSelectors.selectSelectedInvoiceId,
    selectAllInvoiceLines,
    (invoiceId, invoiceLines) => invoiceLines.filter(invoiceLine => invoiceLine.invoiceId === invoiceId)
)

export const InvoiceLineSelectors = {
    selectInvoiceLineState,
    selectInvoiceLineFilters,
    selectInvoiceLineRemotePagination,
    selectInvoiceLineRemoteState,

    selectSelectedInvoiceLineId,
    
    invoiceLineEntitySelectors,
    selectInvoiceLineEntityState,
    selectInvoiceLineIds,
    selectInvoiceLineEntities,
    selectAllInvoiceLines,
    selectInvoiceLineTotal,
    selectInvoiceLineById,
    selectedInvoiceLine,

    selectInvoiceLinesForSelectedInvoice
}
