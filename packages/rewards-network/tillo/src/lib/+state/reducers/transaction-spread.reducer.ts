import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { TransactionSpreadLocalActions, TransactionSpreadRemoteActions } from '../actions'
import {
    BaseRemoteFeatureState,
    Nullable,
    RemotePaginationState,
    initialBaseRemoteFeatureState,
    initialRemotePaginationState,
    remoteFailureState,
    remoteRequestState,
    remoteStateUpdateFailure,
    remoteStateUpdateRequest,
    remoteStateUpdateSuccess,
    remoteSuccessState,
} from '@zwp/platform.common'

export interface TransactionSpreadFeatureState extends BaseRemoteFeatureState {
    transactionSpreads: EntityState<Model.TransactionSpreadResponse>,
    selectedTransactionSpreadId: Nullable<string>,
    transactionSpreadRemotePagination: RemotePaginationState<Model.TransactionSpreadResponse>
    filters: Model.Filters.TransactionSpreadFilters
}

export const TransactionSpreadEntityAdaptor: EntityAdapter<Model.TransactionSpreadResponse> = 
    createEntityAdapter<Model.TransactionSpreadResponse>()

export const initialTransactionSpreadFeatureState: TransactionSpreadFeatureState = {
    ...initialBaseRemoteFeatureState,
    transactionSpreads: TransactionSpreadEntityAdaptor.getInitialState(),
    selectedTransactionSpreadId: null,
    transactionSpreadRemotePagination: initialRemotePaginationState('dbCreatedAt'),
    filters: Model.Filters.initialTransactionSpreadFilters
}

export const TransactionSpreadReducer = createReducer(
    initialTransactionSpreadFeatureState,
    on(TransactionSpreadLocalActions.resetTransactionSpreadState, () => initialTransactionSpreadFeatureState),
        on(TransactionSpreadLocalActions.initialiseTransactionSpreadState, () => initialTransactionSpreadFeatureState),
        on(TransactionSpreadLocalActions.updateTransactionSpreadFilters, (state, { filters }) => ({
            ...state,
            filters: {
                ...state.filters,
                ...filters
            }
        }) ),
        on(TransactionSpreadLocalActions.resetTransactionSpreadFilters, (state) => ({
            ...state,
            filters: Model.Filters.initialTransactionSpreadFilters
        })),
        on(TransactionSpreadLocalActions.selectTransactionSpread, (state, { transactionSpreadId }) => ({
            ...state,
            selectedtransactionSpreadId: transactionSpreadId
        })),
        on(TransactionSpreadLocalActions.deselectTransactionSpread, (state) => ({ ...state, selectedtransactionSpreadId: null })),
        on(TransactionSpreadLocalActions.resetPagination, (state) => ({
            ...state,
            transactionSpreadRemotePagination: {
                ...state.transactionSpreadRemotePagination,
                offset: 0
            }
        })),
        on(remoteStateUpdateRequest(TransactionSpreadRemoteActions.identifiers), (state) => remoteRequestState(state)),
        on(remoteStateUpdateSuccess(TransactionSpreadRemoteActions.identifiers), (state) => remoteSuccessState(state)),
        on(remoteStateUpdateFailure(TransactionSpreadRemoteActions.identifiers), (state, { error }) => remoteFailureState(state, error)),

        on(
            TransactionSpreadRemoteActions.listTransactionSpread.request, (state, { pagination }) => ({
                ...state,
                transactionSpreadRemotePagination: {
                    ...state.transactionSpreadRemotePagination,
                    ...pagination
                }
            })
        ),

        on(
            TransactionSpreadRemoteActions.listTransactionSpread.success, (state, { response }) => ({
                ...state,
                transactionSpreads: TransactionSpreadEntityAdaptor.setMany(response.results, state.transactionSpreads),
                transactionSpreadRemotePagination: {
                    ...state.transactionSpreadRemotePagination,
                    total: response.total
                }
            })
        ),

        on(
            TransactionSpreadRemoteActions.updateTransactionSpread.success, (state, { response }) => ({
                ...state,
                transactionSpreads: TransactionSpreadEntityAdaptor.updateOne({ id: response.id, changes: response }, state.transactionSpreads)
            })
        ),

        on(
            TransactionSpreadRemoteActions.createTransactionSpreadForBrand.success, (state, {response}) => ({
                ...state,
                transactionSpreads: TransactionSpreadEntityAdaptor.setOne(response, state.transactionSpreads)
            })
        ),

        on(
            TransactionSpreadRemoteActions.deleteTransactionSpread.success, (state, { response }) => ({
                ...state,
                transactionSpreads: TransactionSpreadEntityAdaptor.removeOne(response.transactionSpreadId, state.transactionSpreads),
                selectedTransactionSpreadId: 
                    state.selectedTransactionSpreadId === response.transactionSpreadId ? null : state.selectedTransactionSpreadId
            })
        )
        
)