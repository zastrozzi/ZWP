import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { EnduserAddressLocalActions, EnduserAddressRemoteActions } from '../../actions'
import { Selectors } from '../../selectors'
import { Model } from '../../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'EnduserAddressFacade', options: { skipMethodDebugger: true } })
export class EnduserAddressFacade {
    constructor(private store: Store) {

    }

    enduserAddressFilters$ = this.store.pipe(select(Selectors.EnduserAddressSelectors.selectEnduserAddressFilters))
    enduserAddressRemotePagination$ = this.store.pipe(select(Selectors.EnduserAddressSelectors.selectEnduserAddressRemotePagination))
    enduserAddresses$ = this.store.pipe(select(Selectors.EnduserAddressSelectors.selectAllEnduserAddresses))
    selectedEnduserAddress$ = this.store.pipe(select(Selectors.EnduserAddressSelectors.selectedEnduserAddress))
    filteredEnduserAddresses$ = this.store.pipe(select(Selectors.EnduserAddressSelectors.selectFilteredEnduserAddresses))

    enduserAddressById$ = (id: string) => this.store.pipe(select(Selectors.EnduserAddressSelectors.selectEnduserAddressById(id)))

    createEnduserAddress(enduserId: string, request: Model.CreateEnduserAddressRequest) {
        return this.store.dispatch(EnduserAddressRemoteActions.createEnduserAddress.request({ enduserId, request }))
    }

    listEnduserAddresses(enduserId: string, pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserAddressResponse>>> = null) {
        return this.store.dispatch(EnduserAddressRemoteActions.listEnduserAddresses.request({ enduserId, pagination: pagination }))
    }

    updateEnduserAddressFilters(filters: Partial<Model.EnduserAddressFilters>) {
        return this.store.dispatch(EnduserAddressLocalActions.updateEnduserAddressFilters({ filters }))
    }
}