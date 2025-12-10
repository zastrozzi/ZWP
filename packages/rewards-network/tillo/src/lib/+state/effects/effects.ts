import { provideEffects } from '@ngrx/effects'
import { TilloBrandEffects } from './brand.effects'
import { TilloDigitalCodeEffects } from './digital-code.effects'
import { TilloFloatEffects } from './float.effects'
import { TilloStoreCardEffects } from './store-card.effects'
import { TilloTransactionSpreadEffects } from './transaction-spread.effects'
import { EnvironmentProviders } from '@angular/core'

export const environmentProviders: EnvironmentProviders[] = [
    provideEffects(
        TilloBrandEffects,
        TilloDigitalCodeEffects,
        TilloFloatEffects,
        TilloStoreCardEffects,
        TilloTransactionSpreadEffects
    ),
]
