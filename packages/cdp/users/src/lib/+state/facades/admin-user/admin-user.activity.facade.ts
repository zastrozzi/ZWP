import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { AuditEventFilters, ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { AdminUserActivityLocalActions, AdminUserActivityRemoteActions, AdminUserRemoteActions } from '../../actions'
import { Selectors } from '../../selectors'
import { AuditEventResponse } from '@zwp/platform.common'
import { map } from 'rxjs'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'AdminUserActivityFacade', options: { skipMethodDebugger: true } })
export class AdminUserActivityFacade {
    constructor(private store: Store) {

    }

    adminUserActivity$ = this.store.pipe(select(Selectors.AdminUserActivitySelectors.selectAllAdminUserActivity))
    selectedAdminUserActivity$ = this.store.pipe(select(Selectors.AdminUserActivitySelectors.selectedAdminUserActivity))
    adminUserActivityRemotePagination$ = this.store.pipe(select(Selectors.AdminUserActivitySelectors.selectAdminUserActivityRemotePagination))
    adminUserActivityFilters$ = this.store.pipe(select(Selectors.AdminUserActivitySelectors.selectAdminUserActivityFilters))

    adminUserActivityWithAdminUser$ = this.store.pipe(
        select(Selectors.AdminUserActivitySelectors.selectAllAdminUserActivityWithAdminUser),
        map((activities) => {
            const unknownAdminUserIds = activities.filter(activity => !activity.adminUser).map(activity => activity.activity.platformActorId)
            unknownAdminUserIds.forEach(id => this.store.dispatch(AdminUserRemoteActions.getAdminUser.request({ adminUserId: id })))
            return activities
        })
    )

    adminUserActivityById$ = (id: string) => this.store.pipe(select(Selectors.AdminUserActivitySelectors.selectAdminUserActivityById(id)))

    listAdminUserActivity(adminUserId: string, pagination: Nullable<Partial<PaginatedQueryParams<AuditEventResponse>>> = null) {
        return this.store.dispatch(AdminUserActivityRemoteActions.listAdminUserActivity.request({ adminUserId, pagination: pagination }))
    }

    updateAdminUserActivityFilters(filters: Partial<AuditEventFilters>) {
        return this.store.dispatch(AdminUserActivityLocalActions.updateAdminUserActivityFilters({ filters }))
    }
}