import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ZWPCommonModule } from '@zwp/platform.common'
import { State } from './+state'
import { TEMPLATE_API_CONFIG, TemplateAPIConfig } from './config'
import { Services } from './services'
import { ZWPLayoutModule } from '@zwp/platform.layout'
import { ZWPAuthModule } from '@zwp/platform.auth'
// import { INTERNAL_COMPONENTS } from './components'

@NgModule({
    imports: [
        CommonModule,
        ZWPCommonModule,
        ZWPLayoutModule,
        ZWPAuthModule
    ],
    declarations: [
        // ...INTERNAL_COMPONENTS.ALL
    ],
    providers: [
        ...State.Facades.ALL
    ],
    exports: [
        
    ]
})
export class TemplateModule {
    public static forRoot(
        apiConfig: TemplateAPIConfig
    ): ModuleWithProviders<TemplateModule> {
        return {
            ngModule: TemplateModule,
            providers: [
                { provide: TEMPLATE_API_CONFIG, useValue: apiConfig },
                ...State.environmentProviders,
                ...Services.environmentProviders(apiConfig)
            ]
        }
    }
}
