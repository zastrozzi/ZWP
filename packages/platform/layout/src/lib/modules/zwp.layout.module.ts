import { InjectionToken, ModuleWithProviders, NgModule, EnvironmentProviders, Provider } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ZWPCommonModule, ZWP_NGRX_MODULE_ROOT_CONFIG, _providePersistenceFeature, createNamespacedFeatureKey } from '@zwp/platform.common'
import { LAYOUT_EXPORTABLE_DIRECTIVES } from '../directives'
import { provideState } from '@ngrx/store'
import { Identifiers } from '../+state/identifiers'
import { mainPanelReducer, panelLayoutReducer, persistentPanelLayout, persistentWindowLayoutState, tableLayoutReducer, windowLayoutReducer } from '../+state/reducers'
import { FLOWS_INTERNAL_DIRECTIVES, LAYOUT_EXPORTABLE_COMPONENTS, WindowDirective } from '../components'
import { ZWPMainPanelFacade, ZWPMenuLayoutFacade, ZWPPanelLayoutFacade, ZWPPopupLayoutFacade, ZWPWindowLayoutFacade } from '../+state/facades'
import { LAYOUT_EXPORTABLE_PIPES } from '../pipes'
import { provideEffects } from '@ngrx/effects'
// import { LAYOUT_EFFECTS } from '../+state/effects'
import { ZWPMenuOverlayService, ZWPSnackbarService, ZWPWindowOverlayService } from '../services'
import { ZWPPanelLayoutEffects } from '../+state/effects/panel-layout.effects'
import { ZWPWindowLayoutEffects } from '../+state/effects/window-layout.effects'
import { ZWPLayoutModuleLibraryOrChildConfig, ZWPLayoutModuleRootConfig } from '../model'
import { ZWPSnackbarEffects } from '../+state/effects/snackbar.effects'
import { RouterModule } from '@angular/router'
import { ZWPMainPanelEffects } from '../+state/effects/main-panel.effect'

export const LAYOUT_MODULE_PROVIDERS: Provider[] = []
// export const LAYOUT_MODULE_LIBRARY_OR_CHILD_CONFIG = new InjectionToken<ZWPLayoutModuleLibraryOrChildConfig>('LAYOUT_MODULE_LIBRARY_OR_CHILD_CONFIG')
export const ZWP_LAYOUT_MODULE_ROOT_CONFIG = new InjectionToken<ZWPLayoutModuleRootConfig>('zwp.layout-module.root-config')

@NgModule({
    imports: [
        CommonModule,
        ZWPCommonModule,
        RouterModule

        // StoreModule.forFeature(PANEL_LAYOUT_STATE_FEATURE_KEY, panelLayoutReducer),
        // StoreModule.forFeature(WINDOW_LAYOUT_STATE_FEATURE_KEY, windowLayoutReducer),
        // EffectsModule.forFeature(LAYOUT_EFFECTS)
    ],
    declarations: [
        ...LAYOUT_EXPORTABLE_DIRECTIVES,
        ...FLOWS_INTERNAL_DIRECTIVES,
        ...LAYOUT_EXPORTABLE_COMPONENTS,
        ...LAYOUT_EXPORTABLE_PIPES,
        WindowDirective
    ],
    providers: [
        // ...LAYOUT_FACADES,
        // ...LAYOUT_SERVICES
    ],
    exports: [
        ...LAYOUT_EXPORTABLE_DIRECTIVES,
        ...LAYOUT_EXPORTABLE_COMPONENTS,
        ...LAYOUT_EXPORTABLE_PIPES,
        ...FLOWS_INTERNAL_DIRECTIVES,
        WindowDirective
    ]
})
export class ZWPLayoutModule {
    public static forRoot(config: ZWPLayoutModuleRootConfig): ModuleWithProviders<ZWPLayoutModule> {
        
        return {
            ngModule: ZWPLayoutModule,
            providers: [
                // provideStore(),
                {
                    provide: ZWP_LAYOUT_MODULE_ROOT_CONFIG,
                    deps: [ZWP_NGRX_MODULE_ROOT_CONFIG],
                    useValue: config
                },
                _provideLayoutModuleRootProviders(config)
            ]
        }
    }

    public static forLibraryOrChild(config: ZWPLayoutModuleLibraryOrChildConfig): ModuleWithProviders<ZWPLayoutModule> {
        return {
            ngModule: ZWPLayoutModule,
            providers: [
                
                {
                    provide: LAYOUT_MODULE_PROVIDERS,
                    deps: [ZWP_LAYOUT_MODULE_ROOT_CONFIG],
                    useFactory: _provideLayoutModuleProviders(config)
                }
            ]
        }
    }
}

