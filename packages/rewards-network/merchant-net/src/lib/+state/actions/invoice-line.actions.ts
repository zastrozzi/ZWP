import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    ResetRemoteFilters,
    UpdateRemoteFilters,
    createActionType,
    createRemoteActionCRUDMap,
    createRemoteActionGroup,
    createRemoteActionMap,
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const INVOICE_LINE_ACTION_IDENTIFIERS = [
    Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
    Identifiers.INVOICE_LINE_STATE_FEATURE_KEY
]

const updateInvoiceLineFilters = createAction(
    createActionType(INVOICE_LINE_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.InvoiceLineFilters>>()
)

const resetInvoiceLineFilters = createAction(
    createActionType(INVOICE_LINE_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetInvoiceLineState = createAction(
    createActionType(INVOICE_LINE_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseInvoiceLineState = createAction(
    createActionType(INVOICE_LINE_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectInvoiceLine = createAction(
    createActionType(INVOICE_LINE_ACTION_IDENTIFIERS, 'Select InvoiceLine'),
    props<{ lineId: string }>()
)

const deselectInvoiceLine = createAction(
    createActionType(INVOICE_LINE_ACTION_IDENTIFIERS, 'Deselect InvoiceLine')
)

const resetPagination = createAction(
    createActionType(INVOICE_LINE_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const createInvoiceLine = createRemoteActionGroup<
    { invoiceId: string; request: Model.CreateInvoiceLineRequest },
    Model.InvoiceLineResponse
>('Create InvoiceLine', ...INVOICE_LINE_ACTION_IDENTIFIERS)

const getInvoiceLine = createRemoteActionGroup<
    { lineId: string },
    Model.InvoiceLineResponse
>('Get InvoiceLine', ...INVOICE_LINE_ACTION_IDENTIFIERS)

const listInvoiceLines = createRemoteActionGroup<
    { invoiceId: Nullable<string> | 'auto'; merchantId: Nullable<string> | 'auto'; pagination: Nullable<Partial<PaginatedQueryParams<Model.InvoiceLineResponse>>> },
    PaginatedResponse<Model.InvoiceLineResponse>
>('List InvoiceLines', ...INVOICE_LINE_ACTION_IDENTIFIERS)

const updateInvoiceLine = createRemoteActionGroup<
    { lineId: string; update: Model.UpdateInvoiceLineRequest },
    Model.InvoiceLineResponse
>('Update InvoiceLine', ...INVOICE_LINE_ACTION_IDENTIFIERS)

const deleteInvoiceLine = createRemoteActionGroup<
    { lineId: string },
    { lineId: string }
>('Delete InvoiceLine', ...INVOICE_LINE_ACTION_IDENTIFIERS)

export const InvoiceLineLocalActions = {
    updateInvoiceLineFilters,
    resetInvoiceLineFilters,
    resetInvoiceLineState,
    initialiseInvoiceLineState,
    selectInvoiceLine,
    deselectInvoiceLine,
    resetPagination
}

export const InvoiceLineRemoteActions = createRemoteActionCRUDMap(
    INVOICE_LINE_ACTION_IDENTIFIERS,
    {
        create: createInvoiceLine,
        get: getInvoiceLine,
        list: listInvoiceLines,
        update: updateInvoiceLine,
        delete: deleteInvoiceLine
    }
)