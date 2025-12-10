import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from "@zwp/platform.common";
import { AdminUserLocalActions, AdminUserRemoteActions } from "../../actions";
import { UserAuthFacade } from "@zwp/platform.auth";
import { Selectors } from '../../selectors'
import { Model } from "../../../model";

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'AdminUserFacade', options: { skipMethodDebugger: true } })
export class AdminUserFacade {
    constructor(private store: Store, private userAuthFacade: UserAuthFacade) {

    }

    adminUserFilters$ = this.store.pipe(select(Selectors.AdminUserSelectors.selectAdminUserFilters))
    adminUserRemotePagination$ = this.store.pipe(select(Selectors.AdminUserSelectors.selectAdminUserRemotePagination))
    adminUserRemoteState$ = this.store.pipe(select(Selectors.AdminUserSelectors.selectAdminUserRemoteState))

    adminUsers$ = this.store.pipe(select(Selectors.AdminUserSelectors.selectAllAdminUsers))
    selectedAdminUser$ = this.store.pipe(select(Selectors.AdminUserSelectors.selectedAdminUser))
    loggedInAdminUser$ = this.store.pipe(select(Selectors.AdminUserSelectors.selectLoggedInAdminUser))
    hasLoggedInAdminUser$ = this.store.pipe(select(Selectors.AdminUserSelectors.selectHasLoggedInAdminUser))
    loggedInAdminUserName$ = this.store.pipe(select(Selectors.AdminUserSelectors.selectLoggedInAdminUserName))

    adminUserById$ = (id: string) => this.store.pipe(select(Selectors.AdminUserSelectors.selectAdminUserById(id)))
    
    loginAdminUserEmailPassword(credentials: {email: string, password: string}) {
        return this.store.dispatch(AdminUserRemoteActions.loginAdminUserEmailPassword.request(credentials))
    }

    logoutAdminUser() {
        const adminUserId = this.userAuthFacade.getAuthedUserId()
        if (!adminUserId) { throw new Error('No authenticated user found') }
        return this.store.dispatch(AdminUserRemoteActions.logoutAdminUser.request({ adminUserId: adminUserId }))
    }

    createAdminUser(request: Model.CreateAdminUserRequest) {
        return this.store.dispatch(AdminUserRemoteActions.createAdminUser.request(request))
    }

    listAdminUsers(pagination: Nullable<Partial<PaginatedQueryParams<Model.AdminUserResponse>>> = null) {
        return this.store.dispatch(AdminUserRemoteActions.listAdminUsers.request({ pagination: pagination }))
    }

    selectAdminUser(adminUserId: string) {
        return this.store.dispatch(AdminUserLocalActions.selectAdminUser({ adminUserId }))
    }

    updateAdminUser(adminUserId: string, update: Model.UpdateAdminUserRequest) {
        return this.store.dispatch(AdminUserRemoteActions.updateAdminUser.request({ adminUserId, update }))
    }

    deleteAdminUser(adminUserId: string) {
        return this.store.dispatch(AdminUserRemoteActions.deleteAdminUser.request({ adminUserId }))
    }

    updateAdminUserFilters(filters: Partial<Model.Filters.AdminUserFilters>) {
        return this.store.dispatch(AdminUserLocalActions.updateAdminUserFilters({ filters }))
    }

    resetAdminUserFilters() {
        return this.store.dispatch(AdminUserLocalActions.resetAdminUserFilters())
    }
}