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
import { AccountAPIService } from "../abstract/account.api.service";
import { APIRoutes } from "../../api-routes";
import { AFFILIATE_WINDOW_API_BASE_URL, AFFILIATE_WINDOW_API_CONFIG } from "../../config";
import { PlatformAuth } from "@zwp/platform.auth";

@Injectable({ providedIn: 'root'})
@ZWPDebuggableInjectable({
    serviceName: 'AccountLiveAPIService',
    options: { skipMethodDebugger: true }
})
export class AccountLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements AccountAPIService {
        private config = inject(AFFILIATE_WINDOW_API_CONFIG)
        private baseUrl = inject(AFFILIATE_WINDOW_API_BASE_URL)

        getAccount(accountID: string): Observable<Model.AccountResponse> {
            const path = APIRoutes.accountRoutes(this.baseUrl).getAccout(accountID)
            return this.http.authedRequestWithOptions({
                accessToken: this.getAccessToken(),
                makeAuthHeader: this.auth.authHeader,
                method: HTTPMethod.GET,
                url: path,
                body: null,
                additionalHeaders: this.auth.addDeviceIdHeader()
            })
        }

        listAccounts(
            parentType: 'memberships' | 'programmes' | 'promotions' | 'none',
            parentID: Nullable<string>, 
        ): Observable<PaginatedResponse<Model.AccountResponse>> {
            let path:string

            switch (parentType) {
                case 'none':
                    path = APIRoutes.accountRoutes(this.baseUrl).listAccounts();
                    break;
                case 'memberships':
                    if (isNull(parentID)) { return throwError(() => new Error('parentId is null')) }
                    path = APIRoutes.accountRoutes(this.baseUrl).membershipRoutesForAccount(parentID).listMemberships();
                    break;
                case 'programmes':
                    if (isNull(parentID)) { return throwError(() => new Error('parentId is null')) }
                    path = APIRoutes.accountRoutes(this.baseUrl).programmeRoutesForAccount(parentID).listProgrammes();
                    break;
                case 'promotions':
                    if (isNull(parentID)) { return throwError(() => new Error('parentId is null')) }
                    path = APIRoutes.accountRoutes(this.baseUrl).promotionRoutesForAccount(parentID).listPromotions();
                    break;
            }
            //Possible filters section
            return this.http.authedRequestWithOptions({
                accessToken: this.getAccessToken(),
                makeAuthHeader: this.auth.authHeader,
                method: HTTPMethod.GET,
                url: path,
                body: null,
                additionalHeaders: this.auth.addDeviceIdHeader(),
            })
        }

        refreshAccounts(
            parentType: 'none' | 'memberships' | 'promotions',
            parentID: Nullable<string>
        ): Observable<void> {
            let path:string
            switch (parentType) {
                case 'none':
                    path = APIRoutes.accountRoutes(this.baseUrl).refreshAccounts();
                    break;
                case 'memberships':
                    if (isNull(parentID)) { return throwError(() => new Error('parentId is null')) }
                    path = APIRoutes.accountRoutes(this.baseUrl).membershipRoutesForAccount(parentID).refreshMemberships();
                    break;
                case 'promotions':
                    if (isNull(parentID)) { return throwError(() => new Error('parentId is null')) }
                    path = APIRoutes.accountRoutes(this.baseUrl).promotionRoutesForAccount(parentID).refreshPromotions();
                    break;
            }
            return this.http.authedRequestWithOptions({
                accessToken: this.getAccessToken(),
                makeAuthHeader: this.auth.authHeader,
                method: HTTPMethod.PUT,
                url: path,
                body: null,
                additionalHeaders: this.auth.addDeviceIdHeader(),
            })
        }

        deleteAccount(accountID: string): Observable<void> {
            const path =APIRoutes.accountRoutes(this.baseUrl).deleteAccount(accountID)
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