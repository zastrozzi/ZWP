import { inject, Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from "@zwp/platform.common";
import { 
    OfferLocalActions, 
    OfferRemoteActions, 
    OfferLayoutLocalActions, 
    OfferLayoutRemoteActions, 
    OfferLayoutElementLocalActions, 
    OfferLayoutElementRemoteActions 
} from '../actions';
import { Selectors } from '../selectors'
import { Model } from "../../model";

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'OfferFacade', options: { skipMethodDebugger: true } })
export class OfferFacade {
    private store = inject(Store)

    offerFilters$ = this.store.pipe(select(Selectors.OfferSelectors.selectOfferFilters))
    offerRemotePagination$ = this.store.pipe(select(Selectors.OfferSelectors.selectOfferRemotePagination))
    offerRemoteState$ = this.store.pipe(select(Selectors.OfferSelectors.selectOfferRemoteState))

    offers$ = this.store.pipe(select(Selectors.OfferSelectors.selectAllOffers))
    selectedOffer$ = this.store.pipe(select(Selectors.OfferSelectors.selectedOffer))
    selectedOfferId$ = this.store.pipe(select(Selectors.OfferSelectors.selectSelectedOfferId))
    offersForSelectedMerchant$ = this.store.pipe(select(Selectors.OfferSelectors.selectOffersForSelectedMerchant))

    offerLayoutFilters$ = this.store.pipe(select(Selectors.OfferLayoutSelectors.selectOfferLayoutFilters))
    offerLayoutRemotePagination$ = this.store.pipe(select(Selectors.OfferLayoutSelectors.selectOfferLayoutRemotePagination))
    offerLayoutRemoteState$ = this.store.pipe(select(Selectors.OfferLayoutSelectors.selectOfferLayoutRemoteState))

    offerLayouts$ = this.store.pipe(select(Selectors.OfferLayoutSelectors.selectAllOfferLayouts))
    selectedOfferLayout$ = this.store.pipe(select(Selectors.OfferLayoutSelectors.selectedOfferLayout))
    selectedOfferLayoutId$ = this.store.pipe(select(Selectors.OfferLayoutSelectors.selectSelectedOfferLayoutId))
    offerLayoutsForSelectedOffer$ = this.store.pipe(select(Selectors.OfferLayoutSelectors.selectOfferLayoutsForSelectedOffer))

    offerLayoutElementFilters$ = this.store.pipe(select(Selectors.OfferLayoutElementSelectors.selectOfferLayoutElementFilters))
    offerLayoutElementRemotePagination$ = this.store.pipe(select(Selectors.OfferLayoutElementSelectors.selectOfferLayoutElementRemotePagination))
    offerLayoutElementRemoteState$ = this.store.pipe(select(Selectors.OfferLayoutElementSelectors.selectOfferLayoutElementRemoteState))

    offerLayoutElements$ = this.store.pipe(select(Selectors.OfferLayoutElementSelectors.selectAllOfferLayoutElements))
    selectedOfferLayoutElement$ = this.store.pipe(select(Selectors.OfferLayoutElementSelectors.selectedOfferLayoutElement))
    selectedOfferLayoutElementId$ = this.store.pipe(select(Selectors.OfferLayoutElementSelectors.selectSelectedOfferLayoutElementId))
    offerLayoutElementsForSelectedOfferLayout$ = this.store.pipe(select(Selectors.OfferLayoutElementSelectors.selectOfferLayoutElementsForSelectedOfferLayout))

    offerById$ = (id: string) => this.store.pipe(select(Selectors.OfferSelectors.selectOfferById(id)))
    offerLayoutById$ = (id: string) => this.store.pipe(select(Selectors.OfferLayoutSelectors.selectOfferLayoutById(id)))
    offerLayoutElementById$ = (id: string) => this.store.pipe(select(Selectors.OfferLayoutElementSelectors.selectOfferLayoutElementById(id)))
    
    // Offer Methods

    createOffer(brandId: Nullable<string> = null, merchantId: Nullable<string> = null, request: Model.CreateOfferRequest) {
        return this.store.dispatch(OfferRemoteActions.create.request({brandId, merchantId, request}))
    }

    getOffer(offerId: string) {
        return this.store.dispatch(OfferRemoteActions.get.request({ offerId }))
    }

    listOffers(brandId: Nullable<string> | 'auto' = null, merchantId: Nullable<string> | 'auto' = null, pagination: Nullable<Partial<PaginatedQueryParams<Model.OfferResponse>>> = null) {
        return this.store.dispatch(OfferRemoteActions.list.request({ brandId, merchantId, pagination }))
    }

