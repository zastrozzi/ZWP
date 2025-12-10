import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { EnduserPhoneLocalActions, EnduserPhoneRemoteActions } from '../../actions'
import { Selectors } from '../../selectors'
import { Model } from '../../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'EnduserPhoneFacade', options: { skipMethodDebugger: true } })
export class EnduserPhoneFacade {
    constructor(private store: Store) {

    }

    enduserPhoneFilters$ = this.store.pipe(select(Selectors.EnduserPhoneSelectors.selectEnduserPhoneFilters))
    enduserPhoneRemotePagination$ = this.store.pipe(select(Selectors.EnduserPhoneSelectors.selectEnduserPhoneRemotePagination))
    enduserPhones$ = this.store.pipe(select(Selectors.EnduserPhoneSelectors.selectAllEnduserPhones))
    selectedEnduserPhone$ = this.store.pipe(select(Selectors.EnduserPhoneSelectors.selectedEnduserPhone))
    filteredEnduserPhones$ = this.store.pipe(select(Selectors.EnduserPhoneSelectors.selectFilteredEnduserPhones))

    enduserPhoneById$ = (id: string) => this.store.pipe(select(Selectors.EnduserPhoneSelectors.selectEnduserPhoneById(id)))

    createEnduserPhone(enduserId: string, request: Model.CreateEnduserPhoneRequest) {
        return this.store.dispatch(EnduserPhoneRemoteActions.createEnduserPhone.request({ enduserId, request }))
    }

    listEnduserPhones(enduserId: string, pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserPhoneResponse>>> = null) {
        return this.store.dispatch(EnduserPhoneRemoteActions.listEnduserPhones.request({ enduserId, pagination: pagination }))
    }

    updateEnduserPhoneFilters(filters: Partial<Model.EnduserPhoneFilters>) {
        return this.store.dispatch(EnduserPhoneLocalActions.updateEnduserPhoneFilters({ filters }))
    }
}