import { makeTransformEnumPipeSignature } from '@zwp/platform.common'

export enum DeliveryMethod {
    code = "code",
    url = "url",
    wrapped = "wrapped",
    email = "email"
}

export enum DeliveryMethodLabel {
    code = "Code",
    url = "URL",
    wrapped = "Wrapped",
    email = "Email"
}

export const deliveryMethodLabelPipeSignature = makeTransformEnumPipeSignature(
    DeliveryMethod,
    DeliveryMethodLabel
)