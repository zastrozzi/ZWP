import { makeTransformEnumPipeSignature } from '@zwp/platform.common'

export enum MerchantStatus {
    pending = "PENDING",
    verified = "VERIFIED",
    declined = "DECLINED",
}

export enum MerchantStatusLabel {
    pending = "Pending",
    verified = "Verified",
    declined = "Declined"
}

export const merchantStatusLabelEnumPipe = makeTransformEnumPipeSignature(
    MerchantStatus,
    MerchantStatusLabel
)