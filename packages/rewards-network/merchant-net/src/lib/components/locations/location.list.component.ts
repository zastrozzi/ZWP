import { Component, OnInit, ChangeDetectionStrategy, inject, ChangeDetectorRef, OnDestroy } from '@angular/core'
import { State } from '../../+state'
import { CDPUsers } from '@zwp/cdp.users'
import { ColumnInterface, ZWPWindowLayoutFacade } from '@zwp/platform.layout'
import { Model } from '../../model'
import { DateQueryFilter, EnumQueryFilter, FilterChip, FilterChipEvent, FilterDefinition, handleFilterChipEvent, ZWPFilterChipInputType, ZWPISO3166Alpha2, ZWPISO3166Alpha2Label, ZWPRouterFacade, Nullable, NumberQueryFilter, PaginatedQueryParams, StringQueryFilter } from '@zwp/platform.common'
import { map } from 'rxjs'
import { Sort, SortDirection } from '@angular/material/sort'
import { PageEvent } from '@angular/material/paginator'
import { ActivatedRoute } from '@angular/router'
import { ComponentRouteContext } from '../../model/enums'

@Component({
    selector: 'urnet-mnet-location-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div fxLayout="column" fxFlexFill>
        <div fxLayout="row" fxLayoutAlign="start stretch" zwpPadding="5" fxLayoutGap="5px">
            <zwp-filter-chip-input fxFlex="grow" [filterDefinitions]="filterDefinitions" (filterChange)="onFiltersChanged($event)"></zwp-filter-chip-input>
            
            <zwp-md-button 
                label="Create Location" icon="add_location" 
                textStyle="button1" [iconTextStyle]="'subheadline'"
                [labelColor]="'system-white' | zwpColorTheme"
                [backgroundColor]="'system-green' | zwpColorTheme"
                (btnClick)="newLocation()"
            ></zwp-md-button>
            
            
            
        </div>
        <zwp-divider></zwp-divider>
        <zwp-paginated-table fxFlex="1 1 calc(100% - 55px)"
            [columns]="columns" [data]="(locations$ | async) || []" [selectable]="true"
            [pagination]="locationsRemotePagination$ | async"
            (sortChanged)="onSortChanged($event)"
            (paginationChanged)="onPaginationChanged($event)"
            (rowClicked)="onRowClicked($event)"
            [draggable]="true"
        >
            <ng-template #dragPreview let-dataRow="dataRow">
                <div 
                    fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="10px" 
                    zwpCorners="5" zwpBackgroundColor="primary" zwpPadding="10 15 10 10"
                    class="mat-elevation-z4"
                >
                    <mat-icon zwpColor="system-white">location_on</mat-icon>
                    <div fxLayout="column" fxLayoutAlign="start stretch">
                        <span zwpTextStyle="caption1" zwpFontWeight="500" zwpColor="system-white">Location</span>
                        <span zwpTextStyle="body1" zwpColor="system-white">{{ dataRow.name ?? dataRow.id }}</span>
                    </div>
                </div>
            </ng-template>
        </zwp-paginated-table>
    </div>
    `
})
export class LocationListComponent implements OnInit, OnDestroy {
    
    private locationFacade = inject(State.Facades.LocationFacade)
    private adminUserFacade = inject(CDPUsers.State.AdminUserFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)
    private route = inject(ActivatedRoute)

    private locationListContext: ComponentRouteContext = this.route.snapshot.data['locationListContext']

    locations$ = this.locationFacade.locations$
    locationsRemotePagination$ = this.locationFacade.locationRemotePagination$
    loggedInAdminUser$ = this.adminUserFacade.loggedInAdminUser$

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.LocationResponse = 'name'

    columns: ColumnInterface<Model.LocationResponse>[] = [
        { displayName: 'Status', dataLabel: 'status', sortable: true, transformEnumPipe: { input: Model.LocationStatus, output: Model.LocationStatusLabel } },
        { displayName: 'Location Name', dataLabel: 'name', sortable: true },
        { displayName: 'Latitude', dataLabel: 'lat', sortable: true },
        { displayName: 'Longitude', dataLabel: 'lon', sortable: true },
        { displayName: 'Refinement', dataLabel: 'addressRefinement', sortable: true },
        { displayName: 'Number', dataLabel: 'addressNumber', sortable: true },
        { displayName: 'Street', dataLabel: 'addressStreet', sortable: true },
        { displayName: 'City', dataLabel: 'addressCity', sortable: true },
        { displayName: 'Region', dataLabel: 'addressRegion', sortable: true },
        { displayName: 'Country', dataLabel: 'country', sortable: true, transformEnumPipe: { input: ZWPISO3166Alpha2, output: ZWPISO3166Alpha2Label } },
        { displayName: 'Postal Code', dataLabel: 'addressPostalCode', sortable: true },
        { displayName: 'Created At', dataLabel: 'dbCreatedAt', sortable: true, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Updated At', dataLabel: 'dbUpdatedAt', sortable: true, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } }
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Deleted At', name: 'dbDeletedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Status', name: 'status', type: ZWPFilterChipInputType.ENUM, enumDefinition: { input: Model.LocationStatus, output: Model.LocationStatusLabel } },
        { displayName: 'Location Name', name: 'name', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'Latitude', name: 'lat', type: ZWPFilterChipInputType.NUMBER, enumDefinition: null },
        { displayName: 'Longitude', name: 'lon', type: ZWPFilterChipInputType.NUMBER, enumDefinition: null },
        { displayName: 'Refinement', name: 'addressRefinement', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'Number', name: 'addressNumber', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'Street', name: 'addressStreet', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'City', name: 'addressCity', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'Region', name: 'addressRegion', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'Country', name: 'country', type: ZWPFilterChipInputType.ENUM, enumDefinition: { input: ZWPISO3166Alpha2, output: ZWPISO3166Alpha2Label } },
        { displayName: 'Postal Code', name: 'addressPostalCode', type: ZWPFilterChipInputType.STRING, enumDefinition: null }
    ]

    ngOnInit() {
        
        this.loggedInAdminUser$.subscribe((user) => {
            if (user) {
                this.locationFacade.resetLocationFilters(false)
                this.listLocationsForContext()
            }
        })
    }

    ngOnDestroy() {
        this.locationFacade.resetPagination()
    }

    listLocationsForContext(pagination: Nullable<Partial<PaginatedQueryParams<Model.LocationResponse>>> = null) {
        switch (this.locationListContext) {
            case ComponentRouteContext.MERCHANT_DETAIL:
                this.locationFacade.listLocations(null, 'auto', pagination)
                break
            case ComponentRouteContext.BRAND_DETAIL:
                this.locationFacade.listLocations('auto', null, pagination)
                break
            default:
                this.locationFacade.listLocations(null, null, pagination)
                break
        }
    }


    onRowClicked(row: Model.LocationResponse) {
        this.routerFacade.navigate([`/merchant-net/locations/${row.id}`])
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.LocationResponse
        this.sortDirection = sort.direction
        this.listLocationsForContext({ 
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey
        })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<Model.Filters.LocationFilters> = handleFilterChipEvent(filterEvent)
        this.locationFacade.updateLocationFilters(filterChange)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.listLocationsForContext({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize
        })
    }

    newLocation() {
        this.windowLayoutFacade.addWindow({
            label: 'New Location',
            icon: 'add_location',
            componentName: 'CreateLocationWindowComponent',
            position: { top: 'calc(50vh - 350px)', left: 'calc(50vw - 250px)', width: '500px', height: '700px'},
            data: {}
        })
    }
}