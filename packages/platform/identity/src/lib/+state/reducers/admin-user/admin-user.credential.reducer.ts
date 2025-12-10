import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../../model'
import {
    AdminUserCredentialLocalActions,
    AdminUserCredentialRemoteActions,
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

export interface AdminUserCredentialFeatureState
    extends BaseRemoteFeatureState {
    adminUserCredentials: EntityState<Model.AdminUserCredentialResponse>
    selectedAdminUserCredentialId: Nullable<string>
    adminUserCredentialsRemotePagination: RemotePaginationState<Model.AdminUserCredentialResponse>
    filters: Model.Filters.AdminUserCredentialFilters
}

export const adminUserCredentialEntityAdapter: EntityAdapter<Model.AdminUserCredentialResponse> =
    createEntityAdapter<Model.AdminUserCredentialResponse>()

export const initialAdminUserCredentialFeatureState: AdminUserCredentialFeatureState =
    {
        ...initialBaseRemoteFeatureState,
        adminUserCredentials:
            adminUserCredentialEntityAdapter.getInitialState(),
        selectedAdminUserCredentialId: null,
        adminUserCredentialsRemotePagination: {
            limit: 30,
            offset: 0,
            order: 'desc',
            orderBy: 'dbCreatedAt',
            total: 0,
        },
        filters: Model.Filters.initialAdminUserCredentialFilters
    }

export const adminUserCredentialReducer = createReducer(
    initialAdminUserCredentialFeatureState,
    on(
        AdminUserCredentialLocalActions.initialiseAdminUserCredentialState,
        () => initialAdminUserCredentialFeatureState
    ),
    on(
        AdminUserCredentialLocalActions.resetAdminUserCredentialState,
        () => initialAdminUserCredentialFeatureState
    ),
    on(
        AdminUserCredentialLocalActions.updateAdminUserCredentialFilters,
        (state, { filters }) => ({
            ...state,
            filters: { ...state.filters, ...filters },
        })
    ),
    on(
        AdminUserCredentialLocalActions.resetAdminUserCredentialFilters,
        (state) => ({
            ...state,
            filters: initialAdminUserCredentialFeatureState.filters,
        })
    ),

    on(
        remoteStateUpdateRequest(AdminUserCredentialRemoteActions.identifiers),
        (state) => remoteRequestState(state)
    ),
    on(
        remoteStateUpdateSuccess(AdminUserCredentialRemoteActions.identifiers),
        (state) => remoteSuccessState(state)
    ),
    on(
        remoteStateUpdateFailure(AdminUserCredentialRemoteActions.identifiers),
        (state, { error }) => remoteFailureState(state, error)
    ),
    on(
        AdminUserCredentialRemoteActions.createAdminUserCredential.success,
        (state, { response }) => ({
            ...state,
            adminUserCredentials: adminUserCredentialEntityAdapter.setOne(
                response,
                state.adminUserCredentials
            ),
        })
    ),

    on(
        AdminUserCredentialRemoteActions.getAdminUserCredential.success,
        (state, { response }) => ({
            ...state,
            adminUserCredentials: adminUserCredentialEntityAdapter.setOne(
                response,
                state.adminUserCredentials
            ),
            selectedAdminUserCredentialId: response.id,
        })
    ),

    on(
        AdminUserCredentialRemoteActions.listAdminUserCredentials.request,
        (state, { pagination }) => ({
            ...state,
            adminUserCredentialsRemotePagination: {
                ...state.adminUserCredentialsRemotePagination,
                ...pagination,
            },
        })
    ),

    on(
        AdminUserCredentialRemoteActions.listAdminUserCredentials.success,
        (state, { response }) => ({
            ...state,
            adminUserCredentials: adminUserCredentialEntityAdapter.setMany(
                response.results,
                state.adminUserCredentials
            ),
            adminUserCredentialsRemotePagination: {
                ...state.adminUserCredentialsRemotePagination,
                total: response.total,
            },
        })
    ),

    on(
        AdminUserCredentialRemoteActions.updateAdminUserCredential.success,
        (state, { response }) => ({
            ...state,
            adminUserCredentials: adminUserCredentialEntityAdapter.updateOne(
                { id: response.id, changes: response },
                state.adminUserCredentials
            ),
        })
    ),

    on(
        AdminUserCredentialRemoteActions.deleteAdminUserCredential.success,
        (state, { response }) => ({
            ...state,
            adminUserCredentials: adminUserCredentialEntityAdapter.removeOne(
                response.adminUserCredentialId,
                state.adminUserCredentials
            ),
            selectedAdminUserCredentialId:
                state.selectedAdminUserCredentialId ===
                response.adminUserCredentialId
                    ? null
                    : state.selectedAdminUserCredentialId,
        })
    )
)
