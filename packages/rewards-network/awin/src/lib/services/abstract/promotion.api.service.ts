import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class PromotionAPIService {
    abstract refreshPromotions():Observable<void>
    abstract getPromotion(promotionID:string): Observable<Model.PromotionResponse>
    abstract listPromotions(
        promotionID:Nullable<string>,
        parentID: Nullable<string>,
        parentType: Nullable<string>
    ): Observable<PaginatedResponse<Model.PromotionResponse>>
    abstract deletePromotion(promotionID:Nullable<string>, parentID: Nullable<string>, parentType:Nullable<string>): Observable<void>
}

export const ACCOUNT_API_SERVICE = new InjectionToken<PromotionAPIService>(
    'rewards-network.affiliate-window.promotion.api.service'
)