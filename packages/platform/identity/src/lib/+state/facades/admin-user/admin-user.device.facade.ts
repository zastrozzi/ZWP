import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { AdminUserDeviceLocalActions, AdminUserDeviceRemoteActions } from '../../actions'
import { Selectors } from '../../selectors'
import { Model } from '../../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'AdminUserDeviceFacade', options: { skipMethodDebugger: true } })
export class AdminUserDeviceFacade {
    constructor(private store: Store) {

    }

    adminUserDeviceFilters$ = this.store.pipe(select(Selectors.AdminUserDeviceSelectors.selectAdminUserDeviceFilters))
    adminUserDeviceRemotePagination$ = this.store.pipe(select(Selectors.AdminUserDeviceSelectors.selectAdminUserDeviceRemotePagination))
    adminUserDevices$ = this.store.pipe(select(Selectors.AdminUserDeviceSelectors.selectAllAdminUserDevices))
    selectedAdminUserDevice$ = this.store.pipe(select(Selectors.AdminUserDeviceSelectors.selectedAdminUserDevice))
    adminUserDevicesForSelectedAdminUser$ = this.store.pipe(select(Selectors.AdminUserDeviceSelectors.selectAdminUserDevicesForSelectedAdminUser))

    adminUserDeviceById$ = (id: string) => this.store.pipe(select(Selectors.AdminUserDeviceSelectors.selectAdminUserDeviceById(id)))

    listAdminUserDevices(adminUserId: string, pagination: Nullable<Partial<PaginatedQueryParams<Model.AdminUserDeviceResponse>>> = null) {
        return this.store.dispatch(AdminUserDeviceRemoteActions.listAdminUserDevices.request({ adminUserId, pagination: pagination }))
    }

    updateAdminUserDeviceFilters(filters: Partial<Model.Filters.AdminUserDeviceFilters>) {
        return this.store.dispatch(AdminUserDeviceLocalActions.updateAdminUserDeviceFilters({ filters }))
    }
}