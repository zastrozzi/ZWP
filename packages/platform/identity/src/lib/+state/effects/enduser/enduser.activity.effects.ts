import { Inject, Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { Services } from '../../../services'
import { ZWPDebuggableInjectable, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { EnduserActivityLocalActions, EnduserActivityRemoteActions, EnduserRemoteActions } from '../../actions'
import { delay, map } from 'rxjs'
import { UserAuthFacade } from '@zwp/platform.auth'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'EnduserActivityEffects', options: { skipMethodDebugger: true } })
export class EnduserActivityEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private enduserAPI = inject(Services.ENDUSER_API_SERVICE)
    private userAuthFacade = inject(UserAuthFacade)

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...EnduserActivityRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(EnduserActivityRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...EnduserActivityRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(EnduserActivityRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...EnduserActivityRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(EnduserActivityRemoteActions.identifiers)({ error: action.error }))
    ))

    listEnduserActivity$ = createRemoteEffect(
        this.actions$,
        EnduserActivityRemoteActions.listEnduserActivity,
        (action) => this.enduserAPI.listEnduserActivity(action.enduserId, action.pagination)
    )

    // listEnduserActivityOnFilterChange$ = createEffect(() => this.actions$.pipe(
    //     ofType(EnduserActivityLocalActions.updateEnduserActivityFilters),
    //     // delay(1000),
    //     map((filterUpdate) => EnduserActivityRemoteActions.listEnduserActivity.request({ 
    //         enduserId: filterUpdate.filters.enduserId ?? null, 
    //         pagination: null 
    //     }))
    // ))

    logoutEnduserReset$ = createEffect(() => this.actions$.pipe(
        ofType(EnduserRemoteActions.logoutEnduser.success),
        map(() => EnduserActivityLocalActions.resetEnduserActivityState())
    ))

    // listEnduserActivityOnFilterChange$ = createEffect(() => this.actions$.pipe(
    //     ofType(EnduserActivityLocalActions.updateEnduserActivityFilters),
    //     // delay(1000),
    //     map((filterUpdate) => EnduserActivityRemoteActions.listEnduserActivity.request({ 
    //         enduserId: filterUpdate.filters.enduserId ?? null, 
    //         pagination: null 
    //     }))
    // ))

    ngrxOnInitEffects() {
        return EnduserActivityLocalActions.initialiseEnduserActivityState()
    }
}
