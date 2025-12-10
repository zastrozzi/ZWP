import { StorageObjectPreconditions } from './storage.object-preconditions'

export interface StorageSourceObject {
    name?: string
    generation?: string
    objectPreconditions?: StorageObjectPreconditions
}