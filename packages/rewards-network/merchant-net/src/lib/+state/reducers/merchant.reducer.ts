import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { MerchantLocalActions, MerchantRemoteActions } from '../actions'
import {
    BaseRemoteFeatureState,
    Nullable,
    RemotePaginationState,
    decrementRemotePaginationStateTotalConditionally,
    initialBaseRemoteFeatureState,
    remoteFailureState,
    remoteRequestState,
    remoteStateUpdateFailure,
    remoteStateUpdateRequest,
    remoteStateUpdateSuccess,
    remoteSuccessState,
} from '@zwp/platform.common'

export interface MerchantFeatureState extends BaseRemoteFeatureState {
    merchants: EntityState<Model.MerchantResponse>
    selectedMerchantId: Nullable<string>
    merchantsRemotePagination: RemotePaginationState<Model.MerchantResponse>
    filters: Model.Filters.MerchantFilters
}

export const merchantEntityAdapter: EntityAdapter<Model.MerchantResponse> =
    createEntityAdapter<Model.MerchantResponse>()

export const initialMerchantFeatureState: MerchantFeatureState = {
    ...initialBaseRemoteFeatureState,
    merchants: merchantEntityAdapter.getInitialState(),
    selectedMerchantId: null,
    merchantsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'merchantName',
        total: 0,
    },
    filters: Model.Filters.initialMerchantFilters,
}

export const merchantReducer = createReducer(
    initialMerchantFeatureState,
    on(MerchantLocalActions.resetMerchantState, () => initialMerchantFeatureState),
    on(MerchantLocalActions.initialiseMerchantState, () => initialMerchantFeatureState),
    on(MerchantLocalActions.updateMerchantFilters, (state, { filters }) => ({
        ...state,
        filters: { ...state.filters, ...filters },
    })),
    on(MerchantLocalActions.resetMerchantFilters, (state) => ({
        ...state,
        filters: Model.Filters.initialMerchantFilters,
    })),
    on(MerchantLocalActions.selectMerchant, (state, { merchantId }) => ({ ...state, selectedMerchantId: merchantId })),
    on(MerchantLocalActions.deselectMerchant, (state) => ({ ...state, selectedMerchantId: null })),
    on(MerchantLocalActions.resetPagination, (state) => ({
        ...state,
        merchantsRemotePagination: { ...state.merchantsRemotePagination, offset: 0 },
    })),
    on(remoteStateUpdateRequest(MerchantRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(MerchantRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(MerchantRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),

    on(MerchantRemoteActions.create.success, (state, { response }) => ({
        ...state,
        merchants: merchantEntityAdapter.setOne(response, state.merchants),
    })),

    on(MerchantRemoteActions.get.success, (state, { response }) => ({
        ...state,
        merchants: merchantEntityAdapter.setOne(response, state.merchants),
    })),

    on(MerchantRemoteActions.list.request, (state, { pagination }) => ({
        ...state,
        merchantsRemotePagination: {...state.merchantsRemotePagination, ...pagination },
    })),

    on(MerchantRemoteActions.list.success, (state, { response }) => ({
        ...state,
        merchants: merchantEntityAdapter.setMany(response.results, state.merchants),
        merchantsRemotePagination: {
            ...state.merchantsRemotePagination,
            total: response.total,
        },
    })),

    on(MerchantRemoteActions.update.success, (state, { response }) => ({
        ...state,
        merchants: merchantEntityAdapter.updateOne({ id: response.id, changes: response }, state.merchants),
    })),

    on(MerchantRemoteActions.delete.success, (state, { merchantId }) => ({
        ...state,
        merchants: merchantEntityAdapter.removeOne(merchantId, state.merchants),
        merchantsRemotePagination: decrementRemotePaginationStateTotalConditionally(state, {
            entityStateKey: 'merchants',
            remotePaginationStateKey: 'merchantsRemotePagination',
            ids: [merchantId],
        }),
        selectedMerchantId: state.selectedMerchantId === merchantId ? null : state.selectedMerchantId,
    }))
)
