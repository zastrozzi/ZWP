import { StoreCardStatus } from '../enums/store-card.status';

export interface StoreCardResponse {
    id: string,
    dbCreatedAt: Date,
    dbUpdatedAt: Date,
    dbDeletedAt: Date,
    status: StoreCardStatus,
    brandId: string,
    enduserId: string
}