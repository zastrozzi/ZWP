import { Inject, Injectable } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { Services } from '../../../services'
import { ZWPDebuggableInjectable, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { EnduserEmailRemoteActions, EnduserEmailLocalActions, EnduserRemoteActions } from '../../actions'
import { delay, map } from 'rxjs'
import { UserAuthFacade } from '@zwp/platform.auth'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'EnduserEmailEffects', options: { skipMethodDebugger: true } })
export class EnduserEmailEffects implements OnInitEffects {
    constructor(
        private actions$: Actions,
        @Inject(Services.ENDUSER_API_SERVICE)
        private enduserAPI: Services.EnduserAPIService,
        private userAuthFacade: UserAuthFacade
    ) {
        // super('EnduserEmailEffects', { skipMethodDebugger: true })
    }

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...EnduserEmailRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(EnduserEmailRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...EnduserEmailRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(EnduserEmailRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...EnduserEmailRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(EnduserEmailRemoteActions.identifiers)({ error: action.error }))
    ))

    createEnduserEmail$ = createRemoteEffect(
        this.actions$,
        EnduserEmailRemoteActions.createEnduserEmail,
        (action) => this.enduserAPI.createEnduserEmail(action.enduserId, action.request)
    )

    getEnduserEmail$ = createRemoteEffect(
        this.actions$,
        EnduserEmailRemoteActions.getEnduserEmail,
        (action) => this.enduserAPI.getEnduserEmail(action.enduserEmailId)
    )

    listEnduserEmails$ = createRemoteEffect(
        this.actions$,
        EnduserEmailRemoteActions.listEnduserEmails,
        (action) => this.enduserAPI.listEnduserEmails(action.enduserId, action.pagination)
    )

    updateEnduserEmail$ = createRemoteEffect(
        this.actions$,
        EnduserEmailRemoteActions.updateEnduserEmail,
        (action) => this.enduserAPI.updateEnduserEmail(action.enduserEmailId, action.update)
    )

    deleteEnduserEmail$ = createRemoteEffect(
        this.actions$,
        EnduserEmailRemoteActions.deleteEnduserEmail,
        (action) => this.enduserAPI.deleteEnduserEmail(action.enduserEmailId)
    )

    logoutEnduserReset$ = createEffect(() => this.actions$.pipe(
        ofType(EnduserRemoteActions.logoutEnduser.success),
        map(() => EnduserEmailLocalActions.resetEnduserEmailState())
    ))

    // listEnduserEmailsOnFilterChange$ = createEffect(() => this.actions$.pipe(
    //     ofType(EnduserEmailLocalActions.updateEnduserEmailFilters),
    //     // delay(1000),
    //     map((filterUpdate) => EnduserEmailRemoteActions.listEnduserEmails.request({ 
    //         enduserId: filterUpdate.filters.enduserId ?? null, 
    //         pagination: null 
    //     }))
    // ))

    ngrxOnInitEffects() {
        return EnduserEmailLocalActions.initialiseEnduserEmailState()
    }
}