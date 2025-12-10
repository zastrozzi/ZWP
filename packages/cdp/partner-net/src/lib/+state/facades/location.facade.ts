import { inject, Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { LocationLocalActions, LocationRemoteActions } from '../actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'PartnerNetLocationFacade', options: { skipMethodDebugger: true } })
export class PartnerNetLocationFacade {
    private store = inject(Store)

    locationFilters$ = this.store.pipe(select(Selectors.LocationSelectors.selectLocationFilters))
    locationRemotePagination$ = this.store.pipe(select(Selectors.LocationSelectors.selectLocationRemotePagination))
    locationRemoteState$ = this.store.pipe(select(Selectors.LocationSelectors.selectLocationRemoteState))

    locations$ = this.store.pipe(select(Selectors.LocationSelectors.selectAllLocations))
    paginatedFilteredLocations$ = this.store.pipe(select(Selectors.LocationSelectors.selectPaginatedFilteredLocations))
    locationsForSelectedPartner$ = this.store.pipe(
        select(Selectors.LocationSelectors.selectLocationsForSelectedPartner)
    )
    locationsForSelectedSubgroup$ = this.store.pipe(
        select(Selectors.LocationSelectors.selectLocationsForSelectedSubgroup)
    )
    selectedLocation$ = this.store.pipe(select(Selectors.LocationSelectors.selectedLocation))
    selectedLocationId$ = this.store.pipe(select(Selectors.LocationSelectors.selectSelectedLocationId))

    locationById$ = (id: string) => this.store.pipe(select(Selectors.LocationSelectors.selectLocationById(id)))
    locationsForPartner$ = (partnerId: string) =>
        this.store.pipe(select(Selectors.LocationSelectors.selectLocationsForPartner(partnerId)))
    locationsForSubgroup$ = (subgroupId: string) =>
        this.store.pipe(select(Selectors.LocationSelectors.selectLocationsForSubgroup(subgroupId))
    )

    createLocation(
        parentId: string,
        parentType: 'partner' | 'subgroup', 
        request: Model.CreateLocationRequest
    ) {
        return this.store.dispatch(LocationRemoteActions.create.request({ parentId, parentType, request }))
    }

    getLocation(locationId: string) {
        return this.store.dispatch(LocationRemoteActions.get.request({ locationId }))
    }

    listLocations(
        parentId: Nullable<string>,
        parentType: 'partner' | 'subgroup' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.LocationResponse>>> = null
    ) {
        return this.store.dispatch(LocationRemoteActions.list.request({ parentId, parentType, pagination }))
    }

    updateLocation(locationId: string, update: Model.UpdateLocationRequest) {
        return this.store.dispatch(LocationRemoteActions.update.request({ locationId, update }))
    }

    deleteLocation(locationId: string, force: boolean = false) {
        return this.store.dispatch(LocationRemoteActions.delete.request({ locationId, force }))
    }

    selectLocation(locationId: string) {
        return this.store.dispatch(LocationLocalActions.selectLocation({ locationId }))
    }

    deselectLocation() {
        return this.store.dispatch(LocationLocalActions.deselectLocation())
    }

    updateLocationFilters(filters: Partial<Model.LocationFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(LocationLocalActions.updateLocationFilters({ filters, triggerRemoteFetch }))
    }

    resetLocationFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(LocationLocalActions.resetLocationFilters({ triggerRemoteFetch }))
    }

    resetPagination() {
        return this.store.dispatch(LocationLocalActions.resetPagination())
    }
}
