import { Injectable, inject } from '@angular/core'
import { Model } from '../../model'
import {
    HTTPMethod,
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    createHTTPParams,
    isNull,
    serialiseDateQueryFilter,
    serialiseEnumQueryFilter,
    serialiseNumberQueryFilter,
    serialisePaginatedQueryParams,
    serialiseStringQueryFilter,
    upsertHTTPParam,
    upsertHTTPParamToExisting,
    upsertHTTPParams,
} from '@zwp/platform.common'
import { Observable, map, of, take, throwError } from 'rxjs'
import { LoyaltyAPIService } from '../abstract'
import { APIRoutes } from '../../api-routes'
import { MERCHANT_NET_API_BASE_URL, MERCHANT_NET_API_CONFIG } from '../../config'
import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'LoyaltyLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class LoyaltyLiveAPIService extends PlatformAuth.AuthedAPIService implements LoyaltyAPIService {
    private config = inject(MERCHANT_NET_API_CONFIG)
    private baseUrl = inject(MERCHANT_NET_API_BASE_URL)
    private loyaltyCardFacade = inject(Facades.LoyaltyCardFacade)
    private loyaltyCardSchemeFacade = inject(Facades.LoyaltyCardSchemeFacade)

    createLoyaltyCardScheme(
        merchantId: string,
        request: Model.CreateLoyaltyCardSchemeRequest
    ): Observable<Model.LoyaltyCardSchemeResponse> {
        const path = APIRoutes.merchantRoutes(this.baseUrl)
        .loyaltyCardSchemeRoutesForMerchant(merchantId)
        .createLoyaltyCardScheme()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.POST,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    getLoyaltyCardScheme(loyaltyCardSchemeId: string): Observable<Model.LoyaltyCardSchemeResponse> {
        const path = APIRoutes.loyaltyRoutes(this.baseUrl)
            .loyaltyCardSchemeRoutes()
            .getLoyaltyCardScheme(loyaltyCardSchemeId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    listLoyaltyCardSchemes(
        parent: {
            merchantId: Nullable<string>
            brandId: Nullable<string>
        },
        pagination: Nullable<Partial<PaginatedQueryParams<Model.LoyaltyCardSchemeResponse>>>,
        filters: Nullable<Partial<Model.Filters.LoyaltyCardSchemeFilters>>
    ): Observable<PaginatedResponse<Model.LoyaltyCardSchemeResponse>> {
        let path: string
        if (!isNull(parent.merchantId)) {
            path = APIRoutes.merchantRoutes(this.baseUrl)
                .loyaltyCardSchemeRoutesForMerchant(parent.merchantId)
                .listLoyaltyCardSchemes()
        } else if (!isNull(parent.brandId)) {
            path = APIRoutes.brandRoutes(this.baseUrl)
                .loyaltyCardSchemeRoutesForBrand(parent.brandId)
                .listLoyaltyCardSchemes()
        } else {
            path = APIRoutes.loyaltyRoutes(this.baseUrl).loyaltyCardSchemeRoutes().listLoyaltyCardSchemes()
        }
        let params = serialisePaginatedQueryParams(pagination, this.loyaltyCardSchemeFacade.loyaltyCardSchemeRemotePagination$)
        if (filters) {
            if (filters.dbCreatedAt) {
                params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt))
            }
            if (filters.dbUpdatedAt) {
                params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt))
            }
            if (filters.dbDeletedAt) {
                params = upsertHTTPParams(params, serialiseDateQueryFilter('db_deleted_at', filters.dbDeletedAt))
            }
            if (filters.status) {
                params = upsertHTTPParams(params, serialiseEnumQueryFilter('status', filters.status))
            }
            if (filters.displayName) {
                params = upsertHTTPParams(params, serialiseStringQueryFilter('display_name', filters.displayName))
            }
            if (filters.barcodeType) {
                params = upsertHTTPParams(params, serialiseEnumQueryFilter('barcode_type', filters.barcodeType))
            }
        }

        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
            params: params,
        })
    }

    updateLoyaltyCardScheme(
        loyaltyCardSchemeId: string,
        request: Model.UpdateLoyaltyCardSchemeRequest
    ): Observable<Model.LoyaltyCardSchemeResponse> {
        const path = APIRoutes.loyaltyRoutes(this.baseUrl)
            .loyaltyCardSchemeRoutes()
            .updateLoyaltyCardScheme(loyaltyCardSchemeId)
        
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PUT,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    deleteLoyaltyCardScheme(loyaltyCardSchemeId: string, force: boolean): Observable<void> {
        const path = APIRoutes.loyaltyRoutes(this.baseUrl)
            .loyaltyCardSchemeRoutes()
            .deleteLoyaltyCardScheme(loyaltyCardSchemeId)
        let params = createHTTPParams()
        if (force) { params = upsertHTTPParam(params, 'force', force) }
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
            params: params
        })
    }

    createLoyaltyCard(
        enduserId: string,
        request: Model.CreateLoyaltyCardRequest
    ): Observable<Model.LoyaltyCardResponse> {
        const path = APIRoutes.loyaltyRoutes(this.baseUrl).loyaltyCardRoutesForEnduser(enduserId).createLoyaltyCard()
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.POST,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }

    getLoyaltyCard(loyaltyCardId: string): Observable<Model.LoyaltyCardResponse> {
        const path = APIRoutes.loyaltyRoutes(this.baseUrl).loyaltyCardRoutes().getLoyaltyCard(loyaltyCardId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    listLoyaltyCards(
        parent: {
            cardSchemeId: Nullable<string>
            enduserId: Nullable<string>
            brandId: Nullable<string>,
            merchantId: Nullable<string>
        },
        pagination: Nullable<Partial<PaginatedQueryParams<Model.LoyaltyCardResponse>>>
    ): Observable<PaginatedResponse<Model.LoyaltyCardResponse>> {
        let path: string
        if (parent.cardSchemeId) {
            path = APIRoutes.loyaltyRoutes(this.baseUrl)
                .loyaltyCardSchemeRoutes()
                .loyaltyCardRoutesForCardScheme(parent.cardSchemeId)
                .listLoyaltyCards()
        } else if (parent.enduserId) {
            path = APIRoutes.loyaltyRoutes(this.baseUrl)
                .loyaltyCardRoutesForEnduser(parent.enduserId)
                .listLoyaltyCards()
        } else if (parent.brandId) {
            path = APIRoutes.brandRoutes(this.baseUrl).loyaltyCardRoutesForBrand(parent.brandId).listLoyaltyCards()
        } else if (parent.merchantId) {
            path = APIRoutes.merchantRoutes(this.baseUrl).loyaltyCardRoutesForMerchant(parent.merchantId).listLoyaltyCards()
        } else {
            path = APIRoutes.loyaltyRoutes(this.baseUrl).loyaltyCardRoutes().listLoyaltyCards()
        }
        let params = serialisePaginatedQueryParams(pagination, this.loyaltyCardFacade.loyaltyCardRemotePagination$)
        this.loyaltyCardFacade.loyaltyCardFilters$
            .pipe(
                take(1),
                map((filters) => {
                    if (filters.dbCreatedAt) {
                        params = upsertHTTPParams(
                            params,
                            serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt)
                        )
                    }
                    if (filters.dbUpdatedAt) {
                        params = upsertHTTPParams(
                            params,
                            serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt)
                        )
                    }
                    if (filters.dbDeletedAt) {
                        params = upsertHTTPParams(
                            params,
                            serialiseDateQueryFilter('db_deleted_at', filters.dbDeletedAt)
                        )
                    }
                    if (filters.status) {
                        params = upsertHTTPParams(params, serialiseEnumQueryFilter('status', filters.status))
                    }
                    if (filters.displayName) {
                        params = upsertHTTPParams(
                            params,
                            serialiseStringQueryFilter('display_name', filters.displayName)
                        )
                    }
                })
            )
            .subscribe()
            .unsubscribe()
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader(),
            params
        )
    }

    updateLoyaltyCard(
        loyaltyCardId: string,
        request: Model.UpdateLoyaltyCardRequest
    ): Observable<Model.LoyaltyCardResponse> {
        const path = APIRoutes.loyaltyRoutes(this.baseUrl).loyaltyCardRoutes().updateLoyaltyCard(loyaltyCardId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.PUT,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }

    deleteLoyaltyCard(loyaltyCardId: string, force: boolean): Observable<void> {
        const path = APIRoutes.loyaltyRoutes(this.baseUrl).loyaltyCardRoutes().deleteLoyaltyCard(loyaltyCardId)
        let params = createHTTPParams()
        if (force) { params = upsertHTTPParam(params, 'force', force) }
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
            params: params
        })
    }

    addBrandToLoyaltyCardScheme(
        loyaltyCardSchemeId: string,
        brandId: string
    ): Observable<Model.LoyaltyCardSchemeBrandResponse> {
        const path = APIRoutes.loyaltyRoutes(this.baseUrl)
            .loyaltyCardSchemeRoutes()
            .loyaltyCardSchemeBrandRoutesForCardScheme(loyaltyCardSchemeId)
            .addBrandToLoyaltyCardScheme(brandId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.POST,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    removeBrandFromLoyaltyCardScheme(
        loyaltyCardSchemeId: string,
        brandId: string,
        force: boolean
    ): Observable<void> {
        const path = APIRoutes.loyaltyRoutes(this.baseUrl)
            .loyaltyCardSchemeRoutes()
            .loyaltyCardSchemeBrandRoutesForCardScheme(loyaltyCardSchemeId)
            .removeBrandFromLoyaltyCardScheme(brandId)
            let params = createHTTPParams()
        if (force) { params = upsertHTTPParam(params, 'force', force) }
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
            params: params,
        })
    }

    listLoyaltyCardSchemeBrands(
        parent: {
            cardSchemeId: Nullable<string>,
            brandId: Nullable<string>
        },
        pagination: Nullable<Partial<PaginatedQueryParams<Model.LoyaltyCardSchemeBrandResponse>>>,
        filters: Nullable<Partial<Model.Filters.LoyaltyCardSchemeBrandFilters>>
    ): Observable<PaginatedResponse<Model.LoyaltyCardSchemeBrandResponse>> {
        let path: string
        if (parent.cardSchemeId) {
            path = APIRoutes.loyaltyRoutes(this.baseUrl)
                .loyaltyCardSchemeRoutes()
                .loyaltyCardSchemeBrandRoutesForCardScheme(parent.cardSchemeId)
                .listLoyaltyCardSchemeBrands()
        } else if (parent.brandId) {
            path = APIRoutes.brandRoutes(this.baseUrl)
                .loyaltyCardSchemeRoutesForBrand(parent.brandId)
                .listLoyaltyCardSchemeBrands()
        } else {
            path = APIRoutes.loyaltyRoutes(this.baseUrl).loyaltyCardSchemeBrandRoutes().listLoyaltyCardSchemeBrands()
        }
        // let params = serialisePaginatedQueryParams(pagination, this.loyaltyCardSchemeFacade.loyaltyCardSchemeBrandRemotePagination$)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader(),
            // params
        )
    }

    getLoyaltyCardSchemeBrand(
        loyaltyCardSchemeBrandId: string
    ): Observable<Model.LoyaltyCardSchemeBrandResponse> {
        const path = APIRoutes.loyaltyRoutes(this.baseUrl)
            .loyaltyCardSchemeBrandRoutes()
            .getLoyaltyCardSchemeBrand(loyaltyCardSchemeBrandId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }
}
