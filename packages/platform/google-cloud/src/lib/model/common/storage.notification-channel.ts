export interface StorageNotificationChannel {
    kind?: string
    id?: string
    resourceId?: string
    resourceUri?: string
    token?: string
    expiration?: string
    type?: string
    address?: string
    params?: { [key: string]: string }
    payload?: boolean
}