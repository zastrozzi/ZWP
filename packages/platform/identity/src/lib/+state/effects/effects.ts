import { EnvironmentProviders } from '@angular/core'
import { provideEffects } from '@ngrx/effects'
import { AdminUserActivityEffects, AdminUserCredentialEffects, AdminUserDeviceEffects, AdminUserEffects, AdminUserEmailEffects, AdminUserSessionEffects } from './admin-user'
import { EnduserActivityEffects, EnduserAddressEffects, EnduserCredentialEffects, EnduserDeviceEffects, EnduserEffects, EnduserEmailEffects, EnduserPhoneEffects, EnduserSessionEffects } from './enduser'

export const environmentProviders: EnvironmentProviders[] = [
    provideEffects(
        AdminUserActivityEffects,
        AdminUserCredentialEffects,
        AdminUserDeviceEffects,
        AdminUserEffects,
        AdminUserEmailEffects,
        AdminUserSessionEffects,

        EnduserEffects,
        EnduserActivityEffects,
        EnduserAddressEffects,
        EnduserCredentialEffects,
        EnduserDeviceEffects,
        EnduserEmailEffects,
        EnduserPhoneEffects,
        EnduserSessionEffects
    )
]