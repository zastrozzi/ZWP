import { CommissionType } from "../enums/comission.comission-type"

export interface CommissionGroupRange {
    min: number
    max: number
    type: CommissionType
}