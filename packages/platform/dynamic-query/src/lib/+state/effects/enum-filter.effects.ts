import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { EnumFilterLocalActions, EnumFilterRemoteActions } from '../actions'
import { debounceTime, filter, map } from 'rxjs'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'EnumFilterEffects', options: { skipMethodDebugger: true } })
export class EnumFilterEffects implements OnInitEffects {
  private actions$ = inject(Actions)
  private enumFilterAPI = inject(Services.ENUM_FILTER_API_SERVICE)
  private routerFacade = inject(ZWPRouterFacade)

  // Remote State Updates
  updateRemoteStateRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...EnumFilterRemoteActions.requestActions),
      map(() => remoteStateUpdateRequest(EnumFilterRemoteActions.identifiers)())
    )
  )

  updateRemoteStateSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...EnumFilterRemoteActions.successActions),
      map(() => remoteStateUpdateSuccess(EnumFilterRemoteActions.identifiers)())
    )
  )

  updateRemoteStateFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...EnumFilterRemoteActions.failureActions),
      map((action) =>
        remoteStateUpdateFailure(EnumFilterRemoteActions.identifiers)({ error: action.error })
      )
    )
  )

  // Local Action Effects
  updateOrResetFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        EnumFilterLocalActions.updateEnumFilterFilters,
        EnumFilterLocalActions.resetEnumFilterFilters
      ),
      filter((action) => action.triggerRemoteFetch),
      debounceTime(200),
      map(() => EnumFilterRemoteActions.list.request({ pagination: null }))
    )
  )

  selectEnumFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnumFilterLocalActions.selectEnumFilter),
      map((action) => EnumFilterRemoteActions.get.request({ enumFilterId: action.enumFilterId }))
    )
  )

  // Remote Action CRUD Effects
  createEnumFilter$ = createRemoteEffect(
    this.actions$,
    EnumFilterRemoteActions.create,
    (action) => this.enumFilterAPI.createEnumFilter(action.parentId, action.parentType, action.request)
  )

  getEnumFilter$ = createRemoteEffect(
    this.actions$,
    EnumFilterRemoteActions.get,
    (action) => this.enumFilterAPI.getEnumFilter(action.enumFilterId)
  )

  listEnumFilters$ = createRemoteEffect(
    this.actions$,
    EnumFilterRemoteActions.list,
    (action) =>
      this.enumFilterAPI.listEnumFilters(action.parentId, action.parentType, action.pagination)
  )

  updateEnumFilter$ = createRemoteEffect(
    this.actions$,
    EnumFilterRemoteActions.update,
    (action) => this.enumFilterAPI.updateEnumFilter(action.enumFilterId, action.update)
  )

  deleteEnumFilter$ = createRemoteEffect(
    this.actions$,
    EnumFilterRemoteActions.delete,
    (action) => this.enumFilterAPI.deleteEnumFilter(action.enumFilterId)
  )

  ngrxOnInitEffects() {
    return EnumFilterLocalActions.initialiseEnumFilterState()
  }
}