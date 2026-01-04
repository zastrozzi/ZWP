import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { State } from './+state'
import { DUMMY_DATA_MODULE_CONFIG, PlatformDummyDataModuleConfig } from './config'
import { Services } from './services'

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        ...State.Facades.ALL
    ]
})
export class PlatformDummyDataModule {
    public static forRoot(config: PlatformDummyDataModuleConfig): ModuleWithProviders<PlatformDummyDataModule> {
        
        return {
            ngModule: PlatformDummyDataModule,
            providers: [
                { provide: DUMMY_DATA_MODULE_CONFIG, useValue: config },
                ...State.environmentProviders(config),
                ...Services.environmentProviders(config)
            ]
        }
    }
}
