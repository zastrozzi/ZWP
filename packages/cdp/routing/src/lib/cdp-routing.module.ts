import { EnvironmentProviders, ModuleWithProviders, NgModule, Provider } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ZWPCommonModule } from '@zwp/platform.common'
import { ZWPAuthModule } from '@zwp/platform.auth'
import {
    ZWPGoogleAnalyticsModule,
    ZWPGoogleAnalyticsRouterModule,
} from '@zwp/platform.analytics/google'
import { INTERNAL_COMPONENTS } from './components'
import { ZWPLayoutModule } from '@zwp/platform.layout'
import { RouterModule, Routes } from '@angular/router'
import { CDPUsersModule, CDPUsers } from '@zwp/cdp.users'
import { CDPPartnerNetModule, CDPPartnerNet } from '@zwp/cdp.partner-net'
import { RewardsNetworkMerchantNetModule } from '@zwp/rewards-network.merchant-net'
import { RewardsNetworkTilloModule } from '@zwp/rewards-network.tillo'
import { UKGovHMRCModule, UKGovernmentHMRC } from '@zwp/ukgov.hmrc'
import { AdminUserAuthGuard } from './guards'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { LoggingInterceptor } from './interceptors'
import { PlatformDynamicQuery } from '@zwp/platform.dynamic-query'
import { PlatformGoogleCloud, PlatformGoogleCloudModule } from '@zwp/platform.google-cloud'
import { cdpRoutes } from './routes/cdp.routes'
import { CDPCommonModule } from '@zwp/cdp.common'
import { FSNTinkModule } from '@zwp/fsn.tink'

@NgModule({
    imports: [
    CommonModule,
    ZWPCommonModule,
    ZWPLayoutModule,
    ZWPAuthModule,
    ZWPGoogleAnalyticsModule,
    ZWPGoogleAnalyticsRouterModule,
    CDPCommonModule,
    CDPUsersModule,
    CDPPartnerNetModule,
    UKGovHMRCModule,
    RewardsNetworkMerchantNetModule,
    RewardsNetworkTilloModule,
    FSNTinkModule,
    RouterModule.forChild([...cdpRoutes]),
    PlatformGoogleCloudModule
],
    declarations: [...INTERNAL_COMPONENTS.ALL],
    providers: [],
    exports: [],
})
export class CDPRoutingModule {
    public static forRoot(enableLogging: boolean): ModuleWithProviders<CDPRoutingModule> {
        const providers: (Provider | EnvironmentProviders)[] = []
        if (enableLogging) {
            providers.push(
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: LoggingInterceptor,
                    multi: true,
                }
            )
        }
        return {
            ngModule: CDPRoutingModule,
            providers: providers
        }
    }
}
