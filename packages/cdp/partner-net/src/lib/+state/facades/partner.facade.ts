import { inject, Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { PartnerLocalActions, PartnerRemoteActions } from '../actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'PartnerNetPartnerFacade', options: { skipMethodDebugger: true } })
export class PartnerNetPartnerFacade {
    private store = inject(Store)

    partnerFilters$ = this.store.pipe(select(Selectors.PartnerSelectors.selectPartnerFilters))
    partnerRemotePagination$ = this.store.pipe(select(Selectors.PartnerSelectors.selectPartnerRemotePagination))
    partnerRemoteState$ = this.store.pipe(select(Selectors.PartnerSelectors.selectPartnerRemoteState))

    partners$ = this.store.pipe(select(Selectors.PartnerSelectors.selectAllPartners))
    paginatedFilteredPartners$ = this.store.pipe(select(Selectors.PartnerSelectors.selectPaginatedFilteredPartners))
    partnersForSelectedAsset$ = this.store.pipe(
        select(Selectors.PartnerAssetAssignmentSelectors.selectPartnersForSelectedAsset)
    )
    partnersForSelectedPartnerType$ = this.store.pipe(
        select(Selectors.PartnerTypeAssignmentSelectors.selectPartnersForSelectedPartnerType)
    )
    partnersForSelectedEnduser$ = this.store.pipe(
        select(Selectors.PartnerEnduserSubscriptionSelectors.selectPartnersForSelectedEnduser)
    )
    selectedPartner$ = this.store.pipe(select(Selectors.PartnerSelectors.selectedPartner))
    selectedPartnerId$ = this.store.pipe(select(Selectors.PartnerSelectors.selectSelectedPartnerId))

    partnerById$ = (id: string) => this.store.pipe(select(Selectors.PartnerSelectors.selectPartnerById(id)))
    partnersForAsset$ = (assetId: string) =>
        this.store.pipe(select(Selectors.PartnerAssetAssignmentSelectors.selectPartnersForAsset(assetId)))
    partnersForPartnerType$ = (partnerTypeId: string) =>
        this.store.pipe(select(Selectors.PartnerTypeAssignmentSelectors.selectPartnersForPartnerType(partnerTypeId)))
    partnersForEnduser$ = (enduserId: string) =>
        this.store.pipe(select(Selectors.PartnerEnduserSubscriptionSelectors.selectPartnersForEnduser(enduserId))
    )

    createPartner(request: Model.CreatePartnerRequest) {
        return this.store.dispatch(PartnerRemoteActions.create.request({ request }))
    }

    getPartner(partnerId: string) {
        return this.store.dispatch(PartnerRemoteActions.get.request({ partnerId }))
    }

    listPartners(
        parentId: Nullable<string> = null,
        parentType: 'partnerType' | 'asset' | 'enduser' | 'none' = 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.PartnerResponse>>> = null
    ) {
        return this.store.dispatch(PartnerRemoteActions.list.request({ parentId, parentType, pagination }))
    }

    updatePartner(partnerId: string, update: Model.UpdatePartnerRequest) {
        return this.store.dispatch(PartnerRemoteActions.update.request({ partnerId, update }))
    }

    deletePartner(partnerId: string, force: boolean = false) {
        return this.store.dispatch(PartnerRemoteActions.delete.request({ partnerId: partnerId, force }))
    }

    selectPartner(partnerId: string) {
        return this.store.dispatch(PartnerLocalActions.selectPartner({ partnerId }))
    }

    deselectPartner() {
        return this.store.dispatch(PartnerLocalActions.deselectPartner())
    }

    updatePartnerFilters(filters: Partial<Model.PartnerFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(PartnerLocalActions.updatePartnerFilters({ filters, triggerRemoteFetch }))
    }

    resetPartnerFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(PartnerLocalActions.resetPartnerFilters({ triggerRemoteFetch }))
    }

    resetPagination() {
        return this.store.dispatch(PartnerLocalActions.resetPagination())
    }
}
