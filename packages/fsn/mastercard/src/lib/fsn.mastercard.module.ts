import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GLOBAL_API_LOCATION, GlobalAPILocation, ZWPCommonModule } from '@zwp/platform.common'
import { ZWPAuthModule } from '@zwp/platform.auth'
import { ZWPGoogleAnalyticsModule, ZWPGoogleAnalyticsRouterModule } from '@zwp/platform.analytics/google'
import { ZWPLayoutModule } from '@zwp/platform.layout'
import { RouterModule } from '@angular/router'
import { MASTERCARD_API_BASE_URL, MASTERCARD_API_CONFIG, MastercardAPIConfig } from './config'
// import { INTERNAL_COMPONENTS } from './components'
import { Services } from './services'
// import { State } from './+state'

@NgModule({
    imports: [
        CommonModule,
        ZWPCommonModule,
        ZWPLayoutModule,
        ZWPAuthModule,
        ZWPGoogleAnalyticsModule,
        ZWPGoogleAnalyticsRouterModule,
        RouterModule.forChild([]),
    ],
    declarations: [
        // ...INTERNAL_COMPONENTS.ALL
    ],
    providers: [
        // ...State.Facades.ALL
    ],
    exports: [],
})
export class FSNMastercardModule {
    public static forRoot(apiConfig: MastercardAPIConfig): ModuleWithProviders<FSNMastercardModule> {
        return {
            ngModule: FSNMastercardModule,
            providers: [
                { provide: MASTERCARD_API_CONFIG, useValue: apiConfig },
                {
                    provide: MASTERCARD_API_BASE_URL,
                    useFactory: (config: MastercardAPIConfig, apiLocation: GlobalAPILocation) =>
                        apiLocation === GlobalAPILocation.LOCAL ? config.localBaseUrl : config.remoteBaseUrl,
                    deps: [MASTERCARD_API_CONFIG, GLOBAL_API_LOCATION],
                },
                // ...State.environmentProviders,
                ...Services.environmentProviders(apiConfig),
            ],
        }
    }
}
