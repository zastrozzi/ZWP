import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { createNamespacedFeatureKey, GLOBAL_API_LOCATION, GlobalAPILocation, ZWPCommonModule, ModuleAPIState } from '@zwp/platform.common'
import { ZWPAuthModule } from '@zwp/platform.auth'
import {
    ADMIN_USER_FACADES,
    AdminUserActivityFacade,
    AdminUserCredentialFacade,
    AdminUserDeviceFacade,
    AdminUserEmailFacade,
    AdminUserFacade,
    AdminUserSessionFacade,
    ENDUSER_FACADES,
    EnduserActivityFacade,
    EnduserFacade,
    EnduserSessionFacade,
} from './+state/facades'
import { provideState } from '@ngrx/store'
import { Identifiers } from './+state/identifiers'
import { Reducers } from './+state/reducers'
import {
    ZWPGoogleAnalyticsModule,
    ZWPGoogleAnalyticsRouterModule,
} from '@zwp/platform.analytics/google'
import {
    AdminUserActivityEffects,
    AdminUserCredentialEffects,
    AdminUserDeviceEffects,
    AdminUserEffects,
    AdminUserEmailEffects,
    AdminUserSessionEffects,
    EnduserActivityEffects,
    EnduserAddressEffects,
    EnduserCredentialEffects,
    EnduserDeviceEffects,
    EnduserEffects,
    EnduserEmailEffects,
    EnduserPhoneEffects,
    EnduserSessionEffects,
} from './+state/effects'
import { provideEffects } from '@ngrx/effects'
import { EXPORTABLE_COMPONENTS, INTERNAL_COMPONENTS } from './components'
import { ZWPLayoutModule } from '@zwp/platform.layout'
import { RouterModule, Routes } from '@angular/router'
import { CDPUsersAPIConfig, CDP_USERS_API_BASE_URL, CDP_USERS_API_CONFIG } from './config'
import { Services } from './services'
import { UKGovHMRCModule } from '@zwp/ukgov.hmrc'





