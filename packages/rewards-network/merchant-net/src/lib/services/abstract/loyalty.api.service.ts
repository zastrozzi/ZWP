import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class LoyaltyAPIService {
    abstract createLoyaltyCardScheme(
        merchantId: string,
        request: Model.CreateLoyaltyCardSchemeRequest
    ): Observable<Model.LoyaltyCardSchemeResponse>

    abstract getLoyaltyCardScheme(
        loyaltyCardSchemeId: string
    ): Observable<Model.LoyaltyCardSchemeResponse>

    abstract listLoyaltyCardSchemes(
        parent: {
            merchantId: Nullable<string>,
            brandId: Nullable<string>
        },
        pagination: Nullable<Partial<PaginatedQueryParams<Model.LoyaltyCardSchemeResponse>>>,
        filters: Nullable<Partial<Model.Filters.LoyaltyCardSchemeFilters>>
    ): Observable<PaginatedResponse<Model.LoyaltyCardSchemeResponse>>

    abstract updateLoyaltyCardScheme(
        loyaltyCardSchemeId: string,
        request: Model.UpdateLoyaltyCardSchemeRequest
    ): Observable<Model.LoyaltyCardSchemeResponse>

    abstract deleteLoyaltyCardScheme(loyaltyCardSchemeId: string, force: boolean): Observable<void>

    abstract createLoyaltyCard(
        enduserId: string,
        request: Model.CreateLoyaltyCardRequest
    ): Observable<Model.LoyaltyCardResponse>

    abstract getLoyaltyCard(loyaltyCardId: string): Observable<Model.LoyaltyCardResponse>

    abstract listLoyaltyCards(
        parent: {
            cardSchemeId: Nullable<string>,
            brandId: Nullable<string>,
            enduserId: Nullable<string>,
            merchantId: Nullable<string>
        },
        pagination: Nullable<Partial<PaginatedQueryParams<Model.LoyaltyCardResponse>>>
    ): Observable<PaginatedResponse<Model.LoyaltyCardResponse>>

    abstract updateLoyaltyCard(
        loyaltyCardId: string,
        request: Model.UpdateLoyaltyCardRequest
    ): Observable<Model.LoyaltyCardResponse>

    abstract deleteLoyaltyCard(loyaltyCardId: string, force: boolean): Observable<void>

    abstract addBrandToLoyaltyCardScheme(
        loyaltyCardSchemeId: string,
        brandId: string
    ): Observable<Model.LoyaltyCardSchemeBrandResponse>

    abstract removeBrandFromLoyaltyCardScheme(
        loyaltyCardSchemeId: string,
        brandId: string,
        force: boolean
    ): Observable<void>

    abstract listLoyaltyCardSchemeBrands(
        parent: {
            cardSchemeId: Nullable<string>,
            brandId: Nullable<string>
        },
        pagination: Nullable<Partial<PaginatedQueryParams<Model.LoyaltyCardSchemeBrandResponse>>>,
        filters: Nullable<Partial<Model.Filters.LoyaltyCardSchemeBrandFilters>>
    ): Observable<PaginatedResponse<Model.LoyaltyCardSchemeBrandResponse>>

    abstract getLoyaltyCardSchemeBrand(
        loyaltyCardSchemeBrandId: string
    ): Observable<Model.LoyaltyCardSchemeBrandResponse>
}

export const LOYALTY_API_SERVICE = new InjectionToken<LoyaltyAPIService>(
    'rewards-network.merchant-net.loyalty.api.service'
)
