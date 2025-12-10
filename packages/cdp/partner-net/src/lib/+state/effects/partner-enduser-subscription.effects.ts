import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import {
    ZWPDebuggableInjectable,
    ZWPRouterFacade,
    createRemoteEffect,
    remoteStateUpdateRequest,
    remoteStateUpdateSuccess,
    remoteStateUpdateFailure,
} from '@zwp/platform.common'
import { Services } from '../../services'
import { PartnerEnduserSubscriptionLocalActions, PartnerEnduserSubscriptionRemoteActions } from '../actions'
import { of, debounceTime, map, withLatestFrom, switchMap, filter } from 'rxjs'
import { Facades } from '../facades'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'PartnerNetPartnerEnduserSubscriptionEffects', options: { skipMethodDebugger: true } })
export class PartnerNetPartnerEnduserSubscriptionEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private enduserAPI = inject(Services.ENDUSER_API_SERVICE)
    private routerFacade = inject(ZWPRouterFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...PartnerEnduserSubscriptionRemoteActions.requestActions),
            map(() => remoteStateUpdateRequest(PartnerEnduserSubscriptionRemoteActions.identifiers)())
        )
    )

    updateRemoteStateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...PartnerEnduserSubscriptionRemoteActions.successActions),
            map(() => remoteStateUpdateSuccess(PartnerEnduserSubscriptionRemoteActions.identifiers)())
        )
    )

    updateRemoteStateFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...PartnerEnduserSubscriptionRemoteActions.failureActions),
            map((action) => remoteStateUpdateFailure(PartnerEnduserSubscriptionRemoteActions.identifiers)({ error: action.error }))
        )
    )

    // Local Action Effects - trigger list when filters update or reset and immediate remote fetch is requested
    // updateOrResetFilters$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(PartnerEnduserSubscriptionLocalActions.updatePartnerEnduserSubscriptionFilters, PartnerEnduserSubscriptionLocalActions.resetPartnerEnduserSubscriptionFilters),
    //         filter((action) => action.triggerRemoteFetch),
    //         debounceTime(200),
    //         map(() => PartnerEnduserSubscriptionRemoteActions.list.request({ pagination: null }))
    //     )
    // )

    // Remote Action CRUD Effects
    // createPartnerEnduserSubscription$ = createRemoteEffect(this.actions$, PartnerEnduserSubscriptionRemoteActions.create, (action) =>
    //     this.partnerEnduserSubscriptionAPI.createPartnerEnduserSubscription(action.parentId, action.parentType, action.request)
    // )

    // getPartnerEnduserSubscription$ = createRemoteEffect(this.actions$, PartnerEnduserSubscriptionRemoteActions.get, (action) =>
    //     this.partnerEnduserSubscriptionAPI.getPartnerEnduserSubscription(action.partnerEnduserSubscriptionId)
    // )

    // listPartnerEnduserSubscriptions$ = createRemoteEffect(this.actions$, PartnerEnduserSubscriptionRemoteActions.list, (action) =>
    //     this.partnerEnduserSubscriptionFacade.partnerEnduserSubscriptionFilters$.pipe(
    //         withLatestFrom(of(action)),
    //         switchMap(([filters, requestAction]) =>
    //             this.partnerEnduserSubscriptionAPI.listPartnerEnduserSubscriptions(
    //                 requestAction.parentId,
    //                 requestAction.parentType,
    //                 requestAction.pagination,
    //                 filters
    //             )
    //         )
    //     )
    // )

    // updatePartnerEnduserSubscription$ = createRemoteEffect(this.actions$, PartnerEnduserSubscriptionRemoteActions.update, (action) =>
    //     this.partnerEnduserSubscriptionAPI.updatePartnerEnduserSubscription(action.partnerEnduserSubscriptionId, action.update)
    // )

    // deletePartnerEnduserSubscription$ = createRemoteEffect(this.actions$, PartnerEnduserSubscriptionRemoteActions.delete, (action) =>
    //     this.partnerEnduserSubscriptionAPI.deletePartnerEnduserSubscription(action.partnerEnduserSubscriptionId)
    // )

    ngrxOnInitEffects() {
        return PartnerEnduserSubscriptionLocalActions.initialisePartnerEnduserSubscriptionState()
    }
}
