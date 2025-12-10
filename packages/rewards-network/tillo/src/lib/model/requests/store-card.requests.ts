import { StoreCardStatus } from '../enums/store-card.status'

export interface CreateStoreCardRequest {
    status: StoreCardStatus
    brandId: string
}

export interface UpdateStoreCardRequest {
    status: StoreCardStatus
}
