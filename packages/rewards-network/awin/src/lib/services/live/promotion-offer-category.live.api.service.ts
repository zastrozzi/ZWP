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
import { PromotionOfferCategoryAPIService } from "../abstract/promotion-offer-category.api.service";

@Injectable({ providedIn: 'root'})
@ZWPDebuggableInjectable({
    serviceName: 'AccountLiveAPIService',
    options: { skipMethodDebugger: true }
})
export class PromotionOfferCategoryLiveAPIService extends PlatformAuth.AuthedAPIService implements PromotionOfferCategoryAPIService {
    private config = inject(AFFILIATE_WINDOW_API_CONFIG)
    private baseUrl = inject(AFFILIATE_WINDOW_API_BASE_URL)

    getPromotionOfferCategory(promotionOfferCategoryID: string): Observable<Model.PromotionOfferCategoryResponse> {
        const path: string = APIRoutes.promotionOfferCategoryRoutes(this.baseUrl).getPromotionOfferCategory(promotionOfferCategoryID);
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    listPromotionOfferCategories(parentID: string, parentType: 'none' | 'promotions'): Observable<PaginatedResponse<Model.PromotionOfferCategoryResponse>> {
        let path: string;
        const basePath = APIRoutes.promotionOfferCategoryRoutes(this.baseUrl);
        switch(parentType) {
            case "none":
                path = basePath.listPromotionsOfferCategories();
                break;
            case "promotions":
                if (isNull(parentID)) { return throwError(() => new Error('parentId is null')) }
                path = basePath.promotionOfferCategoryRoutesForPromotions(parentID).listPromotions();
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

    deletePromotionOfferCategory(promotionOfferCategoryID: string, parentID: string, parentType: 'none' | 'promotions'): Observable<void> {
        let path: string;
        const basePath = APIRoutes.promotionOfferCategoryRoutes(this.baseUrl);
        switch(parentType) {
            case "none":
                path = basePath.deletePromotionOfferCategory(parentID);
                break;
            case "promotions":
                if (isNull(parentID)) { return throwError(() => new Error('parentId is null')) }
                path = basePath.promotionOfferCategoryRoutesForPromotions(promotionOfferCategoryID).removePromotions(parentID);
                break;
        }
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    
}