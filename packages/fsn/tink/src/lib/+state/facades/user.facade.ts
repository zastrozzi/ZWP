import { Injectable, inject } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { UserLocalActions, UserRemoteActions } from '../actions/user.actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'TinkUserFacade', options: { skipMethodDebugger: true } })
export class TinkUserFacade {
    private store = inject(Store)

    // Observables from selectors
    userFilters$ = this.store.pipe(select(Selectors.UserSelectors.selectUserFilters))
    userRemotePagination$ = this.store.pipe(select(Selectors.UserSelectors.selectUserRemotePagination))
    userRemoteState$ = this.store.pipe(select(Selectors.UserSelectors.selectUserRemoteState))

    users$ = this.store.pipe(select(Selectors.UserSelectors.selectAllUsers))
    selectedUserId$ = this.store.pipe(select(Selectors.UserSelectors.selectSelectedUserId))
    selectedUser$ = this.store.pipe(select(Selectors.UserSelectors.selectedUser))
    filteredUsers$ = this.store.pipe(select(Selectors.UserSelectors.selectFilteredUsers))
    paginatedUsers$ = this.store.pipe(select(Selectors.UserSelectors.selectPaginatedUsers))
    paginatedFilteredUsers$ = this.store.pipe(select(Selectors.UserSelectors.selectPaginatedFilteredUsers))

    userById$ = (userId: string) => this.store.pipe(select(Selectors.UserSelectors.selectUserById(userId)))

    // Local Actions
    updateUserFilters(filters: Partial<Model.Filters.UserFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(UserLocalActions.updateUserFilters({ filters, triggerRemoteFetch }))
    }

    resetUserFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(UserLocalActions.resetUserFilters({ triggerRemoteFetch }))
    }

    resetUserState() {
        return this.store.dispatch(UserLocalActions.resetUserState())
    }

    initialiseUserState() {
        return this.store.dispatch(UserLocalActions.initialiseUserState())
    }

    selectUser(userId: string) {
        return this.store.dispatch(UserLocalActions.selectUser({ userId }))
    }

    deselectUser() {
        return this.store.dispatch(UserLocalActions.deselectUser())
    }

    resetPagination() {
        return this.store.dispatch(UserLocalActions.resetPagination())
    }

    // Remote Actions
    createUser(enduserId: string, request: Model.ServerAPIModel.User.CreateTinkUserRequest) {
        return this.store.dispatch(UserRemoteActions.createUser.request({ enduserId, request }))
    }

    getUser(tinkUserId: string) {
        return this.store.dispatch(UserRemoteActions.getUser.request({ tinkUserId }))
    }

    listUsers(
        enduserId: Nullable<string> = null,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.User.TinkUserResponse>>> = null
    ) {
        return this.store.dispatch(UserRemoteActions.listUsers.request({ enduserId, pagination }))
    }

    deleteUser(tinkUserId: string) {
        return this.store.dispatch(UserRemoteActions.deleteUser.request({ tinkUserId }))
    }

    refreshUser(tinkUserId: string) {
        return this.store.dispatch(UserRemoteActions.refreshUser.request({ tinkUserId }))
    }

    relinkUser(enduserId: string) {
        return this.store.dispatch(UserRemoteActions.relinkUser.request({ enduserId }))
    }
}
