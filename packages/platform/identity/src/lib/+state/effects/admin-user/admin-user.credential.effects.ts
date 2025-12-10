import { inject, Inject, Injectable } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { Services } from '../../../services'
import { ZWPDebuggableInjectable, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { AdminUserCredentialRemoteActions, AdminUserCredentialLocalActions, AdminUserRemoteActions } from '../../actions'
import { debounceTime, delay, map, withLatestFrom } from 'rxjs'
import { UserAuthFacade } from '@zwp/platform.auth'
import { Facades } from '../../facades'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'AdminUserCredentialEffects', options: { skipMethodDebugger: true } })
export class AdminUserCredentialEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private adminUserAPI = inject(Services.ADMIN_USER_API_SERVICE)
    private userAuthFacade = inject(UserAuthFacade)
    private adminUserFacade = inject(Facades.AdminUserFacade)

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...AdminUserCredentialRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(AdminUserCredentialRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...AdminUserCredentialRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(AdminUserCredentialRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...AdminUserCredentialRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(AdminUserCredentialRemoteActions.identifiers)({ error: action.error }))
    ))

    createAdminUserCredential$ = createRemoteEffect(
        this.actions$,
        AdminUserCredentialRemoteActions.createAdminUserCredential,
        (action) => this.adminUserAPI.createAdminUserCredential(action.adminUserId, action.request)
    )

    getAdminUserCredential$ = createRemoteEffect(
        this.actions$,
        AdminUserCredentialRemoteActions.getAdminUserCredential,
        (action) => this.adminUserAPI.getAdminUserCredential(action.adminUserCredentialId)
    )

    listAdminUserCredentials$ = createRemoteEffect(
        this.actions$,
        AdminUserCredentialRemoteActions.listAdminUserCredentials,
        (action) => this.adminUserAPI.listAdminUserCredentials(action.adminUserId, action.pagination)
    )

    updateAdminUserCredential$ = createRemoteEffect(
        this.actions$,
        AdminUserCredentialRemoteActions.updateAdminUserCredential,
        (action) => this.adminUserAPI.updateAdminUserCredential(action.adminUserCredentialId, action.update)
    )

    deleteAdminUserCredential$ = createRemoteEffect(
        this.actions$,
        AdminUserCredentialRemoteActions.deleteAdminUserCredential,
        (action) => this.adminUserAPI.deleteAdminUserCredential(action.adminUserCredentialId)
    )

    logoutAdminUserReset$ = createEffect(() => this.actions$.pipe(
        ofType(AdminUserRemoteActions.logoutAdminUser.success),
        map(() => AdminUserCredentialLocalActions.resetAdminUserCredentialState())
    ))

    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            AdminUserCredentialLocalActions.updateAdminUserCredentialFilters, 
            AdminUserCredentialLocalActions.resetAdminUserCredentialFilters
        ),
        debounceTime(200),
        withLatestFrom(this.adminUserFacade.selectedAdminUser$),
        map(([_, adminUser]) => AdminUserCredentialRemoteActions.listAdminUserCredentials.request({ adminUserId: adminUser?.id ?? null, pagination: null }))
    ))

    // listAdminUserCredentialsOnFilterChange$ = createEffect(() => this.actions$.pipe(
    //     ofType(AdminUserCredentialLocalActions.updateAdminUserCredentialFilters),
    //     delay(0),
    //     map((filterUpdate) => AdminUserCredentialRemoteActions.listAdminUserCredentials.request({
    //         adminUserId: filterUpdate.filters.adminUserId ?? null,
    //         pagination: null
    //     }))
    // ))

    ngrxOnInitEffects() {
        return AdminUserCredentialLocalActions.initialiseAdminUserCredentialState()
    }
}