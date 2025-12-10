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

const INVOICE_PAYMENT_ACTION_IDENTIFIERS = [
    Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
    Identifiers.INVOICE_PAYMENT_STATE_FEATURE_KEY
]

const updateInvoicePaymentFilters = createAction(
    createActionType(INVOICE_PAYMENT_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.InvoicePaymentFilters>>()
)

const resetInvoicePaymentFilters = createAction(
    createActionType(INVOICE_PAYMENT_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetInvoicePaymentState = createAction(
    createActionType(INVOICE_PAYMENT_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseInvoicePaymentState = createAction(
    createActionType(INVOICE_PAYMENT_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectInvoicePayment = createAction(
    createActionType(INVOICE_PAYMENT_ACTION_IDENTIFIERS, 'Select InvoicePayment'),
    props<{ paymentId: string }>()
)

const deselectInvoicePayment = createAction(
    createActionType(INVOICE_PAYMENT_ACTION_IDENTIFIERS, 'Deselect InvoicePayment')
)

const resetPagination = createAction(
    createActionType(INVOICE_PAYMENT_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const createInvoicePayment = createRemoteActionGroup<
    { invoiceId: string; request: Model.CreateInvoicePaymentRequest },
    Model.InvoicePaymentResponse
>('Create InvoicePayment', ...INVOICE_PAYMENT_ACTION_IDENTIFIERS)

const getInvoicePayment = createRemoteActionGroup<
    { paymentId: string },
    Model.InvoicePaymentResponse
>('Get InvoicePayment', ...INVOICE_PAYMENT_ACTION_IDENTIFIERS)

const listInvoicePayments = createRemoteActionGroup<
    { invoiceId: Nullable<string> | 'auto'; merchantId: Nullable<string> | 'auto'; pagination: Nullable<Partial<PaginatedQueryParams<Model.InvoicePaymentResponse>>> },
    PaginatedResponse<Model.InvoicePaymentResponse>
>('List InvoicePayments', ...INVOICE_PAYMENT_ACTION_IDENTIFIERS)

const updateInvoicePayment = createRemoteActionGroup<
    { paymentId: string; update: Model.UpdateInvoicePaymentRequest },
    Model.InvoicePaymentResponse
>('Update InvoicePayment', ...INVOICE_PAYMENT_ACTION_IDENTIFIERS)

const deleteInvoicePayment = createRemoteActionGroup<
    { paymentId: string },
    { paymentId: string }
>('Delete InvoicePayment', ...INVOICE_PAYMENT_ACTION_IDENTIFIERS)

export const InvoicePaymentLocalActions = {
    updateInvoicePaymentFilters,
    resetInvoicePaymentFilters,
    resetInvoicePaymentState,
    initialiseInvoicePaymentState,
    selectInvoicePayment,
    deselectInvoicePayment,
    resetPagination
}

export const InvoicePaymentRemoteActions = createRemoteActionCRUDMap(
    INVOICE_PAYMENT_ACTION_IDENTIFIERS,
    {
        create: createInvoicePayment,
        get: getInvoicePayment,
        list: listInvoicePayments,
        update: updateInvoicePayment,
        delete: deleteInvoicePayment
    }
)