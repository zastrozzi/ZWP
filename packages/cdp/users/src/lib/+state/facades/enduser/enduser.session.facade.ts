import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { EnduserSessionLocalActions, EnduserSessionRemoteActions } from '../../actions'
import { Selectors } from '../../selectors'
import { Model } from '../../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'EnduserSessionFacade', options: { skipMethodDebugger: true } })
export class EnduserSessionFacade {
    constructor(private store: Store) {

    }

    enduserSessionFilters$ = this.store.pipe(select(Selectors.EnduserSessionSelectors.selectEnduserSessionFilters))
    enduserSessionRemotePagination$ = this.store.pipe(select(Selectors.EnduserSessionSelectors.selectEnduserSessionRemotePagination))
    enduserSessionRemoteState$ = this.store.pipe(select(Selectors.EnduserSessionSelectors.selectEnduserSessionRemoteState))

    enduserSessions$ = this.store.pipe(select(Selectors.EnduserSessionSelectors.selectAllEnduserSessions))
    selectedEnduserSession$ = this.store.pipe(select(Selectors.EnduserSessionSelectors.selectedEnduserSession))
    filteredEnduserSessions$ = this.store.pipe(select(Selectors.EnduserSessionSelectors.selectFilteredEnduserSessions))

    enduserSessionById$ = (id: string) => this.store.pipe(select(Selectors.EnduserSessionSelectors.selectEnduserSessionById(id)))

    listEnduserSessions(enduserId: string, pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserSessionResponse>>> = null) {
        return this.store.dispatch(EnduserSessionRemoteActions.listEnduserSessions.request({ enduserId, pagination: pagination }))
    }

    updateEnduserSessionFilters(filters: Partial<Model.EnduserSessionFilters>) {
        return this.store.dispatch(EnduserSessionLocalActions.updateEnduserSessionFilters({ filters }))
    }

    selectEnduserSession(enduserSessionId: string) {
        return this.store.dispatch(EnduserSessionLocalActions.selectEnduserSession({ enduserSessionId }))
    }

    getEnduserSession(enduserSessionId: string) {
        return this.store.dispatch(EnduserSessionRemoteActions.getEnduserSession.request({ enduserSessionId }))
    }

    invalidateEnduserSession(enduserSessionId: string) {
        return this.store.dispatch(EnduserSessionRemoteActions.invalidateEnduserSession.request({ enduserSessionId }))
    }
}