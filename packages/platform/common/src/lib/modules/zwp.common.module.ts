import { EnvironmentInjector, InjectionToken, Injector, ModuleWithProviders, NgModule } from '@angular/core'
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core'
import { Platform } from '@angular/cdk/platform'
import { UKDateAdapter } from '../utils'
import { CommonEnvironment, COMMON_ENVIRONMENT, ZWPCommonModuleRootConfig, ZWP_COMMON_MODULE_ROOT_CONFIG } from '../model'
import { COMMON_EXPORTABLE_ANGULAR_MODULES, COMMON_INTERNAL_ANGULAR_MODULES } from './angular.modules'
import { COMMON_EXPORTABLE_CDK_MODULES } from './cdk.modules'
import { COMMON_EXPORTABLE_MATERIAL_MODULES } from './material.modules'
import { COMMON_EXPORTABLE_THIRD_PARTY_MODULES } from './third-party.modules'
import { COMMON_EXPORTABLE_DIRECTIVES } from '../directives'
import { COMMON_EXPORTABLE_PIPES, 
    // COMMON_INTERNAL_PIPES 
} from '../pipes'
import { COMMON_INTERNAL_SERVICES, DEFAULT_ZWP_COLOR_FORMATS, ZWP_COLOR_FORMATS, ZWP_LOGGING_SERVICE, ZWP_STORAGE_SERVICE } from '../services'
import { COMMON_EXPORTABLE_COMPONENTS, ZWP_COLOR_PICKER_SCROLL_STRATEGY_FACTORY_PROVIDER } from '../components'
import { provideArrayExtensions } from '../utils/array.extensions'
import { ZWPNgrxModule } from './zwp.ngrx.module'
import { ZWPDecoratorModule } from './zwp.decorator.module'
import { DatePipe } from '@angular/common'



@NgModule({
    imports: [
        ...COMMON_INTERNAL_ANGULAR_MODULES,
        ...COMMON_EXPORTABLE_ANGULAR_MODULES, 
        ...COMMON_EXPORTABLE_CDK_MODULES, 
        ...COMMON_EXPORTABLE_MATERIAL_MODULES, 
        ...COMMON_EXPORTABLE_THIRD_PARTY_MODULES
        // ZWPDecoratorModule
        // ZWPNgrxModule.forFeature()
    ],
    declarations: [
        ...COMMON_EXPORTABLE_COMPONENTS, 
        ...COMMON_EXPORTABLE_DIRECTIVES, 
        // ...COMMON_INTERNAL_PIPES, 
        ...COMMON_EXPORTABLE_PIPES
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        { provide: DateAdapter, useClass: UKDateAdapter, deps: [MAT_DATE_LOCALE, Platform] },
        ZWP_COLOR_PICKER_SCROLL_STRATEGY_FACTORY_PROVIDER,
        DatePipe
        
    ],
    exports: [
        ...COMMON_EXPORTABLE_ANGULAR_MODULES,
        ...COMMON_EXPORTABLE_CDK_MODULES,
        ...COMMON_EXPORTABLE_MATERIAL_MODULES,
        ...COMMON_EXPORTABLE_THIRD_PARTY_MODULES,
        ...COMMON_EXPORTABLE_COMPONENTS,
        ...COMMON_EXPORTABLE_DIRECTIVES,
        ...COMMON_EXPORTABLE_PIPES
        // [ZWPNgrxModule.forFeature()]
    ]
})
export class ZWPCommonModule {
    static _injector: EnvironmentInjector

    public static forRoot(rootConfig: ZWPCommonModuleRootConfig): ModuleWithProviders<ZWPCommonModule> {
        return {
            ngModule: ZWPCommonModule,
            providers: [
                { provide: ZWP_COMMON_MODULE_ROOT_CONFIG, useValue: rootConfig },
                // { provide: COMMON_ENVIRONMENT, useValue: rootConfig.environment },
                { provide: ZWP_LOGGING_SERVICE, useExisting: rootConfig.loggingService },
                { provide: ZWP_STORAGE_SERVICE, useExisting: rootConfig.storageService },
                { provide: ZWP_COLOR_FORMATS, useValue: DEFAULT_ZWP_COLOR_FORMATS },
                ...(rootConfig.enableRootServices ? COMMON_INTERNAL_SERVICES : [])
                // ...COMMON_EXPORTABLE_SERVICES
            ]
        }
    }

    public static withRootServices(environment: CommonEnvironment): ModuleWithProviders<ZWPCommonModule> {
        return {
            ngModule: ZWPCommonModule,
            providers: [
                // { provide: COMMON_ENVIRONMENT, useValue: environment },
                ...COMMON_INTERNAL_SERVICES
                // ...COMMON_EXPORTABLE_SERVICES
            ]
        }
    }

    public static withoutRootServices(environment: CommonEnvironment): ModuleWithProviders<ZWPCommonModule> {
        return {
            ngModule: ZWPCommonModule,
            providers: [
                // { provide: COMMON_ENVIRONMENT, useValue: environment }
            ]
        }
    }

    constructor(injector: EnvironmentInjector) {
        ZWPCommonModule._injector = injector
        provideArrayExtensions()
    }
}
