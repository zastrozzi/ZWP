import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { BaseWindowComponent, ColumnInterface, ZWPWindowComponent, WINDOW_COMPONENT_DATA } from '@zwp/platform.layout'
import { RewardsNetworkTillo } from '@zwp/rewards-network.tillo'
import { State } from '../../+state'
import { Model } from '../../model'
import { Subscription, map } from 'rxjs'
import { BarcodeType, barcodeTypeLabelPipeSignature, FilterChipEvent, FilterDefinition, handleFilterChipEvent, InputColor, isNull, ZWPFilterChipInputType, Nullable } from '@zwp/platform.common'
import { Sort, SortDirection } from '@angular/material/sort'
import { PageEvent } from '@angular/material/paginator'

@ZWPWindowComponent('TilloBrandSelectBrandWindowComponent')
@Component({
    selector: 'urnet-mnet-tillo-brand-select-brand-window',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <zwp-window #windowContent>
        <div fxLayout="column" fxFlexFill>
            <div fxLayout="row" fxLayoutAlign="start stretch" zwpPadding="5" fxLayoutGap="5px">
                <zwp-filter-chip-input fxFlex="grow" [filterDefinitions]="filterDefinitions" (filterChange)="onFiltersChanged($event)"></zwp-filter-chip-input>     
            </div>
            <zwp-divider></zwp-divider>
            <zwp-paginated-table fxFlex="1 1 calc(100% - 55px)"
                [columns]="columns" [data]="(paginatedFilteredBrands$ | async) || []" [selectable]="false" [actionable]="true"
                [pagination]="brandRemotePagination$ | async"
                (sortChanged)="onSortChanged($event)"
                (paginationChanged)="onPaginationChanged($event)"> 

                
                <ng-template #rowActions let-row>
                    <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
                            <zwp-md-icon-button
                                icon="add"
                                label="Add Brand"
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
                [label]="'Add as New Brand'" [icon]="'pages'"
                
                (btnClick)="onAddAsNewBrandClicked()"
            ></zwp-md-button>
            <zwp-md-button 
                fxFlexOffset="20px"
                [label]="addButtonLabel" [icon]="'pages'"
                [disabled]="selectedBrand === null"
                (btnClick)="onAddBrandClicked()"
            ></zwp-md-button>
        </ng-template>
    </zwp-window>
    `
})
export class TilloBrandSelectBrandWindowComponent extends BaseWindowComponent implements OnInit, OnDestroy {
    windowData = inject(WINDOW_COMPONENT_DATA) as {
        tilloBrandId: string
    }

    selectedBrand: Nullable<Model.BrandResponse> = null

    private readonly subscriptions = new Subscription()
    private brandFacade = inject(State.Facades.BrandFacade)
    private merchantNetTilloBrandFacade = inject(State.Facades.MerchantNetTilloBrandFacade)

    paginatedFilteredBrands$ = this.brandFacade.paginatedFilteredBrands$
    brandRemotePagination$ = this.brandFacade.brandRemotePagination$

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.BrandResponse = 'brandName'

    brandStatusPipeSignature = Model.brandStatusLabelPipeSignature

    columns: ColumnInterface<Model.BrandResponse>[] = [
        { displayName: 'Name', dataLabel: 'brandName', sortable: true },
        { displayName: 'Status', dataLabel: 'status', sortable: true, transformEnumPipe: this.brandStatusPipeSignature },
        { displayName: 'Created At', dataLabel: 'dbCreatedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Updated At', dataLabel: 'dbUpdatedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Name', name: 'brandName', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'Status', name: 'status', type:ZWPFilterChipInputType.ENUM , enumDefinition: this.brandStatusPipeSignature },
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Deleted At', name: 'dbDeletedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null }
    ]

    get addButtonLabel() {
        if (isNull(this.selectedBrand)) {
            return 'Select a Brand to Add'
        }
        return `Add Brand: ${this.selectedBrand.brandName}`
    }

    __close() {
        this.subscriptions.unsubscribe()
        this.remove()
    }

    ngOnInit() {
        this.brandFacade.resetBrandFilters(false)
        this.brandFacade.listBrands()
    }

    ngOnDestroy() {
        this.brandFacade.resetPagination()
        this.subscriptions.unsubscribe()
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.BrandResponse
        this.sortDirection = sort.direction
        this.brandFacade.listBrands(null, {
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey
        })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<Model.Filters.BrandFilters> = handleFilterChipEvent(filterEvent)
        this.brandFacade.updateBrandFilters(filterChange)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.brandFacade.listBrands(null, {
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize
        })
    }

    onAddBrandClicked() {
        if (isNull(this.selectedBrand)) {
            console.error('No brand selected for onboarding.')
            return
        }
        this.merchantNetTilloBrandFacade.onboardTilloBrand(this.windowData.tilloBrandId, { brandId: this.selectedBrand.id, merchantId: null })
        this.__close()
    }

    onAddAsNewBrandClicked() {
        this.merchantNetTilloBrandFacade.onboardTilloBrand(this.windowData.tilloBrandId, { brandId: null, merchantId: null })
        this.__close()
    }

    onRowClicked(row: Model.BrandResponse) {
        this.selectedBrand = row
    }
}