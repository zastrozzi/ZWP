// import { isUndefined } from "@zwp/platform.common";
import { ZWPAnimationTriggerMode } from "../model/zwp.animation.trigger-mode";
// import { ZWPAnimationsModuleConfig } from "../model/zwp.animations-module.config";

export const zwpAnimationTriggerModeFactory = (triggerMode: ZWPAnimationTriggerMode): ZWPAnimationTriggerMode => {
    // let triggerMode = isUndefined(value) ? 'auto' : value.triggerMode
    if (triggerMode === 'scrolling') { return triggerMode }
    const intersectionObserverSupported = 'IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype
    triggerMode = intersectionObserverSupported ? 'intersectionObserver' : 'scrolling'
    return triggerMode
}