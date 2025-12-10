import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import {
    ZWPDebuggableInjectable,
    ZWPRouterFacade,
    createRemoteEffect,
    remoteStateUpdateFailure,
    remoteStateUpdateRequest,
    remoteStateUpdateSuccess,
} from '@zwp/platform.common'
import { Services } from '../../services'
import { PartnerLocalActions, PartnerRemoteActions } from '../actions'
import { debounceTime, filter, map, of, switchMap, withLatestFrom } from 'rxjs'
import { Facades } from '../facades'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'PartnerNetPartnerEffects', options: { skipMethodDebugger: true } })
export class PartnerNetPartnerEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private partnerAPI = inject(Services.PARTNER_API_SERVICE)
    private partnerFacade = inject(Facades.PartnerNetPartnerFacade)
    private routerFacade = inject(ZWPRouterFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...PartnerRemoteActions.requestActions),
            map(() => remoteStateUpdateRequest(PartnerRemoteActions.identifiers)())
        )
    )

    updateRemoteStateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...PartnerRemoteActions.successActions),
            map(() => remoteStateUpdateSuccess(PartnerRemoteActions.identifiers)())
        )
    )

    updateRemoteStateFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...PartnerRemoteActions.failureActions),
            map((action) => remoteStateUpdateFailure(PartnerRemoteActions.identifiers)({ error: action.error }))
        )
    )

    // Local Action Effects
    updateOrResetFilters$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PartnerLocalActions.updatePartnerFilters, PartnerLocalActions.resetPartnerFilters),
            filter((action) => action.triggerRemoteFetch),
            debounceTime(200),
            map(() => PartnerRemoteActions.list.request({ parentId: null, parentType: 'none', pagination: null }))
        )
    )

    selectPartner$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PartnerLocalActions.selectPartner),
            map((action) => PartnerRemoteActions.get.request({ partnerId: action.partnerId }))
        )
    )

    // Remote Action CRUD Effects
    createPartner$ = createRemoteEffect(this.actions$, PartnerRemoteActions.create, (action) =>
        this.partnerAPI.createPartner(action.request)
    )

    getPartner$ = createRemoteEffect(this.actions$, PartnerRemoteActions.get, (action) =>
        this.partnerAPI.getPartner(action.partnerId)
    )

    listPartners$ = createRemoteEffect(this.actions$, PartnerRemoteActions.list, (action) =>
        of(action).pipe(
            withLatestFrom(this.partnerFacade.partnerFilters$),
            switchMap(([requestAction, partnerFilters]) =>
                this.partnerAPI.listPartners(
                    requestAction.parentId,
                    requestAction.parentType,
                    requestAction.pagination,
                    partnerFilters
                )
            )
        )
    )

    updatePartner$ = createRemoteEffect(this.actions$, PartnerRemoteActions.update, (action) =>
        this.partnerAPI.updatePartner(action.partnerId, action.update)
    )

    deletePartner$ = createRemoteEffect(this.actions$, PartnerRemoteActions.delete, (action) =>
        this.partnerAPI.deletePartner(action.partnerId, action.force)
    )

    // OnInitEffects
    ngrxOnInitEffects() {
        return PartnerLocalActions.initialisePartnerState()
    }
}
