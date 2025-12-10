import { Injectable } from '@angular/core'
import { Model } from '../../model'
import {
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { LoyaltyAPIService } from '../abstract'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'LoyaltyMockAPIService', options: { skipMethodDebugger: true } })
export class LoyaltyMockAPIService implements LoyaltyAPIService {
    createLoyaltyCardScheme(
        _merchantId: string,
        _request: Model.CreateLoyaltyCardSchemeRequest
    ): Observable<Model.LoyaltyCardSchemeResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    getLoyaltyCardScheme(_loyaltyCardSchemeId: string): Observable<Model.LoyaltyCardSchemeResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listLoyaltyCardSchemes(
        _parent: {
            merchantId: Nullable<string>,
            brandId: Nullable<string>
        },
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.LoyaltyCardSchemeResponse>>>,
        _filters: Nullable<Partial<Model.Filters.LoyaltyCardSchemeFilters>>
    ): Observable<PaginatedResponse<Model.LoyaltyCardSchemeResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    updateLoyaltyCardScheme(
        _loyaltyCardSchemeId: string,
        _request: Model.UpdateLoyaltyCardSchemeRequest
    ): Observable<Model.LoyaltyCardSchemeResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteLoyaltyCardScheme(_loyaltyCardSchemeId: string, _force: boolean): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }

    createLoyaltyCard(
        _enduserId: string,
        _request: Model.CreateLoyaltyCardRequest
    ): Observable<Model.LoyaltyCardResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    getLoyaltyCard(_loyaltyCardId: string): Observable<Model.LoyaltyCardResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listLoyaltyCards(
        _parent: {
            cardSchemeId: Nullable<string>,
            enduserId: Nullable<string>
        },
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.LoyaltyCardResponse>>>
    ): Observable<PaginatedResponse<Model.LoyaltyCardResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    updateLoyaltyCard(
        _loyaltyCardId: string,
        _request: Model.UpdateLoyaltyCardRequest
    ): Observable<Model.LoyaltyCardResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteLoyaltyCard(_loyaltyCardId: string, _force: boolean): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }

    addBrandToLoyaltyCardScheme(
        _loyaltyCardSchemeId: string,
        _brandId: string
    ): Observable<Model.LoyaltyCardSchemeBrandResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    removeBrandFromLoyaltyCardScheme(
        _loyaltyCardSchemeId: string,
        _brandId: string
    ): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }

    listLoyaltyCardSchemeBrands(
        _parent: {
            cardSchemeId: Nullable<string>,
            brandId: Nullable<string>
        },
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.LoyaltyCardSchemeBrandResponse>>>
    ): Observable<PaginatedResponse<Model.LoyaltyCardSchemeBrandResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    getLoyaltyCardSchemeBrand(
        _loyaltyCardSchemeBrandId: string
    ): Observable<Model.LoyaltyCardSchemeBrandResponse> {
        return throwError(() => new Error('Method not implemented'))
    }
}