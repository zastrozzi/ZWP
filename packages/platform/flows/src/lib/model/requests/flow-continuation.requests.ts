export interface CreateFlowContinuationRequest {
    condition: string
    childNodeId: string
}

export interface UpdateFlowContinuationRequest {
    condition?: string
    childNodeId: string
}

export interface RemoveFlowContinuationRequest {
    childNodeId: string
}