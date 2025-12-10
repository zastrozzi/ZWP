import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ZWPCommonModule, _providePersistenceFeature, createNamespacedFeatureKey } from '@zwp/platform.common'
import { ZWPPrivacyModuleRootConfig, ZWP_PRIVACY_MODULE_ROOT_CONFIG } from '../model'

import { Identifiers } from '../+state/identifiers'
import { cookieConsentReducer, ipLocationReducer, persistentCookieConsent } from '../+state/reducers'
import { provideState } from '@ngrx/store'
import { provideEffects } from '@ngrx/effects'
import { ZWPIPLocationEffects } from '../+state/effects'
import { ZWPPrivacyFacade } from '../+state/facades'
import { ZWPCookieConsentEffects } from '../+state/effects/cookie-consent.effects'
import { PRIVACY_EXPORTABLE_COMPONENTS } from '../components'

export const LOG_APPENDERS = new InjectionToken<any[]>("LOG_APPENDERS");

@NgModule({
    imports: [
        CommonModule,
        ZWPCommonModule
    ],
    declarations: [...PRIVACY_EXPORTABLE_COMPONENTS],
    exports: [...PRIVACY_EXPORTABLE_COMPONENTS]
})
export class ZWPPrivacyModule {
    public static forRoot(config: ZWPPrivacyModuleRootConfig): ModuleWithProviders<ZWPPrivacyModule> {
        // const ipProv = 
        // console.log(ipProv, 'ipProv')
        return {
            ngModule: ZWPPrivacyModule,
            providers: [
                { provide: ZWP_PRIVACY_MODULE_ROOT_CONFIG, useValue: config },
                provideState(
                    createNamespacedFeatureKey(
                        Identifiers.PLATFORM_PRIVACY_ACTION_IDENTIFIER, 
                        Identifiers.IP_LOCATION_STATE_FEATURE_KEY
                    ), 
                    ipLocationReducer
                ),
                provideState(
                    createNamespacedFeatureKey(
                        Identifiers.PLATFORM_PRIVACY_ACTION_IDENTIFIER, 
                        Identifiers.COOKIE_CONSENT_STATE_FEATURE_KEY
                    ), 
                    cookieConsentReducer
                ),
                ..._providePersistenceFeature(
                    createNamespacedFeatureKey(
                        Identifiers.PLATFORM_PRIVACY_ACTION_IDENTIFIER, 
                        Identifiers.COOKIE_CONSENT_STATE_FEATURE_KEY
                    ),
                    persistentCookieConsent
                ),
                provideEffects(ZWPIPLocationEffects),
                provideEffects(ZWPCookieConsentEffects),
                ZWPPrivacyFacade
            ]
        }
    }
}
