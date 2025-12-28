import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from "@zwp/platform.common";
import { EnduserCredentialRemoteActions, EnduserEmailRemoteActions, EnduserLocalActions, EnduserRemoteActions } from "../../actions";
import { UserAuthFacade } from "@zwp/platform.auth";
import { Selectors } from '../../selectors'
import { Model } from '../../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'EnduserFacade', options: { skipMethodDebugger: true } })
export class EnduserFacade {
    constructor(private store: Store, private userAuthFacade: UserAuthFacade) {

    }

    enduserFilters$ = this.store.pipe(select(Selectors.EnduserSelectors.selectEnduserFilters))
    enduserRemotePagination$ = this.store.pipe(select(Selectors.EnduserSelectors.selectEnduserRemotePagination))
    enduserRemoteState$ = this.store.pipe(select(Selectors.EnduserSelectors.selectEnduserRemoteState))

    endusers$ = this.store.pipe(select(Selectors.EnduserSelectors.selectAllEndusers))
    selectedEnduser$ = this.store.pipe(select(Selectors.EnduserSelectors.selectedEnduser))
    selectedEnduserId$ = this.store.pipe(select(Selectors.EnduserSelectors.selectSelectedEnduserId))

    enduserById$ = (id: string) => this.store.pipe(select(Selectors.EnduserSelectors.selectEnduserById(id)))
    
    listEndusers(pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserResponse>>> = null) {
        return this.store.dispatch(EnduserRemoteActions.listEndusers.request({ pagination: pagination }))
    }

    selectEnduser(enduserId: string) {
        // console.log('selectEnduser', enduserId)
        return this.store.dispatch(EnduserLocalActions.selectEnduser({ enduserId }))
    }

    updateEnduserFilters(filters: Partial<Model.Filters.EnduserFilters>) {
        return this.store.dispatch(EnduserLocalActions.updateEnduserFilters({ filters }))
    }

    resetEnduserFilters() {
        return this.store.dispatch(EnduserLocalActions.resetEnduserFilters())
    }
}