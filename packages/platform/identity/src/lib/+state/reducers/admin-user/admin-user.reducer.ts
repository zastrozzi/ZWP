import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../../model'
import { AdminUserLocalActions, AdminUserRemoteActions } from '../../actions'
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

export interface AdminUserFeatureState extends BaseRemoteFeatureState {
    adminUsers: EntityState<Model.AdminUserResponse>
    selectedAdminUserId: Nullable<string>
    adminUsersRemotePagination: RemotePaginationState<Model.AdminUserResponse>
    filters: Model.Filters.AdminUserFilters
    loggedInAdminUser: Nullable<Model.AdminUserResponse>
}

export const adminUserEntityAdapter: EntityAdapter<Model.AdminUserResponse> =
    createEntityAdapter<Model.AdminUserResponse>()

export const initialAdminUserFeatureState: AdminUserFeatureState = {
    ...initialBaseRemoteFeatureState,
    adminUsers: adminUserEntityAdapter.getInitialState(),
    selectedAdminUserId: null,
    adminUsersRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'dbCreatedAt',
        total: 0,
    },
    filters: Model.Filters.initialAdminUserFilters,
    loggedInAdminUser: null,
}

export const adminUserReducer = createReducer(
    initialAdminUserFeatureState,
    on(
        AdminUserLocalActions.resetAdminUserState,
        () => initialAdminUserFeatureState
    ),
    on(
        AdminUserLocalActions.initialiseAdminUserState,
        () => initialAdminUserFeatureState
    ),
    on(AdminUserLocalActions.updateAdminUserFilters, (state, { filters }) => {
        return {
            ...state,
            filters: {
                ...state.filters,
                ...filters
            }
        }
    }),
    on(AdminUserLocalActions.selectAdminUser, (state, { adminUserId }) => ({
        ...state,
        selectedAdminUserId: adminUserId,
    })),
    on(remoteStateUpdateRequest(AdminUserRemoteActions.identifiers), (state) =>
        remoteRequestState(state)
    ),
    on(remoteStateUpdateSuccess(AdminUserRemoteActions.identifiers), (state) =>
        remoteSuccessState(state)
    ),
    on(
        remoteStateUpdateFailure(AdminUserRemoteActions.identifiers),
        (state, { error }) => remoteFailureState(state, error)
    ),
    on(
        AdminUserRemoteActions.createAdminUser.success,
        (state, { response }) => ({
            ...state,
            adminUsers: adminUserEntityAdapter.setOne(
                response,
                state.adminUsers
            ),
        })
    ),

    on(AdminUserRemoteActions.getAdminUser.success, (state, { response }) => ({
        ...state,
        adminUsers: adminUserEntityAdapter.setOne(response, state.adminUsers),
        selectedAdminUserId: response.id,
    })),

    on(
        AdminUserRemoteActions.getAdminUserOnInitialise.success,
        (state, { response }) => ({
            ...state,
            adminUsers: adminUserEntityAdapter.setOne(
                response,
                state.adminUsers
            ),
            selectedAdminUserId: response.id,
            loggedInAdminUser: response,
        })
    ),

    on(
        AdminUserRemoteActions.listAdminUsers.request,
        (state, { pagination }) => ({
            ...state,
            adminUsersRemotePagination: {
                ...state.adminUsersRemotePagination,
                ...pagination,
            },
        })
    ),

    on(
        AdminUserRemoteActions.listAdminUsers.success,
        (state, { response }) => ({
            ...state,
            adminUsers: adminUserEntityAdapter.setMany(
                response.results,
                state.adminUsers
            ),
            adminUsersRemotePagination: {
                ...state.adminUsersRemotePagination,
                total: response.total,
            },
        })
    ),

    on(
        AdminUserRemoteActions.updateAdminUser.success,
        (state, { response }) => ({
            ...state,
            adminUsers: adminUserEntityAdapter.updateOne(
                { id: response.id, changes: response },
                state.adminUsers
            ),
            loggedInAdminUser:
                state.loggedInAdminUser?.id === response.id
                    ? response
                    : state.loggedInAdminUser,
        })
    ),

    on(
        AdminUserRemoteActions.deleteAdminUser.success,
        (state, { response }) => ({
            ...state,
            adminUsers: adminUserEntityAdapter.removeOne(
                response.adminUserId,
                state.adminUsers
            ),
            selectedAdminUserId:
                state.selectedAdminUserId === response.adminUserId
                    ? null
                    : state.selectedAdminUserId,
        })
    ),

    on(
        AdminUserRemoteActions.loginAdminUserEmailPassword.success,
        (state, { response }) => ({
            ...state,
            adminUsers: adminUserEntityAdapter.setOne(
                response.userData,
                state.adminUsers
            ),
            loggedInAdminUser: response.userData,
        })
    ),

    on(
        AdminUserRemoteActions.logoutAdminUser.success,
        (state, { response }) => ({
            ...state,
            adminUsers: adminUserEntityAdapter.removeOne(
                response.adminUserId,
                state.adminUsers
            ),
            selectedAdminUserId:
                state.selectedAdminUserId === response.adminUserId
                    ? null
                    : state.selectedAdminUserId,
            loggedInAdminUser: null,
        })
    )
)
