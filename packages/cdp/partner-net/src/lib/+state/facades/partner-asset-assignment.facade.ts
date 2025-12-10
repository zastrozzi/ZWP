import { inject, Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { PartnerAssetAssignmentLocalActions, PartnerAssetAssignmentRemoteActions } from '../actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({
    serviceName: 'PartnerNetPartnerAssetAssignmentFacade',
    options: { skipMethodDebugger: true },
})
export class PartnerNetPartnerAssetAssignmentFacade {
    private store = inject(Store)

    assetAssignmentFilters$ = this.store.pipe(
        select(Selectors.PartnerAssetAssignmentSelectors.selectPartnerAssetAssignmentFilters)
    )
    assetAssignmentRemotePagination$ = this.store.pipe(
        select(Selectors.PartnerAssetAssignmentSelectors.selectPartnerAssetAssignmentRemotePagination)
    )
    assetAssignmentRemoteState$ = this.store.pipe(
        select(Selectors.PartnerAssetAssignmentSelectors.selectPartnerAssetAssignmentRemoteState)
    )

    assetAssignments$ = this.store.pipe(
        select(Selectors.PartnerAssetAssignmentSelectors.selectAllPartnerAssetAssignments)
    )
    paginatedFilteredAssetAssignments$ = this.store.pipe(
        select(Selectors.PartnerAssetAssignmentSelectors.selectPaginatedFilteredPartnerAssetAssignments)
    )
    assetAssignmentsForSelectedPartner$ = this.store.pipe(
        select(Selectors.PartnerAssetAssignmentSelectors.selectPartnerAssetAssignmentsForSelectedPartner)
    )
    assetAssignmentsForSelectedAsset$ = this.store.pipe(
        select(Selectors.PartnerAssetAssignmentSelectors.selectPartnerAssetAssignmentsForSelectedAsset)
    )
    selectedAssetAssignment$ = this.store.pipe(
        select(Selectors.PartnerAssetAssignmentSelectors.selectedPartnerAssetAssignment)
    )
    selectedAssetAssignmentId$ = this.store.pipe(
        select(Selectors.PartnerAssetAssignmentSelectors.selectSelectedPartnerAssetAssignmentId)
    )

    assetAssignmentById$ = (id: string) =>
        this.store.pipe(select(Selectors.PartnerAssetAssignmentSelectors.selectPartnerAssetAssignmentById(id)))
    assetAssignmentsForPartner$ = (partnerId: string) =>
        this.store.pipe(
            select(Selectors.PartnerAssetAssignmentSelectors.selectPartnerAssetAssignmentsForPartner(partnerId))
        )
    assetAssignmentsForAsset$ = (assetId: string) =>
        this.store.pipe(
            select(Selectors.PartnerAssetAssignmentSelectors.selectPartnerAssetAssignmentsForAsset(assetId))
        )

    addAssetToPartner(assetId: string, partnerId: string, request: Model.CreateAssetAssignmentRequest) {
        return this.store.dispatch(PartnerAssetAssignmentRemoteActions.add.request({ assetId, partnerId, request }))
    }

    removeAssetFromPartner(assetId: string, partnerId: string) {
        return this.store.dispatch(PartnerAssetAssignmentRemoteActions.remove.request({ assetId, partnerId }))
    }

    getAssetAssignment(assetAssignmentId: string) {
        return this.store.dispatch(
            PartnerAssetAssignmentRemoteActions.get.request({ partnerAssetAssignmentId: assetAssignmentId })
        )
    }

    listAssetAssignments(
        parentId: Nullable<string>,
        parentType: 'partner' | 'asset' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.PartnerAssetAssignmentResponse>>> = null
    ) {
        return this.store.dispatch(
            PartnerAssetAssignmentRemoteActions.list.request({ parentId, parentType, pagination })
        )
    }

    updateAssetAssignment(assetAssignmentId: string, update: Model.UpdateAssetAssignmentRequest) {
        return this.store.dispatch(
            PartnerAssetAssignmentRemoteActions.update.request({
                partnerAssetAssignmentId: assetAssignmentId,
                request: update,
            })
        )
    }

    deleteAssetAssignment(assetAssignmentId: string, force: boolean = false) {
        return this.store.dispatch(
            PartnerAssetAssignmentRemoteActions.delete.request({ partnerAssetAssignmentId: assetAssignmentId, force })
        )
    }

    selectAssetAssignment(assetAssignmentId: string) {
        return this.store.dispatch(
            PartnerAssetAssignmentLocalActions.selectPartnerAssetAssignment({
                partnerAssetAssignmentId: assetAssignmentId,
            })
        )
    }

    deselectAssetAssignment() {
        return this.store.dispatch(PartnerAssetAssignmentLocalActions.deselectPartnerAssetAssignment())
    }

    updateAssetAssignmentFilters(
        filters: Partial<Model.PartnerAssetAssignmentFilters>,
        triggerRemoteFetch: boolean = true
    ) {
        return this.store.dispatch(
            PartnerAssetAssignmentLocalActions.updatePartnerAssetAssignmentFilters({ filters, triggerRemoteFetch })
        )
    }

    resetAssetAssignmentFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(
            PartnerAssetAssignmentLocalActions.resetPartnerAssetAssignmentFilters({ triggerRemoteFetch })
        )
    }

    resetPagination() {
        return this.store.dispatch(PartnerAssetAssignmentLocalActions.resetPagination())
    }
}
