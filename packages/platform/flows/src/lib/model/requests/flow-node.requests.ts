export interface CreateFlowNodeRequest {
    header: string
    headline: string
    subheadline: string
    body: string
}

export interface UpdateFlowNodeRequest {
    header?: string
    headline?: string
    subheadline?: string
    body?: string
}