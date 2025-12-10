export interface UploadStorageObjectRequest {
    name: string
    predefinedAcl?: string
    file: File
}

export interface UpdateStorageObjectRequest {
    name?: string
    predefinedAcl?: string
}

export interface DeleteManyStorageObjectsRequest {
    objectIds: string[]
}