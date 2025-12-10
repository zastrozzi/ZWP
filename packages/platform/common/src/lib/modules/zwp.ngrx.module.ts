import { EnvironmentProviders, InjectionToken, ModuleWithProviders, NgModule, Provider } from '@angular/core'
import { EffectsModule, provideEffects } from '@ngrx/effects'
import { provideRouterStore, routerReducer } from '@ngrx/router-store'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { provideState, provideStore, StoreModule } from '@ngrx/store'
import { provideStoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools'
import { KeyboardActions } from '../+state/actions'
import { COMMON_INTERNAL_EFFECTS } from '../+state/effects'
import { ZWPApplicationEffects } from '../+state/effects/application.effects'
import { ZWPHistoryStoreEffects } from '../+state/effects/history-store.effects'
import { ZWPKeyboardEffects } from '../+state/effects/keyboard.effects'
import { ZWPPersistenceProfileEffects } from '../+state/effects/persistence-profile.effects'
import { ZWPPersistenceEffects } from '../+state/effects/persistence.effects'
import { ZWPRouterEffects } from '../+state/effects/router.effects'
import { ZWPThemingEffects } from '../+state/effects/theming.effects'
import { COMMON_EXPORTABLE_FACADES, ZWPApplicationFacade, ZWPHistoryStoreFacade, ZWPKeyboardFacade, ZWPPersistenceProfileFacade, ZWPRouterFacade, ZWPThemingFacade } from '../+state/facades'
import { Identifiers } from '../+state/identifiers'
import { applicationReducer, historyStoreReducer, keyboardReducer, persistenceProfileReducer, persistentApplicationState, persistentPersistenceProfileState, persistentThemingState, themingReducer } from '../+state/reducers'
import { CommonEnvironment, COMMON_ENVIRONMENT, ZWPNgrxModuleFeatureConfig, ZWPNgrxModuleRootConfig } from '../model'
import { actionTypes, createNamespacedFeatureKey } from '../utils'
import { ZWPNgrxHistoryModule, _provideHistoryRoot } from './zwp.ngrx-history.module'
import { ZWPNgrxPersistenceModule, _providePersistenceFeature, _providePersistenceRoot } from './zwp.ngrx-persistence.module'

export const ZWP_NGRX_MODULE_ROOT_PROVIDERS: Provider[] = []
export const ZWP_NGRX_MODULE_FEATURE_PROVIDERS: Provider[] = []
export const ZWP_NGRX_MODULE_ROOT_CONFIG = new InjectionToken<ZWPNgrxModuleRootConfig>('zwp.ngrx-module.root-config')
export const ZWP_NGRX_MODULE_ROOT_PROVIDERS_LOADED = new InjectionToken<boolean>('zwp.ngrx-module.root-providers-loaded')

@NgModule()
export class ZWPNgrxModule {
    public static forRoot(config: ZWPNgrxModuleRootConfig): ModuleWithProviders<ZWPNgrxModule> {
        return {
            ngModule: ZWPNgrxModule,
            providers: [
                { provide: ZWP_NGRX_MODULE_ROOT_CONFIG, useValue: config },
                ..._provideNgrxModuleRootProviders(config)
            ]
        }
    }

    public static forFeature(): ModuleWithProviders<ZWPNgrxModule> {
        return {
            ngModule: ZWPNgrxModule,
            providers: [

            ]
        }
    }
}

export const _provideNgrxModuleRootProviders = (config: ZWPNgrxModuleRootConfig): (Provider | EnvironmentProviders)[] => {
    const providers: (Provider | EnvironmentProviders)[] = []
    
    providers.push(
        provideStore(undefined, {
            metaReducers: [],
            runtimeChecks: {
                strictActionImmutability: true,
                strictStateImmutability: true,
                strictActionTypeUniqueness: true,
                strictActionWithinNgZone: true,
                strictActionSerializability: false,
                strictStateSerializability: false
            }
        })
    )
    if (config.enableDevtools) {
        providers.push(
            provideStoreDevtools({
                maxAge: config.devtoolsMaxAge,
                logOnly: false,
                autoPause: true,
                actionsBlocklist: [
                    ...actionTypes(KeyboardActions), ...config.actionsBlocklist
                ]
            })
        )
    }
    if (config.enablePersistence) {
        providers.push(_providePersistenceRoot())
        providers.push(provideEffects(ZWPPersistenceEffects))
    }
    if (config.enableRouterState) {
        providers.push(provideRouterStore({stateKey: createNamespacedFeatureKey(
                    Identifiers.ZWP_ACTION_IDENTIFIER, 
                    Identifiers.ROUTER_STATE_FEATURE_KEY
                )}))
        providers.push(provideState(createNamespacedFeatureKey(
            Identifiers.ZWP_ACTION_IDENTIFIER, 
            Identifiers.ROUTER_STATE_FEATURE_KEY
        ), routerReducer))
        providers.push(provideEffects(ZWPRouterEffects))
        providers.push(ZWPRouterFacade)
    }
    if (config.enableApplicationState) {
        providers.push(provideState(createNamespacedFeatureKey(
            Identifiers.ZWP_ACTION_IDENTIFIER, 
            Identifiers.APPLICATION_STATE_FEATURE_KEY
        ), applicationReducer))
        providers.push(provideEffects(ZWPApplicationEffects))
        providers.push(ZWPApplicationFacade)
        if (config.enablePersistence) {
            providers.push(_providePersistenceFeature(createNamespacedFeatureKey(
                Identifiers.ZWP_ACTION_IDENTIFIER, 
                Identifiers.APPLICATION_STATE_FEATURE_KEY
            ), persistentApplicationState))
        }
    }
    if (config.enableKeyboardState) {
        providers.push(provideState(createNamespacedFeatureKey(
            Identifiers.ZWP_ACTION_IDENTIFIER, 
            Identifiers.KEYBOARD_STATE_FEATURE_KEY
        ), keyboardReducer))
        providers.push(provideEffects(ZWPKeyboardEffects))
        providers.push(ZWPKeyboardFacade)
    }
    if (config.enableThemingState) {
        providers.push(provideState(createNamespacedFeatureKey(
            Identifiers.ZWP_ACTION_IDENTIFIER, 
            Identifiers.THEMING_STATE_FEATURE_KEY
        ), themingReducer))
        providers.push(provideEffects(ZWPThemingEffects))
        providers.push(ZWPThemingFacade)
        if (config.enablePersistence) {
            providers.push(_providePersistenceFeature(createNamespacedFeatureKey(
                Identifiers.ZWP_ACTION_IDENTIFIER, 
                Identifiers.THEMING_STATE_FEATURE_KEY
            ), persistentThemingState))
        }
    }
    if (config.enablePersistenceProfileState) {
        providers.push(provideState(createNamespacedFeatureKey(
            Identifiers.ZWP_ACTION_IDENTIFIER, 
            Identifiers.PERSISTENCE_PROFILE_STATE_FEATURE_KEY
        ), persistenceProfileReducer))
        providers.push(provideEffects(ZWPPersistenceProfileEffects))
        providers.push(ZWPPersistenceProfileFacade)
        if (config.enablePersistence) {
            providers.push(_providePersistenceFeature(createNamespacedFeatureKey(
                Identifiers.ZWP_ACTION_IDENTIFIER, 
                Identifiers.PERSISTENCE_PROFILE_STATE_FEATURE_KEY
            ), persistentPersistenceProfileState))
        }
    }
    if (config.enableHistoryState) {
        providers.push(_provideHistoryRoot())
        providers.push(provideState(createNamespacedFeatureKey(
            Identifiers.ZWP_ACTION_IDENTIFIER, 
            Identifiers.HISTORY_STORE_STATE_FEATURE_KEY
        ), historyStoreReducer))
        providers.push(provideEffects(ZWPHistoryStoreEffects))
        providers.push(ZWPHistoryStoreFacade)
    }
    providers.push({ provide: ZWP_NGRX_MODULE_ROOT_PROVIDERS_LOADED, useValue: true })
    return providers
}

export const _provideNgrxModuleFeatureProviders = (featureConfig: ZWPNgrxModuleFeatureConfig) => (rootConfig: ZWPNgrxModuleRootConfig): (Provider | EnvironmentProviders)[] => {
    const providers: (Provider | EnvironmentProviders)[] = []
    if (featureConfig.requirePersistence && !rootConfig.enablePersistence) { throw new Error('[ZWPNgrxModule] Persistence is required but not enabled in root config') }
    if (featureConfig.requireRouterState && !rootConfig.enableRouterState) { throw new Error('[ZWPNgrxModule] Router state is required but not enabled in root config') }
    if (featureConfig.requireApplicationState && !rootConfig.enableApplicationState) { throw new Error('[ZWPNgrxModule] Application state is required but not enabled in root config') }
    if (featureConfig.requireKeyboardState && !rootConfig.enableKeyboardState) { throw new Error('[ZWPNgrxModule] Keyboard state is required but not enabled in root config') }
    if (featureConfig.requireThemingState && !rootConfig.enableThemingState) { throw new Error('[ZWPNgrxModule] Theming state is required but not enabled in root config') }
    if (featureConfig.requirePersistenceProfileState && !rootConfig.enablePersistenceProfileState) { throw new Error('[ZWPNgrxModule] Persistence profile state is required but not enabled in root config') }
    if (featureConfig.requireHistoryState && !rootConfig.enableHistoryState) { throw new Error('[ZWPNgrxModule] History state is required but not enabled in root config') }

    if (featureConfig.requireRouterState) { providers.push(ZWPRouterFacade) }
    if (featureConfig.requireApplicationState) { providers.push(ZWPApplicationFacade) }
    if (featureConfig.requireKeyboardState) { providers.push(ZWPKeyboardFacade) }
    if (featureConfig.requireThemingState) { providers.push(ZWPThemingFacade) }
    if (featureConfig.requirePersistenceProfileState) { providers.push(ZWPPersistenceProfileFacade) }
    if (featureConfig.requireHistoryState) { providers.push(ZWPHistoryStoreFacade) }
    return providers
}