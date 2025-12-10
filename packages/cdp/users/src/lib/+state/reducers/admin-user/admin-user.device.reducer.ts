import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../../model'
import {
    AdminUserDeviceLocalActions,
    AdminUserDeviceRemoteActions,
} from '../../actions'
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

export interface AdminUserDeviceFeatureState extends BaseRemoteFeatureState {
    adminUserDevices: EntityState<Model.AdminUserDeviceResponse>
    selectedAdminUserDeviceId: Nullable<string>
    adminUserDevicesRemotePagination: RemotePaginationState<Model.AdminUserDeviceResponse>
    filters: Model.AdminUserDeviceFilters
}

export const adminUserDeviceEntityAdapter: EntityAdapter<Model.AdminUserDeviceResponse> =
    createEntityAdapter<Model.AdminUserDeviceResponse>()

export const initialAdminUserDeviceFeatureState: AdminUserDeviceFeatureState = {
    ...initialBaseRemoteFeatureState,
    adminUserDevices: adminUserDeviceEntityAdapter.getInitialState(),
    selectedAdminUserDeviceId: null,
    adminUserDevicesRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'dbCreatedAt',
        total: 0,
    },
    filters: Model.initialAdminUserDeviceFilters
}

export const adminUserDeviceReducer = createReducer(
    initialAdminUserDeviceFeatureState,
    on(
        AdminUserDeviceLocalActions.initialiseAdminUserDeviceState,
        () => initialAdminUserDeviceFeatureState
    ),
    on(
        AdminUserDeviceLocalActions.resetAdminUserDeviceState,
        () => initialAdminUserDeviceFeatureState
    ),
    on(
        AdminUserDeviceLocalActions.updateAdminUserDeviceFilters,
        (state, { filters }) => ({
            ...state,
            filters: { ...state.filters, ...filters },
        })
    ),
    on(AdminUserDeviceLocalActions.resetAdminUserDeviceFilters, (state) => ({
        ...state,
        filters: initialAdminUserDeviceFeatureState.filters,
    })),

    on(
        remoteStateUpdateRequest(AdminUserDeviceRemoteActions.identifiers),
        (state) => remoteRequestState(state)
    ),
    on(
        remoteStateUpdateSuccess(AdminUserDeviceRemoteActions.identifiers),
        (state) => remoteSuccessState(state)
    ),
    on(
        remoteStateUpdateFailure(AdminUserDeviceRemoteActions.identifiers),
        (state, { error }) => remoteFailureState(state, error)
    ),

    on(
        AdminUserDeviceRemoteActions.getAdminUserDevice.success,
        (state, { response }) => ({
            ...state,
            adminUserDevices: adminUserDeviceEntityAdapter.setOne(
                response,
                state.adminUserDevices
            ),
            selectedAdminUserDeviceId: response.id,
        })
    ),

    on(
        AdminUserDeviceRemoteActions.listAdminUserDevices.request,
        (state, { pagination }) => ({
            ...state,
            adminUserDevicesRemotePagination: {
                ...state.adminUserDevicesRemotePagination,
                ...pagination,
            },
        })
    ),

    on(
        AdminUserDeviceRemoteActions.listAdminUserDevices.success,
        (state, { response }) => ({
            ...state,
            adminUserDevices: adminUserDeviceEntityAdapter.setAll(
                response.results,
                state.adminUserDevices
            ),
            adminUserDevicesRemotePagination: {
                ...state.adminUserDevicesRemotePagination,
                total: response.total,
            },
        })
    )
)
