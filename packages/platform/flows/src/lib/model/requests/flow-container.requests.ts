export interface CreateFlowContainerRequest {
    name: string
}

export interface UpdateFlowContainerRequest {
    name?: string
    entryNodeId?: string
}