import { inject, Inject, Injectable } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { Services } from '../../../services'
import { ZWPDebuggableInjectable, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { AdminUserSessionLocalActions, AdminUserSessionRemoteActions } from '../../actions'
import { debounceTime, delay, map, withLatestFrom } from 'rxjs'
import { UserAuthFacade } from '@zwp/platform.auth'
import { Action } from '@ngrx/store'
import { AdminUserFacade } from '../../facades'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'AdminUserSessionEffects', options: { skipMethodDebugger: true } })
export class AdminUserSessionEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private adminUserAPI = inject(Services.ADMIN_USER_API_SERVICE)
    private userAuthFacade = inject(UserAuthFacade)
    private adminUserFacade = inject(AdminUserFacade)

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...AdminUserSessionRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(AdminUserSessionRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...AdminUserSessionRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(AdminUserSessionRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...AdminUserSessionRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(AdminUserSessionRemoteActions.identifiers)({ error: action.error }))
    ))

    getAdminUserSession$ = createRemoteEffect(
        this.actions$,
        AdminUserSessionRemoteActions.getAdminUserSession,
        (action) => this.adminUserAPI.getAdminUserSession(action.adminUserSessionId)
    )

    listAdminUserSessions$ = createRemoteEffect(
        this.actions$,
        AdminUserSessionRemoteActions.listAdminUserSessions,
        (action) => this.adminUserAPI.listAdminUserSessions(action.adminUserId, action.pagination)
    )

    invalidateAdminUserSession$ = createRemoteEffect(
        this.actions$,
        AdminUserSessionRemoteActions.invalidateAdminUserSession,
        (action) => this.adminUserAPI.invalidateAdminUserSession(action.adminUserSessionId)
    )

    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            AdminUserSessionLocalActions.updateAdminUserSessionFilters, 
            AdminUserSessionLocalActions.resetAdminUserSessionFilters
        ),
        debounceTime(200),
        withLatestFrom(this.adminUserFacade.selectedAdminUser$),
        map(([_, adminUser]) => AdminUserSessionRemoteActions.listAdminUserSessions.request({ adminUserId: adminUser?.id ?? null, pagination: null }))
    ))

    ngrxOnInitEffects() {
        return AdminUserSessionLocalActions.initialiseAdminUserSessionState()
    }
}