import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GLOBAL_API_LOCATION, GlobalAPILocation, ZWPCommonModule } from '@zwp/platform.common'
import { State } from './+state'
import { IDENTITY_API_CONFIG, IDENTITY_API_BASE_URL, IdentityAPIConfig } from './config'
import { Services } from './services'
import { ZWPLayoutModule } from '@zwp/platform.layout'
import { ZWPAuthModule } from '@zwp/platform.auth'
// import { INTERNAL_COMPONENTS } from './components'

@NgModule({
    imports: [
        CommonModule,
        ZWPCommonModule,
        ZWPLayoutModule,
        ZWPAuthModule
    ],
    declarations: [
        // ...INTERNAL_COMPONENTS.ALL
    ],
    providers: [
        ...State.Facades.ALL
    ],
    exports: [
        
    ]
})
export class PlatformIdentityModule {
    public static forRoot(
        apiConfig: IdentityAPIConfig
    ): ModuleWithProviders<PlatformIdentityModule> {
        return {
            ngModule: PlatformIdentityModule,
            providers: [
                { provide: IDENTITY_API_CONFIG, useValue: apiConfig },
                {
                    provide: IDENTITY_API_BASE_URL,
                    useFactory: (config: IdentityAPIConfig, apiLocation: GlobalAPILocation) =>
                        apiLocation === GlobalAPILocation.LOCAL ? config.localBaseUrl : config.remoteBaseUrl,
                    deps: [IDENTITY_API_CONFIG, GLOBAL_API_LOCATION],
                },
                ...State.environmentProviders,
                ...Services.environmentProviders(apiConfig)
            ]
        }
    }
}
