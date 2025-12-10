import { Common } from '../common'

export interface StorageObjectResponse {
    id: string
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date
    kind?: string
    googleId?: string
    selfLink?: string
    name?: string
    bucket?: string
    generation?: string
    metageneration?: string
    contentType?: string
    timeCreated?: Date
    updated?: Date
    timeDeleted?: Date
    storageClass?: string
    timeStorageClassUpdated?: Date
    size?: string
    md5Hash?: string
    mediaLink?: string
    contentEncoding?: string
    contentDisposition?: string
    contentLanguage?: string
    cacheControl?: string
    metadata?: { [key: string]: string }
    acl?: Common.ObjectAccessControls[]
    owner?: Common.Owner
    crc32c?: string
    componentCount?: number
    etag?: string
    customerEncryption?: Common.CustomerEncryption
    kmsKeyName?: string
    storageBucketId: string
}