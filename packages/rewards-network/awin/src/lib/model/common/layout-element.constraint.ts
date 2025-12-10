import { LayoutElementConstraintType, LayoutElementConstraintUnit } from '../enums'

export interface LayoutElementConstraint {
    constraintType: LayoutElementConstraintType
    constraintUnit: LayoutElementConstraintUnit
    constraintValue: number
}