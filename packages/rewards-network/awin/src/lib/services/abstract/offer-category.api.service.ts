import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class offerCategoryAPIService {
    abstract updateOfferCategories(offerCategoryID:string):Observable<Model.OfferCategoryResponse>
    abstract getOfferCategory(offerCategoryID:string): Observable<Model.OfferCategoryResponse>
    abstract listOfferCategories(
        parentID:Nullable<string>,
        parentType: Nullable<string>
    ): Observable<PaginatedResponse<Model.OfferCategoryResponse>>
    abstract createOfferCategory(parentID:Nullable<string>,parentType:Nullable<string>): Observable<Model.OfferCategoryResponse>
    abstract deleteOfferCategory(
        offerCategoryID:Nullable<string>, 
        parentID: Nullable<string>, 
        parentTyp: Nullable<string>
    ): Observable<void>

    //Subcategories need to go here?
}

export const MEMBERSHIP_API_SERVICE = new InjectionToken<offerCategoryAPIService>(
    'rewards-network.affiliate-window.offer-category.api.service'
)

