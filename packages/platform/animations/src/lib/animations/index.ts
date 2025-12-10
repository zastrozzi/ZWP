import { AnimationMetadata, state, style } from "@angular/animations"
import { ZWPActionAnimations, ZWPActionAnimationType } from "./actions"
import { ZWPEntranceAnimations, ZWPEntranceAnimationType } from "./entrances"
import { ZWPExitAnimations, ZWPExitAnimationType } from "./exits"

export * from './actions'
export * from './entrances'
export * from './exits'

export type ZWPNoAnimationType = 'none'
export type ZWPAnimationType = ZWPActionAnimationType | ZWPEntranceAnimationType | ZWPExitAnimationType | ZWPNoAnimationType

export const zwpNoAnimation: AnimationMetadata[] = [
    state('none', style('*')), 
    state('idle-none', style('*'))
]

export const ZWPAnimations = {
    ...ZWPActionAnimations,
    ...ZWPEntranceAnimations,
    ...ZWPExitAnimations,
    zwpNoAnimation
}