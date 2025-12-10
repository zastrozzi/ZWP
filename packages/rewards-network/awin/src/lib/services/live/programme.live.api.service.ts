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
import { ProgrammeAPIService } from "../abstract/programme.api.service";

@Injectable({ providedIn: 'root'})
@ZWPDebuggableInjectable({
    serviceName: 'AccountLiveAPIService',
    options: { skipMethodDebugger: true }
})
export class ProgrammeLiveAPIService extends PlatformAuth.AuthedAPIService implements ProgrammeAPIService {
    private config = inject(AFFILIATE_WINDOW_API_CONFIG)
    private baseUrl = inject(AFFILIATE_WINDOW_API_BASE_URL)

    getProgramme(
        parentID: string,
        programmeID: string,
        parentType: 'none' | 'promotions'
     ): Observable<Model.ProgrammeResponse> {
        let path: string
        const basePath = APIRoutes.programmeRoutes(this.baseUrl)
        switch(parentType) {
            case "none":
                path = basePath.getProgramme(parentID);
                break;
            case "promotions":
                if (isNull(parentID)) { return throwError(() => new Error('parentId is null')) }
                path = basePath.programmeRoutesForPromotion(programmeID).getPromotions(parentID);
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

    listProgrammes(
        parentID: Nullable<string>, 
        parentType: 'none' | 'sectors' | 'programme-sectors' | 'promotions'
    ): Observable<PaginatedResponse<Model.ProgrammeResponse>> {
        let path: string
        const basePath = APIRoutes.programmeRoutes(this.baseUrl)
        switch(parentType) {
            case "none":
                path = basePath.listProgramme();
                break;
            case "sectors":
                if (isNull(parentID)) { return throwError(() => new Error('parentId is null')) }
                path = basePath.programmeRoutesForSector(parentID).listSectors();
                break;
            case "programme-sectors":
                if (isNull(parentID)) { return throwError(() => new Error('parentId is null')) }
                path = basePath.programmeRoutesForProgrammeSector(parentID).listProgrammeSectors();
                break;
            case "promotions":
                if (isNull(parentID)) { return throwError(() => new Error('parentId is null')) }
                path = basePath.programmeRoutesForPromotion(parentID).listPromotions();
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

    deleteProgramme(
        programmeID: string, 
        parentID: string,
        parentType: 'none' | 'sectors' | 'promotions'
    ): Observable<void> {
        let path: string
        const basePath = APIRoutes.programmeRoutes(this.baseUrl)
        switch(parentType) {
            case "none":
                path = basePath.deleteProgramme(parentID);
                break;
            case "sectors":
                if (isNull(parentID)) { return throwError(() => new Error('parentId is null')) }
                path = basePath.programmeRoutesForSector(programmeID).removeSector(parentID);
                break;
            case "promotions":
                if (isNull(parentID)) { return throwError(() => new Error('parentId is null')) }
                path = basePath.programmeRoutesForPromotion(programmeID).deletePromotions(parentID);
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

    refreshProgrammes(parentID:string, parentType: 'none' | 'promotions'): Observable<void> {
        let path: string;
        const basePath = APIRoutes.programmeRoutes(this.baseUrl)
        switch( parentType) {
            case "none":
                path = basePath.refreshProgramme()
                break;
            case "promotions":
                if (isNull(parentID)) { return throwError(() => new Error('parentId is null')) }
                path = basePath.programmeRoutesForPromotion(parentID).refreshPromotions();
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
}