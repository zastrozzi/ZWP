import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { createNamespacedFeatureKey, GLOBAL_API_LOCATION, GlobalAPILocation, ZWPCommonModule, ModuleAPIState } from '@zwp/platform.common'
import { ZWPAuthModule } from '@zwp/platform.auth'
import { provideState } from '@ngrx/store'
import { State } from './+state'
import {
    ZWPGoogleAnalyticsModule,
    ZWPGoogleAnalyticsRouterModule,
} from '@zwp/platform.analytics/google'
import { provideEffects } from '@ngrx/effects'
import { ZWPLayoutModule } from '@zwp/platform.layout'
import { Services } from './services'
import { MERCHANT_NET_API_CONFIG, MERCHANT_NET_API_BASE_URL, MerchantNetAPIConfig } from './config'
import { MERCHANT_NET_COMPONENTS } from './components'
import { Identifiers } from './+state/identifiers'
import { Reducers } from './+state/reducers'

@NgModule({
    imports: [
        CommonModule,
        ZWPCommonModule,
        ZWPLayoutModule,
        ZWPAuthModule,
        ZWPGoogleAnalyticsModule,
        ZWPGoogleAnalyticsRouterModule,
        // RouterModule.forChild([
            
        // ]),
    ],
    declarations: [...MERCHANT_NET_COMPONENTS.ALL],
    providers: [
        ...State.Facades.ALL
    ],
    exports: [
        
    ],
})
export class RewardsNetworkMerchantNetModule {
    public static forRoot(
        apiConfig: MerchantNetAPIConfig
    ): ModuleWithProviders<RewardsNetworkMerchantNetModule> {
        return {
            ngModule: RewardsNetworkMerchantNetModule,
            providers: [
                { provide: MERCHANT_NET_API_CONFIG, useValue: apiConfig },
                {
                    provide: MERCHANT_NET_API_BASE_URL,
                    useFactory: (config: MerchantNetAPIConfig, apiLocation: GlobalAPILocation) =>
                        apiLocation === GlobalAPILocation.LOCAL ? config.localBaseUrl : config.remoteBaseUrl,
                    deps: [MERCHANT_NET_API_CONFIG, GLOBAL_API_LOCATION],
                },
                ...State.environmentProviders,
                ...Services.environmentProviders(apiConfig)
                
            ],
        }
    }
}
