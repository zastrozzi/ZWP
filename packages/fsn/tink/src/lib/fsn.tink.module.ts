import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GLOBAL_API_LOCATION, GlobalAPILocation, ZWPCommonModule } from '@zwp/platform.common'
import { ZWPAuthModule } from '@zwp/platform.auth'
import { ZWPGoogleAnalyticsModule, ZWPGoogleAnalyticsRouterModule } from '@zwp/platform.analytics/google'
import { ZWPLayoutModule } from '@zwp/platform.layout'
import { RouterModule } from '@angular/router'
import { TINK_API_BASE_URL, TINK_API_CONFIG, TinkAPIConfig } from './config'
import { INTERNAL_COMPONENTS } from './components'
import { Services } from './services'
import { State } from './+state'

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
        ...INTERNAL_COMPONENTS.ALL
    ],
    providers: [
        ...State.Facades.ALL
    ],
    exports: [],
})
export class FSNTinkModule {
    public static forRoot(apiConfig: TinkAPIConfig): ModuleWithProviders<FSNTinkModule> {
        return {
            ngModule: FSNTinkModule,
            providers: [
                { provide: TINK_API_CONFIG, useValue: apiConfig },
                {
                    provide: TINK_API_BASE_URL,
                    useFactory: (config: TinkAPIConfig, apiLocation: GlobalAPILocation) =>
                        apiLocation === GlobalAPILocation.LOCAL ? config.localBaseUrl : config.remoteBaseUrl,
                    deps: [TINK_API_CONFIG, GLOBAL_API_LOCATION],
                },
                ...State.environmentProviders,
                ...Services.environmentProviders(apiConfig),
            ],
        }
    }
}
