import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { StructuredQueryLocalActions, StructuredQueryRemoteActions } from '../actions'
import { debounceTime, filter, map } from 'rxjs'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'StructuredQueryEffects', options: { skipMethodDebugger: true } })
export class StructuredQueryEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private structuredQueryAPI = inject(Services.STRUCTURED_QUERY_API_SERVICE)
    private routerFacade = inject(ZWPRouterFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...StructuredQueryRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(StructuredQueryRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...StructuredQueryRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(StructuredQueryRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...StructuredQueryRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(StructuredQueryRemoteActions.identifiers)({ error: action.error }))
    ))

    // Local Action Effects
    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            StructuredQueryLocalActions.updateStructuredQueryFilters,
            StructuredQueryLocalActions.resetStructuredQueryFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        debounceTime(200),
        map(() => StructuredQueryRemoteActions.list.request({ pagination: null }))
    ))

    selectStructuredQuery$ = createEffect(() => this.actions$.pipe(
        ofType(StructuredQueryLocalActions.selectStructuredQuery),
        map((action) => StructuredQueryRemoteActions.get.request({ structuredQueryId: action.structuredQueryId }))
    ))

    // Remote Action CRUD Effects
    createStructuredQuery$ = createRemoteEffect(
        this.actions$,
        StructuredQueryRemoteActions.create,
        (action) => this.structuredQueryAPI.createStructuredQuery(action.request)
    )

    getStructuredQuery$ = createRemoteEffect(
        this.actions$,
        StructuredQueryRemoteActions.get,
        (action) => this.structuredQueryAPI.getStructuredQuery(action.structuredQueryId)
    )

    listStructuredQueries$ = createRemoteEffect(
        this.actions$,
        StructuredQueryRemoteActions.list,
        (action) => this.structuredQueryAPI.listStructuredQueries(action.pagination)
    )

    updateStructuredQuery$ = createRemoteEffect(
        this.actions$,
        StructuredQueryRemoteActions.update,
        (action) => this.structuredQueryAPI.updateStructuredQuery(action.structuredQueryId, action.update)
    )

    deleteStructuredQuery$ = createRemoteEffect(
        this.actions$,
        StructuredQueryRemoteActions.delete,
        (action) => this.structuredQueryAPI.deleteStructuredQuery(action.structuredQueryId)
    )

    // Remote Action Routing Effects

    ngrxOnInitEffects() {
        return StructuredQueryLocalActions.initialiseStructuredQueryState()
    }
}