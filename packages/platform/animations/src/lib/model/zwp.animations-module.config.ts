import { InjectionToken } from "@angular/core";
import { ZWPAnimationTriggerMode } from "./zwp.animation.trigger-mode";

export interface ZWPAnimationsModuleConfig {
    triggerMode: ZWPAnimationTriggerMode
    offsetTop?: number
    offsetRight?: number
    offsetBottom?: number
    offsetLeft?: number
}

export const ZWP_ANIMATIONS_MODULE_CONFIG = new InjectionToken<ZWPAnimationsModuleConfig>('zwp.animations.ZWPAnimationsModuleConfig');
export const ZWP_ANIMATIONS_TRIGGER_MODE = new InjectionToken<ZWPAnimationTriggerMode>('zwp.animations.ZWPAnimationTriggerMode');