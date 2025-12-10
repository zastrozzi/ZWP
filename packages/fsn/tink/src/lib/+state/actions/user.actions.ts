import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    ResetRemoteFilters,
    UpdateRemoteFilters,
    createActionType,
    createRemoteActionCRUDMap,
    createRemoteActionGroup,
    createRemoteActionMap,
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const USER_ACTION_IDENTIFIERS = [
    Identifiers.FSN_TINK_ACTION_IDENTIFIER,
    Identifiers.USER_STATE_FEATURE_KEY,
]

const updateUserFilters = createAction(
    createActionType(USER_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.UserFilters>>()
)

const resetUserFilters = createAction(
    createActionType(USER_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetUserState = createAction(
    createActionType(USER_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseUserState = createAction(
    createActionType(USER_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectUser = createAction(
    createActionType(USER_ACTION_IDENTIFIERS, 'Select User'),
    props<{ userId: string }>()
)

const deselectUser = createAction(
    createActionType(USER_ACTION_IDENTIFIERS, 'Deselect User')
)

const resetPagination = createAction(
    createActionType(USER_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const createUser = createRemoteActionGroup<
    { 
        enduserId: string,
        request: Model.ServerAPIModel.User.CreateTinkUserRequest
    },
    Model.ServerAPIModel.User.TinkUserResponse
>('Create User', ...USER_ACTION_IDENTIFIERS)

const getUser = createRemoteActionGroup<
    { tinkUserId: string },
    Model.ServerAPIModel.User.TinkUserResponse
>('Get User', ...USER_ACTION_IDENTIFIERS)

const listUsers = createRemoteActionGroup<
    {
        enduserId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.User.TinkUserResponse>>>
    },
    PaginatedResponse<Model.ServerAPIModel.User.TinkUserResponse>
>('List Users', ...USER_ACTION_IDENTIFIERS)

const deleteUser = createRemoteActionGroup<
    { tinkUserId: string },
    { tinkUserId: string }
>('Delete User', ...USER_ACTION_IDENTIFIERS)

const refreshUser = createRemoteActionGroup<
    { tinkUserId: string },
    { tinkUserId: string }
>('Refresh User', ...USER_ACTION_IDENTIFIERS)

const relinkUser = createRemoteActionGroup<
    { enduserId: string },
    Model.ServerAPIModel.User.TinkUserResponse
>('Relink User', ...USER_ACTION_IDENTIFIERS)

export const UserLocalActions = {
    updateUserFilters,
    resetUserFilters,
    resetUserState,
    initialiseUserState,
    selectUser,
    deselectUser,
    resetPagination
}

export const UserRemoteActions = createRemoteActionMap(
    USER_ACTION_IDENTIFIERS,
    {
        createUser,
        getUser,
        listUsers,
        deleteUser,
        refreshUser,
        relinkUser
    }
)