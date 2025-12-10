import { Injectable, inject } from '@angular/core'
import { Model } from '../../model'
import {
    HTTPMethod,
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    createHTTPParams,
    serialiseDateQueryFilter,
    serialiseEnumQueryFilter,
    serialiseNumberQueryFilter,
    serialisePaginatedQueryParams,
    serialiseStringQueryFilter,
    upsertHTTPParams,
} from '@zwp/platform.common'
import { Observable, map, take, throwError } from 'rxjs'
import { OfferAPIService } from '../abstract'
import { APIRoutes } from '../../api-routes'
import { MERCHANT_NET_API_BASE_URL, MERCHANT_NET_API_CONFIG } from '../../config'
import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'OfferLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class OfferLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements OfferAPIService
{
    private config = inject(MERCHANT_NET_API_CONFIG)
    private baseUrl = inject(MERCHANT_NET_API_BASE_URL)
    private offerFacade = inject(Facades.OfferFacade)

    createOffer(
        parent: { merchantId: Nullable<string>, brandId: Nullable<string> },
        request: Model.CreateOfferRequest
    ): Observable<Model.OfferResponse> {
        let path: string
        if (parent.merchantId) {
            path = APIRoutes.merchantRoutes(this.baseUrl)
                .offerRoutesForMerchant(parent.merchantId)
                .createOffer()
        } else if (parent.brandId) {
            path = APIRoutes.brandRoutes(this.baseUrl)
                .offerRoutesForBrand(parent.brandId)
                .createOffer()
        } else {
            return throwError(() => new Error('Invalid parent provided'))
        }
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.POST,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }

    getOffer(offerId: string): Observable<Model.OfferResponse> {
        const path = APIRoutes.offerRoutes(this.baseUrl).getOffer(
            offerId
        )
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    listOffers(
        parent: { merchantId: Nullable<string>, brandId: Nullable<string> },
        pagination: Nullable<PaginatedQueryParams<Model.OfferResponse>>
    ): Observable<PaginatedResponse<Model.OfferResponse>> {
        let path: string
        if (parent.merchantId) {
            path = APIRoutes.merchantRoutes(this.baseUrl)
                .offerRoutesForMerchant(parent.merchantId)
                .listOffers()
        } else if (parent.brandId) {
            path = APIRoutes.brandRoutes(this.baseUrl)
                .offerRoutesForBrand(parent.brandId)
                .listOffers()
        } else {
            path = APIRoutes.offerRoutes(this.baseUrl).listOffers()
        }
        let params = serialisePaginatedQueryParams(
            pagination,
            this.offerFacade.offerRemotePagination$
        )

        this.offerFacade.offerFilters$.pipe(
            take(1),
            map((filters) => {
                if (filters.dbCreatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt)) }
                if (filters.dbUpdatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt)) }
                if (filters.dbDeletedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_deleted_at', filters.dbDeletedAt)) }
                if (filters.title) { params = upsertHTTPParams(params, serialiseStringQueryFilter('title', filters.title)) }
                if (filters.category) { params = upsertHTTPParams(params, serialiseStringQueryFilter('category', filters.category)) }
                // if (filters.operand) { params = upsertHTTPParams(params, serialiseNumberQueryFilter('operand', filters.operand)) }
                if (filters.purchaseMax) { params = upsertHTTPParams(params, serialiseNumberQueryFilter('purchase_max', filters.purchaseMax)) }
                if (filters.purchaseMin) { params = upsertHTTPParams(params, serialiseNumberQueryFilter('purchase_min', filters.purchaseMin)) }
                if (filters.rewardMax) { params = upsertHTTPParams(params, serialiseNumberQueryFilter('reward_max', filters.rewardMax)) }
                if (filters.daysOfWeek) { params = upsertHTTPParams(params, serialiseEnumQueryFilter('days_of_week', filters.daysOfWeek)) }
                if (filters.startDate) { params = upsertHTTPParams(params, serialiseDateQueryFilter('start_date', filters.startDate)) }
                if (filters.endDate) { params = upsertHTTPParams(params, serialiseDateQueryFilter('end_date', filters.endDate)) }
                if (filters.status) { params = upsertHTTPParams(params, serialiseEnumQueryFilter('status', filters.status)) }
            })
        ).subscribe().unsubscribe()


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

    updateOffer(
        offerId: string,
        request: Model.UpdateOfferRequest
    ): Observable<Model.OfferResponse> {
        const path = APIRoutes.offerRoutes(this.baseUrl).updateOffer(
            offerId
        )
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.PUT,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }

    deleteOffer(offerId: string): Observable<void> {
        const path = APIRoutes.offerRoutes(this.baseUrl).deleteOffer(
            offerId
        )
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.DELETE,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    createOfferLayout(
        offerId: string,
        request: Model.CreateOfferLayoutRequest
    ): Observable<Model.OfferLayoutResponse> {
        const path = APIRoutes.offerRoutes(this.baseUrl).offerLayoutRoutesForOffer(offerId).createOfferLayout()
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.POST,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }

    getOfferLayout(offerLayoutId: string): Observable<Model.OfferLayoutResponse> {
        const path = APIRoutes.offerRoutes(this.baseUrl).offerLayoutRoutes().getOfferLayout(offerLayoutId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    listOfferLayouts(offerId: Nullable<string>, pagination: Nullable<PaginatedQueryParams<Model.OfferLayoutResponse>>): Observable<PaginatedResponse<Model.OfferLayoutResponse>> {
        let path: string
        if (offerId) {
            path = APIRoutes.offerRoutes(this.baseUrl).offerLayoutRoutesForOffer(offerId).listOfferLayouts()
        } else {
            path = APIRoutes.offerRoutes(this.baseUrl).offerLayoutRoutes().listOfferLayouts()
        }
        let params = serialisePaginatedQueryParams(pagination, this.offerFacade.offerLayoutRemotePagination$)

        this.offerFacade.offerLayoutFilters$.pipe(
            take(1),
            map((filters) => {
                if (filters.dbCreatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt)) }
                if (filters.dbUpdatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt)) }
                if (filters.dbDeletedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_deleted_at', filters.dbDeletedAt)) }
                if (filters.layoutName) { params = upsertHTTPParams(params, serialiseStringQueryFilter('layout_name', filters.layoutName)) }
            })
        ).subscribe().unsubscribe()

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

    updateOfferLayout(offerLayoutId: string, request: Model.UpdateOfferLayoutRequest): Observable<Model.OfferLayoutResponse> {
        const path = APIRoutes.offerRoutes(this.baseUrl).offerLayoutRoutes().updateOfferLayout(offerLayoutId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.PUT,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }

    deleteOfferLayout(offerLayoutId: string): Observable<void> {
        const path = APIRoutes.offerRoutes(this.baseUrl).offerLayoutRoutes().deleteOfferLayout(offerLayoutId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.DELETE,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    createOfferLayoutElement(offerLayoutId: string, request: Model.CreateOfferLayoutElementRequest): Observable<Model.OfferLayoutElementResponse> {
        const path = APIRoutes.offerRoutes(this.baseUrl).offerLayoutRoutes().offerLayoutElementRoutesForLayout(offerLayoutId).createOfferLayoutElement()
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.POST,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }

    getOfferLayoutElement(offerLayoutElementId: string): Observable<Model.OfferLayoutElementResponse> {
        const path = APIRoutes.offerRoutes(this.baseUrl).offerLayoutElementRoutes().getOfferLayoutElement(offerLayoutElementId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    listOfferLayoutElements(offerLayoutId: Nullable<string>, pagination: Nullable<PaginatedQueryParams<Model.OfferLayoutElementResponse>>): Observable<PaginatedResponse<Model.OfferLayoutElementResponse>> {
        let path: string
        if (offerLayoutId) {
            path = APIRoutes.offerRoutes(this.baseUrl).offerLayoutRoutes().offerLayoutElementRoutesForLayout(offerLayoutId).listOfferLayoutElements()
        } else {
            path = APIRoutes.offerRoutes(this.baseUrl).offerLayoutElementRoutes().listOfferLayoutElements()
        }
        
        let params = serialisePaginatedQueryParams(pagination, this.offerFacade.offerLayoutElementRemotePagination$)

        this.offerFacade.offerLayoutElementFilters$.pipe(
            take(1),
            map((filters) => {
                if (filters.dbCreatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt)) }
                if (filters.dbUpdatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt)) }
                if (filters.dbDeletedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_deleted_at', filters.dbDeletedAt)) }
                if (filters.elementType) { params = upsertHTTPParams(params, serialiseEnumQueryFilter('element_type', filters.elementType)) }
            })
        ).subscribe().unsubscribe()

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

    updateOfferLayoutElement(offerLayoutElementId: string, request: Model.UpdateOfferLayoutElementRequest): Observable<Model.OfferLayoutElementResponse> {
        const path = APIRoutes.offerRoutes(this.baseUrl).offerLayoutElementRoutes().updateOfferLayoutElement(offerLayoutElementId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.PUT,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }

    deleteOfferLayoutElement(offerLayoutElementId: string): Observable<void> {
        const path = APIRoutes.offerRoutes(this.baseUrl).offerLayoutElementRoutes().deleteOfferLayoutElement(offerLayoutElementId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.DELETE,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }
}

