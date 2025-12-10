import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ZWPCommonModule } from '@zwp/platform.common'
import { ZWP_GOOGLE_ANALYTICS_SETTINGS, ZWPGoogleAnalyticsSettings } from '../model'
import { ZWP_GOOGLE_ANALYTICS_INITIALISER } from '../initialisers'
import { GOOGLE_ANALYTICS_EXPORTABLE_DIRECTIVES } from '../directives'

@NgModule({
    imports: [
        CommonModule,
        ZWPCommonModule
    ],
    declarations: [
        GOOGLE_ANALYTICS_EXPORTABLE_DIRECTIVES
    ],
    exports: [
        GOOGLE_ANALYTICS_EXPORTABLE_DIRECTIVES
    ]
})
export class ZWPGoogleAnalyticsModule {
    static forRoot(settings?: ZWPGoogleAnalyticsSettings): ModuleWithProviders<ZWPGoogleAnalyticsModule> {
        return {
            ngModule: ZWPGoogleAnalyticsModule,
            providers: [
                { provide: ZWP_GOOGLE_ANALYTICS_SETTINGS, useValue: settings ?? {} },
                ZWP_GOOGLE_ANALYTICS_INITIALISER
            ]
        }
    }
}
