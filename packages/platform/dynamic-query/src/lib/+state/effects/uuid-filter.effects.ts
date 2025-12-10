import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { UUIDFilterLocalActions, UUIDFilterRemoteActions } from '../actions'
import { debounceTime, filter, map } from 'rxjs'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'UUIDFilterEffects', options: { skipMethodDebugger: true } })
export class UUIDFilterEffects implements OnInitEffects {
  private actions$ = inject(Actions)
  private uuidFilterAPI = inject(Services.UUID_FILTER_API_SERVICE)
  private routerFacade = inject(ZWPRouterFacade)

  // Remote State Updates
  updateRemoteStateRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...UUIDFilterRemoteActions.requestActions),
      map(() => remoteStateUpdateRequest(UUIDFilterRemoteActions.identifiers)())
    )
  )

  updateRemoteStateSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...UUIDFilterRemoteActions.successActions),
      map(() => remoteStateUpdateSuccess(UUIDFilterRemoteActions.identifiers)())
    )
  )

  updateRemoteStateFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...UUIDFilterRemoteActions.failureActions),
      map((action) =>
        remoteStateUpdateFailure(UUIDFilterRemoteActions.identifiers)({ error: action.error })
      )
    )
  )

  // Local Action Effects
  updateOrResetFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        UUIDFilterLocalActions.updateUUIDFilterFilters,
        UUIDFilterLocalActions.resetUUIDFilterFilters
      ),
      filter((action) => action.triggerRemoteFetch),
      debounceTime(200),
      map(() => UUIDFilterRemoteActions.list.request({ pagination: null }))
    )
  )

  selectUUIDFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UUIDFilterLocalActions.selectUUIDFilter),
      map((action) => UUIDFilterRemoteActions.get.request({ uuidFilterId: action.uuidFilterId }))
    )
  )

  // Remote Action CRUD Effects
  createUUIDFilter$ = createRemoteEffect(
    this.actions$,
    UUIDFilterRemoteActions.create,
    (action) => this.uuidFilterAPI.createUUIDFilter(action.parentId, action.parentType, action.request)
  )

  getUUIDFilter$ = createRemoteEffect(
    this.actions$,
    UUIDFilterRemoteActions.get,
    (action) => this.uuidFilterAPI.getUUIDFilter(action.uuidFilterId)
  )

  listUUIDFilters$ = createRemoteEffect(
    this.actions$,
    UUIDFilterRemoteActions.list,
    (action) =>
      this.uuidFilterAPI.listUUIDFilters(action.parentId, action.parentType, action.pagination)
  )

  updateUUIDFilter$ = createRemoteEffect(
    this.actions$,
    UUIDFilterRemoteActions.update,
    (action) => this.uuidFilterAPI.updateUUIDFilter(action.uuidFilterId, action.update)
  )

  deleteUUIDFilter$ = createRemoteEffect(
    this.actions$,
    UUIDFilterRemoteActions.delete,
    (action) => this.uuidFilterAPI.deleteUUIDFilter(action.uuidFilterId)
  )

  ngrxOnInitEffects() {
    return UUIDFilterLocalActions.initialiseUUIDFilterState()
  }
}