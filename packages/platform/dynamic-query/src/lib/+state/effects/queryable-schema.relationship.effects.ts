import { Injectable, inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { QueryableSchemaRelationshipLocalActions, QueryableSchemaRelationshipRemoteActions } from '../actions'
import { map } from 'rxjs'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'QueryableSchemaRelationshipEffects', options: { skipMethodDebugger: true } })
export class QueryableSchemaRelationshipEffects {
    private actions$ = inject(Actions)
    private queryableSchemaAPI = inject(Services.QUERYABLE_SCHEMA_API_SERVICE)
    private routerFacade = inject(ZWPRouterFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...QueryableSchemaRelationshipRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(QueryableSchemaRelationshipRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...QueryableSchemaRelationshipRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(QueryableSchemaRelationshipRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...QueryableSchemaRelationshipRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(QueryableSchemaRelationshipRemoteActions.identifiers)({ error: action.error }))
    ))

    // Local Action Effects
    selectQueryableSchemaRelationship$ = createEffect(() => this.actions$.pipe(
        ofType(QueryableSchemaRelationshipLocalActions.selectRelationship),
        map((action) => QueryableSchemaRelationshipRemoteActions.getRelationship.request({ relationshipId: action.relationshipId }))
    ))

    // Remote Action Effects
    getQueryableSchemaRelationship$ = createRemoteEffect(
        this.actions$,
        QueryableSchemaRelationshipRemoteActions.getRelationship,
        (action) => this.queryableSchemaAPI.getRelationship(action.relationshipId)
    )

    listQueryableSchemaRelationships$ = createRemoteEffect(
        this.actions$,
        QueryableSchemaRelationshipRemoteActions.listRelationships,
        (action) => this.queryableSchemaAPI.listRelationships(action.tableId, action.relationshipType, action.pagination)
    )

    // Remote Action Routing Effects
}