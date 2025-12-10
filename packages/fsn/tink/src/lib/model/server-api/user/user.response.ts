import { ClientAPIModel } from '../../client-api'

export interface TinkUserResponse {
    id: string // UUID as string
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date

    tinkId: string
    tinkAppId: string
    created: Date
    flags?: string[]
    nationalId?: string
    profile: ClientAPIModel.General.User.UserProfile
    username?: string

    enduserId: string // UUID as string
}