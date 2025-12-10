import { inject, Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { QueryableSchemaRelationshipLocalActions, QueryableSchemaRelationshipRemoteActions } from '../actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'QueryableSchemaRelationshipFacade', options: { skipMethodDebugger: true } })
export class QueryableSchemaRelationshipFacade {
    private store = inject(Store)

    relationshipRemotePagination$ = this.store.pipe(
        select(Selectors.QueryableSchemaRelationshipSelectors.selectQueryableSchemaRelationshipRemotePagination)
    )
    relationshipRemoteState$ = this.store.pipe(
        select(Selectors.QueryableSchemaRelationshipSelectors.selectQueryableSchemaRelationshipRemoteState)
    )

    relationships$ = this.store.pipe(
        select(Selectors.QueryableSchemaRelationshipSelectors.selectAllQueryableSchemaRelationships)
    )
    selectedRelationship$ = this.store.pipe(
        select(Selectors.QueryableSchemaRelationshipSelectors.selectedQueryableSchemaRelationship)
    )
    selectedRelationshipId$ = this.store.pipe(
        select(Selectors.QueryableSchemaRelationshipSelectors.selectSelectedQueryableSchemaRelationshipId)
    )

    relationshipsForSelectedTable$ = this.store.pipe(
        select(Selectors.QueryableSchemaRelationshipSelectors.selectQueryableSchemaRelationshipsForSelectedTable)
    )

    relationshipById$ = (id: string) =>
        this.store.pipe(
            select(Selectors.QueryableSchemaRelationshipSelectors.selectQueryableSchemaRelationshipById(id))
        )
    relationshipsForTable$ = (tableId: string) =>
        this.store.pipe(
            select(Selectors.QueryableSchemaRelationshipSelectors.selectQueryableSchemaRelationshipsForTable(tableId))
        )
    uniqueRelationshipsForTable$ = (tableId: string) =>
        this.store.pipe(
            select(
                Selectors.QueryableSchemaRelationshipSelectors.selectUniqueQueryableSchemaRelationshipsForTable(tableId)
            )
        )

    getRelationship(relationshipId: string) {
        return this.store.dispatch(QueryableSchemaRelationshipRemoteActions.getRelationship.request({ relationshipId }))
    }

    listRelationships(
        tableId: Nullable<string> = null,
        relationshipType: Nullable<Model.RelationshipType> = null,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.QueryableSchemaRelationshipResponse>>> = null
    ) {
        return this.store.dispatch(
            QueryableSchemaRelationshipRemoteActions.listRelationships.request({
                tableId: tableId,
                relationshipType: relationshipType,
                pagination: pagination,
            })
        )
    }

    selectRelationship(relationshipId: string) {
        return this.store.dispatch(QueryableSchemaRelationshipLocalActions.selectRelationship({ relationshipId }))
    }

    deselectRelationship() {
        return this.store.dispatch(QueryableSchemaRelationshipLocalActions.deselectRelationship())
    }

    resetPagination() {
        return this.store.dispatch(QueryableSchemaRelationshipLocalActions.resetPagination())
    }
}
