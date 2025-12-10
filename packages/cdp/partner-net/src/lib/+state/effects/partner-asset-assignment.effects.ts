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
import { PartnerAssetAssignmentLocalActions, PartnerAssetAssignmentRemoteActions } from '../actions'
import { of, debounceTime, map, withLatestFrom, switchMap, filter } from 'rxjs'
import { Facades } from '../facades'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'PartnerNetPartnerAssetAssignmentEffects', options: { skipMethodDebugger: true } })
export class PartnerNetPartnerAssetAssignmentEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private partnerAssetAssignmentAPI = inject(Services.PARTNER_ASSET_ASSIGNMENT_API_SERVICE)
    private partnerAssetAssignmentFacade = inject(Facades.PartnerNetPartnerAssetAssignmentFacade)
    private routerFacade = inject(ZWPRouterFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...PartnerAssetAssignmentRemoteActions.requestActions),
            map(() => remoteStateUpdateRequest(PartnerAssetAssignmentRemoteActions.identifiers)())
        )
    )

    updateRemoteStateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...PartnerAssetAssignmentRemoteActions.successActions),
            map(() => remoteStateUpdateSuccess(PartnerAssetAssignmentRemoteActions.identifiers)())
        )
    )

    updateRemoteStateFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...PartnerAssetAssignmentRemoteActions.failureActions),
            map((action) => remoteStateUpdateFailure(PartnerAssetAssignmentRemoteActions.identifiers)({ error: action.error }))
        )
    )

    // Local Action Effects - trigger list when filters update or reset and immediate remote fetch is requested
    updateOrResetFilters$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PartnerAssetAssignmentLocalActions.updatePartnerAssetAssignmentFilters, PartnerAssetAssignmentLocalActions.resetPartnerAssetAssignmentFilters),
            filter((action) => action.triggerRemoteFetch),
            debounceTime(200),
            map(() => PartnerAssetAssignmentRemoteActions.list.request({ pagination: null, parentId: null, parentType: 'none' }))
        )
    )

    // Remote Action CRUD Effects
    getPartnerAssetAssignment$ = createRemoteEffect(this.actions$, PartnerAssetAssignmentRemoteActions.get, (action) =>
        this.partnerAssetAssignmentAPI.getAssetAssignment(action.partnerAssetAssignmentId)
    )

    listPartnerAssetAssignments$ = createRemoteEffect(this.actions$, PartnerAssetAssignmentRemoteActions.list, (action) =>
        this.partnerAssetAssignmentFacade.assetAssignmentFilters$.pipe(
            withLatestFrom(of(action)),
            switchMap(([filters, requestAction]) =>
                this.partnerAssetAssignmentAPI.listAssetAssignments(
                    requestAction.parentId,
                    requestAction.parentType,
                    requestAction.pagination,
                    filters
                )
            )
        )
    )

    updatePartnerAssetAssignment$ = createRemoteEffect(this.actions$, PartnerAssetAssignmentRemoteActions.update, (action) =>
        this.partnerAssetAssignmentAPI.updateAssetAssignment(action.partnerAssetAssignmentId, action.request)
    )

    deletePartnerAssetAssignment$ = createRemoteEffect(this.actions$, PartnerAssetAssignmentRemoteActions.delete, (action) =>
        this.partnerAssetAssignmentAPI.deleteAssetAssignment(action.partnerAssetAssignmentId, action.force)
    )

    ngrxOnInitEffects() {
        return PartnerAssetAssignmentLocalActions.initialisePartnerAssetAssignmentState()
    }
}
