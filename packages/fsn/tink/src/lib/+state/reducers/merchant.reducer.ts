import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { Actions } from '../actions'
import {
    BaseRemoteFeatureState,
    Nullable,
    RemotePaginationState,
    decrementRemotePaginationStateTotalConditionally,
    incrementRemotePaginationStateTotal,
    incrementRemotePaginationStateTotalConditionally,
    initialBaseRemoteFeatureState,
    remoteFailureState,
    remoteRequestState,
    remoteStateUpdateFailure,
    remoteStateUpdateRequest,
    remoteStateUpdateSuccess,
    remoteSuccessState,
} from '@zwp/platform.common'

export interface MerchantFeatureState extends BaseRemoteFeatureState {
    merchants: EntityState<Model.ServerAPIModel.Merchant.TinkMerchantResponse>
    selectedMerchantId: Nullable<string>
    merchantsRemotePagination: RemotePaginationState<Model.ServerAPIModel.Merchant.TinkMerchantResponse>
    filters: Model.Filters.MerchantFilters
}

export const merchantEntityAdapter: EntityAdapter<Model.ServerAPIModel.Merchant.TinkMerchantResponse> =
    createEntityAdapter<Model.ServerAPIModel.Merchant.TinkMerchantResponse>()

export const initialMerchantFeatureState: MerchantFeatureState = {
    ...initialBaseRemoteFeatureState,
    merchants: merchantEntityAdapter.getInitialState(),
    selectedMerchantId: null,
    merchantsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'dbCreatedAt',
        total: 0,
    },
    filters: Model.Filters.initialMerchantFilters,
}

export const merchantReducer = createReducer(
    initialMerchantFeatureState,
    on(Actions.MerchantLocalActions.resetMerchantState, () => initialMerchantFeatureState),
    on(Actions.MerchantLocalActions.initialiseMerchantState, () => initialMerchantFeatureState),
    on(Actions.MerchantLocalActions.updateMerchantFilters, (state, { filters }) => ({
        ...state,
        filters: { ...state.filters, ...filters },
    })),
    on(Actions.MerchantLocalActions.resetMerchantFilters, (state) => ({
        ...state,
        filters: Model.Filters.initialMerchantFilters,
    })),
    on(Actions.MerchantLocalActions.selectMerchant, (state, { merchantId }) => ({
        ...state,
        selectedMerchantId: merchantId,
    })),
    on(Actions.MerchantLocalActions.deselectMerchant, (state) => ({ ...state, selectedMerchantId: null })),
    on(Actions.MerchantLocalActions.resetPagination, (state) => ({
        ...state,
        merchantsRemotePagination: { ...state.merchantsRemotePagination, offset: 0 },
    })),
    on(remoteStateUpdateRequest(Actions.MerchantRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(Actions.MerchantRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(Actions.MerchantRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),
    on(Actions.MerchantRemoteActions.createMerchant.success, (state, { response }) => ({
        ...state,
        merchants: merchantEntityAdapter.setOne(response, state.merchants),
        merchantsRemotePagination: incrementRemotePaginationStateTotalConditionally(state, {
            entityStateKey: 'merchants',
            remotePaginationStateKey: 'merchantsRemotePagination',
            ids: [response.id],
        }),
        selectedMerchantId: response.id,
    })),
    on(Actions.MerchantRemoteActions.getMerchant.success, (state, { response }) => ({
        ...state,
        merchants: merchantEntityAdapter.setOne(response, state.merchants),
    })),
    on(Actions.MerchantRemoteActions.listMerchants.request, (state, { pagination }) => ({
        ...state,
        merchantsRemotePagination: { ...state.merchantsRemotePagination, ...pagination },
    })),
    on(Actions.MerchantRemoteActions.listMerchants.success, (state, { response }) => ({
        ...state,
        merchants: merchantEntityAdapter.setMany(response.results, state.merchants),
        merchantsRemotePagination: {
            ...state.merchantsRemotePagination,
            total: response.total,
        },
    })),
    on(Actions.MerchantRemoteActions.deleteMerchant.success, (state, { merchantId }) => ({
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
