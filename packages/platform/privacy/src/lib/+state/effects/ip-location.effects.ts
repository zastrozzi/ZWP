import { Inject, Injectable } from "@angular/core"
import { ZWPDebuggableInjectable } from "@zwp/platform.common"
import { Actions, OnInitEffects, createEffect, ofType } from "@ngrx/effects"
import { catchError, exhaustMap, map, of } from "rxjs"
import { ZWPPrivacyModuleIPLocationAPIProvider, ZWPPrivacyModuleRootConfig, ZWP_PRIVACY_MODULE_ROOT_CONFIG, parseIPInfoResponse, parseIntlTimezone } from "../../model"
import { ZWPIPLocationService } from "../../services"
import { IPLocationActions } from "../actions"
import { Action } from '@ngrx/store'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'ZWPIPLocationEffects', options: { skipMethodDebugger: true } })
export class ZWPIPLocationEffects implements OnInitEffects {
    constructor(
        private actions$: Actions,
        private ipLocationService: ZWPIPLocationService,
        @Inject(ZWP_PRIVACY_MODULE_ROOT_CONFIG) private config: ZWPPrivacyModuleRootConfig, 
    ) {
        // super('ZWPIPLocationEffects', { skipMethodDebugger: true })
    }

    locateUser$ = createEffect(() => this.actions$.pipe(
        ofType(IPLocationActions.locateUserRequest),
        exhaustMap(() => {
            switch (this.config.ipLocationAPIProvider) {
                case ZWPPrivacyModuleIPLocationAPIProvider.IP_INFO:
                    return this.ipLocationService.getIPInfoLocationFromIPInfo().pipe(
                        map(location => IPLocationActions.locateUserSuccess({ location: parseIPInfoResponse(location) })),
                        catchError(error => of(IPLocationActions.locateUserFailure({ error: JSON.stringify(error) })))
                    )
                case ZWPPrivacyModuleIPLocationAPIProvider.IP_INFO_DB:
                    return this.ipLocationService.getIPInfoLocationFromIPInfoDB().pipe(
                        map(location => IPLocationActions.locateUserSuccess({ location: parseIPInfoResponse(location) })),
                        catchError(error => of(IPLocationActions.locateUserFailure({ error: JSON.stringify(error) })))
                    )
                case ZWPPrivacyModuleIPLocationAPIProvider.MAXMIND:
                    return this.ipLocationService.getIPInfoLocationFromMaxMind().pipe(
                        map(location => IPLocationActions.locateUserSuccess({ location: parseIPInfoResponse(location) })),
                        catchError(error => of(IPLocationActions.locateUserFailure({ error: JSON.stringify(error) })))
                    )
                case ZWPPrivacyModuleIPLocationAPIProvider.BROWSER_INTL_TIMEZONE:
                    return this.ipLocationService.getIPInfoLocationFromBrowserIntlTimezone().pipe(
                        map(location => IPLocationActions.locateUserSuccess({ location: parseIntlTimezone(location) })),
                        catchError(error => of(IPLocationActions.locateUserFailure({ error: JSON.stringify(error) })))
                    )
                default:
                    return of(IPLocationActions.locateUserFailure({ error: 'No IP Location API Provider configured' }))
            }
        })
    ))

    ngrxOnInitEffects(): Action {
        return IPLocationActions.locateUserRequest()
    }

    

    // locateUserSuccess$ = createEffect(() => this.actions$.pipe(
    //     ofType(IPLocationActions.locateUserSuccess),
    //     map(action => action.location),
    //     tap(location => window.alert(JSON.stringify(location)))
    // ), { dispatch: false })
}