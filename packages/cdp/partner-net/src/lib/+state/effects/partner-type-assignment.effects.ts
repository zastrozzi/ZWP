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
import { PartnerTypeAssignmentLocalActions, PartnerTypeAssignmentRemoteActions } from '../actions'
import { of, debounceTime, map, withLatestFrom, switchMap, filter } from 'rxjs'
import { Facades } from '../facades'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'PartnerNetPartnerTypeAssignmentEffects', options: { skipMethodDebugger: true } })
export class PartnerNetPartnerTypeAssignmentEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private partnerTypeAssignmentAPI = inject(Services.PARTNER_TYPE_ASSIGNMENT_API_SERVICE)
    private routerFacade = inject(ZWPRouterFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...PartnerTypeAssignmentRemoteActions.requestActions),
            map(() => remoteStateUpdateRequest(PartnerTypeAssignmentRemoteActions.identifiers)())
        )
    )

    updateRemoteStateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...PartnerTypeAssignmentRemoteActions.successActions),
            map(() => remoteStateUpdateSuccess(PartnerTypeAssignmentRemoteActions.identifiers)())
        )
    )

    updateRemoteStateFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...PartnerTypeAssignmentRemoteActions.failureActions),
            map((action) => remoteStateUpdateFailure(PartnerTypeAssignmentRemoteActions.identifiers)({ error: action.error }))
        )
    )

    // Local Action Effects - trigger list when filters update or reset and immediate remote fetch is requested
    // updateOrResetFilters$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(PartnerTypeAssignmentLocalActions.updatePartnerTypeAssignmentFilters, PartnerTypeAssignmentLocalActions.resetPartnerTypeAssignmentFilters),
    //         filter((action) => action.triggerRemoteFetch),
    //         debounceTime(200),
    //         map(() => PartnerTypeAssignmentRemoteActions.list.request({ pagination: null }))
    //     )
    // )

    // Remote Action CRUD Effects
    // createPartnerTypeAssignment$ = createRemoteEffect(this.actions$, PartnerTypeAssignmentRemoteActions.create, (action) =>
    //     this.partnerTypeAssignmentAPI.createPartnerTypeAssignment(action.parentId, action.parentType, action.request)
    // )

    getPartnerTypeAssignment$ = createRemoteEffect(this.actions$, PartnerTypeAssignmentRemoteActions.get, (action) =>
        this.partnerTypeAssignmentAPI.getPartnerTypeAssignment(action.partnerTypeAssignmentId)
    )

    // listPartnerTypeAssignments$ = createRemoteEffect(this.actions$, PartnerTypeAssignmentRemoteActions.list, (action) =>
    //     this.partnerTypeAssignmentFacade.partnerTypeAssignmentFilters$.pipe(
    //         withLatestFrom(of(action)),
    //         switchMap(([filters, requestAction]) =>
    //             this.partnerTypeAssignmentAPI.listPartnerTypeAssignments(
    //                 requestAction.parentId,
    //                 requestAction.parentType,
    //                 requestAction.pagination,
    //                 filters
    //             )
    //         )
    //     )
    // )

    // updatePartnerTypeAssignment$ = createRemoteEffect(this.actions$, PartnerTypeAssignmentRemoteActions.update, (action) =>
    //     this.partnerTypeAssignmentAPI.updatePartnerTypeAssignment(action.partnerTypeAssignmentId, action.update)
    // )

    deletePartnerTypeAssignment$ = createRemoteEffect(this.actions$, PartnerTypeAssignmentRemoteActions.delete, (action) =>
        this.partnerTypeAssignmentAPI.deletePartnerTypeAssignment(action.partnerTypeAssignmentId, action.force)
    )

    ngrxOnInitEffects() {
        return PartnerTypeAssignmentLocalActions.initialisePartnerTypeAssignmentState()
    }
}
