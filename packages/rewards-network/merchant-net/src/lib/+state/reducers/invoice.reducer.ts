import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { InvoiceLocalActions, InvoiceRemoteActions } from '../actions'
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

export interface InvoiceFeatureState extends BaseRemoteFeatureState {
    invoices: EntityState<Model.InvoiceResponse>
    selectedInvoiceId: Nullable<string>
    invoicesRemotePagination: RemotePaginationState<Model.InvoiceResponse>
    filters: Model.Filters.InvoiceFilters
}

export const invoiceEntityAdapter: EntityAdapter<Model.InvoiceResponse> =
    createEntityAdapter<Model.InvoiceResponse>()

export const initialInvoiceFeatureState: InvoiceFeatureState = {
    ...initialBaseRemoteFeatureState,
    invoices: invoiceEntityAdapter.getInitialState(),
    selectedInvoiceId: null,
    invoicesRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: null,
        total: 0,
    },
    filters: Model.Filters.initialInvoiceFilters
}

export const invoiceReducer = createReducer(
    initialInvoiceFeatureState,
    on(
        InvoiceLocalActions.resetInvoiceState,
        () => initialInvoiceFeatureState
    ),
    on(
        InvoiceLocalActions.initialiseInvoiceState,
        () => initialInvoiceFeatureState
    ),
    on(
        InvoiceLocalActions.updateInvoiceFilters, (state, { filters }) => ({
            ...state,
            filters: {
                ...state.filters,
                ...filters
            }
        })
    ),
    on(InvoiceLocalActions.resetInvoiceFilters, (state) => ({ ...state, filters: Model.Filters.initialInvoiceFilters })),
    on(InvoiceLocalActions.selectInvoice, (state, { invoiceId }) => ({ ...state, selectedInvoiceId: invoiceId })),
    on(InvoiceLocalActions.deselectInvoice, (state) => ({ ...state, selectedInvoiceId: null })),
    on(InvoiceLocalActions.resetPagination, (state) => ({
        ...state,
        invoicesRemotePagination: {
            ...state.invoicesRemotePagination,
            offset: 0
        }
    })),
    on(remoteStateUpdateRequest(InvoiceRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(InvoiceRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(InvoiceRemoteActions.identifiers), (state, { error }) => remoteFailureState(state, error)),

    on(
        InvoiceRemoteActions.create.success,
        (state, { response }) => ({
            ...state,
            invoices: invoiceEntityAdapter.setOne(response, state.invoices)
        })
    ),

    on(
        InvoiceRemoteActions.get.success,
        (state, { response }) => ({
            ...state,
            invoices: invoiceEntityAdapter.setOne(response, state.invoices),
            selectedInvoiceId: response.id
        })
    ),

    on(
        InvoiceRemoteActions.list.request,
        (state, { pagination }) => ({
            ...state,
            invoicesRemotePagination: {
                ...state.invoicesRemotePagination,
                ...pagination
            }
        })
    ),

    on(
        InvoiceRemoteActions.list.success,
        (state, { response }) => ({
            ...state,
            invoices: invoiceEntityAdapter.setAll(response.results, state.invoices),
            invoicesRemotePagination: {
                ...state.invoicesRemotePagination,
                total: response.total
            }
        })
    ),

    on(
        InvoiceRemoteActions.update.success,
        (state, { response }) => ({
            ...state,
            invoices: invoiceEntityAdapter.updateOne({ id: response.id, changes: response }, state.invoices)
        })
    ),

    on(
        InvoiceRemoteActions.delete.success,
        (state, { response }) => ({
            ...state,
            invoices: invoiceEntityAdapter.removeOne(response.invoiceId, state.invoices),
            selectedInvoiceId: 
                state.selectedInvoiceId === response.invoiceId ? null : state.selectedInvoiceId
        })
    )
)