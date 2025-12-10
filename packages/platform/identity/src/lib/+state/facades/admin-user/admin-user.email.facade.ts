import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { AdminUserEmailLocalActions, AdminUserEmailRemoteActions } from '../../actions'
import { Selectors } from '../../selectors'
import { Model } from '../../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'AdminUserEmailFacade', options: { skipMethodDebugger: true } })
export class AdminUserEmailFacade {
    constructor(private store: Store) {

    }

    adminUserEmailFilters$ = this.store.pipe(select(Selectors.AdminUserEmailSelectors.selectAdminUserEmailFilters))
    adminUserEmailRemotePagination$ = this.store.pipe(select(Selectors.AdminUserEmailSelectors.selectAdminUserEmailRemotePagination))
    adminUserEmails$ = this.store.pipe(select(Selectors.AdminUserEmailSelectors.selectAllAdminUserEmails))
    selectedAdminUserEmail$ = this.store.pipe(select(Selectors.AdminUserEmailSelectors.selectedAdminUserEmail))
    adminUserEmailsForSelectedAdminUser$ = this.store.pipe(select(Selectors.AdminUserEmailSelectors.selectAdminUserEmailsForSelectedAdminUser))

    adminUserEmailById$ = (id: string) => this.store.pipe(select(Selectors.AdminUserEmailSelectors.selectAdminUserEmailById(id)))

    createAdminUserEmail(adminUserId: string, request: Model.CreateAdminUserEmailRequest) {
        return this.store.dispatch(AdminUserEmailRemoteActions.createAdminUserEmail.request({ adminUserId, request }))
    }

    listAdminUserEmails(adminUserId: string, pagination: Nullable<Partial<PaginatedQueryParams<Model.AdminUserEmailResponse>>> = null) {
        return this.store.dispatch(AdminUserEmailRemoteActions.listAdminUserEmails.request({ adminUserId, pagination: pagination }))
    }

    updateAdminUserEmailFilters(filters: Partial<Model.Filters.AdminUserEmailFilters>) {
        return this.store.dispatch(AdminUserEmailLocalActions.updateAdminUserEmailFilters({ filters }))
    }
}