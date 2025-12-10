import { makeTransformEnumPipeSignature } from '@zwp/platform.common'

export enum AuthenticationUserType {
    personal = "PERSONAL",
    business = "BUSINESS",
    corporate = "CORPORATE"
}

export enum AuthenticationUserTypeLabel {
    personal = "Personal",
    business = "Business",
    corporate = "Corporate"
}

export const authenticationUserTypeLabelEnumPipe = makeTransformEnumPipeSignature(
    AuthenticationUserType,
    AuthenticationUserTypeLabel
)