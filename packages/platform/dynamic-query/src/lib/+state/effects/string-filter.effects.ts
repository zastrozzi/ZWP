import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { StringFilterLocalActions, StringFilterRemoteActions } from '../actions'
import { debounceTime, filter, map } from 'rxjs'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'StringFilterEffects', options: { skipMethodDebugger: true } })
export class StringFilterEffects implements OnInitEffects {
  private actions$ = inject(Actions)
  private stringFilterAPI = inject(Services.STRING_FILTER_API_SERVICE)
  private routerFacade = inject(ZWPRouterFacade)

  // Remote State Updates
  updateRemoteStateRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...StringFilterRemoteActions.requestActions),
      map(() => remoteStateUpdateRequest(StringFilterRemoteActions.identifiers)())
    )
  )

  updateRemoteStateSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...StringFilterRemoteActions.successActions),
      map(() => remoteStateUpdateSuccess(StringFilterRemoteActions.identifiers)())
    )
  )

  updateRemoteStateFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...StringFilterRemoteActions.failureActions),
      map((action) =>
        remoteStateUpdateFailure(StringFilterRemoteActions.identifiers)({ error: action.error })
      )
    )
  )

  // Local Action Effects
  updateOrResetFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        StringFilterLocalActions.updateStringFilterFilters,
        StringFilterLocalActions.resetStringFilterFilters
      ),
      filter((action) => action.triggerRemoteFetch),
      debounceTime(200),
      map(() => StringFilterRemoteActions.list.request({ pagination: null }))
    )
  )

  selectStringFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StringFilterLocalActions.selectStringFilter),
      map((action) => StringFilterRemoteActions.get.request({ stringFilterId: action.stringFilterId }))
    )
  )

  // Remote Action CRUD Effects
  createStringFilter$ = createRemoteEffect(
    this.actions$,
    StringFilterRemoteActions.create,
    (action) => this.stringFilterAPI.createStringFilter(action.parentId, action.parentType, action.request)
  )

  getStringFilter$ = createRemoteEffect(
    this.actions$,
    StringFilterRemoteActions.get,
    (action) => this.stringFilterAPI.getStringFilter(action.stringFilterId)
  )

  listStringFilters$ = createRemoteEffect(
    this.actions$,
    StringFilterRemoteActions.list,
    (action) =>
      this.stringFilterAPI.listStringFilters(action.parentId, action.parentType, action.pagination)
  )

  updateStringFilter$ = createRemoteEffect(
    this.actions$,
    StringFilterRemoteActions.update,
    (action) => this.stringFilterAPI.updateStringFilter(action.stringFilterId, action.update)
  )

  deleteStringFilter$ = createRemoteEffect(
    this.actions$,
    StringFilterRemoteActions.delete,
    (action) => this.stringFilterAPI.deleteStringFilter(action.stringFilterId)
  )

  ngrxOnInitEffects() {
    return StringFilterLocalActions.initialiseStringFilterState()
  }
}