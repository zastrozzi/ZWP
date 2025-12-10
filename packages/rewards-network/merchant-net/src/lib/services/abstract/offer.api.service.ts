import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class OfferAPIService {
    abstract createOffer(
        parent: {
            merchantId: Nullable<string>,
            brandId: Nullable<string>
        },
        request: Model.CreateOfferRequest
    ): Observable<Model.OfferResponse>

    abstract getOffer(offerId: string): Observable<Model.OfferResponse>

    abstract listOffers(
        parent: {
            merchantId: Nullable<string>,
            brandId: Nullable<string>
        },
        pagination: Nullable<Partial<PaginatedQueryParams<Model.OfferResponse>>>
    ): Observable<PaginatedResponse<Model.OfferResponse>>

    abstract updateOffer(
        offerId: string,
        request: Model.UpdateOfferRequest
    ): Observable<Model.OfferResponse>

    abstract deleteOffer(offerId: string): Observable<void>

    abstract createOfferLayout(
        offerId: string,
        request: Model.CreateOfferLayoutRequest
    ): Observable<Model.OfferLayoutResponse>

    abstract getOfferLayout(offerLayoutId: string): Observable<Model.OfferLayoutResponse>

    abstract listOfferLayouts(
        offerId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.OfferLayoutResponse>>>
    ): Observable<PaginatedResponse<Model.OfferLayoutResponse>>

    abstract updateOfferLayout(
        offerLayoutId: string,
        request: Model.UpdateOfferLayoutRequest
    ): Observable<Model.OfferLayoutResponse>

    abstract deleteOfferLayout(offerLayoutId: string): Observable<void>

    abstract createOfferLayoutElement(
        offerLayoutId: string,
        request: Model.CreateOfferLayoutElementRequest
    ): Observable<Model.OfferLayoutElementResponse>
    
    abstract getOfferLayoutElement(offerLayoutElementId: string): Observable<Model.OfferLayoutElementResponse>

    abstract listOfferLayoutElements(
        offerLayoutId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.OfferLayoutElementResponse>>>
    ): Observable<PaginatedResponse<Model.OfferLayoutElementResponse>>

    abstract updateOfferLayoutElement(
        offerLayoutElementId: string,
        request: Model.UpdateOfferLayoutElementRequest
    ): Observable<Model.OfferLayoutElementResponse>

    abstract deleteOfferLayoutElement(offerLayoutElementId: string): Observable<void>
}

export const OFFER_API_SERVICE = new InjectionToken<OfferAPIService>(
    'rewards-network.merchant-net.offer.api.service'
)
