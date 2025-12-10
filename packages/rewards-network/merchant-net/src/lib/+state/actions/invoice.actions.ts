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

const INVOICE_ACTION_IDENTIFIERS = [
    Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
    Identifiers.INVOICE_STATE_FEATURE_KEY
]

const updateInvoiceFilters = createAction(
    createActionType(INVOICE_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.InvoiceFilters>>()
)

const resetInvoiceFilters = createAction(
    createActionType(INVOICE_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetInvoiceState = createAction(
    createActionType(INVOICE_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseInvoiceState = createAction(
    createActionType(INVOICE_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectInvoice = createAction(
    createActionType(INVOICE_ACTION_IDENTIFIERS, 'Select Invoice'),
    props<{ invoiceId: string }>()
)

const deselectInvoice = createAction(
    createActionType(INVOICE_ACTION_IDENTIFIERS, 'Deselect Invoice')
)

const resetPagination = createAction(
    createActionType(INVOICE_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const createInvoice = createRemoteActionGroup<
    { merchantId: string; request: Model.CreateInvoiceRequest },
    Model.InvoiceResponse
>('Create Invoice', ...INVOICE_ACTION_IDENTIFIERS)

const getInvoice = createRemoteActionGroup<
    { invoiceId: string },
    Model.InvoiceResponse
>('Get Invoice', ...INVOICE_ACTION_IDENTIFIERS)

const listInvoices = createRemoteActionGroup<
    { merchantId: Nullable<string> | 'auto'; pagination: Nullable<Partial<PaginatedQueryParams<Model.InvoiceResponse>>> },
    PaginatedResponse<Model.InvoiceResponse>
>('List Invoices', ...INVOICE_ACTION_IDENTIFIERS)

const updateInvoice = createRemoteActionGroup<
    { invoiceId: string; update: Model.UpdateInvoiceRequest },
    Model.InvoiceResponse
>('Update Invoice', ...INVOICE_ACTION_IDENTIFIERS)

const deleteInvoice = createRemoteActionGroup<
    { invoiceId: string },
    { invoiceId: string }
>('Delete Invoice', ...INVOICE_ACTION_IDENTIFIERS)

export const InvoiceLocalActions = {
    updateInvoiceFilters,
    resetInvoiceFilters,
    resetInvoiceState,
    initialiseInvoiceState,
    selectInvoice,
    deselectInvoice,
    resetPagination
}

export const InvoiceRemoteActions = createRemoteActionCRUDMap(
    INVOICE_ACTION_IDENTIFIERS,
    {
        create: createInvoice,
        get: getInvoice,
        list: listInvoices,
        update: updateInvoice,
        delete: deleteInvoice
    }
)