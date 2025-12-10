import { Injectable, inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { QueryableSchemaColumnLocalActions, QueryableSchemaColumnRemoteActions } from '../actions'
import { map } from 'rxjs'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'QueryableSchemaColumnEffects', options: { skipMethodDebugger: true } })
export class QueryableSchemaColumnEffects {
    private actions$ = inject(Actions)
    private queryableSchemaAPI = inject(Services.QUERYABLE_SCHEMA_API_SERVICE)
    private routerFacade = inject(ZWPRouterFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...QueryableSchemaColumnRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(QueryableSchemaColumnRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...QueryableSchemaColumnRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(QueryableSchemaColumnRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...QueryableSchemaColumnRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(QueryableSchemaColumnRemoteActions.identifiers)({ error: action.error }))
    ))

    // Local Action Effects
    selectQueryableSchemaColumn$ = createEffect(() => this.actions$.pipe(
        ofType(QueryableSchemaColumnLocalActions.selectColumn),
        map((action) => QueryableSchemaColumnRemoteActions.getColumn.request({ columnId: action.columnId }))
    ))

    // Remote Action Effects
    getQueryableSchemaColumn$ = createRemoteEffect(
        this.actions$,
        QueryableSchemaColumnRemoteActions.getColumn,
        (action) => this.queryableSchemaAPI.getColumn(action.columnId)
    )

    listQueryableSchemaColumns$ = createRemoteEffect(
        this.actions$,
        QueryableSchemaColumnRemoteActions.listColumns,
        (action) => this.queryableSchemaAPI.listColumns(action.tableId, action.pagination)
    )

    // Remote Action Routing Effects
}