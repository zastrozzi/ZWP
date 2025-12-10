import { makeTransformEnumPipeSignature } from '@zwp/platform.common'

export enum CredentialsType {
    password = "PASSWORD",
    mobileBankId = "MOBILE_BANKID",
    keyFob = "KEYFOB",
    thirdPartyApp = "THIRD_PARTY_APP"
}

export enum CredentialsTypeLabel {
    password = "Password",
    mobileBankId = "Mobile BankID",
    keyFob = "Key Fob",
    thirdPartyApp = "Third Party App"
}

export const credentialsTypeLabelEnumPipe = makeTransformEnumPipeSignature(
    CredentialsType,
    CredentialsTypeLabel
)