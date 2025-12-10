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
import { SubgroupLocalActions, SubgroupRemoteActions } from '../actions'
import { debounceTime, filter, map, of, switchMap, withLatestFrom } from 'rxjs'
import { Facades } from '../facades'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'PartnerNetSubgroupEffects', options: { skipMethodDebugger: true } })
export class PartnerNetSubgroupEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private subgroupAPI = inject(Services.SUBGROUP_API_SERVICE)
    private subgroupFacade = inject(Facades.PartnerNetSubgroupFacade)
    private routerFacade = inject(ZWPRouterFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...SubgroupRemoteActions.requestActions),
            map(() => remoteStateUpdateRequest(SubgroupRemoteActions.identifiers)())
        )
    )

    updateRemoteStateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...SubgroupRemoteActions.successActions),
            map(() => remoteStateUpdateSuccess(SubgroupRemoteActions.identifiers)())
        )
    )

    updateRemoteStateFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...SubgroupRemoteActions.failureActions),
            map((action) => remoteStateUpdateFailure(SubgroupRemoteActions.identifiers)({ error: action.error }))
        )
    )

    // Local Action Effects
    updateOrResetFilters$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SubgroupLocalActions.updateSubgroupFilters, SubgroupLocalActions.resetSubgroupFilters),
            filter((action) => action.triggerRemoteFetch),
            debounceTime(200),
            map(() => SubgroupRemoteActions.list.request({ pagination: null }))
        )
    )

    selectSubgroup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SubgroupLocalActions.selectSubgroup),
            map((action) => SubgroupRemoteActions.get.request({ subgroupId: action.subgroupId }))
        )
    )

    // Remote Action CRUD Effects
    createSubgroup$ = createRemoteEffect(this.actions$, SubgroupRemoteActions.create, (action) =>
        this.subgroupAPI.createSubgroup(action.partnerId, action.request)
    )

    getSubgroup$ = createRemoteEffect(this.actions$, SubgroupRemoteActions.get, (action) =>
        this.subgroupAPI.getSubgroup(action.subgroupId)
    )

    listSubgroups$ = createRemoteEffect(this.actions$, SubgroupRemoteActions.list, (action) =>
        of(action).pipe(
            withLatestFrom(this.subgroupFacade.subgroupFilters$),
            switchMap(([requestAction, subgroupFilters]) =>
                this.subgroupAPI.listSubgroups(
                    requestAction.parentId,
                    requestAction.parentType,
                    requestAction.pagination,
                    subgroupFilters
                )
            )
        )
    )

    updateSubgroup$ = createRemoteEffect(this.actions$, SubgroupRemoteActions.update, (action) =>
        this.subgroupAPI.updateSubgroup(action.subgroupId, action.update)
    )

    deleteSubgroup$ = createRemoteEffect(this.actions$, SubgroupRemoteActions.delete, (action) =>
        this.subgroupAPI.deleteSubgroup(action.subgroupId, action.force)
    )

    // OnInitEffects
    ngrxOnInitEffects() {
        return SubgroupLocalActions.initialiseSubgroupState()
    }
}
