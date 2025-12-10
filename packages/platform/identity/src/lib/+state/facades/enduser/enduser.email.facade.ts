import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { EnduserEmailLocalActions, EnduserEmailRemoteActions } from '../../actions'
import { Selectors } from '../../selectors'
import { Model } from '../../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'EnduserEmailFacade', options: { skipMethodDebugger: true } })
export class EnduserEmailFacade {
    constructor(private store: Store) {

    }

    enduserEmailFilters$ = this.store.pipe(select(Selectors.EnduserEmailSelectors.selectEnduserEmailFilters))
    enduserEmailRemotePagination$ = this.store.pipe(select(Selectors.EnduserEmailSelectors.selectEnduserEmailRemotePagination))
    enduserEmails$ = this.store.pipe(select(Selectors.EnduserEmailSelectors.selectAllEnduserEmails))
    selectedEnduserEmail$ = this.store.pipe(select(Selectors.EnduserEmailSelectors.selectedEnduserEmail))
    filteredEnduserEmails$ = this.store.pipe(select(Selectors.EnduserEmailSelectors.selectFilteredEnduserEmails))

    enduserEmailById$ = (id: string) => this.store.pipe(select(Selectors.EnduserEmailSelectors.selectEnduserEmailById(id)))

    createEnduserEmail(enduserId: string, request: Model.CreateEnduserEmailRequest) {
        return this.store.dispatch(EnduserEmailRemoteActions.createEnduserEmail.request({ enduserId, request }))
    }

    listEnduserEmails(enduserId: string, pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserEmailResponse>>> = null) {
        return this.store.dispatch(EnduserEmailRemoteActions.listEnduserEmails.request({ enduserId, pagination: pagination }))
    }

    updateEnduserEmailFilters(filters: Partial<Model.EnduserEmailFilters>) {
        return this.store.dispatch(EnduserEmailLocalActions.updateEnduserEmailFilters({ filters }))
    }
}