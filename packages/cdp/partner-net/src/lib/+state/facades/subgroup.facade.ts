import { inject, Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { SubgroupLocalActions, SubgroupRemoteActions } from '../actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'PartnerNetSubgroupFacade', options: { skipMethodDebugger: true } })
export class PartnerNetSubgroupFacade {
    private store = inject(Store)

    subgroupFilters$ = this.store.pipe(select(Selectors.SubgroupSelectors.selectSubgroupFilters))
    subgroupRemotePagination$ = this.store.pipe(select(Selectors.SubgroupSelectors.selectSubgroupRemotePagination))
    subgroupRemoteState$ = this.store.pipe(select(Selectors.SubgroupSelectors.selectSubgroupRemoteState))

    subgroups$ = this.store.pipe(select(Selectors.SubgroupSelectors.selectAllSubgroups))
    paginatedFilteredSubgroups$ = this.store.pipe(select(Selectors.SubgroupSelectors.selectPaginatedFilteredSubgroups))
    subgroupsForSelectedAsset$ = this.store.pipe(
        select(Selectors.SubgroupAssetAssignmentSelectors.selectSubgroupsForSelectedAsset)
    )
    subgroupsForSelectedPartner$ = this.store.pipe(
        select(Selectors.SubgroupSelectors.selectSubgroupsForSelectedPartner)
    )
    subgroupsForSelectedEnduser$ = this.store.pipe(
        select(Selectors.SubgroupEnduserSubscriptionSelectors.selectSubgroupsForSelectedEnduser)
    )
    selectedSubgroup$ = this.store.pipe(select(Selectors.SubgroupSelectors.selectedSubgroup))
    selectedSubgroupId$ = this.store.pipe(select(Selectors.SubgroupSelectors.selectSelectedSubgroupId))

    subgroupById$ = (id: string) => this.store.pipe(select(Selectors.SubgroupSelectors.selectSubgroupById(id)))

    subgroupsForAsset$ = (assetId: string) =>
        this.store.pipe(select(Selectors.SubgroupAssetAssignmentSelectors.selectSubgroupsForAsset(assetId)))

    subgroupsForPartner$ = (partnerId: string) =>
        this.store.pipe(select(Selectors.SubgroupSelectors.selectSubgroupsForPartner(partnerId)))
    
    subgroupsForEnduser$ = (enduserId: string) =>
        this.store.pipe(select(Selectors.SubgroupEnduserSubscriptionSelectors.selectSubgroupsForEnduser(enduserId))
    )

    createSubgroup(request: Model.CreatePartnerSubgroupRequest) {
        return this.store.dispatch(SubgroupRemoteActions.create.request({ request }))
    }

    getSubgroup(subgroupId: string) {
        return this.store.dispatch(SubgroupRemoteActions.get.request({ subgroupId }))
    }

    listSubgroups(
        parentId: Nullable<string> = null,
        parentType: 'partner' | 'asset' | 'enduser' | 'none' = 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.SubgroupResponse>>> = null
    ) {
        return this.store.dispatch(SubgroupRemoteActions.list.request({ parentId, parentType, pagination }))
    }

    updateSubgroup(subgroupId: string, update: Model.UpdatePartnerSubgroupRequest) {
        return this.store.dispatch(SubgroupRemoteActions.update.request({ subgroupId, update }))
    }

    deleteSubgroup(subgroupId: string, force: boolean = false) {
        return this.store.dispatch(SubgroupRemoteActions.delete.request({ subgroupId, force }))
    }

    selectSubgroup(subgroupId: string) {
        return this.store.dispatch(SubgroupLocalActions.selectSubgroup({ subgroupId }))
    }

    deselectSubgroup() {
        return this.store.dispatch(SubgroupLocalActions.deselectSubgroup())
    }

    updateSubgroupFilters(filters: Partial<Model.SubgroupFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(SubgroupLocalActions.updateSubgroupFilters({ filters, triggerRemoteFetch }))
    }

    resetSubgroupFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(SubgroupLocalActions.resetSubgroupFilters({ triggerRemoteFetch }))
    }

    resetPagination() {
        return this.store.dispatch(SubgroupLocalActions.resetPagination())
    }
}
