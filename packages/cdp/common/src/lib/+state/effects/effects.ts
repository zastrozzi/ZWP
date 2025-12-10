import { EnvironmentProviders } from '@angular/core'
import { provideEffects } from '@ngrx/effects'
import { CDPCommonUtilityDockEffects } from './utility-dock.effects'

export const environmentProviders: EnvironmentProviders[] = [
    provideEffects(CDPCommonUtilityDockEffects),
]