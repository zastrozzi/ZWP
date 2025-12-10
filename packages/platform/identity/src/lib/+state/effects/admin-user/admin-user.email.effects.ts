import { inject, Inject, Injectable } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { Services } from '../../../services'
import { ZWPDebuggableInjectable, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { AdminUserEmailRemoteActions, AdminUserEmailLocalActions, AdminUserRemoteActions } from '../../actions'
import { debounceTime, delay, map, withLatestFrom } from 'rxjs'
import { UserAuthFacade } from '@zwp/platform.auth'
import { AdminUserFacade } from '../../facades'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'AdminUserEmailEffects', options: { skipMethodDebugger: true } })
export class AdminUserEmailEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private adminUserAPI = inject(Services.ADMIN_USER_API_SERVICE)
    private userAuthFacade = inject(UserAuthFacade)
    private adminUserFacade = inject(AdminUserFacade)

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...AdminUserEmailRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(AdminUserEmailRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...AdminUserEmailRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(AdminUserEmailRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...AdminUserEmailRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(AdminUserEmailRemoteActions.identifiers)({ error: action.error }))
    ))

    createAdminUserEmail$ = createRemoteEffect(
        this.actions$,
        AdminUserEmailRemoteActions.createAdminUserEmail,
        (action) => this.adminUserAPI.createAdminUserEmail(action.adminUserId, action.request)
    )

    getAdminUserEmail$ = createRemoteEffect(
        this.actions$,
        AdminUserEmailRemoteActions.getAdminUserEmail,
        (action) => this.adminUserAPI.getAdminUserEmail(action.adminUserEmailId)
    )

    listAdminUserEmails$ = createRemoteEffect(
        this.actions$,
        AdminUserEmailRemoteActions.listAdminUserEmails,
        (action) => this.adminUserAPI.listAdminUserEmails(action.adminUserId, action.pagination)
    )

    updateAdminUserEmail$ = createRemoteEffect(
        this.actions$,
        AdminUserEmailRemoteActions.updateAdminUserEmail,
        (action) => this.adminUserAPI.updateAdminUserEmail(action.adminUserEmailId, action.update)
    )

    deleteAdminUserEmail$ = createRemoteEffect(
        this.actions$,
        AdminUserEmailRemoteActions.deleteAdminUserEmail,
        (action) => this.adminUserAPI.deleteAdminUserEmail(action.adminUserEmailId)
    )

    logoutAdminUserReset$ = createEffect(() => this.actions$.pipe(
        ofType(AdminUserRemoteActions.logoutAdminUser.success),
        map(() => AdminUserEmailLocalActions.resetAdminUserEmailState())
    ))

    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            AdminUserEmailLocalActions.updateAdminUserEmailFilters, 
            AdminUserEmailLocalActions.resetAdminUserEmailFilters
        ),
        debounceTime(200),
        withLatestFrom(this.adminUserFacade.selectedAdminUser$),
        map(([_, adminUser]) => AdminUserEmailRemoteActions.listAdminUserEmails.request({ adminUserId: adminUser?.id ?? null, pagination: null }))
    ))

    // listAdminUserEmailsOnFilterChange$ = createEffect(() => this.actions$.pipe(
    //     ofType(AdminUserEmailLocalActions.updateAdminUserEmailFilters),
    //     // delay(1000),
    //     map((filterUpdate) => AdminUserEmailRemoteActions.listAdminUserEmails.request({ 
    //         adminUserId: filterUpdate.filters.adminUserId ?? null, 
    //         pagination: null 
    //     }))
    // ))

    ngrxOnInitEffects() {
        return AdminUserEmailLocalActions.initialiseAdminUserEmailState()
    }
}