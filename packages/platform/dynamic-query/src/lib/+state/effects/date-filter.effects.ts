import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { DateFilterLocalActions, DateFilterRemoteActions } from '../actions'
import { debounceTime, filter, map } from 'rxjs'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'DateFilterEffects', options: { skipMethodDebugger: true } })
export class DateFilterEffects implements OnInitEffects {
  private actions$ = inject(Actions)
  private dateFilterAPI = inject(Services.DATE_FILTER_API_SERVICE)
  private routerFacade = inject(ZWPRouterFacade)

  // Remote State Updates
  updateRemoteStateRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...DateFilterRemoteActions.requestActions),
      map(() => remoteStateUpdateRequest(DateFilterRemoteActions.identifiers)())
    )
  )

  updateRemoteStateSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...DateFilterRemoteActions.successActions),
      map(() => remoteStateUpdateSuccess(DateFilterRemoteActions.identifiers)())
    )
  )

  updateRemoteStateFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...DateFilterRemoteActions.failureActions),
      map((action) =>
        remoteStateUpdateFailure(DateFilterRemoteActions.identifiers)({ error: action.error })
      )
    )
  )

  // Local Action Effects
  updateOrResetFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        DateFilterLocalActions.updateDateFilterFilters,
        DateFilterLocalActions.resetDateFilterFilters
      ),
      filter((action) => action.triggerRemoteFetch),
      debounceTime(200),
      map(() => DateFilterRemoteActions.list.request({ pagination: null }))
    )
  )

  selectDateFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DateFilterLocalActions.selectDateFilter),
      map((action) => DateFilterRemoteActions.get.request({ dateFilterId: action.dateFilterId }))
    )
  )

  // Remote Action CRUD Effects
  createDateFilter$ = createRemoteEffect(
    this.actions$,
    DateFilterRemoteActions.create,
    (action) => this.dateFilterAPI.createDateFilter(action.parentId, action.parentType, action.request)
  )

  getDateFilter$ = createRemoteEffect(
    this.actions$,
    DateFilterRemoteActions.get,
    (action) => this.dateFilterAPI.getDateFilter(action.dateFilterId)
  )

  listDateFilters$ = createRemoteEffect(
    this.actions$,
    DateFilterRemoteActions.list,
    (action) => this.dateFilterAPI.listDateFilters(action.parentId, action.parentType, action.pagination)
  )

  updateDateFilter$ = createRemoteEffect(
    this.actions$,
    DateFilterRemoteActions.update,
    (action) => this.dateFilterAPI.updateDateFilter(action.dateFilterId, action.update)
  )

  deleteDateFilter$ = createRemoteEffect(
    this.actions$,
    DateFilterRemoteActions.delete,
    (action) => this.dateFilterAPI.deleteDateFilter(action.dateFilterId)
  )

  ngrxOnInitEffects() {
    return DateFilterLocalActions.initialiseDateFilterState()
  }
}