import { makeTransformEnumPipeSignature } from '@zwp/platform.common'

export enum AccessType {
    openBanking = "OPEN_BANKING",
    other = "OTHER"
}

export enum AccessTypeLabel {
    openBanking = "Open Banking",
    other = "Other"
}

export const accessTypeLabelEnumPipe = makeTransformEnumPipeSignature(
    AccessType,
    AccessTypeLabel
)