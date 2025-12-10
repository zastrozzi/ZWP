import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { CDPUsers } from '@zwp/cdp.users'
import { Services } from '../../services'
import { UserLocalActions, UserRemoteActions } from '../actions/user.actions'
import { debounceTime, filter, map, mergeMap, of, withLatestFrom } from 'rxjs'
import { Facades } from '../facades'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'TinkUserEffects', options: { skipMethodDebugger: true } })
export class TinkUserEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private userAPI = inject(Services.TINK_USER_API_SERVICE)
    private userFacade = inject(Facades.TinkUserFacade)
    private enduserFacade = inject(CDPUsers.State.EnduserFacade)
    private routerFacade = inject(ZWPRouterFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...UserRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(UserRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...UserRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(UserRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...UserRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(UserRemoteActions.identifiers)({ error: action.error }))
    ))


    // Local Action Effects
    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            UserLocalActions.updateUserFilters, 
            UserLocalActions.resetUserFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        withLatestFrom(this.enduserFacade.selectedEnduserId$),
        debounceTime(200),
        map(([_, enduserId]) => UserRemoteActions.listUsers.request({ enduserId: enduserId, pagination: null }))
    ))

    selectUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserLocalActions.selectUser),
        map((action) => UserRemoteActions.getUser.request({ tinkUserId: action.userId }))
    ))

    createUser$ = createRemoteEffect(
        this.actions$,
        UserRemoteActions.createUser,
        (action) => this.userAPI.createUser(action.enduserId, action.request)
    )

    getUser$ = createRemoteEffect(this.actions$, UserRemoteActions.getUser, (action) =>
        this.userAPI.getUser(action.tinkUserId)
    )

    listUsers$ = createRemoteEffect(this.actions$, UserRemoteActions.listUsers, (action) =>
        of(action).pipe(
            withLatestFrom(this.userFacade.userFilters$),
            mergeMap(([action, filters]) => this.userAPI.listUsers(action.enduserId, action.pagination, filters))
        )
    )

    deleteUser$ = createRemoteEffect(
        this.actions$, 
        UserRemoteActions.deleteUser, 
        (action) => this.userAPI.deleteUser(action.tinkUserId),
        (action) => ({ tinkUserId: action.tinkUserId })
    )

    refreshUser$ = createRemoteEffect(
        this.actions$, 
        UserRemoteActions.refreshUser, 
        (action) => this.userAPI.refreshUser(action.tinkUserId),
        (action) => ({ tinkUserId: action.tinkUserId })
    )

    relinkUser$ = createRemoteEffect(
        this.actions$,
        UserRemoteActions.relinkUser,
        (action) => this.userAPI.relinkUser(action.enduserId)
    )

    ngrxOnInitEffects() {
        return UserLocalActions.initialiseUserState()
    }
}