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
import { SubgroupAssetAssignmentLocalActions, SubgroupAssetAssignmentRemoteActions } from '../actions'
import { of, debounceTime, map, withLatestFrom, switchMap, filter } from 'rxjs'
import { Facades } from '../facades'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'PartnerNetSubgroupAssetAssignmentEffects', options: { skipMethodDebugger: true } })
export class PartnerNetSubgroupAssetAssignmentEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    // private subgroupAssetAssignmentAPI = inject(Services.PARTNER_ASSET_ASSIGNMENT_API_SERVICE)
    private routerFacade = inject(ZWPRouterFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...SubgroupAssetAssignmentRemoteActions.requestActions),
            map(() => remoteStateUpdateRequest(SubgroupAssetAssignmentRemoteActions.identifiers)())
        )
    )

    updateRemoteStateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...SubgroupAssetAssignmentRemoteActions.successActions),
            map(() => remoteStateUpdateSuccess(SubgroupAssetAssignmentRemoteActions.identifiers)())
        )
    )

    updateRemoteStateFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...SubgroupAssetAssignmentRemoteActions.failureActions),
            map((action) => remoteStateUpdateFailure(SubgroupAssetAssignmentRemoteActions.identifiers)({ error: action.error }))
        )
    )

    // Local Action Effects - trigger list when filters update or reset and immediate remote fetch is requested
    // updateOrResetFilters$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(SubgroupAssetAssignmentLocalActions.updateSubgroupAssetAssignmentFilters, SubgroupAssetAssignmentLocalActions.resetSubgroupAssetAssignmentFilters),
    //         filter((action) => action.triggerRemoteFetch),
    //         debounceTime(200),
    //         map(() => SubgroupAssetAssignmentRemoteActions.list.request({ pagination: null }))
    //     )
    // )

    // Remote Action CRUD Effects
    // createSubgroupAssetAssignment$ = createRemoteEffect(this.actions$, SubgroupAssetAssignmentRemoteActions.create, (action) =>
    //     this.subgroupAssetAssignmentAPI.createSubgroupAssetAssignment(action.parentId, action.parentType, action.request)
    // )

    // getSubgroupAssetAssignment$ = createRemoteEffect(this.actions$, SubgroupAssetAssignmentRemoteActions.get, (action) =>
    //     this.subgroupAssetAssignmentAPI.getSubgroupAssetAssignment(action.subgroupAssetAssignmentId)
    // )

    // listSubgroupAssetAssignments$ = createRemoteEffect(this.actions$, SubgroupAssetAssignmentRemoteActions.list, (action) =>
    //     this.subgroupAssetAssignmentFacade.subgroupAssetAssignmentFilters$.pipe(
    //         withLatestFrom(of(action)),
    //         switchMap(([filters, requestAction]) =>
    //             this.subgroupAssetAssignmentAPI.listSubgroupAssetAssignments(
    //                 requestAction.parentId,
    //                 requestAction.parentType,
    //                 requestAction.pagination,
    //                 filters
    //             )
    //         )
    //     )
    // )

    // updateSubgroupAssetAssignment$ = createRemoteEffect(this.actions$, SubgroupAssetAssignmentRemoteActions.update, (action) =>
    //     this.subgroupAssetAssignmentAPI.updateSubgroupAssetAssignment(action.subgroupAssetAssignmentId, action.update)
    // )

    // deleteSubgroupAssetAssignment$ = createRemoteEffect(this.actions$, SubgroupAssetAssignmentRemoteActions.delete, (action) =>
    //     this.subgroupAssetAssignmentAPI.deleteSubgroupAssetAssignment(action.subgroupAssetAssignmentId)
    // )

    ngrxOnInitEffects() {
        return SubgroupAssetAssignmentLocalActions.initialiseSubgroupAssetAssignmentState()
    }
}
