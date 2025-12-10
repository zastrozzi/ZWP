import { inject, Inject, Injectable } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { Services } from '../../../services'
import { ZWPDebuggableInjectable, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { AdminUserDeviceRemoteActions, AdminUserDeviceLocalActions, AdminUserRemoteActions } from '../../actions'
import { debounceTime, delay, map, withLatestFrom } from 'rxjs'
import { UserAuthFacade } from '@zwp/platform.auth'
import { Facades } from '../../facades'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'AdminUserDeviceEffects', options: { skipMethodDebugger: true } })
export class AdminUserDeviceEffects implements OnInitEffects {

    private actions$ = inject(Actions)
    private adminUserAPI = inject(Services.ADMIN_USER_API_SERVICE)
    private userAuthFacade = inject(UserAuthFacade)
    private adminUserFacade = inject(Facades.AdminUserFacade)

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...AdminUserDeviceRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(AdminUserDeviceRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...AdminUserDeviceRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(AdminUserDeviceRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...AdminUserDeviceRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(AdminUserDeviceRemoteActions.identifiers)({ error: action.error }))
    ))

    getAdminUserDevice$ = createRemoteEffect(
        this.actions$,
        AdminUserDeviceRemoteActions.getAdminUserDevice,
        (action) => this.adminUserAPI.getAdminUserDevice(action.adminUserDeviceId)
    )

    listAdminUserDevices$ = createRemoteEffect(
        this.actions$,
        AdminUserDeviceRemoteActions.listAdminUserDevices,
        (action) => this.adminUserAPI.listAdminUserDevices(action.adminUserId, action.pagination)
    )

    logoutAdminUserReset$ = createEffect(() => this.actions$.pipe(
        ofType(AdminUserRemoteActions.logoutAdminUser.success),
        map(() => AdminUserDeviceLocalActions.resetAdminUserDeviceState())
    ))

    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            AdminUserDeviceLocalActions.updateAdminUserDeviceFilters, 
            AdminUserDeviceLocalActions.resetAdminUserDeviceFilters
        ),
        debounceTime(200),
        withLatestFrom(this.adminUserFacade.selectedAdminUser$),
        map(([_, adminUser]) => AdminUserDeviceRemoteActions.listAdminUserDevices.request({ adminUserId: adminUser?.id ?? null, pagination: null }))
    ))

    // listAdminUserDevicesOnFilterChange$ = createEffect(() => this.actions$.pipe(
    //     ofType(AdminUserDeviceLocalActions.updateAdminUserDeviceFilters),
    //     // delay(1000),
    //     map((filterUpdate) => AdminUserDeviceRemoteActions.listAdminUserDevices.request({ 
    //         adminUserId: filterUpdate.filters.adminUserId ?? null, 
    //         pagination: null 
    //     }))
    // ))

    ngrxOnInitEffects() {
        return AdminUserDeviceLocalActions.initialiseAdminUserDeviceState()
    }
}