import { inject, Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { SubgroupAssetAssignmentLocalActions, SubgroupAssetAssignmentRemoteActions } from '../actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({
    serviceName: 'PartnerNetSubgroupAssetAssignmentFacade',
    options: { skipMethodDebugger: true },
})
export class PartnerNetSubgroupAssetAssignmentFacade {
    private store = inject(Store)

    assetAssignmentFilters$ = this.store.pipe(
        select(Selectors.SubgroupAssetAssignmentSelectors.selectSubgroupAssetAssignmentFilters)
    )
    assetAssignmentRemotePagination$ = this.store.pipe(
        select(Selectors.SubgroupAssetAssignmentSelectors.selectSubgroupAssetAssignmentRemotePagination)
    )
    assetAssignmentRemoteState$ = this.store.pipe(
        select(Selectors.SubgroupAssetAssignmentSelectors.selectSubgroupAssetAssignmentRemoteState)
    )

    assetAssignments$ = this.store.pipe(
        select(Selectors.SubgroupAssetAssignmentSelectors.selectAllSubgroupAssetAssignments)
    )
    paginatedFilteredAssetAssignments$ = this.store.pipe(
        select(Selectors.SubgroupAssetAssignmentSelectors.selectPaginatedFilteredSubgroupAssetAssignments)
    )
    assetAssignmentsForSelectedSubgroup$ = this.store.pipe(
        select(Selectors.SubgroupAssetAssignmentSelectors.selectSubgroupAssetAssignmentsForSelectedSubgroup)
    )
    assetAssignmentsForSelectedAsset$ = this.store.pipe(
        select(Selectors.SubgroupAssetAssignmentSelectors.selectSubgroupAssetAssignmentsForSelectedAsset)
    )
    selectedAssetAssignment$ = this.store.pipe(
        select(Selectors.SubgroupAssetAssignmentSelectors.selectedSubgroupAssetAssignment)
    )
    selectedAssetAssignmentId$ = this.store.pipe(
        select(Selectors.SubgroupAssetAssignmentSelectors.selectSelectedSubgroupAssetAssignmentId)
    )

    assetAssignmentById$ = (id: string) =>
        this.store.pipe(select(Selectors.SubgroupAssetAssignmentSelectors.selectSubgroupAssetAssignmentById(id)))
    assetAssignmentsForSubgroup$ = (subgroupId: string) =>
        this.store.pipe(
            select(Selectors.SubgroupAssetAssignmentSelectors.selectSubgroupAssetAssignmentsForSubgroup(subgroupId))
        )
    assetAssignmentsForAsset$ = (assetId: string) =>
        this.store.pipe(
            select(Selectors.SubgroupAssetAssignmentSelectors.selectSubgroupAssetAssignmentsForAsset(assetId))
        )

    addAssetToSubgroup(assetId: string, subgroupId: string, request: Model.CreateAssetAssignmentRequest) {
        return this.store.dispatch(SubgroupAssetAssignmentRemoteActions.add.request({ assetId, subgroupId, request }))
    }

    removeAssetFromSubgroup(assetId: string, subgroupId: string) {
        return this.store.dispatch(SubgroupAssetAssignmentRemoteActions.remove.request({ assetId, subgroupId }))
    }

    getAssetAssignment(assetAssignmentId: string) {
        return this.store.dispatch(
            SubgroupAssetAssignmentRemoteActions.get.request({ subgroupAssetAssignmentId: assetAssignmentId })
        )
    }

    listAssetAssignments(
        parentId: Nullable<string>,
        parentType: 'subgroup' | 'asset' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.SubgroupAssetAssignmentResponse>>> = null
    ) {
        return this.store.dispatch(
            SubgroupAssetAssignmentRemoteActions.list.request({ parentId, parentType, pagination })
        )
    }

    updateAssetAssignment(assetAssignmentId: string, update: Model.UpdateAssetAssignmentRequest) {
        return this.store.dispatch(
            SubgroupAssetAssignmentRemoteActions.update.request({
                subgroupAssetAssignmentId: assetAssignmentId,
                request: update,
            })
        )
    }

    deleteAssetAssignment(assetAssignmentId: string, force: boolean = false) {
        return this.store.dispatch(
            SubgroupAssetAssignmentRemoteActions.delete.request({ subgroupAssetAssignmentId: assetAssignmentId, force })
        )
    }

    selectAssetAssignment(assetAssignmentId: string) {
        return this.store.dispatch(
            SubgroupAssetAssignmentLocalActions.selectSubgroupAssetAssignment({
                subgroupAssetAssignmentId: assetAssignmentId,
            })
        )
    }

    deselectAssetAssignment() {
        return this.store.dispatch(SubgroupAssetAssignmentLocalActions.deselectSubgroupAssetAssignment())
    }

    updateAssetAssignmentFilters(
        filters: Partial<Model.SubgroupAssetAssignmentFilters>,
        triggerRemoteFetch: boolean = true
    ) {
        return this.store.dispatch(
            SubgroupAssetAssignmentLocalActions.updateSubgroupAssetAssignmentFilters({ filters, triggerRemoteFetch })
        )
    }

    resetAssetAssignmentFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(
            SubgroupAssetAssignmentLocalActions.resetSubgroupAssetAssignmentFilters({ triggerRemoteFetch })
        )
    }

    resetPagination() {
        return this.store.dispatch(SubgroupAssetAssignmentLocalActions.resetPagination())
    }
}
