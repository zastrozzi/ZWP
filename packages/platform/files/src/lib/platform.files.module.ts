import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ZWPLayoutModule } from '@zwp/platform.layout'
import { ZWPCommonModule, ZWP_NGRX_MODULE_ROOT_CONFIG, _provideHistoryFeature, createNamespacedFeatureKey } from '@zwp/platform.common'
import { State } from './+state'
import { ZWPDummyDataModule } from '@zwp/platform.dummy-data'
import { FILES_EXPORTABLE_COMPONENTS, FILES_INTERNAL_COMPONENTS } from './components'
import { ZWP_FILES_MODULE_ROOT_CONFIG, ZWPFilesModuleRootConfig } from './config'

@NgModule({
    imports: [
        CommonModule,
        ZWPCommonModule,
        ZWPLayoutModule,
        ZWPDummyDataModule,
        // StoreModule.forFeature(FILE_EXPLORER_STATE_FEATURE_KEY, fileExplorerReducer),
        // StoreModule.forFeature(FILE_DATA_STATE_FEATURE_KEY, fileDataReducer),
        // EffectsModule.forFeature([FileExplorerEffects]),
        // ZWPNgrxHistoryModule.forFeature(FILE_DATA_STATE_FEATURE_KEY, ...[FileDataActions.create, FileDataActions.createMany, FileDataActions.remove, FileDataActions.updateParent, FileDataActions.updateParents])
    ],
    declarations: [
        ...FILES_INTERNAL_COMPONENTS,
        ...FILES_EXPORTABLE_COMPONENTS
    ],
    providers: [
        // _provideHistoryFeature(
        //     createNamespacedFeatureKey(
        //         State.Identifiers.PLATFORM_FILES_ACTION_IDENTIFIER,
        //         State.Identifiers.FILE_DATA_STATE_FEATURE_KEY
        //     ),
        //     [
        //         State.FileDataActions.create,
        //         State.FileDataActions.createMany,
        //         State.FileDataActions.remove,
        //         State.FileDataActions.updateParent,
        //         State.FileDataActions.updateParents,
        //     ]
        // ),
    ],
    exports: [
        ...FILES_INTERNAL_COMPONENTS,
        ...FILES_EXPORTABLE_COMPONENTS
    ]
})
export class ZWPFilesModule {
    public static forRoot(config: ZWPFilesModuleRootConfig): ModuleWithProviders<ZWPFilesModule> {
        return {
            ngModule: ZWPFilesModule,
            providers: [
                {
                    provide: ZWP_FILES_MODULE_ROOT_CONFIG,
                    deps: [ZWP_NGRX_MODULE_ROOT_CONFIG],
                    useValue: config
                },
                ...State.createEnvironmentProviders(config),
                ...State.Facades.ALL
            ]
        }
    }
}
