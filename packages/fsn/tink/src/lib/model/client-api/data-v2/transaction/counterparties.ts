import { CounterpartyInformation } from './counterparty.information'

export interface Counterparties {
    payee?: CounterpartyInformation
    payer?: CounterpartyInformation
}