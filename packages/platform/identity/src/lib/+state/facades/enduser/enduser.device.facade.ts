import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { EnduserDeviceLocalActions, EnduserDeviceRemoteActions } from '../../actions'
import { Selectors } from '../../selectors'
import { Model } from '../../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'EnduserDeviceFacade', options: { skipMethodDebugger: true } })
export class EnduserDeviceFacade {
    constructor(private store: Store) {

    }

    enduserDeviceFilters$ = this.store.pipe(select(Selectors.EnduserDeviceSelectors.selectEnduserDeviceFilters))
    enduserDeviceRemotePagination$ = this.store.pipe(select(Selectors.EnduserDeviceSelectors.selectEnduserDeviceRemotePagination))
    enduserDevices$ = this.store.pipe(select(Selectors.EnduserDeviceSelectors.selectAllEnduserDevices))
    selectedEnduserDevice$ = this.store.pipe(select(Selectors.EnduserDeviceSelectors.selectedEnduserDevice))
    filteredEnduserDevices$ = this.store.pipe(select(Selectors.EnduserDeviceSelectors.selectFilteredEnduserDevices))

    enduserDeviceById$ = (id: string) => this.store.pipe(select(Selectors.EnduserDeviceSelectors.selectEnduserDeviceById(id)))

    listEnduserDevices(enduserId: string, pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserDeviceResponse>>> = null) {
        return this.store.dispatch(EnduserDeviceRemoteActions.listEnduserDevices.request({ enduserId, pagination: pagination }))
    }

    updateEnduserDeviceFilters(filters: Partial<Model.Filters.EnduserDeviceFilters>) {
        return this.store.dispatch(EnduserDeviceLocalActions.updateEnduserDeviceFilters({ filters }))
    }
}