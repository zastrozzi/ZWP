import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../../model'
import {
    AdminUserSessionLocalActions,
    AdminUserSessionRemoteActions,
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

export interface AdminUserSessionFeatureState extends BaseRemoteFeatureState {
    adminUserSessions: EntityState<Model.AdminUserSessionResponse>
    selectedAdminUserSessionId: Nullable<string>
    adminUserSessionsRemotePagination: RemotePaginationState<Model.AdminUserSessionResponse>
    filters: Model.Filters.AdminUserSessionFilters
}

export const adminUserSessionEntityAdapter: EntityAdapter<Model.AdminUserSessionResponse> =
    createEntityAdapter<Model.AdminUserSessionResponse>()

export const initialAdminUserSessionFeatureState: AdminUserSessionFeatureState = {
    ...initialBaseRemoteFeatureState,
    adminUserSessions: adminUserSessionEntityAdapter.getInitialState(),
    selectedAdminUserSessionId: null,
    adminUserSessionsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'desc',
        orderBy: 'dbCreatedAt',
        total: 0,
    },
    filters: Model.Filters.initialAdminUserSessionFilters
}

export const adminUserSessionReducer = createReducer(
    initialAdminUserSessionFeatureState,
    on(
        AdminUserSessionLocalActions.initialiseAdminUserSessionState,
        () => initialAdminUserSessionFeatureState
    ),
    on(
        AdminUserSessionLocalActions.resetAdminUserSessionState,
        () => initialAdminUserSessionFeatureState
    ),
    on(
        AdminUserSessionLocalActions.updateAdminUserSessionFilters,
        (state, { filters }) => ({
            ...state,
            filters: {
                ...state.filters,
                ...filters,
            },
        })
    ),
    on(
        AdminUserSessionLocalActions.resetAdminUserSessionFilters,
        (state) => ({
            ...state,
            filters: initialAdminUserSessionFeatureState.filters,
        })
    ),
    on(
        remoteStateUpdateRequest(AdminUserSessionRemoteActions.identifiers),
        (state) => remoteRequestState(state)
    ),
    on(
        remoteStateUpdateSuccess(AdminUserSessionRemoteActions.identifiers),
        (state) => remoteSuccessState(state)
    ),

    on(
        remoteStateUpdateFailure(AdminUserSessionRemoteActions.identifiers),
        (state, { error }) => remoteFailureState(state, error)
    ),

    on(
        AdminUserSessionRemoteActions.getAdminUserSession.success,
        (state, { response }) => ({
            ...state,
            adminUserSessions: adminUserSessionEntityAdapter.setOne(
                response,
                state.adminUserSessions
            ),
        })
    ),

    on(
        AdminUserSessionRemoteActions.listAdminUserSessions.request,
        (state, { pagination }) => ({
            ...state,
            adminUserSessionsRemotePagination: {
                ...state.adminUserSessionsRemotePagination,
                ...pagination,
            },
        })
    ),

    on(
        AdminUserSessionRemoteActions.listAdminUserSessions.success,
        (state, { response }) => ({
            ...state,
            adminUserSessions: adminUserSessionEntityAdapter.setMany(
                response.results,
                state.adminUserSessions
            ),
            adminUserSessionsRemotePagination: {
                ...state.adminUserSessionsRemotePagination,
                total: response.total,
            },
        })
    ),

    on(
        AdminUserSessionRemoteActions.invalidateAdminUserSession.success,
        (state, { response }) => ({
            ...state,
            adminUserSessions: adminUserSessionEntityAdapter.updateOne(
                { id: response.id, changes: response },
                state.adminUserSessions
            ),
        })
    )
)