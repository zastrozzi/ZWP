import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../../model'
import {
    AdminUserEmailLocalActions,
    AdminUserEmailRemoteActions,
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

export interface AdminUserEmailFeatureState extends BaseRemoteFeatureState {
    adminUserEmails: EntityState<Model.AdminUserEmailResponse>
    selectedAdminUserEmailId: Nullable<string>
    adminUserEmailsRemotePagination: RemotePaginationState<Model.AdminUserEmailResponse>
    filters: Model.Filters.AdminUserEmailFilters
}

export const adminUserEmailEntityAdapter: EntityAdapter<Model.AdminUserEmailResponse> =
    createEntityAdapter<Model.AdminUserEmailResponse>()

export const initialAdminUserEmailFeatureState: AdminUserEmailFeatureState = {
    ...initialBaseRemoteFeatureState,
    adminUserEmails: adminUserEmailEntityAdapter.getInitialState(),
    selectedAdminUserEmailId: null,
    adminUserEmailsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'dbCreatedAt',
        total: 0,
    },
    filters: Model.Filters.initialAdminUserEmailFilters
}

export const adminUserEmailReducer = createReducer(
    initialAdminUserEmailFeatureState,
    on(
        AdminUserEmailLocalActions.initialiseAdminUserEmailState,
        () => initialAdminUserEmailFeatureState
    ),
    on(
        AdminUserEmailLocalActions.resetAdminUserEmailState,
        () => initialAdminUserEmailFeatureState
    ),
    on(
        AdminUserEmailLocalActions.updateAdminUserEmailFilters,
        (state, { filters }) => ({
            ...state,
            filters: { ...state.filters, ...filters },
        })
    ),
    on(AdminUserEmailLocalActions.resetAdminUserEmailFilters, (state) => ({
        ...state,
        filters: initialAdminUserEmailFeatureState.filters,
    })),
    on(
        remoteStateUpdateRequest(AdminUserEmailRemoteActions.identifiers),
        (state) => remoteRequestState(state)
    ),
    on(
        remoteStateUpdateSuccess(AdminUserEmailRemoteActions.identifiers),
        (state) => remoteSuccessState(state)
    ),
    on(
        remoteStateUpdateFailure(AdminUserEmailRemoteActions.identifiers),
        (state, { error }) => remoteFailureState(state, error)
    ),
    on(
        AdminUserEmailRemoteActions.createAdminUserEmail.success,
        (state, { response }) => ({
            ...state,
            adminUserEmails: adminUserEmailEntityAdapter.setOne(
                response,
                state.adminUserEmails
            ),
        })
    ),

    on(
        AdminUserEmailRemoteActions.getAdminUserEmail.success,
        (state, { response }) => ({
            ...state,
            adminUserEmails: adminUserEmailEntityAdapter.setOne(
                response,
                state.adminUserEmails
            ),
            selectedAdminUserEmailId: response.id,
        })
    ),

    on(
        AdminUserEmailRemoteActions.listAdminUserEmails.request,
        (state, { pagination }) => ({
            ...state,
            adminUserEmailsRemotePagination: {
                ...state.adminUserEmailsRemotePagination,
                ...pagination,
            },
        })
    ),

    on(
        AdminUserEmailRemoteActions.listAdminUserEmails.success,
        (state, { response }) => ({
            ...state,
            adminUserEmails: adminUserEmailEntityAdapter.setMany(
                response.results,
                state.adminUserEmails
            ),
            adminUserEmailsRemotePagination: {
                ...state.adminUserEmailsRemotePagination,
                total: response.total,
            },
        })
    ),

    on(
        AdminUserEmailRemoteActions.updateAdminUserEmail.success,
        (state, { response }) => ({
            ...state,
            adminUserEmails: adminUserEmailEntityAdapter.updateOne(
                { id: response.id, changes: response },
                state.adminUserEmails
            ),
        })
    ),

    on(
        AdminUserEmailRemoteActions.deleteAdminUserEmail.success,
        (state, { response }) => ({
            ...state,
            adminUserEmails: adminUserEmailEntityAdapter.removeOne(
                response.adminUserEmailId,
                state.adminUserEmails
            ),
            selectedAdminUserEmailId:
                state.selectedAdminUserEmailId === response.adminUserEmailId
                    ? null
                    : state.selectedAdminUserEmailId,
        })
    )
)
