import { Inject, Injectable } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { Services } from '../../../services'
import { ZWPDebuggableInjectable, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { EnduserSessionLocalActions, EnduserSessionRemoteActions } from '../../actions'
import { delay, map } from 'rxjs'
import { UserAuthFacade } from '@zwp/platform.auth'
import { Action } from '@ngrx/store'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'EnduserSessionEffects', options: { skipMethodDebugger: true } })
export class EnduserSessionEffects implements OnInitEffects {
    constructor(
        private actions$: Actions,
        @Inject(Services.ENDUSER_API_SERVICE)
        private enduserAPI: Services.EnduserAPIService,
        private userAuthFacade: UserAuthFacade
    ) {
        // super('EnduserSessionEffects', { skipMethodDebugger: true })
    }

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...EnduserSessionRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(EnduserSessionRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...EnduserSessionRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(EnduserSessionRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...EnduserSessionRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(EnduserSessionRemoteActions.identifiers)({ error: action.error }))
    ))

    getEnduserSession$ = createRemoteEffect(
        this.actions$,
        EnduserSessionRemoteActions.getEnduserSession,
        (action) => this.enduserAPI.getEnduserSession(action.enduserSessionId)
    )

    listEnduserSessions$ = createRemoteEffect(
        this.actions$,
        EnduserSessionRemoteActions.listEnduserSessions,
        (action) => this.enduserAPI.listEnduserSessions(action.enduserId, action.pagination)
    )

    invalidateEnduserSession$ = createRemoteEffect(
        this.actions$,
        EnduserSessionRemoteActions.invalidateEnduserSession,
        (action) => this.enduserAPI.invalidateEnduserSession(action.enduserSessionId)
    )

    ngrxOnInitEffects() {
        return EnduserSessionLocalActions.initialiseEnduserSessionState()
    }
}