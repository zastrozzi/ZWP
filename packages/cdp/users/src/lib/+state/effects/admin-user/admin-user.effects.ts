import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { Services } from '../../../services'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { AdminUserLocalActions, AdminUserRemoteActions } from '../../actions'
import { debounceTime, delay, map } from 'rxjs'
import { UserAuthActions, UserAuthFacade } from '@zwp/platform.auth'
import { SnackbarActions } from '@zwp/platform.layout'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'AdminUserEffects', options: { skipMethodDebugger: true } })
export class AdminUserEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private adminUserAPI = inject(Services.ADMIN_USER_API_SERVICE)
    private userAuthFacade = inject(UserAuthFacade)
    private router = inject(ZWPRouterFacade)

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...AdminUserRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(AdminUserRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...AdminUserRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(AdminUserRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...AdminUserRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(AdminUserRemoteActions.identifiers)({ error: action.error }))
    ))

    updateRemoteStateErrorMessage$ = createEffect(() => this.actions$.pipe(
        ofType(...AdminUserRemoteActions.failureActions),
        map((action) => SnackbarActions.showSnackbar({message: `${action.error}`, duration: 5000}))
    ))

    createAdminUser$ = createRemoteEffect(
        this.actions$,
        AdminUserRemoteActions.createAdminUser,
        (action) => this.adminUserAPI.createAdminUser(action)
    )

    getAdminUser$ = createRemoteEffect(
        this.actions$,
        AdminUserRemoteActions.getAdminUser,
        (action) => this.adminUserAPI.getAdminUser(action.adminUserId)
    )

    getAdminUserOnSelect$ = createEffect(() => this.actions$.pipe(
        ofType(AdminUserLocalActions.selectAdminUser),
        map((action) => AdminUserRemoteActions.getAdminUser.request({ adminUserId: action.adminUserId }))
    ))

    getAdminUserOnInitialise$ = createRemoteEffect(
        this.actions$,
        AdminUserRemoteActions.getAdminUserOnInitialise,
        (action) => this.adminUserAPI.getAdminUser(action.adminUserId)
    )

    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            AdminUserLocalActions.updateAdminUserFilters, 
            AdminUserLocalActions.resetAdminUserFilters
        ),
        debounceTime(200),
        map(() => AdminUserRemoteActions.listAdminUsers.request({ pagination: null }))
    ))

    listAdminUsers$ = createRemoteEffect(
        this.actions$,
        AdminUserRemoteActions.listAdminUsers,
        (action) => this.adminUserAPI.listAdminUsers(action.pagination)
    )

    updateAdminUser$ = createRemoteEffect(
        this.actions$,
        AdminUserRemoteActions.updateAdminUser,
        (action) => this.adminUserAPI.updateAdminUser(action.adminUserId, action.update)
    )

    deleteAdminUser$ = createRemoteEffect(
        this.actions$,
        AdminUserRemoteActions.deleteAdminUser,
        (action) => this.adminUserAPI.deleteAdminUser(action.adminUserId),
        (action) => ({ adminUserId: action.adminUserId })
    )

    loginAdminUserEmailPassword$ = createRemoteEffect(
        this.actions$,
        AdminUserRemoteActions.loginAdminUserEmailPassword,
        (action) => this.adminUserAPI.loginAdminUserEmailPassword(action)
        // (action) => of(EMPTY).pipe(delay(5000), switchMap(() => this.adminUserAPI.loginAdminUserEmailPassword(action)))
    )

    logoutAdminUser$ = createRemoteEffect(
        this.actions$,
        AdminUserRemoteActions.logoutAdminUser,
        () => this.adminUserAPI.logoutAdminUser(),
        (action) => ({ adminUserId: action.adminUserId })
    )

    logoutAdminUserReset$ = createEffect(() => this.actions$.pipe(
        ofType(AdminUserRemoteActions.logoutAdminUser.success),
        map(() => AdminUserLocalActions.resetAdminUserState())
    ))

    loginAdminUserSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(AdminUserRemoteActions.loginAdminUserEmailPassword.success),
        map((action) => UserAuthActions.setTokens({ accessToken: action.response.accessToken, refreshToken: action.response.refreshToken }))
    ))

    logoutAdminUserSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(AdminUserRemoteActions.logoutAdminUser.success),
        map(() => UserAuthActions.clearTokens())
    ))

    logoutAdminUserSuccessRouteLogout$ = createEffect(() => this.actions$.pipe(
        ofType(AdminUserRemoteActions.logoutAdminUser.success),
        map(() => this.router.navigate(['/login']))
    ), { dispatch: false })

    loginAdminUserSuccessRouteAdmin$ = createEffect(() => this.actions$.pipe(
        ofType(AdminUserRemoteActions.loginAdminUserEmailPassword.success),
        map(() => this.router.navigate(['/admin']))
    ), { dispatch: false })

    initialiseAdminUserState$ = createEffect(() => this.actions$.pipe(
        ofType(AdminUserLocalActions.initialiseAdminUserState),
        delay(100),
        map(() => { 
            const userId = this.userAuthFacade.getAuthedUserId()
            return userId ? AdminUserRemoteActions.getAdminUserOnInitialise.request({ adminUserId: userId }) : AdminUserLocalActions.resetAdminUserState()
        })
    ))

    ngrxOnInitEffects() {
        return AdminUserLocalActions.initialiseAdminUserState()
    }
}