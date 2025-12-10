import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GLOBAL_API_LOCATION, GlobalAPILocation, ZWPCommonModule } from '@zwp/platform.common'
import { State } from './+state'
import { AFFILIATE_WINDOW_API_CONFIG, AffiliateWindowAPIConfig, AFFILIATE_WINDOW_API_BASE_URL } from './config'
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
    declarations: [...INTERNAL_COMPONENTS.ALL],
    providers: [
        ...State.Facades.ALL
    ],
    exports: [
        
    ]
})
export class RewardsNetworkAWINModule {
    public static forRoot(
        apiConfig: AffiliateWindowAPIConfig
    ): ModuleWithProviders<RewardsNetworkAWINModule> {
        return {
            ngModule: RewardsNetworkAWINModule,
            providers: [
                { provide: AFFILIATE_WINDOW_API_CONFIG, useValue: apiConfig },
                {
                    provide: AFFILIATE_WINDOW_API_BASE_URL,
                    useFactory: (config: AffiliateWindowAPIConfig, apiLocation: GlobalAPILocation) =>
                        apiLocation === GlobalAPILocation.LOCAL ? config.localBaseUrl : config.remoteBaseUrl,
                    deps: [AFFILIATE_WINDOW_API_CONFIG, GLOBAL_API_LOCATION],
                },
                ...State.environmentProviders,
                ...Services.environmentProviders(apiConfig)
            ]
        }
    }
}
