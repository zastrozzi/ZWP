import { Inject, Injectable } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { Services } from '../../../services'
import { ZWPDebuggableInjectable, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { EnduserDeviceRemoteActions, EnduserDeviceLocalActions, EnduserRemoteActions } from '../../actions'
import { delay, map } from 'rxjs'
import { UserAuthFacade } from '@zwp/platform.auth'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'EnduserDeviceEffects', options: { skipMethodDebugger: true } })
export class EnduserDeviceEffects implements OnInitEffects {
    constructor(
        private actions$: Actions,
        @Inject(Services.ENDUSER_API_SERVICE)
        private enduserAPI: Services.EnduserAPIService,
        private userAuthFacade: UserAuthFacade
    ) {
        // super('EnduserDeviceEffects', { skipMethodDebugger: true })
    }

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...EnduserDeviceRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(EnduserDeviceRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...EnduserDeviceRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(EnduserDeviceRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...EnduserDeviceRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(EnduserDeviceRemoteActions.identifiers)({ error: action.error }))
    ))

    getEnduserDevice$ = createRemoteEffect(
        this.actions$,
        EnduserDeviceRemoteActions.getEnduserDevice,
        (action) => this.enduserAPI.getEnduserDevice(action.enduserDeviceId)
    )

    listEnduserDevices$ = createRemoteEffect(
        this.actions$,
        EnduserDeviceRemoteActions.listEnduserDevices,
        (action) => this.enduserAPI.listEnduserDevices(action.enduserId, action.pagination)
    )

    logoutEnduserReset$ = createEffect(() => this.actions$.pipe(
        ofType(EnduserRemoteActions.logoutEnduser.success),
        map(() => EnduserDeviceLocalActions.resetEnduserDeviceState())
    ))

    // listEnduserDevicesOnFilterChange$ = createEffect(() => this.actions$.pipe(
    //     ofType(EnduserDeviceLocalActions.updateEnduserDeviceFilters),
    //     // delay(1000),
    //     map((filterUpdate) => EnduserDeviceRemoteActions.listEnduserDevices.request({ 
    //         enduserId: filterUpdate.filters.enduserId ?? null, 
    //         pagination: null 
    //     }))
    // ))

    ngrxOnInitEffects() {
        return EnduserDeviceLocalActions.initialiseEnduserDeviceState()
    }
}