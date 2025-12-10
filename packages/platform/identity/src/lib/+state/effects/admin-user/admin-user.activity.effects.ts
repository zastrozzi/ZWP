import { Inject, Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { Services } from '../../../services'
import { ZWPDebuggableInjectable, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { AdminUserActivityLocalActions, AdminUserActivityRemoteActions, AdminUserRemoteActions } from '../../actions'
import { debounceTime, delay, map, withLatestFrom } from 'rxjs'
import { UserAuthFacade } from '@zwp/platform.auth'
import { AdminUserFacade } from '../../facades'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'AdminUserActivityEffects', options: { skipMethodDebugger: true } })
export class AdminUserActivityEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private adminUserAPI = inject(Services.ADMIN_USER_API_SERVICE)
    private userAuthFacade = inject(UserAuthFacade)
    private adminUserFacade = inject(AdminUserFacade)

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...AdminUserActivityRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(AdminUserActivityRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...AdminUserActivityRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(AdminUserActivityRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...AdminUserActivityRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(AdminUserActivityRemoteActions.identifiers)({ error: action.error }))
    ))

    listAdminUserActivity$ = createRemoteEffect(
        this.actions$,
        AdminUserActivityRemoteActions.listAdminUserActivity,
        (action) => this.adminUserAPI.listAdminUserActivity(action.adminUserId, action.pagination)
    )

    // listAdminUserActivityOnFilterChange$ = createEffect(() => this.actions$.pipe(
    //     ofType(AdminUserActivityLocalActions.updateAdminUserActivityFilters),
    //     // delay(1000),
    //     map((filterUpdate) => AdminUserActivityRemoteActions.listAdminUserActivity.request({ 
    //         adminUserId: filterUpdate.filters.adminUserId ?? null, 
    //         pagination: null 
    //     }))
    // ))

    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            AdminUserActivityLocalActions.updateAdminUserActivityFilters, 
            AdminUserActivityLocalActions.resetAdminUserActivityFilters
        ),
        debounceTime(200),
        withLatestFrom(this.adminUserFacade.selectedAdminUser$),
        map(([_, adminUser]) => AdminUserActivityRemoteActions.listAdminUserActivity.request({ adminUserId: adminUser?.id ?? null, pagination: null }))
    ))

    logoutAdminUserReset$ = createEffect(() => this.actions$.pipe(
        ofType(AdminUserRemoteActions.logoutAdminUser.success),
        map(() => AdminUserActivityLocalActions.resetAdminUserActivityState())
    ))

    // listAdminUserActivityOnFilterChange$ = createEffect(() => this.actions$.pipe(
    //     ofType(AdminUserActivityLocalActions.updateAdminUserActivityFilters),
    //     // delay(1000),
    //     map((filterUpdate) => AdminUserActivityRemoteActions.listAdminUserActivity.request({ 
    //         adminUserId: filterUpdate.filters.adminUserId ?? null, 
    //         pagination: null 
    //     }))
    // ))

    ngrxOnInitEffects() {
        return AdminUserActivityLocalActions.initialiseAdminUserActivityState()
    }
}
