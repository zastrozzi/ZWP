import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { InvoicePaymentLocalActions, InvoicePaymentRemoteActions } from '../actions'
import {
    BaseRemoteFeatureState,
    Nullable,
    RemotePaginationState,
    initialBaseRemoteFeatureState,
    remoteFailureState,
    remoteRequestState,
    remoteStateUpdateFailure,
    remoteStateUpdateRequest,
    remoteStateUpdateSuccess,
    remoteSuccessState,
} from '@zwp/platform.common'

export interface InvoicePaymentFeatureState extends BaseRemoteFeatureState {
    invoicePayments: EntityState<Model.InvoicePaymentResponse>
    selectedInvoicePaymentId: Nullable<string>
    invoicePaymentsRemotePagination: RemotePaginationState<Model.InvoicePaymentResponse>
    filters: Model.Filters.InvoicePaymentFilters
}

export const invoicePaymentEntityAdapter: EntityAdapter<Model.InvoicePaymentResponse> =
    createEntityAdapter<Model.InvoicePaymentResponse>()

export const initialInvoicePaymentFeatureState: InvoicePaymentFeatureState = {
    ...initialBaseRemoteFeatureState,
    invoicePayments: invoicePaymentEntityAdapter.getInitialState(),
    selectedInvoicePaymentId: null,
    invoicePaymentsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: null,
        total: 0,
    },
    filters: Model.Filters.initialInvoicePaymentFilters
}

export const invoicePaymentReducer = createReducer(
    initialInvoicePaymentFeatureState,
    on(
        InvoicePaymentLocalActions.resetInvoicePaymentState,
        () => initialInvoicePaymentFeatureState
    ),
    on(
        InvoicePaymentLocalActions.initialiseInvoicePaymentState,
        () => initialInvoicePaymentFeatureState
    ),
    on(
        InvoicePaymentLocalActions.updateInvoicePaymentFilters, (state, { filters }) => ({
            ...state,
            filters: {
                ...state.filters,
                ...filters
            }
        })
    ),
    on(InvoicePaymentLocalActions.resetInvoicePaymentFilters, (state) => ({ ...state, filters: Model.Filters.initialInvoicePaymentFilters })),
    on(InvoicePaymentLocalActions.selectInvoicePayment, (state, { paymentId }) => ({ ...state, selectedInvoicePaymentId: paymentId })),
    on(InvoicePaymentLocalActions.deselectInvoicePayment, (state) => ({ ...state, selectedInvoicePaymentId: null })),
    on(InvoicePaymentLocalActions.resetPagination, (state) => ({
        ...state,
        invoicePaymentsRemotePagination: {
            ...state.invoicePaymentsRemotePagination,
            offset: 0
        }
    })),
    on(remoteStateUpdateRequest(InvoicePaymentRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(InvoicePaymentRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(InvoicePaymentRemoteActions.identifiers), (state, { error }) => remoteFailureState(state, error)),

    on(
        InvoicePaymentRemoteActions.create.success,
        (state, { response }) => ({
            ...state,
            invoicePayments: invoicePaymentEntityAdapter.setOne(response, state.invoicePayments)
        })
    ),

    on(
        InvoicePaymentRemoteActions.get.success,
        (state, { response }) => ({
            ...state,
            invoicePayments: invoicePaymentEntityAdapter.setOne(response, state.invoicePayments),
            selectedInvoicePaymentId: response.id
        })
    ),

    on(
        InvoicePaymentRemoteActions.list.request,
        (state, { pagination }) => ({
            ...state,
            invoicePaymentsRemotePagination: {
                ...state.invoicePaymentsRemotePagination,
                ...pagination
            }
        })
    ),

    on(
        InvoicePaymentRemoteActions.list.success,
        (state, { response }) => ({
            ...state,
            invoicePayments: invoicePaymentEntityAdapter.setAll(response.results, state.invoicePayments),
            invoicePaymentsRemotePagination: {
                ...state.invoicePaymentsRemotePagination,
                total: response.total
            }
        })
    ),

    on(
        InvoicePaymentRemoteActions.update.success,
        (state, { response }) => ({
            ...state,
            invoicePayments: invoicePaymentEntityAdapter.updateOne({ id: response.id, changes: response }, state.invoicePayments)
        })
    ),

    on(
        InvoicePaymentRemoteActions.delete.success,
        (state, { response }) => ({
            ...state,
            invoicePayments: invoicePaymentEntityAdapter.removeOne(response.paymentId, state.invoicePayments),
            selectedInvoicePaymentId: 
                state.selectedInvoicePaymentId === response.paymentId ? null : state.selectedInvoicePaymentId
        })
    )
)