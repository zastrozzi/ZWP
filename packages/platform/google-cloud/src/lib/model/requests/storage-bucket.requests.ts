export interface CreateStorageBucketRequest {
    name: string
    location?: string
}

export interface UpdateStorageBucketRequest {
    defaultEventBasedHold?: boolean
}