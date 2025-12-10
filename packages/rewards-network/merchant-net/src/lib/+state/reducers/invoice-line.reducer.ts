import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { InvoiceLineLocalActions, InvoiceLineRemoteActions } from '../actions'
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

export interface InvoiceLineFeatureState extends BaseRemoteFeatureState {
    invoiceLines: EntityState<Model.InvoiceLineResponse>
    selectedInvoiceLineId: Nullable<string>
    invoiceLinesRemotePagination: RemotePaginationState<Model.InvoiceLineResponse>
    filters: Model.Filters.InvoiceLineFilters
}

export const invoiceLineEntityAdapter: EntityAdapter<Model.InvoiceLineResponse> =
    createEntityAdapter<Model.InvoiceLineResponse>()

export const initialInvoiceLineFeatureState: InvoiceLineFeatureState = {
    ...initialBaseRemoteFeatureState,
    invoiceLines: invoiceLineEntityAdapter.getInitialState(),
    selectedInvoiceLineId: null,
    invoiceLinesRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: null,
        total: 0,
    },
    filters: Model.Filters.initialInvoiceLineFilters
}

export const invoiceLineReducer = createReducer(
    initialInvoiceLineFeatureState,
    on(
        InvoiceLineLocalActions.resetInvoiceLineState,
        () => initialInvoiceLineFeatureState
    ),
    on(
        InvoiceLineLocalActions.initialiseInvoiceLineState,
        () => initialInvoiceLineFeatureState
    ),
    on(
        InvoiceLineLocalActions.updateInvoiceLineFilters, (state, { filters }) => ({
            ...state,
            filters: {
                ...state.filters,
                ...filters
            }
        })
    ),
    on(InvoiceLineLocalActions.resetInvoiceLineFilters, (state) => ({ ...state, filters: Model.Filters.initialInvoiceLineFilters })),
    on(InvoiceLineLocalActions.selectInvoiceLine, (state, { lineId }) => ({ ...state, selectedInvoiceLineId: lineId })),
    on(InvoiceLineLocalActions.deselectInvoiceLine, (state) => ({ ...state, selectedInvoiceLineId: null })),
    on(InvoiceLineLocalActions.resetPagination, (state) => ({
        ...state,
        invoiceLinesRemotePagination: {
            ...state.invoiceLinesRemotePagination,
            offset: 0
        }
    })),
    on(remoteStateUpdateRequest(InvoiceLineRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(InvoiceLineRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(InvoiceLineRemoteActions.identifiers), (state, { error }) => remoteFailureState(state, error)),

    on(
        InvoiceLineRemoteActions.create.success,
        (state, { response }) => ({
            ...state,
            invoiceLines: invoiceLineEntityAdapter.setOne(response, state.invoiceLines)
        })
    ),

    on(
        InvoiceLineRemoteActions.get.success,
        (state, { response }) => ({
            ...state,
            invoiceLines: invoiceLineEntityAdapter.setOne(response, state.invoiceLines),
            selectedInvoiceLineId: response.id
        })
    ),

    on(
        InvoiceLineRemoteActions.list.request,
        (state, { pagination }) => ({
            ...state,
            invoiceLinesRemotePagination: {
                ...state.invoiceLinesRemotePagination,
                ...pagination
            }
        })
    ),

    on(
        InvoiceLineRemoteActions.list.success,
        (state, { response }) => ({
            ...state,
            invoiceLines: invoiceLineEntityAdapter.setAll(response.results, state.invoiceLines),
            invoiceLinesRemotePagination: {
                ...state.invoiceLinesRemotePagination,
                total: response.total
            }
        })
    ),

    on(
        InvoiceLineRemoteActions.update.success,
        (state, { response }) => ({
            ...state,
            invoiceLines: invoiceLineEntityAdapter.updateOne({ id: response.id, changes: response }, state.invoiceLines)
        })
    ),

    on(
        InvoiceLineRemoteActions.delete.success,
        (state, { response }) => ({
            ...state,
            invoiceLines: invoiceLineEntityAdapter.removeOne(response.lineId, state.invoiceLines),
            selectedInvoiceLineId: 
                state.selectedInvoiceLineId === response.lineId ? null : state.selectedInvoiceLineId
        })
    )
)