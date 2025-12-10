import { makeTransformEnumPipeSignature } from '@zwp/platform.common'

export enum AuthenticationFlow {
    embedded = "EMBEDDED",
    redirect = "REDIRECT",
    decoupled = "DECOUPLED"
}

export enum AuthenticationFlowLabel {
    embedded = "Embedded",
    redirect = "Redirect",
    decoupled = "Decoupled"
}

export const authenticationFlowLabelEnumPipe = makeTransformEnumPipeSignature(
    AuthenticationFlow,
    AuthenticationFlowLabel
)