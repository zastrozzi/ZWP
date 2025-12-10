import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { AdminUserSessionLocalActions, AdminUserSessionRemoteActions } from '../../actions'
import { Selectors } from '../../selectors'
import { Model } from '../../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'AdminUserSessionFacade', options: { skipMethodDebugger: true } })
export class AdminUserSessionFacade {
    constructor(private store: Store) {

    }

    adminUserSessionFilters$ = this.store.pipe(select(Selectors.AdminUserSessionSelectors.selectAdminUserSessionFilters))
    adminUserSessionRemotePagination$ = this.store.pipe(select(Selectors.AdminUserSessionSelectors.selectAdminUserSessionRemotePagination))
    adminUserSessionRemoteState$ = this.store.pipe(select(Selectors.AdminUserSessionSelectors.selectAdminUserSessionRemoteState))

    adminUserSessions$ = this.store.pipe(select(Selectors.AdminUserSessionSelectors.selectAllAdminUserSessions))
    selectedAdminUserSession$ = this.store.pipe(select(Selectors.AdminUserSessionSelectors.selectedAdminUserSession))
    adminUserSessionsForSelectedAdminUser$ = this.store.pipe(select(Selectors.AdminUserSessionSelectors.selectAdminUserSessionsForSelectedAdminUser))

    adminUserSessionById$ = (id: string) => this.store.pipe(select(Selectors.AdminUserSessionSelectors.selectAdminUserSessionById(id)))

    listAdminUserSessions(adminUserId: string, pagination: Nullable<Partial<PaginatedQueryParams<Model.AdminUserSessionResponse>>> = null) {
        return this.store.dispatch(AdminUserSessionRemoteActions.listAdminUserSessions.request({ adminUserId, pagination: pagination }))
    }

    updateAdminUserSessionFilters(filters: Partial<Model.Filters.AdminUserSessionFilters>) {
        return this.store.dispatch(AdminUserSessionLocalActions.updateAdminUserSessionFilters({ filters }))
    }

    selectAdminUserSession(adminUserSessionId: string) {
        return this.store.dispatch(AdminUserSessionLocalActions.selectAdminUserSession({ adminUserSessionId }))
    }

    getAdminUserSession(adminUserSessionId: string) {
        return this.store.dispatch(AdminUserSessionRemoteActions.getAdminUserSession.request({ adminUserSessionId }))
    }

    invalidateAdminUserSession(adminUserSessionId: string) {
        return this.store.dispatch(AdminUserSessionRemoteActions.invalidateAdminUserSession.request({ adminUserSessionId }))
    }
}