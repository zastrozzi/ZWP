import { Action } from './action'
import { Condition } from './condition'

export interface Rule {
    action?: Action
    condition?: Condition
}