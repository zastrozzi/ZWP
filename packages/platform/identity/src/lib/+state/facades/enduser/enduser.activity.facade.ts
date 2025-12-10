import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { AuditEventFilters, ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { EnduserActivityLocalActions, EnduserActivityRemoteActions, EnduserRemoteActions } from '../../actions'
import { Selectors } from '../../selectors'
import { AuditEventResponse } from '@zwp/platform.common'
import { map } from 'rxjs'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'EnduserActivityFacade', options: { skipMethodDebugger: true } })
export class EnduserActivityFacade {
    constructor(private store: Store) {

    }

    enduserActivity$ = this.store.pipe(select(Selectors.EnduserActivitySelectors.selectAllEnduserActivity))
    selectedEnduserActivity$ = this.store.pipe(select(Selectors.EnduserActivitySelectors.selectedEnduserActivity))
    enduserActivityRemotePagination$ = this.store.pipe(select(Selectors.EnduserActivitySelectors.selectEnduserActivityRemotePagination))
    enduserActivityFilters$ = this.store.pipe(select(Selectors.EnduserActivitySelectors.selectEnduserActivityFilters))

    enduserActivityWithEnduser$ = this.store.pipe(
        select(Selectors.EnduserActivitySelectors.selectAllEnduserActivityWithEnduser),
        map((activities) => {
            const unknownEnduserIds = activities.filter(activity => !activity.enduser).map(activity => activity.activity.platformActorId)
            unknownEnduserIds.forEach(id => this.store.dispatch(EnduserRemoteActions.getEnduser.request({ enduserId: id })))
            return activities
        })
    )

    enduserActivityById$ = (id: string) => this.store.pipe(select(Selectors.EnduserActivitySelectors.selectEnduserActivityById(id)))

    listEnduserActivity(enduserId: string, pagination: Nullable<Partial<PaginatedQueryParams<AuditEventResponse>>> = null) {
        return this.store.dispatch(EnduserActivityRemoteActions.listEnduserActivity.request({ enduserId, pagination: pagination }))
    }

    updateEnduserActivityFilters(filters: Partial<AuditEventFilters>) {
        return this.store.dispatch(EnduserActivityLocalActions.updateEnduserActivityFilters({ filters }))
    }
}