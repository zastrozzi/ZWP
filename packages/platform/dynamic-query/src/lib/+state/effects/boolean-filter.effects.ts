import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { BooleanFilterLocalActions, BooleanFilterRemoteActions } from '../actions'
import { debounceTime, filter, map } from 'rxjs'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'BooleanFilterEffects', options: { skipMethodDebugger: true } })
export class BooleanFilterEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private booleanFilterAPI = inject(Services.BOOLEAN_FILTER_API_SERVICE)
    private routerFacade = inject(ZWPRouterFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...BooleanFilterRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(BooleanFilterRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...BooleanFilterRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(BooleanFilterRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...BooleanFilterRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(BooleanFilterRemoteActions.identifiers)({ error: action.error }))
    ))

    // Local Action Effects
    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            BooleanFilterLocalActions.updateBooleanFilterFilters,
            BooleanFilterLocalActions.resetBooleanFilterFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        debounceTime(200),
        map(() => BooleanFilterRemoteActions.list.request({ pagination: null }))
    ))

    selectBooleanFilter$ = createEffect(() => this.actions$.pipe(
        ofType(BooleanFilterLocalActions.selectBooleanFilter),
        map((action) => BooleanFilterRemoteActions.get.request({ booleanFilterId: action.booleanFilterId }))
    ))

    // Remote Action CRUD Effects
    createBooleanFilter$ = createRemoteEffect(
        this.actions$,
        BooleanFilterRemoteActions.create,
        (action) => this.booleanFilterAPI.createBooleanFilter(action.parentId, action.parentType, action.request)
    )

    getBooleanFilter$ = createRemoteEffect(
        this.actions$,
        BooleanFilterRemoteActions.get,
        (action) => this.booleanFilterAPI.getBooleanFilter(action.booleanFilterId)
    )

    listBooleanFilters$ = createRemoteEffect(
        this.actions$,
        BooleanFilterRemoteActions.list,
        (action) => this.booleanFilterAPI.listBooleanFilters(action.parentId, action.parentType, action.pagination)
    )

    updateBooleanFilter$ = createRemoteEffect(
        this.actions$,
        BooleanFilterRemoteActions.update,
        (action) => this.booleanFilterAPI.updateBooleanFilter(action.booleanFilterId, action.update)
    )

    deleteBooleanFilter$ = createRemoteEffect(
        this.actions$,
        BooleanFilterRemoteActions.delete,
        (action) => this.booleanFilterAPI.deleteBooleanFilter(action.booleanFilterId)
    )

    // Remote Action Routing Effects

    ngrxOnInitEffects() {
        return BooleanFilterLocalActions.initialiseBooleanFilterState()
    }
}