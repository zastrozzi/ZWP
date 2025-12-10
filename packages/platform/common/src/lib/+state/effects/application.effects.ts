import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType, OnInitEffects } from "@ngrx/effects"
import { Action, Store } from "@ngrx/store"
import { map } from "rxjs"
import { ZWPDebuggableInjectable } from '../../decorators'
import { PersistenceActions, PersistenceProfileActions } from "../actions"
import { ZWPApplicationFacade } from "../facades"
import { Identifiers } from "../identifiers"
import { createNamespacedFeatureKey } from '../../utils'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'ZWPApplicationEffects', options: { skipMethodDebugger: true } })
export class ZWPApplicationEffects implements OnInitEffects {
    constructor(private actions$: Actions, private store: Store, private applicationFacade: ZWPApplicationFacade) {
        
    }

    rehydrateState$ = createEffect(() => this.actions$.pipe(
        ofType(PersistenceProfileActions.setSelected),
        map((action) => PersistenceActions.rehydrateStateRequest({ featureKey: createNamespacedFeatureKey(
                            Identifiers.ZWP_ACTION_IDENTIFIER, 
                            Identifiers.APPLICATION_STATE_FEATURE_KEY
                        ), persistenceProfileId: action.id }))
    ))

    ngrxOnInitEffects(): Action {
        return PersistenceActions.rehydrateStateRequest({ featureKey: createNamespacedFeatureKey(
            Identifiers.ZWP_ACTION_IDENTIFIER, 
            Identifiers.APPLICATION_STATE_FEATURE_KEY
        ), persistenceProfileId: null })
    }
}