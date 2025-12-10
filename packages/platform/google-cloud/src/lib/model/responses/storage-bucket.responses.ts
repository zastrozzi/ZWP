import { Common } from '../common'

export interface StorageBucketResponse {
    id: string
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date
    acl?: Common.BucketAccessControls[]
    billing?: Common.Billing
    cors?: Common.CORS[]
    defaultEventBasedHold?: boolean
    defaultObjectAcl?: Common.ObjectAccessControls[]
    encryption?: Common.Encryption
    etag?: string
    googleId?: string
    kind?: string
    labels?: { [key: string]: string }
    lifecycle?: Common.Lifecycle
    location?: string
    logging?: Common.Logging
    metageneration?: string
    name?: string
    owner?: Common.Owner
    projectNumber?: string
    selfLink?: string
    retentionPolicy?: Common.RetentionPolicy
    storageClass?: string
    timeCreated?: Date
    updated?: Date
    versioning?: Common.Versioning
    website?: Common.Website
}