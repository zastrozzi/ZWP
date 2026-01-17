import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { map, tap, withLatestFrom } from "rxjs"
import { ZWPDebuggableInjectable } from '../../decorators'
import { createNamespacedFeatureKey, DiffingUtils } from "../../utils"
import { PersistenceActions } from "../actions"
import { ZWPApplicationFacade, ZWPPersistenceProfileFacade } from "../facades"
import { Identifiers } from "../identifiers"

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'ZWPPersistenceEffects', options: { skipMethodDebugger: true } })
export class ZWPPersistenceEffects {
    constructor(private actions$: Actions, private applicationFacade: ZWPApplicationFacade, private persistenceProfileFacade: ZWPPersistenceProfileFacade) {
        // super('ZWPPersistenceEffects', { skipMethodDebugger: true })
        
    }

    serialisePersistentState$ = createEffect(() => this.actions$.pipe(
        ofType(PersistenceActions.serialisePersistentState),
        withLatestFrom(this.persistenceProfileFacade.selectedPersistenceProfileId$),
        map(pair => ({ stateUpdate: pair[0].stateUpdate, selectedPersistenceProfileId: pair[1] })),
        map(update => ({ ...update, stateUpdate: DiffingUtils.convertDatePropertiesToISOStrings(update.stateUpdate) })),
        tap((persistenceUpdate) => {
            const persistentStateIdentifier = persistenceUpdate.selectedPersistenceProfileId === null ? 'zwp-persistent-state' : `zwp-persistent-state-${persistenceUpdate.selectedPersistenceProfileId}`
            const persistentState = localStorage.getItem(persistentStateIdentifier)
            if (persistentState !== undefined && persistentState !== null) {
                const persistentStateObject = JSON.parse(persistentState)
                // console.log(persistentStateObject, 'from storage')
                // console.log(action.stateUpdate, 'state update')
                const newPersistentStateObject = DiffingUtils.mergeDeep(persistentStateObject, persistenceUpdate.stateUpdate)
                // console.log(newPersistentStateObject, 'new')
                const newPersistentState = JSON.stringify(newPersistentStateObject)
                localStorage.setItem(persistentStateIdentifier, newPersistentState)
                return
            } else {
                const newPersistentState = JSON.stringify(persistenceUpdate.stateUpdate)
                // console.log(newPersistentState, 'new persistent')
                localStorage.setItem(persistentStateIdentifier, newPersistentState)
                return
            }
        })
    ), { dispatch: false })

    serialisePersistenceProfileState$ = createEffect(() => this.actions$.pipe(
        ofType(PersistenceActions.serialisePersistenceProfileState),
        tap((action) => {
            const persistentStateIdentifier = 'zwp-persistence-profiles'
            const persistentState = localStorage.getItem(persistentStateIdentifier)
            if (persistentState !== undefined && persistentState !== null) {
                const persistentStateObject = JSON.parse(persistentState)
                // console.log(persistentStateObject, 'from storage')
                // console.log(action.stateUpdate, 'state update')
                const newPersistentStateObject = DiffingUtils.mergeDeep(persistentStateObject, action.stateUpdate)
                // console.log(newPersistentStateObject, 'new')
                const newPersistentState = JSON.stringify(newPersistentStateObject)
                localStorage.setItem(persistentStateIdentifier, newPersistentState)
                return
            } else {
                const newPersistentState = JSON.stringify(action.stateUpdate)
                // console.log(newPersistentState, 'new persistent')
                localStorage.setItem(persistentStateIdentifier, newPersistentState)
                return
            }
        })
    ), { dispatch: false })

    rehydrateState$ = createEffect(() => this.actions$.pipe(
        ofType(PersistenceActions.rehydrateStateRequest),
        map((action) => {
            const persistentStateIdentifier = action.featureKey === createNamespacedFeatureKey(
                                Identifiers.ZWP_ACTION_IDENTIFIER, 
                                Identifiers.PERSISTENCE_PROFILE_STATE_FEATURE_KEY
                            ) ? 'zwp-persistence-profiles' : action.persistenceProfileId === null ? 'zwp-persistent-state' : `zwp-persistent-state-${action.persistenceProfileId}`
            const persistentState = localStorage.getItem(persistentStateIdentifier)
            if (persistentState !== undefined && persistentState !== null) {
                const persistentStateObject = JSON.parse(persistentState)
                // console.log(persistentStateObject, 'parsed')
                if (DiffingUtils.hasProperty(persistentStateObject, action.featureKey)) {
                    const stateFromStorage = persistentStateObject[action.featureKey]
                    return PersistenceActions.rehydrateStateSuccess({ featureKey: action.featureKey, stateFromStorage: stateFromStorage, persistenceProfileId: action.persistenceProfileId })
                }
            }

            return PersistenceActions.rehydrateStateFailure({ featureKey: action.featureKey, persistenceProfileId: action.persistenceProfileId })
        })
    ))

    initiatePersistenceProfileState$ = createEffect(() => this.actions$.pipe(
        ofType(PersistenceActions.initiatePersistenceProfileState),
        tap((action) => {
            const basePersistentStateIdentifier = 'zwp-persistent-state'
            const basePersistentState = localStorage.getItem(basePersistentStateIdentifier)
            const newPersistentStateIdentifier = `zwp-persistent-state-${action.persistenceProfileId}`
            localStorage.setItem(newPersistentStateIdentifier, basePersistentState ?? '')
            return
        })
    ), { dispatch: false })

    clearLocalStorage$ = createEffect(() => this.actions$.pipe(
        ofType(PersistenceActions.clearLocalStorage),
        tap(() => {
            localStorage.clear()
            return
        })
    ), { dispatch: false })

    clearPersistentStateForPersistenceProfile$ = createEffect(() => this.actions$.pipe(
        ofType(PersistenceActions.clearPersistentStateForPersistenceProfile),
        tap((action) => {
            const persistentStateIdentifier = `zwp-persistent-state-${action.persistenceProfileId}`
            localStorage.removeItem(persistentStateIdentifier)
            return
        })
    ), { dispatch: false })

    clearPersistentStateForManyPersistenceProfiles$ = createEffect(() => this.actions$.pipe(
        ofType(PersistenceActions.clearPersistentStateForManyPersistenceProfiles),
        tap((action) => {
            action.persistenceProfileIds.forEach((persistenceProfileId) => {
                const persistentStateIdentifier = `zwp-persistent-state-${persistenceProfileId}`
                localStorage.removeItem(persistentStateIdentifier)
            })
            return
        })
    ), { dispatch: false })
}

