import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ZWPCommonModule } from '@zwp/platform.common'
import { ZWP_ANIMATIONS_TRIGGER_MODE } from './model/zwp.animations-module.config';
import { ANIMATION_EXPORTABLE_COMPONENTS } from './components';
import { ANIMATION_EXPORTABLE_DIRECTIVES } from './directives';
import { ZWPAnimationTriggerMode } from './model/zwp.animation.trigger-mode';

@NgModule({
    imports: [
        CommonModule,
        ZWPCommonModule
    ],
    declarations: [
        ...ANIMATION_EXPORTABLE_COMPONENTS,
        ...ANIMATION_EXPORTABLE_DIRECTIVES
    ],
    exports: [
        ...ANIMATION_EXPORTABLE_COMPONENTS,
        ...ANIMATION_EXPORTABLE_DIRECTIVES
    ]
})
export class ZWPAnimationsModule {
    static init(triggerMode: ZWPAnimationTriggerMode = 'intersectionObserver'): ModuleWithProviders<ZWPAnimationsModule> {

        return {
            ngModule: ZWPAnimationsModule,
            providers: [
                // { provide: ZWP_ANIMATIONS_MODULE_CONFIG, useValue: config }
                { provide: ZWP_ANIMATIONS_TRIGGER_MODE, useValue: triggerMode }
            ]
        }
    }
}
