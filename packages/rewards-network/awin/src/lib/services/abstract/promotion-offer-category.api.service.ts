import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class PromotionOfferCategoryAPIService {
    abstract getPromotionOfferCategory(promotionOfferCategoryID:string): Observable<Model.PromotionOfferCategoryResponse>
    abstract listPromotionOfferCategories(
        parentID:Nullable<string>,
        parentType:Nullable<string>
    ): Observable<PaginatedResponse<Model.PromotionOfferCategoryResponse>>
    abstract deletePromotionOfferCategory(promotionOfferCategoryID:string, parentID: Nullable<string>, parentType: Nullable<string>): Observable<void>
}

export const ACCOUNT_API_SERVICE = new InjectionToken<PromotionOfferCategoryAPIService>(
    'rewards-network.affiliate-window.promotion-offer-category.api.service'
)