export const _provideLayoutModuleRootProviders = (config: ZWPLayoutModuleRootConfig): (Provider | EnvironmentProviders)[] => {
    return [
        ...(config.includePopupLayout ? [
            ZWPPopupLayoutFacade
        ] : []),
        ...(config.includePanelLayout ? [ 
            provideState(createNamespacedFeatureKey(
                Identifiers.PLATFORM_LAYOUT_ACTION_IDENTIFIER, 
                Identifiers.PANEL_LAYOUT_STATE_FEATURE_KEY
            ), panelLayoutReducer),
            provideEffects([ZWPPanelLayoutEffects]),
            ZWPPanelLayoutFacade
        ] : []),
        ...(config.persistPanelLayout ? _providePersistenceFeature(createNamespacedFeatureKey(
            Identifiers.PLATFORM_LAYOUT_ACTION_IDENTIFIER, 
            Identifiers.PANEL_LAYOUT_STATE_FEATURE_KEY
        ), persistentPanelLayout) : []),
        ...(config.includeWindowLayout ? [
            provideState(createNamespacedFeatureKey(
                Identifiers.PLATFORM_LAYOUT_ACTION_IDENTIFIER, 
                Identifiers.WINDOW_LAYOUT_STATE_FEATURE_KEY
            ), windowLayoutReducer),
            provideEffects([ZWPWindowLayoutEffects]),
            ZWPWindowLayoutFacade,
            ZWPWindowOverlayService
        ] : []),
        ...(config.persistWindowLayout ? _providePersistenceFeature(createNamespacedFeatureKey(
            Identifiers.PLATFORM_LAYOUT_ACTION_IDENTIFIER, 
            Identifiers.WINDOW_LAYOUT_STATE_FEATURE_KEY
        ), persistentWindowLayoutState) : []),
        ...(config.includeMenuLayout ? [ ZWPMenuLayoutFacade, ZWPMenuOverlayService ] : []),
        ...(config.includeSnackbarLayout ? [
            provideEffects([ZWPSnackbarEffects]),
            ZWPSnackbarService 
        ] : []),
        ...(config.includeMainPanelTabs ? [
            provideState(createNamespacedFeatureKey(
                Identifiers.PLATFORM_LAYOUT_ACTION_IDENTIFIER, 
                Identifiers.MAIN_PANEL_STATE_FEATURE_KEY
            ), mainPanelReducer),
            provideEffects([ZWPMainPanelEffects]),
            ZWPMainPanelFacade
        ] : []),
        ...(config.includeTableLayout ? [
            provideState(createNamespacedFeatureKey(
                Identifiers.PLATFORM_LAYOUT_ACTION_IDENTIFIER, 
                Identifiers.TABLE_LAYOUT_STATE_FEATURE_KEY
            ), tableLayoutReducer),
            // provideEffects([TableLayoutEffects]),
            // TableLayoutFacade
        ] : [])
    ]
}

export const _provideLayoutModuleProviders = (libConfig: ZWPLayoutModuleLibraryOrChildConfig) => (rootConfig: ZWPLayoutModuleRootConfig): (Provider | EnvironmentProviders)[] => {
    if (libConfig.requirePanelLayout && !rootConfig.includePanelLayout) { throw new Error('Panel layout is required by library or child module but not included in root module') }
    if (libConfig.requireWindowLayout && !rootConfig.includeWindowLayout) { throw new Error('Window layout is required by library or child module but not included in root module') }
    if (libConfig.requireMenuLayout && !rootConfig.includeMenuLayout) { throw new Error('Menu layout is required by library or child module but not included in root module') }
    if (libConfig.requireMainPanelTabs && !rootConfig.includeMainPanelTabs) { throw new Error('Main panel tabs are required by library or child module but not included in root module') }
    return [
        // provideStore(),
        ...(libConfig.requirePopupLayout ? [
            ZWPPopupLayoutFacade
        ] : []),
        ...(libConfig.requirePanelLayout ? [ 
            provideState(createNamespacedFeatureKey(
                Identifiers.PLATFORM_LAYOUT_ACTION_IDENTIFIER, 
                Identifiers.PANEL_LAYOUT_STATE_FEATURE_KEY
            ), panelLayoutReducer),
            provideEffects([ZWPPanelLayoutEffects]),
            ZWPPanelLayoutFacade
        ] : []),
        // ...(config.persistPanelLayout ? _providePersistenceFeature(PANEL_LAYOUT_STATE_FEATURE_KEY, persistentPanelLayout) : []),
        ...(libConfig.requireWindowLayout ? [
            provideState(createNamespacedFeatureKey(
                Identifiers.PLATFORM_LAYOUT_ACTION_IDENTIFIER, 
                Identifiers.WINDOW_LAYOUT_STATE_FEATURE_KEY
            ), windowLayoutReducer),
            provideEffects([ZWPWindowLayoutEffects]),
            ZWPWindowLayoutFacade,
            ZWPWindowOverlayService
        ] : []),
        // ...(config.persistWindowLayout ? _providePersistenceFeature(WINDOW_LAYOUT_STATE_FEATURE_KEY, persistentWindowLayoutState) : []),
        ...(libConfig.requireMenuLayout ? [ ZWPMenuLayoutFacade, ZWPMenuOverlayService ] : [])
    ]
}