    selectOffer(offerId: string) {
        return this.store.dispatch(OfferLocalActions.selectOffer({ offerId }))
    }

    deselectOffer() {
        return this.store.dispatch(OfferLocalActions.deselectOffer())
    }

    updateOffer(offerId: string, update: Model.UpdateOfferRequest) {
        return this.store.dispatch(OfferRemoteActions.update.request({ offerId, update }))
    }

    deleteOffer(offerId: string) {
        return this.store.dispatch(OfferRemoteActions.delete.request({ offerId }))
    }

    updateOfferFilters(filters: Partial<Model.Filters.OfferFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(OfferLocalActions.updateOfferFilters({ filters, triggerRemoteFetch }))
    }

    resetOfferFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(OfferLocalActions.resetOfferFilters({ triggerRemoteFetch }))
    }

    resetOfferPagination() {
        return this.store.dispatch(OfferLocalActions.resetPagination())
    }

    // Offer Layout Methods

    createOfferLayout(offerId: string, request: Model.CreateOfferLayoutRequest) {
        return this.store.dispatch(OfferLayoutRemoteActions.create.request({offerId, request}))
    }

    getOfferLayout(offerLayoutId: string) {
        return this.store.dispatch(OfferLayoutRemoteActions.get.request({ offerLayoutId }))
    }

    listOfferLayouts(offerId: Nullable<string> | 'auto' = null, pagination: Nullable<Partial<PaginatedQueryParams<Model.OfferLayoutResponse>>> = null) {
        return this.store.dispatch(OfferLayoutRemoteActions.list.request({ offerId, pagination }))
    }

    selectOfferLayout(offerLayoutId: string) {
        return this.store.dispatch(OfferLayoutLocalActions.selectOfferLayout({ offerLayoutId }))
    }

    updateOfferLayout(offerLayoutId: string, update: Model.UpdateOfferLayoutRequest) {
        return this.store.dispatch(OfferLayoutRemoteActions.update.request({ offerLayoutId, update }))
    }

    deleteOfferLayout(offerLayoutId: string) {
        return this.store.dispatch(OfferLayoutRemoteActions.delete.request({ offerLayoutId }))
    }

    updateOfferLayoutFilters(filters: Partial<Model.Filters.OfferLayoutFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(OfferLayoutLocalActions.updateOfferLayoutFilters({ filters, triggerRemoteFetch }))
    }

    resetOfferLayoutFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(OfferLayoutLocalActions.resetOfferLayoutFilters({ triggerRemoteFetch }))
    }

    // Offer Layout Element Methods

    createOfferLayoutElement(offerLayoutId: string, request: Model.CreateOfferLayoutElementRequest) {
        return this.store.dispatch(OfferLayoutElementRemoteActions.create.request({offerLayoutId, request}))
    }

    getOfferLayoutElement(offerLayoutElementId: string) {
        return this.store.dispatch(OfferLayoutElementRemoteActions.get.request({ offerLayoutElementId }))
    }

    listOfferLayoutElements(offerLayoutId: Nullable<string> | 'auto' = null, pagination: Nullable<Partial<PaginatedQueryParams<Model.OfferLayoutElementResponse>>> = null) {
        return this.store.dispatch(OfferLayoutElementRemoteActions.list.request({ offerLayoutId, pagination }))
    }

    selectOfferLayoutElement(offerLayoutElementId: string) {
        return this.store.dispatch(OfferLayoutElementLocalActions.selectOfferLayoutElement({ offerLayoutElementId }))
    }

    updateOfferLayoutElement(offerLayoutElementId: string, update: Model.UpdateOfferLayoutElementRequest) {
        return this.store.dispatch(OfferLayoutElementRemoteActions.update.request({ offerLayoutElementId, update }))
    }

    deleteOfferLayoutElement(offerLayoutElementId: string) {
        return this.store.dispatch(OfferLayoutElementRemoteActions.delete.request({ offerLayoutElementId }))
    }

    updateOfferLayoutElementFilters(filters: Partial<Model.Filters.OfferLayoutElementFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(OfferLayoutElementLocalActions.updateOfferLayoutElementFilters({ filters, triggerRemoteFetch }))
    }

    resetOfferLayoutElementFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(OfferLayoutElementLocalActions.resetOfferLayoutElementFilters({ triggerRemoteFetch }))
    }
}