import { Injectable, inject } from '@angular/core'
import { HTTPMethod, ZWPHTTPService, Nullable } from '@zwp/platform.common'
import { Observable } from 'rxjs'
import { UserAuthFacade } from '../+state/facades'
import { Model } from '../model'
import { HttpParams } from '@angular/common/http'

export class AuthedAPIService {
    http = inject(ZWPHTTPService)
    auth = inject(UserAuthFacade)
    private accessTokenAccessor = inject(Model.ACCESS_TOKEN_ACCESSOR)

    getAccessToken(): Observable<Nullable<string>> {
        return this.accessTokenAccessor.getAccessToken()
    }

    accessTokenAuthedRequest<ReqType, ResType>(
        method: HTTPMethod, 
        url: string,
        body: Nullable<ReqType> = null,
        params: Nullable<HttpParams> = null
    ): Observable<ResType> {
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            method,
            url,
            body,
            this.auth.addDeviceIdHeader(),
            params ?? undefined
        )
    }
}
