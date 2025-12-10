import { makeTransformEnumPipeSignature } from '@zwp/platform.common'

export enum CustomerSegment {
    undefinedCustomerSegment = "UNDEFINED_CUSTOMER_SEGMENT",
    personal = "PERSONAL",
    business = "BUSINESS"
}

export enum CustomerSegmentLabel {
    undefinedCustomerSegment = "Undefined",
    personal = "Personal",
    business = "Business"
}

export const customerSegmentLabelEnumPipe = makeTransformEnumPipeSignature(
    CustomerSegment,
    CustomerSegmentLabel
)