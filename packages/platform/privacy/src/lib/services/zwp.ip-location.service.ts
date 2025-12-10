import { HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { HTTPMethod, isUndefined, ZWPDebuggableInjectable, ZWPHTTPService, ZWPIANATimezone } from "@zwp/platform.common";
import { Observable, of } from "rxjs";
import { ZWPPrivacyModuleRootConfig, ZWP_PRIVACY_MODULE_ROOT_CONFIG } from "../model";
import { IPInfoResponse } from "../model/ipinfo";

@Injectable({providedIn: 'root'})
@ZWPDebuggableInjectable({ serviceName: 'ZWPIPLocationService', options: { skipMethodDebugger: true } })
export class ZWPIPLocationService {
    static readonly IP_INFO_API_URL = 'https://ipinfo.io/json'
    static readonly IP_INFO_DB_API_URL = 'https://ipinfo.io/json'
    static readonly MAXMIND_API_URL = 'https://geoip.maxmind.com/geoip/v2.1/city/'

    constructor(
        @Inject(ZWP_PRIVACY_MODULE_ROOT_CONFIG) private config: ZWPPrivacyModuleRootConfig, 
        private http: ZWPHTTPService
    ) {
        // super('ZWPIPLocationService', { skipMethodDebugger: true })
    }

    makeIPInfoHeaders = (accessToken: string) => new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` })

    // getIPInfoLocation(): Observable<IPInfoResponse> {
    //     if (!this.config.ipLocationEnabled) throw new Error('IP Location Disabled')
    //     switch (this.config.ipLocationAPIProvider) {
    //         case ZWPPrivacyModuleIPLocationAPIProvider.IP_INFO:
    //             return this.getIPInfoLocationFromIPInfo()
    //     }
        
    // }

    getIPInfoLocationFromIPInfo(): Observable<IPInfoResponse> {
        if (isUndefined(this.config.ipInfoApiKey)) throw new Error('No IPInfo API Key Provided')
        return this.http.authedRequest(
            of(this.config.ipInfoApiKey),
            this.makeIPInfoHeaders,
            HTTPMethod.GET,
            ZWPIPLocationService.IP_INFO_API_URL,
            undefined
        )
    }

    getIPInfoLocationFromIPInfoDB(): Observable<IPInfoResponse> {
        if (isUndefined(this.config.ipInfoDBApiKey)) throw new Error('No IPInfoDB API Key Provided')
        return this.http.authedRequest(
            of(this.config.ipInfoDBApiKey),
            this.makeIPInfoHeaders,
            HTTPMethod.GET,
            ZWPIPLocationService.IP_INFO_DB_API_URL,
            undefined
        )
    }

    getIPInfoLocationFromMaxMind(): Observable<IPInfoResponse> {
        if (isUndefined(this.config.ipInfoDBApiKey)) throw new Error('No MaxMind API Key Provided')
        return this.http.authedRequest(
            of(this.config.ipInfoDBApiKey),
            this.makeIPInfoHeaders,
            HTTPMethod.GET,
            ZWPIPLocationService.MAXMIND_API_URL,
            undefined
        )
    }

    getIPInfoLocationFromBrowserIntlTimezone(): Observable<ZWPIANATimezone> {
        return of(Intl.DateTimeFormat().resolvedOptions().timeZone as ZWPIANATimezone)
    }
}