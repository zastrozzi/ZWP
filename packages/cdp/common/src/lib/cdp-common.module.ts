import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ZWPCommonModule } from '@zwp/platform.common'
import { ZWPLayoutModule } from '@zwp/platform.layout'
// import { EXPORTABLE_COMPONENTS } from './components'
import { State } from './+state'
// import { FACADES } from './+state/facades'
// import { provideState } from '@ngrx/store'
// import { BRANDING_STATE_FEATURE_KEY } from './+state/identifiers'
// import { brandingReducer } from './+state/reducers'

@NgModule({
    imports: [
        CommonModule,
        ZWPCommonModule,
        ZWPLayoutModule
    ],
    declarations: [],
    providers: [
        ...State.Facades.ALL
    ],
    exports: [
        
    ]
})
export class CDPCommonModule {
    public static forRoot(): ModuleWithProviders<CDPCommonModule> {
        return {
            ngModule: CDPCommonModule,
            providers: [
                ...State.environmentProviders
            ]
        }
    }
}