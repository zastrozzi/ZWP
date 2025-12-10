import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { createNamespacedFeatureKey, GLOBAL_API_LOCATION, GlobalAPILocation, ZWPCommonModule, ModuleAPIState } from '@zwp/platform.common'
import { ZWPAuthModule } from '@zwp/platform.auth'
import { provideState } from '@ngrx/store'
import {
    ZWPGoogleAnalyticsModule,
    ZWPGoogleAnalyticsRouterModule,
} from '@zwp/platform.analytics/google'
import { provideEffects } from '@ngrx/effects'
import { ZWPLayoutModule } from '@zwp/platform.layout'
import { RouterModule, Routes } from '@angular/router'
import { UKGOV_HMRC_API_BASE_URL, UKGOV_HMRC_API_CONFIG, UKGovHMRCAPIConfig } from './config'
import { State } from './+state'
import { Services } from './services'
import { INTERNAL_COMPONENTS } from './components'





@NgModule({
    imports: [
        CommonModule,
        ZWPCommonModule,
        ZWPLayoutModule,
        ZWPAuthModule,
        ZWPGoogleAnalyticsModule,
        ZWPGoogleAnalyticsRouterModule
    ],
    declarations: [...INTERNAL_COMPONENTS.ALL],
    providers: [
        ...State.UKGOV_HMRC_FACADES
    ],
    exports: [
    ],
})
export class UKGovHMRCModule {
    public static forRoot(
        config: UKGovHMRCAPIConfig
    ): ModuleWithProviders<UKGovHMRCModule> {
        return {
            ngModule: UKGovHMRCModule,
            providers: [
                { provide: UKGOV_HMRC_API_CONFIG, useValue: config },
                {
                    provide: UKGOV_HMRC_API_BASE_URL,
                    useFactory: (config: UKGovHMRCAPIConfig, apiLocation: GlobalAPILocation) =>
                        apiLocation === GlobalAPILocation.LOCAL ? config.localBaseUrl : config.remoteBaseUrl,
                    deps: [UKGOV_HMRC_API_CONFIG, GLOBAL_API_LOCATION],
                },
                { 
                    provide: Services.EIM32712_API_SERVICE,
                    useExisting: config.apiState === ModuleAPIState.LIVE ? Services.EIM32712LiveAPIService : Services.EIM32712MockAPIService
                },
                provideState(
                    createNamespacedFeatureKey(State.Identifiers.UKGOV_HMRC_ACTION_IDENTIFIER, State.Identifiers.EIM32712_OCCUPATION_STATE_FEATURE_KEY),
                    State.Reducers.eim32712OccupationReducer
                ),
                provideEffects([...State.UKGOV_HMRC_EFFECTS])
            ],
        }
    }
}
