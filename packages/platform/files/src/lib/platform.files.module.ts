import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ZWPLayoutModule } from '@zwp/platform.layout'
import { ZWPCommonModule, _provideHistoryFeature, createNamespacedFeatureKey } from '@zwp/platform.common'
import { State } from './+state'
import { ZWPDummyDataModule } from '@zwp/platform.dummy-data'
import { FILES_EXPORTABLE_COMPONENTS, FILES_INTERNAL_COMPONENTS } from './components'

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
        ...State.Facades.ALL,

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
        // ...FILES_EXPORTABLE_COMPONENTS
    ]
})
export class ZWPFilesModule {}
