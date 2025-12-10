import { inject, Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from "@zwp/platform.common";
import { LocationLocalActions, LocationRemoteActions, WebLocationLocalActions, WebLocationRemoteActions } from '../actions';
import { Selectors } from '../selectors'
import { Model } from "../../model";

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'LocationFacade', options: { skipMethodDebugger: true } })
export class LocationFacade {
    private store = inject(Store)
    
    locationFilters$ = this.store.pipe(select(Selectors.LocationSelectors.selectLocationFilters))
    locationRemotePagination$ = this.store.pipe(select(Selectors.LocationSelectors.selectLocationRemotePagination))
    locationRemoteState$ = this.store.pipe(select(Selectors.LocationSelectors.selectLocationRemoteState))

    locations$ = this.store.pipe(select(Selectors.LocationSelectors.selectAllLocations))
    selectedLocation$ = this.store.pipe(select(Selectors.LocationSelectors.selectedLocation))
    selectedLocationId$ = this.store.pipe(select(Selectors.LocationSelectors.selectSelectedLocationId))
    locationsForSelectedMerchant$ = this.store.pipe(select(Selectors.LocationSelectors.selectLocationsForSelectedMerchant))

    webLocationFilters$ = this.store.pipe(select(Selectors.WebLocationSelectors.selectWebLocationFilters))
    webLocationRemotePagination$ = this.store.pipe(select(Selectors.WebLocationSelectors.selectWebLocationRemotePagination))
    webLocationRemoteState$ = this.store.pipe(select(Selectors.WebLocationSelectors.selectWebLocationRemoteState))

    webLocations$ = this.store.pipe(select(Selectors.WebLocationSelectors.selectAllWebLocations))
    selectedWebLocation$ = this.store.pipe(select(Selectors.WebLocationSelectors.selectedWebLocation))
    selectedWebLocationId$ = this.store.pipe(select(Selectors.WebLocationSelectors.selectSelectedWebLocationId))
    webLocationsForSelectedMerchant$ = this.store.pipe(select(Selectors.WebLocationSelectors.selectWebLocationsForSelectedMerchant))

    locationById$ = (id: string) => this.store.pipe(select(Selectors.LocationSelectors.selectLocationById(id)))
    webLocationById$ = (id: string) => this.store.pipe(select(Selectors.WebLocationSelectors.selectWebLocationById(id)))
    
    createLocation(brandId: Nullable<string> = null, merchantId: Nullable<string> = null, request: Model.CreateLocationRequest) {
        return this.store.dispatch(LocationRemoteActions.create.request({brandId, merchantId, request}))
    }

    getLocation(locationId: string) {
        return this.store.dispatch(LocationRemoteActions.get.request({ locationId }))
    }

    listLocations(brandId: Nullable<string> | 'auto' = null, merchantId: Nullable<string> | 'auto' = null, pagination: Nullable<Partial<PaginatedQueryParams<Model.LocationResponse>>> = null) {
        return this.store.dispatch(LocationRemoteActions.list.request({ brandId, merchantId, pagination }))
    }

    selectLocation(locationId: string) {
        return this.store.dispatch(LocationLocalActions.selectLocation({ locationId }))
    }

    deselectLocation() {
        return this.store.dispatch(LocationLocalActions.deselectLocation())
    }

    updateLocation(locationId: string, update: Model.UpdateLocationRequest) {
        return this.store.dispatch(LocationRemoteActions.update.request({ locationId, update }))
    }

    deleteLocation(locationId: string) {
        return this.store.dispatch(LocationRemoteActions.delete.request({ locationId }))
    }

    updateLocationFilters(filters: Partial<Model.Filters.LocationFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(LocationLocalActions.updateLocationFilters({ filters, triggerRemoteFetch }))
    }

    resetLocationFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(LocationLocalActions.resetLocationFilters({ triggerRemoteFetch }))
    }

    resetPagination() {
        return this.store.dispatch(LocationLocalActions.resetPagination())
    }

    createWebLocation(brandId: Nullable<string> = null, merchantId: Nullable<string> = null, request: Model.CreateWebLocationRequest) {
        return this.store.dispatch(WebLocationRemoteActions.create.request({brandId, merchantId, request}))
    }
    
    getWebLocation(webLocationId: string) {
        return this.store.dispatch(WebLocationRemoteActions.get.request({ webLocationId }))
    }
    
    listWebLocations(brandId: Nullable<string> | 'auto' = null, merchantId: Nullable<string> | 'auto' = null, pagination: Nullable<Partial<PaginatedQueryParams<Model.WebLocationResponse>>> = null) {
        return this.store.dispatch(WebLocationRemoteActions.list.request({ brandId, merchantId, pagination }))
    }
    
    selectWebLocation(webLocationId: string) {
        return this.store.dispatch(WebLocationLocalActions.selectWebLocation({ webLocationId }))
    }

    deselectWebLocation() {
        return this.store.dispatch(WebLocationLocalActions.deselectWebLocation())
    }
    
    updateWebLocation(webLocationId: string, update: Model.UpdateWebLocationRequest) {
        return this.store.dispatch(WebLocationRemoteActions.update.request({ webLocationId, update }))
    }
    
    deleteWebLocation(webLocationId: string) {
        return this.store.dispatch(WebLocationRemoteActions.delete.request({ webLocationId }))
    }
    
    updateWebLocationFilters(filters: Partial<Model.Filters.WebLocationFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(WebLocationLocalActions.updateWebLocationFilters({ filters, triggerRemoteFetch }))
    }
    
    resetWebLocationFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(WebLocationLocalActions.resetWebLocationFilters({ triggerRemoteFetch }))
    }

    resetPaginationWebLocation() {
        return this.store.dispatch(WebLocationLocalActions.resetPagination())
    }
}