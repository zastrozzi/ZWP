import { EnvironmentProviders } from '@angular/core'
import { ZWPFileExplorerEffects } from './file-explorer.effects'
import { provideEffects } from '@ngrx/effects'
import { ZWPFileDataEffects } from './file-data.effects'

export const environmentProviders: EnvironmentProviders[] = [
    provideEffects(
        ZWPFileExplorerEffects,
        ZWPFileDataEffects
    )
]