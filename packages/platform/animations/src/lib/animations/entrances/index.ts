import { stringUnionToArray } from "@zwp/platform.common"
import { bounceIn, bounceInBottom, bounceInLeft, bounceInRight, bounceInTop } from "./bounce-in"
import { bumpIn } from "./bump-in"
import { fadeIn, fadeInBottom, fadeInLeft, fadeInRight, fadeInTop } from "./fade-in"
import { flipInX, flipInY } from "./flip-in"
import { jackInTheBox } from "./jack-in-the-box"
import { landing } from "./landing"
import { rollInLeft, rollInRight } from "./roll-in"
import { zoomIn, zoomInBottom, zoomInLeft, zoomInRight, zoomInTop } from "./zoom-in"

export type ZWPEntranceAnimationType = 
    'bounceIn' |
    'bounceInTop' |
    'bounceInRight' |
    'bounceInBottom' |
    'bounceInLeft' |
    'bumpIn' |
    'fadeIn' |
    'fadeInTop' |
    'fadeInRight' |
    'fadeInBottom' |
    'fadeInLeft' |
    'flipInX' |
    'flipInY' |
    'jackInTheBox' |
    'landing' |
    'rollInLeft' |
    'rollInRight' |
    'zoomIn' |
    'zoomInTop' |
    'zoomInRight' |
    'zoomInBottom' |
    'zoomInLeft'

export const ZWPEntranceAnimations = {
    bounceIn,
    bounceInTop,
    bounceInRight,
    bounceInBottom,
    bounceInLeft,
    bumpIn,
    fadeIn,
    fadeInTop,
    fadeInRight,
    fadeInBottom,
    fadeInLeft,
    flipInX,
    flipInY,
    jackInTheBox,
    landing,
    rollInLeft,
    rollInRight,
    zoomIn,
    zoomInTop,
    zoomInRight,
    zoomInBottom,
    zoomInLeft
}

export const ZWPEntranceAnimationTypes = stringUnionToArray<ZWPEntranceAnimationType>(
    'bounceIn',
    'bounceInTop',
    'bounceInRight',
    'bounceInBottom',
    'bounceInLeft',
    'bumpIn',
    'fadeIn',
    'fadeInTop',
    'fadeInRight',
    'fadeInBottom',
    'fadeInLeft',
    'flipInX',
    'flipInY',
    'jackInTheBox',
    'landing',
    'rollInLeft',
    'rollInRight',
    'zoomIn',
    'zoomInTop',
    'zoomInRight',
    'zoomInBottom',
    'zoomInLeft'
)