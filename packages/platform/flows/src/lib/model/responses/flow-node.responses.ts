import { FlowContinuationResponse } from "./flow-continuation.responses"

export interface FlowNodeResponse {
    id: string
    dbCreatedAt?: Date
    dbUpdatedAt?: Date
    dbDeletedAt?: Date

    header: string
    headline: string
    subheadline: string
    body: string
    containerId: string
    continuations: FlowContinuationResponse[]
}