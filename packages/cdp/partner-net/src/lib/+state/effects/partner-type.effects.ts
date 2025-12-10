import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateRequest, remoteStateUpdateSuccess, remoteStateUpdateFailure } from '@zwp/platform.common'
import { Services } from '../../services'
import { PartnerTypeLocalActions, PartnerTypeRemoteActions } from '../actions'
import { of, switchMap, withLatestFrom, debounceTime, map, filter } from 'rxjs'
import { Facades } from '../facades'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'PartnerNetPartnerTypeEffects', options: { skipMethodDebugger: true } })
export class PartnerNetPartnerTypeEffects implements OnInitEffects {
  private actions$ = inject(Actions)
  private partnerTypeAPI = inject(Services.PARTNER_TYPE_API_SERVICE)
  private partnerTypeFacade = inject(Facades.PartnerNetPartnerTypeFacade)
  private routerFacade = inject(ZWPRouterFacade)

  // Remote State Updates
  updateRemoteStateRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...PartnerTypeRemoteActions.requestActions),
      map(() => remoteStateUpdateRequest(PartnerTypeRemoteActions.identifiers)())
    )
  )

  updateRemoteStateSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...PartnerTypeRemoteActions.successActions),
      map(() => remoteStateUpdateSuccess(PartnerTypeRemoteActions.identifiers)())
    )
  )

  updateRemoteStateFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...PartnerTypeRemoteActions.failureActions),
      map(action => remoteStateUpdateFailure(PartnerTypeRemoteActions.identifiers)({ error: action.error }))
    )
  )

  // Local Action Effects - e.g. update or reset partnerType filters trigger a list request
  updateOrResetFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        PartnerTypeLocalActions.updatePartnerTypeFilters,
        PartnerTypeLocalActions.resetPartnerTypeFilters
      ),
      filter((action) => action.triggerRemoteFetch),
        debounceTime(200),
        map(() => PartnerTypeRemoteActions.list.request({ pagination: null }))
    )
  )

  // Remote Action CRUD Effects
  createPartnerType$ = createRemoteEffect(
    this.actions$,
    PartnerTypeRemoteActions.create,
    action => this.partnerTypeAPI.createPartnerType(action.request)
  )

  getPartnerType$ = createRemoteEffect(
    this.actions$,
    PartnerTypeRemoteActions.get,
    action => this.partnerTypeAPI.getPartnerType(action.partnerTypeId)
  )

  listPartnerTypes$ = createRemoteEffect(
    this.actions$,
    PartnerTypeRemoteActions.list,
    action => this.partnerTypeFacade.partnerTypeFilters$.pipe(
      withLatestFrom(of(action)),
      switchMap(([filters, requestAction]) =>
        this.partnerTypeAPI.listPartnerTypes(requestAction.parentId, requestAction.parentType, requestAction.pagination, filters)
      )
    )
  )

  updatePartnerType$ = createRemoteEffect(
    this.actions$,
    PartnerTypeRemoteActions.update,
    action => this.partnerTypeAPI.updatePartnerType(action.partnerTypeId, action.update)
  )

  deletePartnerType$ = createRemoteEffect(
    this.actions$,
    PartnerTypeRemoteActions.delete,
    action => this.partnerTypeAPI.deletePartnerType(action.partnerTypeId, action.force)
  )

  ngrxOnInitEffects() {
    return PartnerTypeLocalActions.initialisePartnerTypeState()
  }
}