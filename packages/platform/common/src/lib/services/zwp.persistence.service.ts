import { Injectable, EnvironmentInjector, inject } from "@angular/core"
import { Store } from "@ngrx/store"
import { Identifiers } from "../+state"
import { PersistenceActions } from "../+state/actions"
import { PersistentState, PersistentStateFeature } from "../model"
import { buildPersistableStateUpdate, createNamespacedFeatureKey, DiffingUtils } from "../utils"
import { ZWPDebuggableInjectable } from '../decorators/zwp.debuggable.decorator'

@Injectable({providedIn: 'root'})
@ZWPDebuggableInjectable({serviceName: 'ZWPPersistenceService', options: { skipMethodDebugger: true }})
export class ZWPPersistenceService {
    private persistentState: PersistentState<any> = {}
    private persistenceProfileState: PersistentState<any> = {}

    private _store: Store | undefined

    constructor(private injector: EnvironmentInjector) {
        // super('ZWPPersistenceService', { skipMethodDebugger: true })
    }

    registerPersistentStateFeature<State>(feature: PersistentStateFeature<State>) {
        if (feature.key === createNamespacedFeatureKey(
            Identifiers.ZWP_ACTION_IDENTIFIER, 
            Identifiers.PERSISTENCE_PROFILE_STATE_FEATURE_KEY
        )) {
            this.persistenceProfileState[feature.key] = feature.state
        } else {
            this.persistentState[feature.key] = feature.state
        }
        
        // setTimeout(() => {
        //     this.store.dispatch(PersistenceActions.rehydrateStateRequest({ featureKey: feature.key }))    
        // }, 0)
        
    }

    registerPersistentStateFeatures<State>(features: PersistentStateFeature<State>[]) {
        features.forEach(feature => this.registerPersistentStateFeature(feature))
    }

    processPersistenceProfileCreate(persistenceProfileId: string) {
        this.store.dispatch(PersistenceActions.initiatePersistenceProfileState({ persistenceProfileId: persistenceProfileId }))
    }

    processPersistentStateNgrxUpdate<State>(state: State) {
        const persistentStateInit = buildPersistableStateUpdate(state, this.persistentState)
        const basePersistentStateIdentifier = 'zwp-persistent-state'
        const basePersistentState = localStorage.getItem(basePersistentStateIdentifier)
        const basePersistentStateObj = JSON.parse(basePersistentState ?? '{}')
        const newPersistentStateObj = basePersistentState === null ? persistentStateInit : DiffingUtils.mergeDeep(persistentStateInit, basePersistentStateObj)
        const newPersistentState = JSON.stringify(newPersistentStateObj)
        localStorage.setItem(basePersistentStateIdentifier, newPersistentState)
    }

    processPersistenceProfileStateDiff<State>(state: State, newState: State) {
        const strippedState = { [createNamespacedFeatureKey(
            Identifiers.ZWP_ACTION_IDENTIFIER, 
            Identifiers.PERSISTENCE_PROFILE_STATE_FEATURE_KEY
        )]: (state as any)[createNamespacedFeatureKey(
            Identifiers.ZWP_ACTION_IDENTIFIER, 
            Identifiers.PERSISTENCE_PROFILE_STATE_FEATURE_KEY
        )] }
        const strippedNewState = { [createNamespacedFeatureKey(
            Identifiers.ZWP_ACTION_IDENTIFIER, 
            Identifiers.PERSISTENCE_PROFILE_STATE_FEATURE_KEY
        )]: (newState as any)[createNamespacedFeatureKey(
            Identifiers.ZWP_ACTION_IDENTIFIER, 
            Identifiers.PERSISTENCE_PROFILE_STATE_FEATURE_KEY
        )] }
        const stateDiff = DiffingUtils.calculateDiff(strippedState, strippedNewState)
        if (DiffingUtils.isNonEmptyObject(stateDiff)) {
            // console.log('state diff', stateDiff)
            // console.log('persistent feature sets', this.persistentState)    
            const persistentStateUpdate = buildPersistableStateUpdate(stateDiff, this.persistenceProfileState)
            if (DiffingUtils.isNonEmptyObject(persistentStateUpdate)) {
                // console.log(stateDiff, 'pre serialise state diff')
                // console.log(newState, 'pre serialise new state')
                // console.log(persistentStateUpdate, 'pre serialise state update')
                this.store.dispatch(PersistenceActions.serialisePersistenceProfileState({ stateUpdate: persistentStateUpdate }))
            }
        }
    }

    processStateDiff<State>(state: State, newState: State) {

        const stateDiff = DiffingUtils.calculateDiff(state, newState)
        if (DiffingUtils.isNonEmptyObject(stateDiff)) {
            const persistentStateUpdate = buildPersistableStateUpdate(stateDiff, this.persistentState)
            if (DiffingUtils.isNonEmptyObject(persistentStateUpdate)) {
                this.store.dispatch(PersistenceActions.serialisePersistentState({ stateUpdate: persistentStateUpdate }))
            }
        }
        
    }

    get store(): Store {
        if (this._store !== undefined) {
            return this._store
        }
        return this.injector.runInContext(() => {
            this._store = inject(Store)
            return this._store
        })
    }
    
}
