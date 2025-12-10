import { Injectable, OnDestroy, inject } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { ZWPDebuggableInjectable, Nullable } from "@zwp/platform.common";
import { UserAuthSelectors } from "../selectors";
import { UserAuthActions } from "../actions";
import { HttpHeaders } from "@angular/common/http";
import { Subscription, map, take } from "rxjs";
import { ZWPPrivacyFacade } from "@zwp/platform.privacy";

@Injectable()
@ZWPDebuggableInjectable({serviceName: 'UserAuthFacade', options: { skipMethodDebugger: true }})
export class UserAuthFacade implements OnDestroy {
    private store = inject(Store)
    private privacyFacade = inject(ZWPPrivacyFacade)
    private readonly subscriptions = new Subscription()

    private _localDeviceIdentifier: Nullable<string> = null
    private _ipAddress: Nullable<string> = null
    private _authedUserId: Nullable<string> = null

    constructor() {
        this.subscriptions.add(this.localDeviceIdentifier$.subscribe((identifier) => {
            this._localDeviceIdentifier = identifier
        }))
        this.subscriptions.add(this.privacyFacade.ipLocationIP$.subscribe((ipAddress) => {
            this._ipAddress = ipAddress
        }))
        this.subscriptions.add(this.accessTokenPayload$.subscribe((payload) => {
            this._authedUserId = payload.u
        }))
    }

    accessToken$ = this.store.pipe(select(UserAuthSelectors.accessToken))
    refreshToken$ = this.store.pipe(select(UserAuthSelectors.refreshToken))
    hasAccessToken$ = this.store.pipe(select(UserAuthSelectors.hasAccessToken))
    hasRefreshToken$ = this.store.pipe(select(UserAuthSelectors.hasRefreshToken))
    accessTokenPayload$ = this.store.pipe(select(UserAuthSelectors.accessTokenPayload))
    refreshTokenPayload$ = this.store.pipe(select(UserAuthSelectors.refreshTokenPayload))
    localDeviceIdentifier$ = this.store.pipe(select(UserAuthSelectors.localDeviceIdentifier))
    hasLocalDeviceIdentifier$ = this.store.pipe(select(UserAuthSelectors.hasLocalDeviceIdentifier))
    authedUserPlatformRole$ = this.store.pipe(select(UserAuthSelectors.authedUserPlatformRole))
    authedUserPlatformRoleIsAdminUser$ = this.store.pipe(select(UserAuthSelectors.authedUserPlatformRoleIsAdminUser))
    authedUserPlatformRoleIsEnduser$ = this.store.pipe(select(UserAuthSelectors.authedUserPlatformRoleIsEnduser))
    accessTokenExpiresAt$ = this.store.pipe(select(UserAuthSelectors.accessTokenExpiresAt))
    refreshTokenExpiresAt$ = this.store.pipe(select(UserAuthSelectors.refreshTokenExpiresAt))

    setAccessToken(accessToken: string) { this.store.dispatch(UserAuthActions.setAccessToken({ accessToken })) }
    setRefreshToken(refreshToken: string) { this.store.dispatch(UserAuthActions.setRefreshToken({ refreshToken })) }
    setTokens(accessToken: string, refreshToken: string) { this.store.dispatch(UserAuthActions.setTokens({ accessToken, refreshToken })) }
    removeAccessToken() { this.store.dispatch(UserAuthActions.removeAccessToken()) }
    removeRefreshToken() { this.store.dispatch(UserAuthActions.removeRefreshToken()) }
    clearTokens() { this.store.dispatch(UserAuthActions.clearTokens()) }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
        // this.debuggableServiceDestroy()
    }

    getDeviceIdentifier(): Nullable<string> {
        let deviceIdentifier = null
        this.localDeviceIdentifier$.subscribe((identifier) => deviceIdentifier = identifier).unsubscribe()
        return deviceIdentifier
    }

    getAuthedUserId(): Nullable<string> { return this._authedUserId }

    authHeader = (accessToken: string) => new HttpHeaders({ Authorization: `Bearer ${accessToken}` })

    addDeviceIdHeader = () => {
        let headers = new HttpHeaders()
        if (this._localDeviceIdentifier) { headers = headers.set('X-Local-Device-Identifier', this._localDeviceIdentifier) }
        if (this._ipAddress) { headers = headers.set('X-Forwarded-For', this._ipAddress) }
        return headers
    }
}