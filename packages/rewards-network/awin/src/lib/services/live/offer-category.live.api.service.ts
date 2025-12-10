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
import { Observable, map, take, throwError } from "rxjs";
import { offerCategoryAPIService } from "../abstract/offer-category.api.service";
import { APIRoutes } from "../../api-routes";
import { AFFILIATE_WINDOW_API_BASE_URL, AFFILIATE_WINDOW_API_CONFIG } from "../../config";
import { PlatformAuth } from "@zwp/platform.auth";

@Injectable({ providedIn: 'root'})
@ZWPDebuggableInjectable({
    serviceName: 'AccountLiveAPIService',
    options: { skipMethodDebugger: true }
})
export class offerCategoryLiveAPIService extends PlatformAuth.AuthedAPIService implements offerCategoryAPIService {
    private config = inject(AFFILIATE_WINDOW_API_CONFIG)
    private baseUrl = inject(AFFILIATE_WINDOW_API_BASE_URL)

    getOfferCategory(offerCategoryID: string): Observable<Model.OfferCategoryResponse> {
        const path:string = APIRoutes.offerCategoryRoutes(this.baseUrl).getOfferCategory(offerCategoryID)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    updateOfferCategories(offerCategoryID: string): Observable<Model.OfferCategoryResponse> {
        const path: string = APIRoutes.offerCategoryRoutes(this.baseUrl).updateOfferCategory(offerCategoryID);
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PUT,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    createOfferCategory(
        parentID:Nullable<string>,
        parentType: 'none' | 'subcategories'
    ): Observable<Model.OfferCategoryResponse> {
        let path: string 
        switch(parentType) {
            case "none":
                path = APIRoutes.offerCategoryRoutes(this.baseUrl).createOfferCategory(); 
                break;
            case "subcategories":
                if (isNull(parentID)) { return throwError(() => new Error('parentId is null')) }
                path = APIRoutes.offerCategoryRoutes(this.baseUrl).createOfferSubcategory(parentID);
                break;
        }
        
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.POST,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    listOfferCategories(
        parentID: Nullable<string>,
        parentType: 'none' | 'promotions'| 'promotion-offer-categories' | 'subcategories'
    ): Observable<PaginatedResponse<Model.OfferCategoryResponse>> {
        let path: string;
        switch(parentType) {
            case "none":
                path = APIRoutes.offerCategoryRoutes(this.baseUrl).listOfferCategories();
                break;
            case "promotions":
                if (isNull(parentID)) { return throwError(() => new Error('parentId is null')) }
                path = APIRoutes.offerCategoryRoutes(this.baseUrl).offerCategoryRoutesForPromotion(parentID).listPromotions();
                break
            case "promotion-offer-categories":
                if (isNull(parentID)) { return throwError(() => new Error('parentId is null')) }
                path = APIRoutes.offerCategoryRoutes(this.baseUrl).offerCategoryRoutesForPromotionOfferCategories(parentID).listPromotions();
                break;
            case "subcategories":
                if (isNull(parentID)) { return throwError(() => new Error('parentId is null')) }
                path = APIRoutes.offerCategoryRoutes(this.baseUrl).listOfferSubcategories(parentID);
                break;
        }
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    deleteOfferCategory(
        offerCategoryID: string, 
        parentID: string, 
        parentType: 'none' | 'promotions'
    ): Observable<void> {
        let path: string
        switch(parentType) {
            case "none":
                path = APIRoutes.offerCategoryRoutes(this.baseUrl).deleteOfferCategory(parentID);
                break;  
            case "promotions":
                if (isNull(parentID)) { return throwError(() => new Error('parentId is null')) }
                path = APIRoutes.offerCategoryRoutes(this.baseUrl).offerCategoryRoutesForPromotion(parentID).removePromotion(offerCategoryID);
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