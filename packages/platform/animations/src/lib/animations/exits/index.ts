import { stringUnionToArray } from "@zwp/platform.common"
import { bounceOut, bounceOutBottom, bounceOutLeft, bounceOutRight, bounceOutTop } from "./bounce-out"
import { fadeOut, fadeOutBottom, fadeOutLeft, fadeOutRight, fadeOutTop } from "./fade-out"
import { hingeOutLeft, hingeOutRight } from "./hinge"
import { rollOutLeft, rollOutRight } from "./roll-out"
import { zoomOut, zoomOutBottom, zoomOutLeft, zoomOutRight, zoomOutTop } from "./zoom-out"

export type ZWPExitAnimationType =
    'bounceOut' | 
    'bounceOutTop' |
    'bounceOutRight' |
    'bounceOutBottom' |
    'bounceOutLeft' |
    'fadeOut' |
    'fadeOutTop' |
    'fadeOutRight' |
    'fadeOutBottom' |
    'fadeOutLeft' |
    'hingeOutLeft' |
    'hingeOutRight' |
    'rollOutLeft' |
    'rollOutRight' |
    'zoomOut' |
    'zoomOutTop' |
    'zoomOutRight' |
    'zoomOutBottom' |
    'zoomOutLeft'

export const ZWPExitAnimations = {
    bounceOut,
    bounceOutTop,
    bounceOutRight,
    bounceOutBottom,
    bounceOutLeft,
    fadeOut,
    fadeOutTop,
    fadeOutRight,
    fadeOutBottom,
    fadeOutLeft,
    hingeOutLeft,
    hingeOutRight,
    rollOutLeft,
    rollOutRight,
    zoomOut,
    zoomOutTop,
    zoomOutRight,
    zoomOutBottom,
    zoomOutLeft

}

export const ZWPExitAnimationTypes = stringUnionToArray<ZWPExitAnimationType>(
    'bounceOut',
    'bounceOutTop',
    'bounceOutRight',
    'bounceOutBottom',
    'bounceOutLeft',
    'fadeOut',
    'fadeOutTop',
    'fadeOutRight',
    'fadeOutBottom',
    'fadeOutLeft',
    'hingeOutLeft',
    'hingeOutRight',
    'rollOutLeft',
    'rollOutRight',
    'zoomOut',
    'zoomOutTop',
    'zoomOutRight',
    'zoomOutBottom',
    'zoomOutLeft'
)