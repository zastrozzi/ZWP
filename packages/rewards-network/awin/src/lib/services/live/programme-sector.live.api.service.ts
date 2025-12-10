import { Injectable, inject } from "@angular/core";
import { Model } from "../../model";
import {
    HTTPMethod,
    ZWPDebuggableInjectable,
    PaginatedResponse,
} from '@zwp/platform.common';
import { Observable } from "rxjs";
import { APIRoutes } from "../../api-routes";
import { AFFILIATE_WINDOW_API_BASE_URL, AFFILIATE_WINDOW_API_CONFIG } from "../../config";
import { PlatformAuth } from "@zwp/platform.auth";
import { ProgrammeSectorAPIService } from "../abstract/programme-sector.api.service";

@Injectable({ providedIn: 'root'})
@ZWPDebuggableInjectable({
    serviceName: 'AccountLiveAPIService',
    options: { skipMethodDebugger: true }
})
export class programmeSectorLiveAPIService extends PlatformAuth.AuthedAPIService implements ProgrammeSectorAPIService {
    private config = inject(AFFILIATE_WINDOW_API_CONFIG)
    private baseUrl = inject(AFFILIATE_WINDOW_API_BASE_URL)

    getProgrammeSector(programmeSectorID: string): Observable<Model.ProgrammeSectorResponse> {
        const path = APIRoutes.programmeSectorRoutes(this.baseUrl).getProgrammeSector(programmeSectorID);
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    listProgrammeSectors(): Observable<PaginatedResponse<Model.ProgrammeSectorResponse>> {
        const path = APIRoutes.programmeSectorRoutes(this.baseUrl).listProgrammeSector();
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    deleteProgrammeSector(programmeSectorID: string): Observable<void> {
        const path = APIRoutes.programmeSectorRoutes(this.baseUrl).deleteProgrammeSector(programmeSectorID);
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