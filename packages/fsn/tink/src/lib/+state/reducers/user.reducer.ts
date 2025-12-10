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

export interface UserFeatureState extends BaseRemoteFeatureState {
    users: EntityState<Model.ServerAPIModel.User.TinkUserResponse>
    selectedUserId: Nullable<string>
    usersRemotePagination: RemotePaginationState<Model.ServerAPIModel.User.TinkUserResponse>
    filters: Model.Filters.UserFilters
}

export const userEntityAdapter: EntityAdapter<Model.ServerAPIModel.User.TinkUserResponse> =
    createEntityAdapter<Model.ServerAPIModel.User.TinkUserResponse>()

export const initialUserFeatureState: UserFeatureState = {
    ...initialBaseRemoteFeatureState,
    users: userEntityAdapter.getInitialState(),
    selectedUserId: null,
    usersRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'dbCreatedAt',
        total: 0,
    },
    filters: Model.Filters.initialUserFilters,
}

export const userReducer = createReducer(
    initialUserFeatureState,
    on(Actions.UserLocalActions.resetUserState, () => initialUserFeatureState),
    on(Actions.UserLocalActions.initialiseUserState, () => initialUserFeatureState),
    on(Actions.UserLocalActions.updateUserFilters, (state, { filters }) => ({
        ...state,
        filters: { ...state.filters, ...filters },
    })),
    on(Actions.UserLocalActions.resetUserFilters, (state) => ({
        ...state,
        filters: Model.Filters.initialUserFilters,
    })),
    on(Actions.UserLocalActions.selectUser, (state, { userId }) => ({
        ...state,
        selectedUserId: userId,
    })),
    on(Actions.UserLocalActions.deselectUser, (state) => ({ ...state, selectedUserId: null })),
    on(Actions.UserLocalActions.resetPagination, (state) => ({
        ...state,
        usersRemotePagination: { ...state.usersRemotePagination, offset: 0 },
    })),
    on(remoteStateUpdateRequest(Actions.UserRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(Actions.UserRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(Actions.UserRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),
    on(Actions.UserRemoteActions.createUser.success, (state, { response }) => ({
        ...state,
        users: userEntityAdapter.setOne(response, state.users),
        usersRemotePagination: incrementRemotePaginationStateTotalConditionally(state, {
            entityStateKey: 'users',
            remotePaginationStateKey: 'usersRemotePagination',
            ids: [response.id],
        }),
        selectedUserId: response.id,
    })),
    on(Actions.UserRemoteActions.getUser.success, (state, { response }) => ({
        ...state,
        users: userEntityAdapter.setOne(response, state.users),
    })),
    on(Actions.UserRemoteActions.listUsers.request, (state, { pagination }) => ({
        ...state,
        usersRemotePagination: { ...state.usersRemotePagination, ...pagination },
    })),
    on(Actions.UserRemoteActions.listUsers.success, (state, { response }) => ({
        ...state,
        users: userEntityAdapter.setMany(response.results, state.users),
        usersRemotePagination: {
            ...state.usersRemotePagination,
            total: response.total,
        },
    })),
    on(Actions.UserRemoteActions.deleteUser.success, (state, { tinkUserId }) => ({
        ...state,
        users: userEntityAdapter.removeOne(tinkUserId, state.users),
        usersRemotePagination: decrementRemotePaginationStateTotalConditionally(state, {
            entityStateKey: 'users',
            remotePaginationStateKey: 'usersRemotePagination',
            ids: [tinkUserId],
        }),
        selectedUserId: state.selectedUserId === tinkUserId ? null : state.selectedUserId,
    })),
    on(Actions.UserRemoteActions.relinkUser.success, (state, { response }) => ({
        ...state,
        users: userEntityAdapter.setOne(response, state.users),
        usersRemotePagination: incrementRemotePaginationStateTotalConditionally(state, {
            entityStateKey: 'users',
            remotePaginationStateKey: 'usersRemotePagination',
            ids: [response.id],
        }),
        selectedUserId: response.id,
    }))
)
