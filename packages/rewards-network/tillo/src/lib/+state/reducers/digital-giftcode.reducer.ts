import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { DigitalCodeLocalActions, DigitalCodeRemoteActions } from '../actions'
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

export interface DigitalCodeFeatureState extends BaseRemoteFeatureState {
    digitalCodes: EntityState<Model.DigitalGiftCodeResponse>
    selectedDigitalCodeId: Nullable<string>
    digitalCodeRemotePagination: RemotePaginationState<Model.DigitalGiftCodeResponse>
    filters: Model.Filters.DigitalCodeFilters
}

export const digitalCodeEntityAdapter: EntityAdapter<Model.DigitalGiftCodeResponse> =
    createEntityAdapter<Model.DigitalGiftCodeResponse>()

export const initialDigitalCodeFeatureState: DigitalCodeFeatureState = {
    ...initialBaseRemoteFeatureState,
    digitalCodes: digitalCodeEntityAdapter.getInitialState(),
    selectedDigitalCodeId: null,
    digitalCodeRemotePagination: initialRemotePaginationState('dbCreatedAt'),
    filters: Model.Filters.initialDigitalCodeFilters,
}

export const digitalCodeReducer = createReducer(
    initialDigitalCodeFeatureState,
    on(DigitalCodeLocalActions.resetDigitalCodeState, () => initialDigitalCodeFeatureState),
    on(DigitalCodeLocalActions.initialiseDigitalCodeState, () => initialDigitalCodeFeatureState),
    on(DigitalCodeLocalActions.updateDigitalCodeFilters, (state, { filters }) => ({
        ...state,
        filters: {
            ...state.filters,
            ...filters,
        },
    })),
    on(DigitalCodeLocalActions.resetDigitalCodeFilters, (state) => ({
        ...state,
        filters: Model.Filters.initialDigitalCodeFilters,
    })),
    on(DigitalCodeLocalActions.selectDigitalCode, (state, { digitalCodeId }) => ({
        ...state,
        selectedDigitalCodeId: digitalCodeId,
    })),
    on(DigitalCodeLocalActions.deselectDigitalCode, (state) => ({ ...state, selectedDigitalCodeId: null })),
    on(DigitalCodeLocalActions.resetPagination, (state) => ({
        ...state,
        digitalCodeRemotePagination: {
            ...state.digitalCodeRemotePagination,
            offset: 0,
        },
    })),
    on(remoteStateUpdateRequest(DigitalCodeRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(DigitalCodeRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(DigitalCodeRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),

    on(DigitalCodeRemoteActions.listDigitalCodes.request, (state, { pagination }) => ({
        ...state,
        digitalCodeRemotePagination: {
            ...state.digitalCodeRemotePagination,
            ...pagination,
        },
    })),

    on(DigitalCodeRemoteActions.listDigitalCodes.success, (state, { response }) => ({
        ...state,
        digitalCodes: digitalCodeEntityAdapter.setMany(response.results, state.digitalCodes),
        digitalCodeRemotePagination: {
            ...state.digitalCodeRemotePagination,
            total: response.total,
        },
    })),

    on(DigitalCodeRemoteActions.getDigitalCode.success, (state, { response }) => ({
        ...state,
        digitalCodes: digitalCodeEntityAdapter.setOne(response, state.digitalCodes),
        selectedDigitalCodeId: response.id,
    })),

    on(DigitalCodeRemoteActions.topupDigitalCode.success, (state, { response }) => ({
        ...state,
        digitalCodes: digitalCodeEntityAdapter.updateOne({ id: response.id, changes: response }, state.digitalCodes),
    })),

    on(DigitalCodeRemoteActions.cancelDigitalCode.success, (state, { response }) => ({
        ...state,
        digitalCodes: digitalCodeEntityAdapter.updateOne({ id: response.id, changes: response }, state.digitalCodes),
    })),

    on(DigitalCodeRemoteActions.cancelDigitalCodeURL.success, (state, { response }) => ({
        ...state,
        digitalCodes: digitalCodeEntityAdapter.updateOne({ id: response.id, changes: response }, state.digitalCodes),
    })),

    on(DigitalCodeRemoteActions.deleteDigitalCode.success, (state, { digitalCodeId }) => ({
        ...state,
        digitalCodes: digitalCodeEntityAdapter.removeOne(digitalCodeId, state.digitalCodes),
        selectedDigitalCodeId: state.selectedDigitalCodeId === digitalCodeId ? null : state.selectedDigitalCodeId,
    }))
)
