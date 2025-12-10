import { Inject, Injectable } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { Services } from '../../../services'
import { ZWPDebuggableInjectable, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { EnduserPhoneRemoteActions, EnduserPhoneLocalActions, EnduserRemoteActions } from '../../actions'
import { delay, map } from 'rxjs'
import { UserAuthFacade } from '@zwp/platform.auth'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'EnduserPhoneEffects', options: { skipMethodDebugger: true } })
export class EnduserPhoneEffects implements OnInitEffects {
    constructor(
        private actions$: Actions,
        @Inject(Services.ENDUSER_API_SERVICE)
        private enduserAPI: Services.EnduserAPIService,
        private userAuthFacade: UserAuthFacade
    ) {
        // super('EnduserPhoneEffects', { skipMethodDebugger: true })
    }

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...EnduserPhoneRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(EnduserPhoneRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...EnduserPhoneRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(EnduserPhoneRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...EnduserPhoneRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(EnduserPhoneRemoteActions.identifiers)({ error: action.error }))
    ))

    createEnduserPhone$ = createRemoteEffect(
        this.actions$,
        EnduserPhoneRemoteActions.createEnduserPhone,
        (action) => this.enduserAPI.createEnduserPhone(action.enduserId, action.request)
    )

    getEnduserPhone$ = createRemoteEffect(
        this.actions$,
        EnduserPhoneRemoteActions.getEnduserPhone,
        (action) => this.enduserAPI.getEnduserPhone(action.enduserPhoneId)
    )

    listEnduserPhones$ = createRemoteEffect(
        this.actions$,
        EnduserPhoneRemoteActions.listEnduserPhones,
        (action) => this.enduserAPI.listEnduserPhones(action.enduserId, action.pagination)
    )

    updateEnduserPhone$ = createRemoteEffect(
        this.actions$,
        EnduserPhoneRemoteActions.updateEnduserPhone,
        (action) => this.enduserAPI.updateEnduserPhone(action.enduserPhoneId, action.update)
    )

    deleteEnduserPhone$ = createRemoteEffect(
        this.actions$,
        EnduserPhoneRemoteActions.deleteEnduserPhone,
        (action) => this.enduserAPI.deleteEnduserPhone(action.enduserPhoneId)
    )

    logoutEnduserReset$ = createEffect(() => this.actions$.pipe(
        ofType(EnduserRemoteActions.logoutEnduser.success),
        map(() => EnduserPhoneLocalActions.resetEnduserPhoneState())
    ))

    // listEnduserPhonesOnFilterChange$ = createEffect(() => this.actions$.pipe(
    //     ofType(EnduserPhoneLocalActions.updateEnduserPhoneFilters),
    //     // delay(1000),
    //     map((filterUpdate) => EnduserPhoneRemoteActions.listEnduserPhones.request({ 
    //         enduserId: filterUpdate.filters.enduserId ?? null, 
    //         pagination: null 
    //     }))
    // ))

    ngrxOnInitEffects() {
        return EnduserPhoneLocalActions.initialiseEnduserPhoneState()
    }
}