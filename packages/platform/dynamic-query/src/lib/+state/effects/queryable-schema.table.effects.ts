import { Injectable, inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { QueryableSchemaTableLocalActions, QueryableSchemaTableRemoteActions } from '../actions'
import { debounceTime, filter, map, of, switchMap, withLatestFrom } from 'rxjs'
import { Facades } from '../facades'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'QueryableSchemaTableEffects', options: { skipMethodDebugger: true } })
export class QueryableSchemaTableEffects {
    private actions$ = inject(Actions)
    private queryableSchemaAPI = inject(Services.QUERYABLE_SCHEMA_API_SERVICE)
    private routerFacade = inject(ZWPRouterFacade)
    private queryableSchemaTableFacade = inject(Facades.QueryableSchemaTableFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...QueryableSchemaTableRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(QueryableSchemaTableRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...QueryableSchemaTableRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(QueryableSchemaTableRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...QueryableSchemaTableRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(QueryableSchemaTableRemoteActions.identifiers)({ error: action.error }))
    ))

    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
            ofType(
                QueryableSchemaTableLocalActions.updateTableFilters,
                QueryableSchemaTableLocalActions.resetTableFilters
            ),
            filter((action) => action.triggerRemoteFetch),
            debounceTime(200),
            map(() => QueryableSchemaTableRemoteActions.listTables.request({ pagination: null }))
        ))

    // Local Action Effects
    selectQueryableSchemaTable$ = createEffect(() => this.actions$.pipe(
        ofType(QueryableSchemaTableLocalActions.selectTable),
        map((action) => QueryableSchemaTableRemoteActions.getTable.request({ tableId: action.tableId }))
    ))

    // Remote Action Effects
    getQueryableSchemaTable$ = createRemoteEffect(
        this.actions$,
        QueryableSchemaTableRemoteActions.getTable,
        (action) => this.queryableSchemaAPI.getTable(action.tableId)
    )

    listQueryableSchemaTables$ = createRemoteEffect(
        this.actions$,
        QueryableSchemaTableRemoteActions.listTables,
        (action) => of(action).pipe(
            withLatestFrom(this.queryableSchemaTableFacade.tableFilters$),
            switchMap(([requestAction, tableFilters]) => this.queryableSchemaAPI.listTables(requestAction.pagination, tableFilters))
        )
    )

    // Remote Action Routing Effects
}