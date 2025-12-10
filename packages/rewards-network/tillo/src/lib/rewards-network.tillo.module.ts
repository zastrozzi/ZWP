import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GLOBAL_API_LOCATION, GlobalAPILocation, ZWPCommonModule } from '@zwp/platform.common'
import { ZWPAuthModule } from '@zwp/platform.auth'
import {
    ZWPGoogleAnalyticsModule,
    ZWPGoogleAnalyticsRouterModule,
} from '@zwp/platform.analytics/google'
import { ZWPLayoutModule } from '@zwp/platform.layout'
import { RouterModule } from '@angular/router'
import { TILLO_API_BASE_URL, TILLO_API_CONFIG, TilloAPIConfig } from './config'
import { INTERNAL_COMPONENTS } from './components';
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
        RouterModule.forChild([
            
        ]),
    ],
    declarations: [...INTERNAL_COMPONENTS.ALL],
    providers: [
        ...State.Facades.ALL
    ],
    exports: [],
})
export class RewardsNetworkTilloModule {
    public static forRoot(
        apiConfig: TilloAPIConfig
    ): ModuleWithProviders<RewardsNetworkTilloModule> {
        return {
            ngModule: RewardsNetworkTilloModule,
            providers: [
                { provide: TILLO_API_CONFIG, useValue: apiConfig },
                {
                    provide: TILLO_API_BASE_URL,
                    useFactory: (config: TilloAPIConfig, apiLocation: GlobalAPILocation) =>
                        apiLocation === GlobalAPILocation.LOCAL ? config.localBaseUrl : config.remoteBaseUrl,
                    deps: [TILLO_API_CONFIG, GLOBAL_API_LOCATION],
                },
                ...State.environmentProviders,
                ...Services.environmentProviders(apiConfig),
                

            ],
        }
    }
}
