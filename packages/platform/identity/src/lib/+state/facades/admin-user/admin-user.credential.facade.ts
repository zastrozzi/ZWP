import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { AdminUserCredentialLocalActions, AdminUserCredentialRemoteActions } from '../../actions'
import { Selectors } from '../../selectors'
import { Model } from '../../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'AdminUserCredentialFacade', options: { skipMethodDebugger: true } })
export class AdminUserCredentialFacade {
    constructor(private store: Store) {

    }

    adminUserCredentialFilters$ = this.store.pipe(select(Selectors.AdminUserCredentialSelectors.selectAdminUserCredentialFilters))
    adminUserCredentialRemotePagination$ = this.store.pipe(select(Selectors.AdminUserCredentialSelectors.selectAdminUserCredentialRemotePagination))
    adminUserCredentials$ = this.store.pipe(select(Selectors.AdminUserCredentialSelectors.selectAllAdminUserCredentials))
    selectedAdminUserCredential$ = this.store.pipe(select(Selectors.AdminUserCredentialSelectors.selectedAdminUserCredential))
    adminUserCredentialsForSelectedAdminUser$ = this.store.pipe(select(Selectors.AdminUserCredentialSelectors.selectAdminUserCredentialsForSelectedAdminUser))

    adminUserCredentialById$ = (id: string) => this.store.pipe(select(Selectors.AdminUserCredentialSelectors.selectAdminUserCredentialById(id)))

    createAdminUserCredential(adminUserId: string, request: Model.CreateAdminUserCredentialRequest) {
        return this.store.dispatch(AdminUserCredentialRemoteActions.createAdminUserCredential.request({ adminUserId, request }))
    }

    listAdminUserCredentials(adminUserId: string, pagination: Nullable<Partial<PaginatedQueryParams<Model.AdminUserCredentialResponse>>> = null) {
        return this.store.dispatch(AdminUserCredentialRemoteActions.listAdminUserCredentials.request({ adminUserId, pagination: pagination }))
    }

    updateAdminUserCredentialFilters(filters: Partial<Model.Filters.AdminUserCredentialFilters>) {
        return this.store.dispatch(AdminUserCredentialLocalActions.updateAdminUserCredentialFilters({ filters }))
    }
}