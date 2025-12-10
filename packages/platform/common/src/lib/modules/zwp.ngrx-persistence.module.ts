import { inject, ModuleWithProviders, NgModule, Provider } from "@angular/core";
import { META_REDUCERS } from "@ngrx/store";
import { persistenceMetaReducerFactory } from "../+state/reducers";
import { PersistentState, PersistentStateFeature, PERSISTENT_STATE, PERSISTENT_STATE_FACTORY } from "../model";
import { ZWPPersistenceService } from "../services";

@NgModule({})
export class ZWPNgrxPersistenceModule {
    static forFeature<State>(featureName: string, persistentState: PersistentState<State>): ModuleWithProviders<ZWPNgrxPersistenceModule> {
        return { ngModule: ZWPNgrxPersistenceModule, providers: [
            ..._providePersistenceFeature(featureName, persistentState)
        ]}
    }

    static forRoot(): ModuleWithProviders<ZWPNgrxPersistenceModule> {
        return { ngModule: ZWPNgrxPersistenceModule, providers: [
            ..._providePersistenceRoot()
        ]}
    }
}

export function _providePersistenceFeature<State>(
    featureName: string,
    persistentState: PersistentState<State>

): Provider[] {
    // console.log(featureName, persistentState, 'featureName, persistentState')
    return [
        {
            provide: PERSISTENT_STATE,
            multi: true,
            useValue: {
                key: featureName,
                state: persistentState
            }
        },
        {
            provide: PERSISTENT_STATE_FACTORY,
            deps: [PERSISTENT_STATE, ZWPPersistenceService],
            useFactory: _setupPersistentState
        }
    ]
}

export function _providePersistenceRoot(): Provider[] {
    return [
        {
            provide: META_REDUCERS,
            deps: [PERSISTENT_STATE_FACTORY, ZWPPersistenceService],
            useFactory: persistenceMetaReducerFactory,
            multi: true
        }
    ]
}

export function _setupPersistentState<State>(
    persistentStateFeatures: PersistentStateFeature<State>[]
) {
    const service = inject(ZWPPersistenceService)
    // console.log(persistentStateFeatures, 'features')
    service.registerPersistentStateFeatures(persistentStateFeatures)
    // console.log(persistentStateFeatures, 'persistent features')
}
