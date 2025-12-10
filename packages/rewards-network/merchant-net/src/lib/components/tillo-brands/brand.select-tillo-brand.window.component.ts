import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { BaseWindowComponent, ColumnInterface, ZWPWindowComponent, WINDOW_COMPONENT_DATA } from '@zwp/platform.layout'
import { RewardsNetworkTillo } from '@zwp/rewards-network.tillo'
import { State } from '../../+state'
import { Subscription, map } from 'rxjs'
import { BarcodeType, barcodeTypeLabelPipeSignature, FilterChipEvent, FilterDefinition, handleFilterChipEvent, InputColor, isNull, ZWPFilterChipInputType, Nullable } from '@zwp/platform.common'
import { Sort, SortDirection } from '@angular/material/sort'
import { PageEvent } from '@angular/material/paginator'

@ZWPWindowComponent('BrandSelectTilloBrandWindowComponent')
@Component({
    selector: 'urnet-mnet-brand-select-tillo-brand-window',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <zwp-window #windowContent>
        <div fxLayout="column" fxFlexFill>
            <div fxLayout="row" fxLayoutAlign="start stretch" zwpPadding="5" fxLayoutGap="5px">
                <zwp-filter-chip-input fxFlex="grow" [filterDefinitions]="filterDefinitions" (filterChange)="onFiltersChanged($event)"></zwp-filter-chip-input>     
            </div>
            <zwp-divider></zwp-divider>
            <zwp-paginated-table fxFlex="1 1 calc(100% - 55px)"
                [columns]="columns" [data]="(paginatedFilteredTilloBrands$ | async) || []" [selectable]="false" [actionable]="true"
                [pagination]="tilloBrandRemotePagination$ | async"
                (sortChanged)="onSortChanged($event)"
                (paginationChanged)="onPaginationChanged($event)"> 

                
                <ng-template #rowActions let-row>
                    <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
                            <zwp-md-icon-button
                                icon="add"
                                label="Add Tillo Brand"
                                [iconPadding]="5"
                                [textStyle]="'subheadline'"
                                [iconColor]="'primary' | zwpColorTheme"
                                [backgroundColor]="'clear' | zwpColorTheme"
                                (btnClick)="onRowClicked(row)"
                            ></zwp-md-icon-button>
                    </div>
                </ng-template>
            </zwp-paginated-table> 
        </div>
        <ng-template #windowFooter>
            <zwp-md-button 
                [label]="addButtonLabel" [icon]="'pages'"
                [disabled]="selectedTilloBrand === null"
                (btnClick)="onAddTilloBrandClicked()"
            ></zwp-md-button>
        </ng-template>
    </zwp-window>
    `
})
export class BrandSelectTilloBrandWindowComponent extends BaseWindowComponent implements OnInit, OnDestroy {
    windowData = inject(WINDOW_COMPONENT_DATA) as {
        brandId: string
    }

    selectedTilloBrand: Nullable<RewardsNetworkTillo.Model.BrandResponse> = null

    private readonly subscriptions = new Subscription()
    private tilloBrandFacade = inject(RewardsNetworkTillo.State.Facades.TilloBrandFacade)
    private merchantNetTilloBrandFacade = inject(State.Facades.MerchantNetTilloBrandFacade)

    paginatedFilteredTilloBrands$ = this.tilloBrandFacade.paginatedFilteredBrands$
    tilloBrandRemotePagination$ = this.tilloBrandFacade.brandRemotePagination$

    sortDirection: SortDirection = 'asc'
    sortKey: keyof RewardsNetworkTillo.Model.BrandResponse = 'name'

    tilloBrandStatusPipeSignature = RewardsNetworkTillo.Model.brandStatusLabelPipeSignature

    columns: ColumnInterface<RewardsNetworkTillo.Model.BrandResponse>[] = [
        { displayName: 'Name', dataLabel: 'name', sortable: true },
        { displayName: 'Status', dataLabel: 'status.code', sortable: true, transformEnumPipe: this.tilloBrandStatusPipeSignature },
        
        // { displayName: 'Deleted At', dataLabel: 'dbDeletedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        // { displayName: 'Product Type', dataLabel: 'type', sortable: true, transformEnumPipe: this.productTypePipeSignature },
        // { displayName: 'Transaction Type', dataLabel: 'transactionTypes', sortable: true, transformEnumPipe: this.transactionTypePipeSignature, multi: true },
        // { displayName: 'Delivery Method', dataLabel: 'deliveryMethods', sortable: true, transformEnumPipe: this.deliveryMethodPipeSignature, multi: true },
        // { displayName: 'Countries Served', dataLabel: 'countriesServed', sortable: true, transformEnumPipe: this.zwpISO3166Alpha2PipeSignature, multi: true },
        // { displayName: 'Categories', dataLabel: 'categories', sortable: true, transformEnumPipe: this.categoryPipeSignature, multi: true },
        // { displayName: 'Currency', dataLabel: 'currency', sortable: true, transformEnumPipe: this.currencyPipeSignature },
        { displayName: 'Created At', dataLabel: 'dbCreatedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Updated At', dataLabel: 'dbUpdatedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Name', name: 'name', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'Status', name: 'status', type:ZWPFilterChipInputType.ENUM , enumDefinition: this.tilloBrandStatusPipeSignature },
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Deleted At', name: 'dbDeletedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null }
    ]

    get addButtonLabel() {
        if (isNull(this.selectedTilloBrand)) {
            return 'Select a Tillo Brand to Add'
        }
        return `Add Tillo Brand: ${this.selectedTilloBrand.name}`
    }

    __close() {
        this.subscriptions.unsubscribe()
        this.remove()
    }

    ngOnInit() {
        this.tilloBrandFacade.resetBrandFilters(false)
        this.tilloBrandFacade.listBrands()
    }

    ngOnDestroy() {
        this.tilloBrandFacade.resetPagination()
        this.subscriptions.unsubscribe()
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof RewardsNetworkTillo.Model.BrandResponse
        this.sortDirection = sort.direction
        this.tilloBrandFacade.listBrands({ 
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey
        })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<RewardsNetworkTillo.Model.Filters.BrandFilters> = handleFilterChipEvent(filterEvent)
        this.tilloBrandFacade.updateBrandFilters(filterChange)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.tilloBrandFacade.listBrands({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize
        })
    }

    onAddTilloBrandClicked() {
        if (isNull(this.selectedTilloBrand)) {
            console.error('No Tillo brand selected for onboarding.')
            return
        }
        this.merchantNetTilloBrandFacade.onboardTilloBrand(this.selectedTilloBrand.id, { brandId: this.windowData.brandId, merchantId: null })
        this.__close()
    }

    onRowClicked(row: RewardsNetworkTillo.Model.BrandResponse) {
        this.selectedTilloBrand = row
    }
}