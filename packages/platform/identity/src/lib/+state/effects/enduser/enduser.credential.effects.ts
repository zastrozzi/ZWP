import { Inject, Injectable } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { Services } from '../../../services'
import { ZWPDebuggableInjectable, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { EnduserCredentialRemoteActions, EnduserCredentialLocalActions, EnduserRemoteActions } from '../../actions'
import { delay, map } from 'rxjs'
import { UserAuthFacade } from '@zwp/platform.auth'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'EnduserCredentialEffects', options: { skipMethodDebugger: true } })
export class EnduserCredentialEffects implements OnInitEffects {
    constructor(
        private actions$: Actions,
        @Inject(Services.ENDUSER_API_SERVICE)
        private enduserAPI: Services.EnduserAPIService,
        private userAuthFacade: UserAuthFacade
    ) {
        // super('EnduserCredentialEffects', { skipMethodDebugger: true })
    }

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...EnduserCredentialRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(EnduserCredentialRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...EnduserCredentialRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(EnduserCredentialRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...EnduserCredentialRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(EnduserCredentialRemoteActions.identifiers)({ error: action.error }))
    ))

    createEnduserCredential$ = createRemoteEffect(
        this.actions$,
        EnduserCredentialRemoteActions.createEnduserCredential,
        (action) => this.enduserAPI.createEnduserCredential(action.enduserId, action.request)
    )

    getEnduserCredential$ = createRemoteEffect(
        this.actions$,
        EnduserCredentialRemoteActions.getEnduserCredential,
        (action) => this.enduserAPI.getEnduserCredential(action.enduserCredentialId)
    )

    listEnduserCredentials$ = createRemoteEffect(
        this.actions$,
        EnduserCredentialRemoteActions.listEnduserCredentials,
        (action) => this.enduserAPI.listEnduserCredentials(action.enduserId, action.pagination)
    )

    updateEnduserCredential$ = createRemoteEffect(
        this.actions$,
        EnduserCredentialRemoteActions.updateEnduserCredential,
        (action) => this.enduserAPI.updateEnduserCredential(action.enduserCredentialId, action.update)
    )

    deleteEnduserCredential$ = createRemoteEffect(
        this.actions$,
        EnduserCredentialRemoteActions.deleteEnduserCredential,
        (action) => this.enduserAPI.deleteEnduserCredential(action.enduserCredentialId)
    )

    logoutEnduserReset$ = createEffect(() => this.actions$.pipe(
        ofType(EnduserRemoteActions.logoutEnduser.success),
        map(() => EnduserCredentialLocalActions.resetEnduserCredentialState())
    ))

    // listEnduserCredentialsOnFilterChange$ = createEffect(() => this.actions$.pipe(
    //     ofType(EnduserCredentialLocalActions.updateEnduserCredentialFilters),
    //     delay(0),
    //     map((filterUpdate) => EnduserCredentialRemoteActions.listEnduserCredentials.request({
    //         enduserId: filterUpdate.filters.enduserId ?? null,
    //         pagination: null
    //     }))
    // ))

    ngrxOnInitEffects() {
        return EnduserCredentialLocalActions.initialiseEnduserCredentialState()
    }
}