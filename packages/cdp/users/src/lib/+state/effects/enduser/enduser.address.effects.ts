import { Inject, Injectable } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { Services } from '../../../services'
import { ZWPDebuggableInjectable, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { EnduserAddressRemoteActions, EnduserAddressLocalActions, EnduserRemoteActions } from '../../actions'
import { delay, map } from 'rxjs'
import { UserAuthFacade } from '@zwp/platform.auth'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'EnduserAddressEffects', options: { skipMethodDebugger: true } })
export class EnduserAddressEffects implements OnInitEffects {
    constructor(
        private actions$: Actions,
        @Inject(Services.ENDUSER_API_SERVICE)
        private enduserAPI: Services.EnduserAPIService,
        private userAuthFacade: UserAuthFacade
    ) {
        // super('EnduserAddressEffects', { skipMethodDebugger: true })
    }

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...EnduserAddressRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(EnduserAddressRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...EnduserAddressRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(EnduserAddressRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...EnduserAddressRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(EnduserAddressRemoteActions.identifiers)({ error: action.error }))
    ))

    createEnduserAddress$ = createRemoteEffect(
        this.actions$,
        EnduserAddressRemoteActions.createEnduserAddress,
        (action) => this.enduserAPI.createEnduserAddress(action.enduserId, action.request)
    )

    getEnduserAddress$ = createRemoteEffect(
        this.actions$,
        EnduserAddressRemoteActions.getEnduserAddress,
        (action) => this.enduserAPI.getEnduserAddress(action.enduserAddressId)
    )

    listEnduserAddresses$ = createRemoteEffect(
        this.actions$,
        EnduserAddressRemoteActions.listEnduserAddresses,
        (action) => this.enduserAPI.listEnduserAddresses(action.enduserId, action.pagination)
    )

    updateEnduserAddress$ = createRemoteEffect(
        this.actions$,
        EnduserAddressRemoteActions.updateEnduserAddress,
        (action) => this.enduserAPI.updateEnduserAddress(action.enduserAddressId, action.update)
    )

    deleteEnduserAddress$ = createRemoteEffect(
        this.actions$,
        EnduserAddressRemoteActions.deleteEnduserAddress,
        (action) => this.enduserAPI.deleteEnduserAddress(action.enduserAddressId)
    )

    logoutEnduserReset$ = createEffect(() => this.actions$.pipe(
        ofType(EnduserRemoteActions.logoutEnduser.success),
        map(() => EnduserAddressLocalActions.resetEnduserAddressState())
    ))

    // listEnduserAddressesOnFilterChange$ = createEffect(() => this.actions$.pipe(
    //     ofType(EnduserAddressLocalActions.updateEnduserAddressFilters),
    //     // delay(1000),
    //     map((filterUpdate) => EnduserAddressRemoteActions.listEnduserAddresses.request({ 
    //         enduserId: filterUpdate.filters.enduserId ?? null, 
    //         pagination: null 
    //     }))
    // ))

    ngrxOnInitEffects() {
        return EnduserAddressLocalActions.initialiseEnduserAddressState()
    }
}