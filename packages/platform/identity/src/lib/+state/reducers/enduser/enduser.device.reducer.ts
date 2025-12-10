import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../../model'
import { EnduserDeviceLocalActions, EnduserDeviceRemoteActions } from '../../actions'
import { BaseRemoteFeatureState, Nullable, RemotePaginationState, initialBaseRemoteFeatureState, remoteFailureState, remoteRequestState, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess, remoteSuccessState } from '@zwp/platform.common'

export interface EnduserDeviceFeatureState extends BaseRemoteFeatureState {
    enduserDevices: EntityState<Model.EnduserDeviceResponse>,
    selectedEnduserDeviceId: Nullable<string>,
    enduserDevicesRemotePagination: RemotePaginationState<Model.EnduserDeviceResponse>,
    filters: Model.Filters.EnduserDeviceFilters
}

export const enduserDeviceEntityAdapter: EntityAdapter<Model.EnduserDeviceResponse> = createEntityAdapter<Model.EnduserDeviceResponse>()

export const initialEnduserDeviceFeatureState: EnduserDeviceFeatureState = {
    ...initialBaseRemoteFeatureState,
    enduserDevices: enduserDeviceEntityAdapter.getInitialState(),
    selectedEnduserDeviceId: null,
    enduserDevicesRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: null,
        total: 0
    },
    filters: Model.Filters.initialEnduserDeviceFilters
}

export const enduserDeviceReducer = createReducer(
    initialEnduserDeviceFeatureState,
    on(EnduserDeviceLocalActions.initialiseEnduserDeviceState, () => initialEnduserDeviceFeatureState),
    on(EnduserDeviceLocalActions.resetEnduserDeviceState, () => initialEnduserDeviceFeatureState),
    on(EnduserDeviceLocalActions.updateEnduserDeviceFilters, (state, { filters }) => ({ ...state, filters: { ...state.filters, filters } })),
    on(EnduserDeviceLocalActions.resetEnduserDeviceFilters, (state) => ({ ...state, filters: initialEnduserDeviceFeatureState.filters })),
    
    on(remoteStateUpdateRequest(EnduserDeviceRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(EnduserDeviceRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(EnduserDeviceRemoteActions.identifiers), (state, { error }) => remoteFailureState(state, error)),
    
    on(
        EnduserDeviceRemoteActions.getEnduserDevice.success,
        (state, { response }) => ({ 
            ...state, 
            enduserDevices: enduserDeviceEntityAdapter.setOne(response, state.enduserDevices),
            selectedEnduserDeviceId: response.id
        })
    ),

    on(
        EnduserDeviceRemoteActions.listEnduserDevices.request,
        (state, { pagination }) => ({ 
            ...state, 
            enduserDevicesRemotePagination: { ...state.enduserDevicesRemotePagination, ...pagination }
        })
    ),

    on(
        EnduserDeviceRemoteActions.listEnduserDevices.success,
        (state, { response }) => ({ 
            ...state, 
            enduserDevices: enduserDeviceEntityAdapter.setMany(response.results, state.enduserDevices),
            enduserDevicesRemotePagination: {
                ...state.enduserDevicesRemotePagination,
                total: response.total
            }
        })
    )
)