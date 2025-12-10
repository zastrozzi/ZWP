import { Injectable, inject } from "@angular/core";
import { Model } from "../../model";
import {
    HTTPMethod,
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    serialisePaginatedQueryParams,
} from '@zwp/platform.common';
import { Observable, map, take, throwError } from "rxjs";
import { MembershipAPIService } from "../abstract/membership.api.service";
import { APIRoutes } from "../../api-routes";
import { AFFILIATE_WINDOW_API_BASE_URL, AFFILIATE_WINDOW_API_CONFIG } from "../../config";
import { PlatformAuth } from "@zwp/platform.auth";

@Injectable({ providedIn: 'root'})
@ZWPDebuggableInjectable({
    serviceName: 'AccountLiveAPIService',
    options: { skipMethodDebugger: true }
})
export class MembershipLiveAPIService extends PlatformAuth.AuthedAPIService implements MembershipAPIService {
    private config = inject(AFFILIATE_WINDOW_API_CONFIG)
    private baseUrl = inject(AFFILIATE_WINDOW_API_BASE_URL)

    getMembership(membershipID: string): Observable<Model.ProgrammeMembershipResponse> {
        const path = APIRoutes.programmeMembershipRoutes(this.baseUrl).getProgrammeMembership(membershipID)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    refreshMembership():Observable<void> {
        const path = APIRoutes.programmeMembershipRoutes(this.baseUrl).refreshProgrammeMembership()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    listMemberships(): Observable<PaginatedResponse<Model.ProgrammeMembershipResponse>> {
        const path: string = APIRoutes.programmeMembershipRoutes(this.baseUrl).listProgrammeMembership();
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    deleteMembership(membershipID:string): Observable<void> {
        const path: string = APIRoutes.programmeMembershipRoutes(this.baseUrl).deleteProgrammeMembership(membershipID);
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    refreshMemberships(): Observable<void> {
        const path: string = APIRoutes.programmeMembershipRoutes(this.baseUrl).refreshProgrammeMembership();
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PUT,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }


}
