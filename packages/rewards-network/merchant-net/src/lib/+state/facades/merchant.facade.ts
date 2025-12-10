import { inject, Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from "@zwp/platform.common";
import { MerchantLocalActions, MerchantRemoteActions } from '../actions';
import { Selectors } from '../selectors'
import { Model } from "../../model";

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'MerchantFacade', options: { skipMethodDebugger: true } })
export class MerchantFacade {
    private store = inject(Store)
    
    merchantFilters$ = this.store.pipe(select(Selectors.MerchantSelectors.selectMerchantFilters))
    merchantRemotePagination$ = this.store.pipe(select(Selectors.MerchantSelectors.selectMerchantRemotePagination))
    merchantRemoteState$ = this.store.pipe(select(Selectors.MerchantSelectors.selectMerchantRemoteState))

    merchants$ = this.store.pipe(select(Selectors.MerchantSelectors.selectAllMerchants))
    paginatedFilteredMerchants$ = this.store.pipe(select(Selectors.MerchantSelectors.selectPaginatedFilteredMerchants))
    selectedMerchant$ = this.store.pipe(select(Selectors.MerchantSelectors.selectedMerchant))
    selectedMerchantId$ = this.store.pipe(select(Selectors.MerchantSelectors.selectSelectedMerchantId))

    merchantById$ = (id: string) => this.store.pipe(select(Selectors.MerchantSelectors.selectMerchantById(id)))
    
    createMerchant(request: Model.CreateMerchantRequest) {
        return this.store.dispatch(MerchantRemoteActions.create.request({request}))
    }

    getMerchant(merchantId: string) {
        return this.store.dispatch(MerchantRemoteActions.get.request({ merchantId }))
    }

    listMerchants(pagination: Nullable<Partial<PaginatedQueryParams<Model.MerchantResponse>>> = null) {
        return this.store.dispatch(MerchantRemoteActions.list.request({ pagination: pagination }))
    }

    selectMerchant(merchantId: string) {
        return this.store.dispatch(MerchantLocalActions.selectMerchant({ merchantId }))
    }

    deselectMerchant() {
        return this.store.dispatch(MerchantLocalActions.deselectMerchant())
    }

    updateMerchant(merchantId: string, update: Model.UpdateMerchantRequest) {
        return this.store.dispatch(MerchantRemoteActions.update.request({ merchantId, update }))
    }

    deleteMerchant(merchantId: string) {
        return this.store.dispatch(MerchantRemoteActions.delete.request({ merchantId }))
    }

    updateMerchantFilters(filters: Partial<Model.Filters.MerchantFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(MerchantLocalActions.updateMerchantFilters({ filters, triggerRemoteFetch }))
    }

    resetMerchantFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(MerchantLocalActions.resetMerchantFilters({ triggerRemoteFetch }))
    }

    resetPagination() {
        return this.store.dispatch(MerchantLocalActions.resetPagination())
    }
}