import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { EMPTY, Observable, catchError, delay, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { PlatformAuth, UserAuthFacade } from "@zwp/platform.auth"

export const AdminUserAuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const authFacade = inject(UserAuthFacade)
    const router = inject(Router)
    const adminUserAccessTokenAccessor = inject(PlatformAuth.Model.ACCESS_TOKEN_ACCESSOR)
    
    return of(EMPTY).pipe(
        delay(0),
        switchMap(() => adminUserAccessTokenAccessor.getAccessToken()),
        catchError((error) => {
            // console.error('AdminUserAuthGuard error', error)
            return of(null)
        }),
        map((accessToken) => {
            if (!accessToken) {
                authFacade.clearTokens()
                // console.log('AdminUserAuthGuard redirecting to login')
                return router.createUrlTree(['/login'])
            }
            return true
        })
    )
}