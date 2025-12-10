import { inject, Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { PartnerTypeLocalActions, PartnerTypeRemoteActions } from '../actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'PartnerNetPartnerTypeFacade', options: { skipMethodDebugger: true } })
export class PartnerNetPartnerTypeFacade {
    private store = inject(Store)

    partnerTypeFilters$ = this.store.pipe(select(Selectors.PartnerTypeSelectors.selectPartnerTypeFilters))
    partnerTypeRemotePagination$ = this.store.pipe(select(Selectors.PartnerTypeSelectors.selectPartnerTypeRemotePagination))
    partnerTypeRemoteState$ = this.store.pipe(select(Selectors.PartnerTypeSelectors.selectPartnerTypeRemoteState))

    partnerTypes$ = this.store.pipe(select(Selectors.PartnerTypeSelectors.selectAllPartnerTypes))
    paginatedFilteredPartnerTypes$ = this.store.pipe(select(Selectors.PartnerTypeSelectors.selectPaginatedFilteredPartnerTypes))
    partnerTypesForSelectedPartner$ = this.store.pipe(
        select(Selectors.PartnerTypeAssignmentSelectors.selectPartnerTypesForSelectedPartner)
    )
    selectedPartnerType$ = this.store.pipe(select(Selectors.PartnerTypeSelectors.selectedPartnerType))
    selectedPartnerTypeId$ = this.store.pipe(select(Selectors.PartnerTypeSelectors.selectSelectedPartnerTypeId))

    partnerTypeById$ = (id: string) => this.store.pipe(select(Selectors.PartnerTypeSelectors.selectPartnerTypeById(id)))
    partnerTypesForPartner$ = (partnerId: string) =>
        this.store.pipe(select(Selectors.PartnerTypeAssignmentSelectors.selectPartnerTypesForPartner(partnerId)))

    createPartnerType(request: Model.CreatePartnerTypeRequest) {
        return this.store.dispatch(PartnerTypeRemoteActions.create.request({ request }))
    }

    getPartnerType(partnerTypeId: string) {
        return this.store.dispatch(PartnerTypeRemoteActions.get.request({ partnerTypeId }))
    }

    listPartnerTypes(
        parentId: Nullable<string>,
        parentType: 'partner' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.PartnerTypeResponse>>> = null
    ) {
        return this.store.dispatch(PartnerTypeRemoteActions.list.request({ parentId, parentType, pagination }))
    }

    updatePartnerType(partnerTypeId: string, update: Model.UpdatePartnerTypeRequest) {
        return this.store.dispatch(PartnerTypeRemoteActions.update.request({ partnerTypeId, update }))
    }

    deletePartnerType(partnerTypeId: string, force: boolean = false) {
        return this.store.dispatch(PartnerTypeRemoteActions.delete.request({ partnerTypeId, force }))
    }

    selectPartnerType(partnerTypeId: string) {
        return this.store.dispatch(PartnerTypeLocalActions.selectPartnerType({ partnerTypeId }))
    }

    deselectPartnerType() {
        return this.store.dispatch(PartnerTypeLocalActions.deselectPartnerType())
    }

    updatePartnerTypeFilters(filters: Partial<Model.PartnerTypeFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(PartnerTypeLocalActions.updatePartnerTypeFilters({ filters, triggerRemoteFetch }))
    }

    resetPartnerTypeFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(PartnerTypeLocalActions.resetPartnerTypeFilters({ triggerRemoteFetch }))
    }

    resetPagination() {
        return this.store.dispatch(PartnerTypeLocalActions.resetPagination())
    }
}
