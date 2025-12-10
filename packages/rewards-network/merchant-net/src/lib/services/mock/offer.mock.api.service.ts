import { Injectable } from '@angular/core'
import { Model } from '../../model'
import {
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { OfferAPIService } from '../abstract'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'OfferMockAPIService', options: { skipMethodDebugger: true } })
export class OfferMockAPIService implements OfferAPIService {
    createOffer(_parent: { merchantId: Nullable<string>, brandId: Nullable<string> }, _request: Model.CreateOfferRequest): Observable<Model.OfferResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    getOffer(_offerId: string): Observable<Model.OfferResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listOffers(_parent: { merchantId: Nullable<string>, brandId: Nullable<string> }, _pagination: Nullable<Partial<PaginatedQueryParams<Model.OfferResponse>>>): Observable<PaginatedResponse<Model.OfferResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    updateOffer(_offerId: string, _request: Model.UpdateOfferRequest): Observable<Model.OfferResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteOffer(_offerId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }

    createOfferLayout(_offerId: string, _request: Model.CreateOfferLayoutRequest): Observable<Model.OfferLayoutResponse> {
        return throwError(() => new Error('Method not implemented'))    
    }

    getOfferLayout(_offerLayoutId: string): Observable<Model.OfferLayoutResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listOfferLayouts(_offerId: Nullable<string>, _pagination: Nullable<Partial<PaginatedQueryParams<Model.OfferLayoutResponse>>>): Observable<PaginatedResponse<Model.OfferLayoutResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    updateOfferLayout(_offerLayoutId: string, _request: Model.UpdateOfferLayoutRequest): Observable<Model.OfferLayoutResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteOfferLayout(_offerLayoutId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }

    createOfferLayoutElement(_offerLayoutId: string, _request: Model.CreateOfferLayoutElementRequest): Observable<Model.OfferLayoutElementResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    getOfferLayoutElement(_offerLayoutElementId: string): Observable<Model.OfferLayoutElementResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listOfferLayoutElements(_offerLayoutId: Nullable<string>, _pagination: Nullable<Partial<PaginatedQueryParams<Model.OfferLayoutElementResponse>>>): Observable<PaginatedResponse<Model.OfferLayoutElementResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    updateOfferLayoutElement(_offerLayoutElementId: string, _request: Model.UpdateOfferLayoutElementRequest): Observable<Model.OfferLayoutElementResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteOfferLayoutElement(_offerLayoutElementId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }
}