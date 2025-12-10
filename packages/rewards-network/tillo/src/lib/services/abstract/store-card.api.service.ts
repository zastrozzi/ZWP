import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class TilloStoreCardAPIService {
    abstract listStoreCards(
        parent: {
            brandId: Nullable<string>
            enduserId: Nullable<string>
        },
        pagination: Nullable<Partial<PaginatedQueryParams<Model.StoreCardResponse>>>,
        filters: Nullable<Partial<Model.Filters.StoreCardFilters>>
    ): Observable<PaginatedResponse<Model.StoreCardResponse>>
    abstract getStoreCard(storeCardId: string): Observable<Model.StoreCardResponse>
    abstract updateStoreCard(
        storeCardId: string,
        request: Model.UpdateStoreCardRequest
    ): Observable<Model.StoreCardResponse>
    abstract deleteStoreCard(storeCardId: string): Observable<Model.StoreCardResponse>
    abstract createStoreCardForEnduser(
        enduserId: string,
        request: Model.CreateStoreCardRequest
    ): Observable<Model.StoreCardResponse>
}

export const STORE_CARD_API_SERVICE = new InjectionToken<TilloStoreCardAPIService>(
    'rewards-network.tillo.store-card.api.service'
)
