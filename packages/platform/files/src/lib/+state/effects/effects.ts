import { EnvironmentProviders } from '@angular/core'
import { ZWPFileExplorerEffects } from './file-explorer.effects'
import { provideEffects } from '@ngrx/effects'

export const environmentProviders: EnvironmentProviders[] = [
    provideEffects(
        ZWPFileExplorerEffects
    )
]