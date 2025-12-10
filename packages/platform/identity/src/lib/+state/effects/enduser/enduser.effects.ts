import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { Services } from '../../../services'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteActionGroup, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { EnduserLocalActions, EnduserRemoteActions } from '../../actions'
import { EMPTY, delay, map, of, switchMap, withLatestFrom } from 'rxjs'
import { UserAuthActions, UserAuthFacade } from '@zwp/platform.auth'
import { Action } from '@ngrx/store'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'EnduserEffects', options: { skipMethodDebugger: true } })
export class EnduserEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private enduserAPI = inject(Services.ENDUSER_API_SERVICE) 
    private userAuthFacade = inject(UserAuthFacade)
    private router = inject(ZWPRouterFacade)

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...EnduserRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(EnduserRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...EnduserRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(EnduserRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...EnduserRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(EnduserRemoteActions.identifiers)({ error: action.error }))
    ))

    createEnduser$ = createRemoteEffect(
        this.actions$,
        EnduserRemoteActions.createEnduser,
        (action) => this.enduserAPI.createEnduser(action)
    )

    getEnduser$ = createRemoteEffect(
        this.actions$,
        EnduserRemoteActions.getEnduser,
        (action) => this.enduserAPI.getEnduser(action.enduserId)
    )

    getEnduserOnSelect$ = createEffect(() => this.actions$.pipe(
        ofType(EnduserLocalActions.selectEnduser),
        delay(10),
        map((action) => EnduserRemoteActions.getEnduser.request({ enduserId: action.enduserId }))
    ))

    listEndusers$ = createRemoteEffect(
        this.actions$,
        EnduserRemoteActions.listEndusers,
        (action) => this.enduserAPI.listEndusers(action.pagination)
    )

    updateEnduser$ = createRemoteEffect(
        this.actions$,
        EnduserRemoteActions.updateEnduser,
        (action) => this.enduserAPI.updateEnduser(action.enduserId, action.update)
    )

    deleteEnduser$ = createRemoteEffect(
        this.actions$,
        EnduserRemoteActions.deleteEnduser,
        (action) => this.enduserAPI.deleteEnduser(action.enduserId)
    )

    ngrxOnInitEffects() {
        return EnduserLocalActions.initialiseEnduserState()
    }
}