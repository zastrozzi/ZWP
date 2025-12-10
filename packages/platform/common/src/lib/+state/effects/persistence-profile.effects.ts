import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { Action, Store, select } from "@ngrx/store"
import { map, withLatestFrom } from "rxjs"
import { ZWPDebuggableInjectable } from '../../decorators'
import { PersistenceActions, PersistenceProfileActions } from "../actions"
import { ZWPApplicationFacade } from "../facades"
import { Identifiers } from "../identifiers"
import { PersistenceProfileSelectors } from "../selectors"
import { createNamespacedFeatureKey } from '../../utils'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'ZWPPersistenceProfileEffects', options: { skipMethodDebugger: true } })
export class ZWPPersistenceProfileEffects {
    constructor(private actions$: Actions, private store: Store, private applicationFacade: ZWPApplicationFacade) {
        // super('ZWPPersistenceProfileEffects', { skipMethodDebugger: true })
    }

    removePersistentProfile$ = createEffect(() => this.actions$.pipe(
        ofType(PersistenceProfileActions.remove),
        map((action) => PersistenceActions.clearPersistentStateForPersistenceProfile({ persistenceProfileId: action.id }))
    ))

    removeAllPersistentProfilesRequest$ = createEffect(() => this.actions$.pipe(
        ofType(PersistenceProfileActions.removeAllRequest),
        withLatestFrom(this.store.pipe(select(PersistenceProfileSelectors.persistenceProfileIds))),
        map(([, ids]) => PersistenceActions.clearPersistentStateForManyPersistenceProfiles({ persistenceProfileIds: (ids as string[]) }))
    ))

    removeAllPersistentProfiles$ = createEffect(() => this.actions$.pipe(
        ofType(PersistenceProfileActions.removeAllRequest),
        map(() => PersistenceProfileActions.removeAllSuccess())
    ))

    ngrxOnInitEffects(): Action {
        return PersistenceActions.rehydrateStateRequest({ featureKey: createNamespacedFeatureKey(
                            Identifiers.ZWP_ACTION_IDENTIFIER, 
                            Identifiers.PERSISTENCE_PROFILE_STATE_FEATURE_KEY
                        ), persistenceProfileId: null })
    }
}