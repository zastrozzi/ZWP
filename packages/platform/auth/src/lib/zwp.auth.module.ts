import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
    _providePersistenceFeature,
    createNamespacedFeatureKey,
    ZWPCommonModule,
    ZWPNgrxPersistenceModule,
} from '@zwp/platform.common'
import { provideState } from '@ngrx/store'
import { Identifiers } from './+state/identifiers'
import { persistentUserAuthState, userAuthReducer } from './+state/reducers'
import { UserAuthFacade } from './+state/facades'
import { provideEffects } from '@ngrx/effects'
import { UserAuthEffects } from './+state/effects'

@NgModule({
    imports: [CommonModule, ZWPCommonModule],
    declarations: [
        // ...FLOWS_EXPORTABLE_COMPONENTS
    ],
    providers: [
        provideState(
            createNamespacedFeatureKey(Identifiers.AUTH_ACTION_IDENTIFIER, Identifiers.USER_AUTH_STATE_FEATURE_KEY),
            userAuthReducer
        ),
        provideEffects(UserAuthEffects),
        UserAuthFacade,
    ],
    exports: [
        // ...FLOWS_EXPORTABLE_COMPONENTS
    ],
})
export class ZWPAuthModule {
    public static mock(): ModuleWithProviders<ZWPAuthModule> {
        return {
            ngModule: ZWPAuthModule,
        }
    }

    public static live(): ModuleWithProviders<ZWPAuthModule> {
        return {
            ngModule: ZWPAuthModule,
            providers: [
                ..._providePersistenceFeature(
                    createNamespacedFeatureKey(
                        Identifiers.AUTH_ACTION_IDENTIFIER,
                        Identifiers.USER_AUTH_STATE_FEATURE_KEY
                    ),
                    persistentUserAuthState
                ),
            ],
        }
    }
}
