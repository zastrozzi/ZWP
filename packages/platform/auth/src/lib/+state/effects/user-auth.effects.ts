import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { Store, Action } from '@ngrx/store'
import { ZWPDebuggableInjectable, PersistenceActions, PersistenceProfileActions, createNamespacedFeatureKey, createRemoteEffect } from '@zwp/platform.common'
import { delay, distinctUntilChanged, filter, map, withLatestFrom } from 'rxjs'
import { Identifiers } from '../identifiers'
import { UserAuthActions } from '../actions'
import { UserAuthFacade } from '../facades'
import * as uuid from 'uuid'
// import { FlowNodeRemoteActions } from '../actions'
// import { FLOW_NODE_API_SERVICE } from '../../services'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'UserAuthEffects', options: { skipMethodDebugger: true } })
export class UserAuthEffects implements OnInitEffects {
    // private readonly flowNodeAPI = inject(FLOW_NODE_API_SERVICE)

    constructor(private actions$: Actions, private store: Store, private userAuthFacade: UserAuthFacade) {}

    rehydrateState$ = createEffect(() => this.actions$.pipe(
        ofType(PersistenceProfileActions.setSelected),
        map((action) => action.id),
        distinctUntilChanged(),
        map((id) => PersistenceActions.rehydrateStateRequest({ featureKey: createNamespacedFeatureKey(
                            Identifiers.AUTH_ACTION_IDENTIFIER, 
                            Identifiers.USER_AUTH_STATE_FEATURE_KEY
                        ), persistenceProfileId: id }))
    ))

    delayInitialRehydrate$ = createEffect(() => this.actions$.pipe(
        ofType(UserAuthActions.rehydrateState),
        delay(1),
        map(() => PersistenceActions.rehydrateStateRequest({ featureKey: createNamespacedFeatureKey(
            Identifiers.AUTH_ACTION_IDENTIFIER, 
            Identifiers.USER_AUTH_STATE_FEATURE_KEY
        ), persistenceProfileId: null }))
    ))

    delayInitialRehydrateSetDeviceIdentifier$ = createEffect(() => this.actions$.pipe(
        ofType(PersistenceActions.rehydrateStateSuccess, PersistenceActions.rehydrateStateFailure),
        filter((action) => action.featureKey === createNamespacedFeatureKey(
            Identifiers.AUTH_ACTION_IDENTIFIER, 
            Identifiers.USER_AUTH_STATE_FEATURE_KEY
        )),
        withLatestFrom(this.userAuthFacade.hasLocalDeviceIdentifier$),
        filter(([action, hasLocalDeviceIdentifier]) => !hasLocalDeviceIdentifier),
        map(() => UserAuthActions.setLocalDeviceIdentifier({ localDeviceIdentifier: `web-${uuid.v4()}` }))
    ))

    ngrxOnInitEffects(): Action {
        return UserAuthActions.rehydrateState()
    }
}