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
import { SubgroupEnduserSubscriptionLocalActions, SubgroupEnduserSubscriptionRemoteActions } from '../actions'
import { of, debounceTime, map, withLatestFrom, switchMap, filter } from 'rxjs'
import { Facades } from '../facades'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'PartnerNetSubgroupEnduserSubscriptionEffects', options: { skipMethodDebugger: true } })
export class PartnerNetSubgroupEnduserSubscriptionEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private enduserAPI = inject(Services.ENDUSER_API_SERVICE)
    private routerFacade = inject(ZWPRouterFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...SubgroupEnduserSubscriptionRemoteActions.requestActions),
            map(() => remoteStateUpdateRequest(SubgroupEnduserSubscriptionRemoteActions.identifiers)())
        )
    )

    updateRemoteStateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...SubgroupEnduserSubscriptionRemoteActions.successActions),
            map(() => remoteStateUpdateSuccess(SubgroupEnduserSubscriptionRemoteActions.identifiers)())
        )
    )

    updateRemoteStateFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...SubgroupEnduserSubscriptionRemoteActions.failureActions),
            map((action) => remoteStateUpdateFailure(SubgroupEnduserSubscriptionRemoteActions.identifiers)({ error: action.error }))
        )
    )

    // Local Action Effects - trigger list when filters update or reset and immediate remote fetch is requested
    // updateOrResetFilters$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(SubgroupEnduserSubscriptionLocalActions.updateSubgroupEnduserSubscriptionFilters, SubgroupEnduserSubscriptionLocalActions.resetSubgroupEnduserSubscriptionFilters),
    //         filter((action) => action.triggerRemoteFetch),
    //         debounceTime(200),
    //         map(() => SubgroupEnduserSubscriptionRemoteActions.list.request({ pagination: null }))
    //     )
    // )

    // Remote Action CRUD Effects
    // createSubgroupEnduserSubscription$ = createRemoteEffect(this.actions$, SubgroupEnduserSubscriptionRemoteActions.create, (action) =>
    //     this.partnerEnduserSubscriptionAPI.createSubgroupEnduserSubscription(action.parentId, action.parentType, action.request)
    // )

    // getSubgroupEnduserSubscription$ = createRemoteEffect(this.actions$, SubgroupEnduserSubscriptionRemoteActions.get, (action) =>
    //     this.partnerEnduserSubscriptionAPI.getSubgroupEnduserSubscription(action.partnerEnduserSubscriptionId)
    // )

    // listSubgroupEnduserSubscriptions$ = createRemoteEffect(this.actions$, SubgroupEnduserSubscriptionRemoteActions.list, (action) =>
    //     this.partnerEnduserSubscriptionFacade.partnerEnduserSubscriptionFilters$.pipe(
    //         withLatestFrom(of(action)),
    //         switchMap(([filters, requestAction]) =>
    //             this.partnerEnduserSubscriptionAPI.listSubgroupEnduserSubscriptions(
    //                 requestAction.parentId,
    //                 requestAction.parentType,
    //                 requestAction.pagination,
    //                 filters
    //             )
    //         )
    //     )
    // )

    // updateSubgroupEnduserSubscription$ = createRemoteEffect(this.actions$, SubgroupEnduserSubscriptionRemoteActions.update, (action) =>
    //     this.partnerEnduserSubscriptionAPI.updateSubgroupEnduserSubscription(action.partnerEnduserSubscriptionId, action.update)
    // )

    // deleteSubgroupEnduserSubscription$ = createRemoteEffect(this.actions$, SubgroupEnduserSubscriptionRemoteActions.delete, (action) =>
    //     this.partnerEnduserSubscriptionAPI.deleteSubgroupEnduserSubscription(action.partnerEnduserSubscriptionId)
    // )

    ngrxOnInitEffects() {
        return SubgroupEnduserSubscriptionLocalActions.initialiseSubgroupEnduserSubscriptionState()
    }
}
