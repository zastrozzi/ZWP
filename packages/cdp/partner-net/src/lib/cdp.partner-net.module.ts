import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GLOBAL_API_LOCATION, GlobalAPILocation, ZWPCommonModule } from '@zwp/platform.common'
import { State } from './+state'
import { CDP_PARTNER_NET_API_CONFIG, CDP_PARTNER_NET_API_BASE_URL, CDPPartnerNetAPIConfig } from './config'
import { Services } from './services'
import { ZWPLayoutModule } from '@zwp/platform.layout'
import { ZWPAuthModule } from '@zwp/platform.auth'
import { INTERNAL_COMPONENTS } from './components'
import { CDPUsersModule } from '@zwp/cdp.users'

@NgModule({
    imports: [
        CommonModule,
        ZWPCommonModule,
        ZWPLayoutModule,
        ZWPAuthModule,
        CDPUsersModule
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
export class CDPPartnerNetModule {
    public static forRoot(
        apiConfig: CDPPartnerNetAPIConfig
    ): ModuleWithProviders<CDPPartnerNetModule> {
        return {
            ngModule: CDPPartnerNetModule,
            providers: [
                { provide: CDP_PARTNER_NET_API_CONFIG, useValue: apiConfig },
                {
                    provide: CDP_PARTNER_NET_API_BASE_URL,
                    useFactory: (config: CDPPartnerNetAPIConfig, apiLocation: GlobalAPILocation) =>
                        apiLocation === GlobalAPILocation.LOCAL ? config.localBaseUrl : config.remoteBaseUrl,
                    deps: [CDP_PARTNER_NET_API_CONFIG, GLOBAL_API_LOCATION],
                },
                ...State.environmentProviders,
                ...Services.environmentProviders(apiConfig)
            ]
        }
    }
}