@NgModule({
    imports: [
        CommonModule,
        ZWPCommonModule,
        ZWPLayoutModule,
        ZWPAuthModule,
        ZWPGoogleAnalyticsModule,
        ZWPGoogleAnalyticsRouterModule,
        UKGovHMRCModule,
        RouterModule.forChild([
            {
                path: 'login',
                component: INTERNAL_COMPONENTS.ADMIN_USER_COMPONENTS.AdminLoginComponent,
            },
        ]),
    ],
    declarations: [...INTERNAL_COMPONENTS.ALL, ...EXPORTABLE_COMPONENTS.ALL],
    providers: [
        ...ADMIN_USER_FACADES,
        ...ENDUSER_FACADES
    ],
    exports: [...EXPORTABLE_COMPONENTS.ALL],
})
export class CDPUsersModule {
    public static forRoot(
        config: CDPUsersAPIConfig
    ): ModuleWithProviders<CDPUsersModule> {
        return {
            ngModule: CDPUsersModule,
            providers: [
                { provide: CDP_USERS_API_CONFIG, useValue: config },
                {
                    provide: CDP_USERS_API_BASE_URL,
                    useFactory: (config: CDPUsersAPIConfig, apiLocation: GlobalAPILocation) =>
                        apiLocation === GlobalAPILocation.LOCAL ? config.localBaseUrl : config.remoteBaseUrl,
                    deps: [CDP_USERS_API_CONFIG, GLOBAL_API_LOCATION],
                },
                {
                    provide: Services.ADMIN_USER_API_SERVICE,
                    useExisting:
                        config.apiState === ModuleAPIState.LIVE
                            ? Services.AdminUserLiveAPIService
                            : Services.AdminUserMockAPIServices,
                },
                {
                    provide: Services.ENDUSER_API_SERVICE,
                    useExisting:
                        config.apiState === ModuleAPIState.LIVE ? Services.EnduserLiveAPIService : Services.EndUserMockAPIServices,
                },
                provideState(
                    createNamespacedFeatureKey(
                        Identifiers.CDP_USERS_ACTION_IDENTIFIER,
                        Identifiers.ADMIN_USER_ACTIVITY_STATE_FEATURE_KEY
                    ),
                    Reducers.adminUserActivityReducer
                ),
                provideState(
                    createNamespacedFeatureKey(
                        Identifiers.CDP_USERS_ACTION_IDENTIFIER,
                        Identifiers.ADMIN_USER_CREDENTIAL_STATE_FEATURE_KEY
                    ), 
                    Reducers.adminUserCredentialReducer
                ),
                provideState(
                    createNamespacedFeatureKey(
                        Identifiers.CDP_USERS_ACTION_IDENTIFIER,
                        Identifiers.ADMIN_USER_DEVICE_STATE_FEATURE_KEY
                    ), 
                    Reducers.adminUserDeviceReducer
                ),
                provideState(
                    createNamespacedFeatureKey(
                        Identifiers.CDP_USERS_ACTION_IDENTIFIER,
                        Identifiers.ADMIN_USER_EMAIL_STATE_FEATURE_KEY
                    ), 
                    Reducers.adminUserEmailReducer
                ),
                provideState(
                    createNamespacedFeatureKey(
                        Identifiers.CDP_USERS_ACTION_IDENTIFIER,
                        Identifiers.ADMIN_USER_SESSION_STATE_FEATURE_KEY
                    ), 
                    Reducers.adminUserSessionReducer
                ),
                provideState(
                    createNamespacedFeatureKey(
                        Identifiers.CDP_USERS_ACTION_IDENTIFIER,
                        Identifiers.ADMIN_USER_STATE_FEATURE_KEY
                    ), 
                    Reducers.adminUserReducer
                ),

                provideState(
                    createNamespacedFeatureKey(
                        Identifiers.CDP_USERS_ACTION_IDENTIFIER,
                        Identifiers.ENDUSER_ADDRESS_STATE_FEATURE_KEY
                    ), 
                    Reducers.enduserAddressReducer
                ),
                provideState(
                    createNamespacedFeatureKey(
                        Identifiers.CDP_USERS_ACTION_IDENTIFIER,
                        Identifiers.ENDUSER_CREDENTIAL_STATE_FEATURE_KEY
                    ), 
                    Reducers.enduserCredentialReducer
                ),
                provideState(
                    createNamespacedFeatureKey(
                        Identifiers.CDP_USERS_ACTION_IDENTIFIER,
                        Identifiers.ENDUSER_DEVICE_STATE_FEATURE_KEY
                    ), 
                    Reducers.enduserDeviceReducer
                ),
                provideState(
                    createNamespacedFeatureKey(
                        Identifiers.CDP_USERS_ACTION_IDENTIFIER,
                        Identifiers.ENDUSER_EMAIL_STATE_FEATURE_KEY
                    ), 
                    Reducers.enduserEmailReducer
                ),
                provideState(
                    createNamespacedFeatureKey(
                        Identifiers.CDP_USERS_ACTION_IDENTIFIER,
                        Identifiers.ENDUSER_PHONE_STATE_FEATURE_KEY
                    ), 
                    Reducers.enduserPhoneReducer
                ),
                provideState(
                    createNamespacedFeatureKey(
                        Identifiers.CDP_USERS_ACTION_IDENTIFIER,
                        Identifiers.ENDUSER_SESSION_STATE_FEATURE_KEY
                    ), 
                    Reducers.enduserSessionReducer
                ),
                provideState(
                    createNamespacedFeatureKey(
                        Identifiers.CDP_USERS_ACTION_IDENTIFIER,
                        Identifiers.ENDUSER_ACTIVITY_STATE_FEATURE_KEY
                    ), 
                    Reducers.enduserActivityReducer
                ),
                provideState(
                    createNamespacedFeatureKey(
                        Identifiers.CDP_USERS_ACTION_IDENTIFIER,
                        Identifiers.ENDUSER_STATE_FEATURE_KEY
                    ), 
                    Reducers.enduserReducer
                ),
                provideEffects([
                    AdminUserEffects,
                    AdminUserActivityEffects,
                    AdminUserCredentialEffects,
                    AdminUserDeviceEffects,
                    AdminUserEmailEffects,
                    AdminUserSessionEffects,

                    EnduserEffects,
                    EnduserActivityEffects,
                    EnduserAddressEffects,
                    EnduserCredentialEffects,
                    EnduserDeviceEffects,
                    EnduserEmailEffects,
                    EnduserPhoneEffects,
                    EnduserSessionEffects,
                ]),
            ],
        }
    }
}
