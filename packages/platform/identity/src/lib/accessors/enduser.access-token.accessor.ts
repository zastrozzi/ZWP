import { EnvironmentInjector, Injectable, inject } from "@angular/core";
import { PlatformAuth, UserAuthFacade } from "@zwp/platform.auth";
import { HTTPMethod, ZWPHTTPService, Nullable } from "@zwp/platform.common";
import { EMPTY, Observable, catchError, delay, map, mergeMap, of, withLatestFrom } from "rxjs";
import { ENDUSER_API_SERVICE } from "../services/abstract";
import { Model } from "../model";
import { APIRoutes } from "../api-routes";
import { IDENTITY_API_BASE_URL, IDENTITY_API_CONFIG } from "../config";

@Injectable({ providedIn: 'root' })
export class EnduserAccessTokenAccessor implements PlatformAuth.Model.AccessTokenAccessor {
    private authFacade = inject(UserAuthFacade)
    private config = inject(IDENTITY_API_CONFIG)
    private baseUrl = inject(IDENTITY_API_BASE_URL)
    private http = inject(ZWPHTTPService)

    getAccessToken(): Observable<Nullable<string>> {
        return of(EMPTY).pipe(
            delay(0),
            withLatestFrom(
                this.authFacade.authedUserPlatformRoleIsEnduser$,
                this.authFacade.accessToken$,
                this.authFacade.accessTokenExpiresAt$,
                this.authFacade.refreshToken$,
                this.authFacade.refreshTokenExpiresAt$
            ),
            map(tuple => ({
                isEnduser: tuple[1], 
                accessToken: tuple[2], 
                accessTokenExpiresAt: tuple[3],
                refreshToken: tuple[4], 
                refreshTokenExpiresAt: tuple[5]
            })),
            mergeMap((tokenData) => {
                if (Date.now() < tokenData.accessTokenExpiresAt * 1000 && tokenData.isEnduser) {
                    return of(tokenData.accessToken)
                }

                else if (
                    tokenData.refreshToken 
                    && Date.now() < tokenData.refreshTokenExpiresAt * 1000
                ) {
                    return this.refreshEnduserToken({ refreshToken: tokenData.refreshToken }).pipe(
                        map((tokens) => {
                            this.authFacade.setTokens(tokens.accessToken, tokens.refreshToken)
                            return tokens.accessToken
                        })
                    )
                } else { 
                    this.authFacade.clearTokens()
                    return of(null)
                }
                
            })
        )
    }

    refreshEnduserToken(request: Model.RefreshEnduserTokenRequest): Observable<PlatformAuth.Model.AuthedUserResponse<Model.EnduserResponse>> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).authRoutes.refreshToken()
        return this.http.unauthedRequest(HTTPMethod.POST, path, request, this.authFacade.addDeviceIdHeader())
    }
}