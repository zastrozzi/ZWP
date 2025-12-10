import { stringUnionToArray } from "@zwp/platform.common"
import { beat } from "./beat"
import { bounce } from "./bounce"
import { 
    flipXVisible,
    flipXBigVisible,
    flipYVisible,
    flipYBigVisible,
    flipXFromHidden,
    flipXBigFromHidden,
    flipYFromHidden,
    flipYBigFromHidden,
    flipXToHidden,
    flipXBigToHidden,
    flipYToHidden,
    flipYBigToHidden
} from "./flip"
import { headShake } from "./head-shake"
import { heartBeat } from "./heart-beat"
import { jello } from "./jello"
import { pulse } from "./pulse"
import { rubberBand } from "./rubber-band"
import { shake } from "./shake"
import { swing } from "./swing"
import { tada } from "./tada"
import { wobble } from "./wobble"

export type ZWPActionAnimationType = 
    'beat' | 
    'bounce' | 
    'flipXVisible' |
    'flipXBigVisible' |
    'flipYVisible' |
    'flipYBigVisible' |
    'flipXFromHidden' |
    'flipXBigFromHidden' |
    'flipYFromHidden' |
    'flipYBigFromHidden' |
    'flipXToHidden' |
    'flipXBigToHidden' |
    'flipYToHidden' |
    'flipYBigToHidden' |
    'headShake' | 
    'heartBeat' |
    'jello' | 
    'pulse' | 
    'rubberBand' | 
    'shake' | 
    'swing' | 
    'tada' | 
    'wobble'

export const ZWPActionAnimations = {
    beat,
    bounce,
    flipXVisible,
    flipXBigVisible,
    flipYVisible,
    flipYBigVisible,
    flipXFromHidden,
    flipXBigFromHidden,
    flipYFromHidden,
    flipYBigFromHidden,
    flipXToHidden,
    flipXBigToHidden,
    flipYToHidden,
    flipYBigToHidden,
    headShake,
    heartBeat,
    jello,
    pulse,
    rubberBand,
    shake,
    swing,
    tada,
    wobble
}

export const ZWPActionAnimationTypes = stringUnionToArray<ZWPActionAnimationType>(
    'beat',
    'bounce',
    'flipXVisible',
    'flipXBigVisible',
    'flipYVisible',
    'flipYBigVisible',
    'flipXFromHidden',
    'flipXBigFromHidden',
    'flipYFromHidden',
    'flipYBigFromHidden',
    'flipXToHidden',
    'flipXBigToHidden',
    'flipYToHidden',
    'flipYBigToHidden',
    'headShake',
    'heartBeat',
    'jello',
    'pulse',
    'rubberBand',
    'shake',
    'swing',
    'tada',
    'wobble'
)