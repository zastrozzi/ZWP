import { Inject, Injectable, inject } from "@angular/core";
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
import { SectorAPIService } from "../abstract/sector.api.service";
import { APIRoutes } from "../../api-routes";
import { AFFILIATE_WINDOW_API_BASE_URL, AFFILIATE_WINDOW_API_CONFIG } from "../../config";
import { PlatformAuth } from "@zwp/platform.auth";

@Injectable({ providedIn: 'root'})
@ZWPDebuggableInjectable({
    serviceName: 'SectoreLiveAPIService',
    options: { skipMethodDebugger: true}
})
export class SectorLiveAPIService extends PlatformAuth.AuthedAPIService implements SectorAPIService {
    private config = inject(AFFILIATE_WINDOW_API_CONFIG)
    private baseUrl = inject(AFFILIATE_WINDOW_API_BASE_URL)

    getSector(SectorID: string): Observable<Model.SectorResponse> {
        const path = APIRoutes.sectorRoutes(this.baseUrl).getSector(SectorID);
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url:path,
            body:null,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    listSectors(
        parentType: 'programme' | 'programmeSector' | 'sector' | 'none',
        parentId: Nullable<string>
    ): Observable<PaginatedResponse<Model.SectorResponse>> {
        let path: string
        switch (parentType) {
            case 'none':
                path = APIRoutes.sectorRoutes(this.baseUrl).listSectors()
                break;
            case 'programme':
                if (isNull(parentId)) { return throwError(() => new Error('parentId is null')) }
                path = APIRoutes.sectorRoutes(this.baseUrl)
                    .sectorRoutesForProgramme(parentId).listProgrammes()
                break;
            case 'programmeSector':
                if (isNull(parentId)) { return throwError(() => new Error('parentId is null')) }
                path = APIRoutes.sectorRoutes(this.baseUrl)
                .sectorRoutesForProgrammeSector(parentId).listProgramme()
                break;
            case 'sector':
                if (isNull(parentId)) { return throwError(() => new Error('parentId is null')) }
                path = APIRoutes.sectorRoutes(this.baseUrl).listSubsector(parentId)
                break;
        }
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url:path,
            body:null,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })

    }

    createSector(): Observable<Model.SectorResponse> {
        const path: string = APIRoutes.sectorRoutes(this.baseUrl).createSector()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
                makeAuthHeader: this.auth.authHeader,
                method: HTTPMethod.POST,
                url: path,
                body: null,
                additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    deleteSector(
        parentID: string,
        parentType: 'none' | 'programmes',
        programmeID: string
    ): Observable<void> {
        let path:string
        switch(parentType) {
            case "none":
                path = APIRoutes.sectorRoutes(this.baseUrl).deleteSector(parentID)
                break;
            case "programmes":
                if (isNull(parentID)) { return throwError(() => new Error('parentId is null')) }
                path = APIRoutes.sectorRoutes(this.baseUrl).sectorRoutesForProgramme(parentID).removeProgramme(programmeID);
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
