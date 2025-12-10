import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GLOBAL_API_LOCATION, GlobalAPILocation, ZWPCommonModule } from '@zwp/platform.common'
import { State } from './+state'
import { DYNAMIC_QUERY_API_CONFIG, DYNAMIC_QUERY_API_BASE_URL, DynamicQueryAPIConfig } from './config'
import { Services } from './services'
import { ZWPLayoutModule } from '@zwp/platform.layout'
import { ZWPAuthModule } from '@zwp/platform.auth'
import { INTERNAL_COMPONENTS } from './components'

@NgModule({
    imports: [
        CommonModule,
        ZWPCommonModule,
        ZWPLayoutModule,
        ZWPAuthModule
    ],
    declarations: [
        ...INTERNAL_COMPONENTS.ALL
    ],
    providers: [
        ...State.Facades.ALL
    ],
    exports: [
        
    ]
})
export class PlatformDynamicQueryModule {
    public static forRoot(
        apiConfig: DynamicQueryAPIConfig
    ): ModuleWithProviders<PlatformDynamicQueryModule> {
        return {
            ngModule: PlatformDynamicQueryModule,
            providers: [
                { provide: DYNAMIC_QUERY_API_CONFIG, useValue: apiConfig },
                {
                    provide: DYNAMIC_QUERY_API_BASE_URL,
                    useFactory: (config: DynamicQueryAPIConfig, apiLocation: GlobalAPILocation) =>
                        apiLocation === GlobalAPILocation.LOCAL ? config.localBaseUrl : config.remoteBaseUrl,
                    deps: [DYNAMIC_QUERY_API_CONFIG, GLOBAL_API_LOCATION],
                },
                ...State.environmentProviders,
                ...Services.environmentProviders(apiConfig)
            ]
        }
    }
}
