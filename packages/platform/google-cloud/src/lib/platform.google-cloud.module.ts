import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GLOBAL_API_LOCATION, GlobalAPILocation, ZWPCommonModule } from '@zwp/platform.common'
import { State } from './+state'
import { GOOGLE_CLOUD_API_CONFIG, GOOGLE_CLOUD_API_BASE_URL, GoogleCloudAPIConfig } from './config'
import { Services } from './services'
import { ZWPLayoutModule } from '@zwp/platform.layout'
import { ZWPAuthModule } from '@zwp/platform.auth'
import { EXPORTABLE_COMPONENTS, INTERNAL_COMPONENTS } from './components'

@NgModule({
    imports: [
        CommonModule,
        ZWPCommonModule,
        ZWPLayoutModule,
        ZWPAuthModule
    ],
    declarations: [
        ...INTERNAL_COMPONENTS.ALL,
        ...EXPORTABLE_COMPONENTS.ALL
    ],
    providers: [
        ...State.Facades.ALL
    ],
    exports: [
        ...EXPORTABLE_COMPONENTS.ALL
    ]
})
export class PlatformGoogleCloudModule {
    public static forRoot(
        apiConfig: GoogleCloudAPIConfig
    ): ModuleWithProviders<PlatformGoogleCloudModule> {
        return {
            ngModule: PlatformGoogleCloudModule,
            providers: [
                { provide: GOOGLE_CLOUD_API_CONFIG, useValue: apiConfig },
                {
                    provide: GOOGLE_CLOUD_API_BASE_URL,
                    useFactory: (config: GoogleCloudAPIConfig, apiLocation: GlobalAPILocation) =>
                        apiLocation === GlobalAPILocation.LOCAL ? config.localBaseUrl : config.remoteBaseUrl,
                    deps: [GOOGLE_CLOUD_API_CONFIG, GLOBAL_API_LOCATION],
                },
                ...State.environmentProviders,
                ...Services.environmentProviders(apiConfig)
            ]
        }
    }
}
