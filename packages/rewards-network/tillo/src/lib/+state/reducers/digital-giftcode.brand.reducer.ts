import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
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

export interface DigitalCodeBrandFeatureState extends BaseRemoteFeatureState {
    digitalCodeFrmBrands: EntityState<Model.DigitalGiftCodeResponse>
    selectedDigitalCodeBrandId: Nullable<string>
    digitalCodeBrandRemotePagination: RemotePaginationState<Model.DigitalGiftCodeResponse>
    filters: Model.Filters.DigitalCodeFilters
}

export const digitalCodeBrandEntityAdapter: EntityAdapter<Model.DigitalGiftCodeResponse> =
    createEntityAdapter<Model.DigitalGiftCodeResponse>()

export const initialDigitalCodeBrandFeatureState: DigitalCodeBrandFeatureState = {
    ...initialBaseRemoteFeatureState,
    digitalCodeFrmBrands: digitalCodeBrandEntityAdapter.getInitialState(),
    selectedDigitalCodeBrandId: null,
    digitalCodeBrandRemotePagination: initialRemotePaginationState('dbCreatedAt'),
    filters: Model.Filters.initialDigitalCodeFilters,
}

export const digitalCodeFrmBrandReducer = createReducer(
    initialDigitalCodeBrandFeatureState,
    // on(DigitalCodeBrandLocalActions.resetDigitalCodeBrandState, () => initialDigitalCodeBrandFeatureState),
    // on(DigitalCodeBrandLocalActions.initialiseDigitalCodeBrandState, () => initialDigitalCodeBrandFeatureState),
    // on(DigitalCodeBrandLocalActions.updateDigitalCodeBrandFilters, (state, { filters }) => ({
    //     ...state,
    //     filters: {
    //         ...state.filters,
    //         ...filters,
    //     },
    // })),
    // on(DigitalCodeBrandLocalActions.resetDigitalCodeBrandFilters, (state) => ({
    //     ...state,
    //     filters: Model.Filters.initialDigitalCodeFilters,
    // })),
    // on(DigitalCodeBrandLocalActions.selectDigitalCodeBrand, (state, { digitalCodeId }) => ({
    //     ...state,
    //     selectedDigitalCodeId: digitalCodeId,
    // })),
    // on(DigitalCodeBrandLocalActions.deselectDigitalCodeBrand, (state) => ({ ...state, selectedDigitalCodeId: null })),
    // on(DigitalCodeBrandLocalActions.resetPagination, (state) => ({
    //     ...state,
    //     digitalCodeBrandRemotePagination: {
    //         ...state.digitalCodeBrandRemotePagination,
    //         offset: 0,
    //     },
    // })),
    // on(remoteStateUpdateRequest(DigitalCodeBrandRemoteActions.identifiers), (state) => remoteRequestState(state)),
    // on(remoteStateUpdateSuccess(DigitalCodeBrandRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    // on(remoteStateUpdateFailure(DigitalCodeBrandRemoteActions.identifiers), (state, { error }) =>
    //     remoteFailureState(state, error)
    // ),

    // on(DigitalCodeBrandRemoteActions.issueDigitalCode.success, (state, { response }) => ({
    //     ...state,
    //     digitalCodeFrmBrands: digitalCodeBrandEntityAdapter.addOne(response, state.digitalCodeFrmBrands),
    // })),

    // on(DigitalCodeBrandRemoteActions.orderDigitalCode.success, (state, { response }) => ({
    //     ...state,
    //     digitalCodeFrmBrands: digitalCodeBrandEntityAdapter.addOne(response, state.digitalCodeFrmBrands),
    // }))
)
