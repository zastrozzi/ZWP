import { Injectable, inject } from "@angular/core";
import { Model } from "../../model";
import {
    HTTPMethod,
    isNull,
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    serialisePaginatedQueryParams,
} from '@zwp/platform.common';
import { Observable, throwError } from "rxjs";
import { APIRoutes } from "../../api-routes";
import { AFFILIATE_WINDOW_API_BASE_URL, AFFILIATE_WINDOW_API_CONFIG } from "../../config";
import { PlatformAuth } from "@zwp/platform.auth";
import { PromotionAPIService } from "../abstract/promotion.api.service";
@Injectable({ providedIn: 'root'})
@ZWPDebuggableInjectable({
    serviceName: 'AccountLiveAPIService',
    options: { skipMethodDebugger: true }
})
export class PromotionLiveAPIService extends PlatformAuth.AuthedAPIService implements PromotionAPIService {
    private config = inject(AFFILIATE_WINDOW_API_CONFIG)
    private baseUrl = inject(AFFILIATE_WINDOW_API_BASE_URL)

    getPromotion(promotionID: string): Observable<Model.PromotionResponse> {
        const path: string = APIRoutes.promotionRoutes(this.baseUrl).getPromotion(promotionID);
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
        
    }

    refreshPromotions(): Observable<void> {
        const path: string = APIRoutes.promotionRoutes(this.baseUrl).refreshPromotions();
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PUT,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
        
    }

    listPromotions(parentID: string, parentType: 'none' | 'promotions' | 'offer-categories'): Observable<PaginatedResponse<Model.PromotionResponse>> {
        let path: string;
        const basePath = APIRoutes.promotionRoutes(this.baseUrl);
        switch(parentType) {
            case "none":
                path = basePath.listPromotions();
                break;
            case "promotions":
                if (isNull(parentID)) { return throwError(() => new Error('parentId is null')) }
                path = basePath.promotionRoutesforPromotionOfferCategories(parentID).listOfferCategory();
                break;
            case "offer-categories":
                if (isNull(parentID)) { return throwError(() => new Error('parentId is null')) }
                path = basePath.promotionRoutesForOfferCategories(parentID).listOfferCategories();
                break;
        }
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    deletePromotion(promotionID: string, parentID: string, parentType: 'none' | 'promotions'): Observable<void> {
        let path: string;
        const basePath = APIRoutes.promotionRoutes(this.baseUrl);
        switch(parentType) {
            case "none":
                path = basePath.deletePromotion(parentID);
                break;
            case "promotions":
                if (isNull(parentID)) { return throwError(() => new Error('parentId is null')) }
                path = basePath.promotionRoutesforPromotionOfferCategories(parentID).removeOfferCategory(promotionID);
                break;
        }
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }
}