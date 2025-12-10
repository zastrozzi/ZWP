import { AmountAndCurrency } from '@zwp/platform.common'
import { DeliveryMethod, Personlisation, FulfilmentParameters } from '../common'

export interface IssueCodeRequest {
    faceValue: AmountAndCurrency
    deliveryMethod: DeliveryMethod
}

export interface IssueCodeTilloFulfilmentRequest {
    faceValue: AmountAndCurrency
    deliveryMethod: DeliveryMethod
    personlisation: Personlisation
    fulfilment: FulfilmentParameters
}

export interface IssueCodeWithPersonalisationRequest {
    faceValue: AmountAndCurrency,
    deliveryMethod: DeliveryMethod,
    personalisation: Personlisation
}

export interface OrderCodeRequest {
    faceValue: AmountAndCurrency,
    deliveryMethod: DeliveryMethod
}