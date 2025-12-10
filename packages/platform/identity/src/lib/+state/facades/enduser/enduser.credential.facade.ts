import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { EnduserCredentialLocalActions, EnduserCredentialRemoteActions } from '../../actions'
import { Selectors } from '../../selectors'
import { Model } from '../../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'EnduserCredentialFacade', options: { skipMethodDebugger: true } })
export class EnduserCredentialFacade {
    constructor(private store: Store) {

    }

    enduserCredentialFilters$ = this.store.pipe(select(Selectors.EnduserCredentialSelectors.selectEnduserCredentialFilters))
    enduserCredentialRemotePagination$ = this.store.pipe(select(Selectors.EnduserCredentialSelectors.selectEnduserCredentialRemotePagination))
    enduserCredentials$ = this.store.pipe(select(Selectors.EnduserCredentialSelectors.selectAllEnduserCredentials))
    selectedEnduserCredential$ = this.store.pipe(select(Selectors.EnduserCredentialSelectors.selectedEnduserCredential))
    filteredEnduserCredentials$ = this.store.pipe(select(Selectors.EnduserCredentialSelectors.selectFilteredEnduserCredentials))

    enduserCredentialById$ = (id: string) => this.store.pipe(select(Selectors.EnduserCredentialSelectors.selectEnduserCredentialById(id)))

    createEnduserCredential(enduserId: string, request: Model.CreateEnduserCredentialRequest) {
        return this.store.dispatch(EnduserCredentialRemoteActions.createEnduserCredential.request({ enduserId, request }))
    }

    listEnduserCredentials(enduserId: string, pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserCredentialResponse>>> = null) {
        return this.store.dispatch(EnduserCredentialRemoteActions.listEnduserCredentials.request({ enduserId, pagination: pagination }))
    }

    updateEnduserCredentialFilters(filters: Partial<Model.Filters.EnduserCredentialFilters>) {
        return this.store.dispatch(EnduserCredentialLocalActions.updateEnduserCredentialFilters({ filters }))
    }
}