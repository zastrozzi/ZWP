export interface FlowContinuationResponse {
    dbCreatedAt?: Date
    dbUpdatedAt?: Date
    dbDeletedAt?: Date

    condition: string
    childNodeId: string
}