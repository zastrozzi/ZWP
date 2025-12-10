export interface StorageNotification {
    kind?: string
    id?: string
    selfLink?: string
    topic?: string
    eventTypes?: string[]
    customAttributes?: { [key: string]: string }
    payloadFormat?: string
    objectNamePrefix?: string
    etag?: string
}