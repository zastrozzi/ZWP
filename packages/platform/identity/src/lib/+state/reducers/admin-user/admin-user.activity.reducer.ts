import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { AuditEventFilters, AuditEventResponse, initialAuditEventFilters } from '@zwp/platform.common'
import {
    AdminUserActivityLocalActions,
    AdminUserActivityRemoteActions,
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

export interface AdminUserActivityFeatureState extends BaseRemoteFeatureState {
    adminUserActivities: EntityState<AuditEventResponse>
    selectedAdminUserActivityId: Nullable<string>
    adminUserActivitiesRemotePagination: RemotePaginationState<AuditEventResponse>
    filters: AuditEventFilters
}

export const adminUserActivityEntityAdapter: EntityAdapter<AuditEventResponse> =
    createEntityAdapter<AuditEventResponse>()

export const initialAdminUserActivityFeatureState: AdminUserActivityFeatureState =
    {
        ...initialBaseRemoteFeatureState,
        adminUserActivities: adminUserActivityEntityAdapter.getInitialState(),
        selectedAdminUserActivityId: null,
        adminUserActivitiesRemotePagination: {
            limit: 30,
            offset: 0,
            order: 'desc',
            orderBy: 'dbCreatedAt',
            total: 0,
        },
        filters: initialAuditEventFilters
    }

export const adminUserActivityReducer = createReducer(
    initialAdminUserActivityFeatureState,
    on(
        AdminUserActivityLocalActions.initialiseAdminUserActivityState,
        () => initialAdminUserActivityFeatureState
    ),
    on(
        AdminUserActivityLocalActions.resetAdminUserActivityState,
        () => initialAdminUserActivityFeatureState
    ),
    on(
        AdminUserActivityLocalActions.updateAdminUserActivityFilters,
        (state, { filters }) => ({
            ...state,
            filters: { ...state.filters, ...filters },
        })
    ),
    on(
        AdminUserActivityLocalActions.resetAdminUserActivityFilters,
        (state) => ({
            ...state,
            filters: initialAdminUserActivityFeatureState.filters,
        })
    ),

    on(
        remoteStateUpdateRequest(AdminUserActivityRemoteActions.identifiers),
        (state) => remoteRequestState(state)
    ),
    on(
        remoteStateUpdateSuccess(AdminUserActivityRemoteActions.identifiers),
        (state) => remoteSuccessState(state)
    ),
    on(
        remoteStateUpdateFailure(AdminUserActivityRemoteActions.identifiers),
        (state, { error }) => remoteFailureState(state, error)
    ),

    on(
        AdminUserActivityRemoteActions.listAdminUserActivity.request,
        (state, { pagination }) => ({
            ...state,
            adminUserActivitiesRemotePagination: {
                ...state.adminUserActivitiesRemotePagination,
                ...pagination,
            },
        })
    ),

    on(
        AdminUserActivityRemoteActions.listAdminUserActivity.success,
        (state, { response }) => ({
            ...state,
            adminUserActivities: adminUserActivityEntityAdapter.setMany(
                response.results,
                state.adminUserActivities
            ),
            adminUserActivitiesRemotePagination: {
                ...state.adminUserActivitiesRemotePagination,
                total: response.total,
            },
        })
    )
)
