import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { NumericFilterLocalActions, NumericFilterRemoteActions } from '../actions'
import { debounceTime, filter, map } from 'rxjs'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'NumericFilterEffects', options: { skipMethodDebugger: true } })
export class NumericFilterEffects implements OnInitEffects {
  private actions$ = inject(Actions)
  private numericFilterAPI = inject(Services.NUMERIC_FILTER_API_SERVICE)
  private routerFacade = inject(ZWPRouterFacade)

  // Remote State Updates
  updateRemoteStateRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...NumericFilterRemoteActions.requestActions),
      map(() => remoteStateUpdateRequest(NumericFilterRemoteActions.identifiers)())
    )
  )

  updateRemoteStateSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...NumericFilterRemoteActions.successActions),
      map(() => remoteStateUpdateSuccess(NumericFilterRemoteActions.identifiers)())
    )
  )

  updateRemoteStateFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...NumericFilterRemoteActions.failureActions),
      map((action) =>
        remoteStateUpdateFailure(NumericFilterRemoteActions.identifiers)({ error: action.error })
      )
    )
  )

  // Local Action Effects
  updateOrResetFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        NumericFilterLocalActions.updateNumericFilterFilters,
        NumericFilterLocalActions.resetNumericFilterFilters
      ),
      filter((action) => action.triggerRemoteFetch),
      debounceTime(200),
      map(() => NumericFilterRemoteActions.list.request({ pagination: null }))
    )
  )

  selectNumericFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NumericFilterLocalActions.selectNumericFilter),
      map((action) => NumericFilterRemoteActions.get.request({ numericFilterId: action.numericFilterId }))
    )
  )

  // Remote Action CRUD Effects
  createNumericFilter$ = createRemoteEffect(
    this.actions$,
    NumericFilterRemoteActions.create,
    (action) =>
      this.numericFilterAPI.createNumericFilter(action.parentId, action.parentType, action.request)
  )

  getNumericFilter$ = createRemoteEffect(
    this.actions$,
    NumericFilterRemoteActions.get,
    (action) => this.numericFilterAPI.getNumericFilter(action.numericFilterId)
  )

  listNumericFilters$ = createRemoteEffect(
    this.actions$,
    NumericFilterRemoteActions.list,
    (action) =>
      this.numericFilterAPI.listNumericFilters(action.parentId, action.parentType, action.pagination)
  )

  updateNumericFilter$ = createRemoteEffect(
    this.actions$,
    NumericFilterRemoteActions.update,
    (action) => this.numericFilterAPI.updateNumericFilter(action.numericFilterId, action.update)
  )

  deleteNumericFilter$ = createRemoteEffect(
    this.actions$,
    NumericFilterRemoteActions.delete,
    (action) => this.numericFilterAPI.deleteNumericFilter(action.numericFilterId)
  )

  ngrxOnInitEffects() {
    return NumericFilterLocalActions.initialiseNumericFilterState()
  }
}