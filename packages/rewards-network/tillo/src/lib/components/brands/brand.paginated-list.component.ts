import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core'
import { State } from '../../+state';
import { FileExtension, FilterChipEvent, FilterDefinition, handleFilterChipEvent, ZWPFilterChipInputType, ISO4217ActiveCurrencyCode, ISO4217ActiveCurrencyName, TransformEnumPipeSignature, ZWPISO3166Alpha2, ZWPISO3166Alpha2Label, ZWPRouterFacade } from '@zwp/platform.common';
import { ColumnInterface, ZWPPanelLayoutFacade, ZWPWindowLayoutFacade, ZWPPopupLayoutFacade } from '@zwp/platform.layout'
import { Sort, SortDirection } from '@angular/material/sort'
import { Model } from '../../model';
import { PageEvent } from '@angular/material/paginator';
import { Clipboard } from '@angular/cdk/clipboard';


@Component({
    selector: 'rewards-network-tillo-brand-paginated-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxFlexFill> 
            <div fxLayout="row" fxLayoutAlign="start stretch" zwpPadding="5" fxLayoutGap="5px">
                <zwp-filter-chip-input fxFlex="grow" [filterDefinitions]="filterDefinitions" (filterChange)="onFiltersChanged($event)"></zwp-filter-chip-input>     
            </div>

        <zwp-divider></zwp-divider>
        <zwp-paginated-table fxFlex="1 1 calc(100% - 55px)"
            [columns]="columns" [data]="(paginatedFilteredBrands$ | async) || []" [selectable]="true" [actionable]="true"
            [pagination]="brandRemotePagination$ | async"
            (sortChanged)="onSortChanged($event)"
            (paginationChanged)="onPaginationChanged($event)"
            (rowClicked)="onRowClicked($event)"
        > 

            
            <ng-template #rowActions let-row>
                <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
                        <zwp-md-icon-button
                            icon="open_in_full"
                            label="Open Brand Details"
                            [iconPadding]="5"
                            [textStyle]="'subheadline'"
                            [iconColor]="'primary' | zwpColorTheme"
                            [backgroundColor]="'clear' | zwpColorTheme"
                            (btnClick)="onNavigationClicked($event, row)"
                        ></zwp-md-icon-button>
                        <zwp-md-icon-button
                            icon="visibility"
                            label="Open in Inspector"
                            [iconPadding]="5"
                            [textStyle]="'subheadline'"
                            [iconColor]="'primary' | zwpColorTheme"
                            [backgroundColor]="'clear' | zwpColorTheme"
                            (btnClick)="onInspectorClicked($event, row)"
                        ></zwp-md-icon-button>
                        <zwp-md-icon-button
                            icon="content_copy"
                            label="Add to Clipboard"
                            [iconPadding]="5"
                            [textStyle]="'subheadline'"
                            [iconColor]="'primary' | zwpColorTheme"
                            [backgroundColor]="'clear' | zwpColorTheme"
                            (btnClick)="onClipboardClicked($event, row)"
                        ></zwp-md-icon-button>
                        
                        <zwp-md-icon-button
                            icon="delete"
                            label="Delete"
                            [iconPadding]="5"
                            [textStyle]="'subheadline'"
                            [iconColor]="'system-red' | zwpColorTheme"
                            [backgroundColor]="'clear' | zwpColorTheme"
                            (btnClick)="onDeleteClicked($event, row)"
                        ></zwp-md-icon-button>
                </div>
            </ng-template>
        </zwp-paginated-table> 
        </div>
    `
})
export class TilloBrandPaginatedListComponent implements OnInit, OnDestroy {
    private clipboard = inject(Clipboard)
    private brandFacade = inject(State.Facades.TilloBrandFacade)
    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)
    private popupLayoutFacade = inject(ZWPPopupLayoutFacade)
    private routerFacade = inject(ZWPRouterFacade)


    paginatedFilteredBrands$ = this.brandFacade.paginatedFilteredBrands$
    brandRemotePagination$ = this.brandFacade.brandRemotePagination$
    

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.BrandResponse = 'name'

    brandStatusPipeSignature: TransformEnumPipeSignature = Model.brandStatusLabelPipeSignature
    productTypePipeSignature: TransformEnumPipeSignature = Model.productTypeLabelPipeSignature
    transactionTypePipeSignature: TransformEnumPipeSignature = { input: Model.TransactionType, output: Model.TransactionTypeLabel }
    deliveryMethodPipeSignature: TransformEnumPipeSignature = Model.deliveryMethodLabelPipeSignature
    zwpISO3166Alpha2PipeSignature: TransformEnumPipeSignature = { input: ZWPISO3166Alpha2, output: ZWPISO3166Alpha2Label  }
    categoryPipeSignature: TransformEnumPipeSignature = { input: Model.Category, output: Model.CategoryLabel }
    StockStatusPipeSignature: TransformEnumPipeSignature = { input: Model.StockStatus, output: Model.StockStatusLabel }
    currencyPipeSignature: TransformEnumPipeSignature = { input: ISO4217ActiveCurrencyCode, output: ISO4217ActiveCurrencyName }


    columns: ColumnInterface<Model.BrandResponse>[] = [
        { displayName: 'Name', dataLabel: 'name', sortable: true },
        { displayName: 'Status', dataLabel: 'status.code', sortable: true, transformEnumPipe: this.brandStatusPipeSignature },
        
        // { displayName: 'Deleted At', dataLabel: 'dbDeletedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Product Type', dataLabel: 'type', sortable: true, transformEnumPipe: this.productTypePipeSignature },
        { displayName: 'Transaction Type', dataLabel: 'transactionTypes', sortable: true, transformEnumPipe: this.transactionTypePipeSignature, multi: true },
        { displayName: 'Delivery Method', dataLabel: 'deliveryMethods', sortable: true, transformEnumPipe: this.deliveryMethodPipeSignature, multi: true },
        { displayName: 'Countries Served', dataLabel: 'countriesServed', sortable: true, transformEnumPipe: this.zwpISO3166Alpha2PipeSignature, multi: true },
        { displayName: 'Categories', dataLabel: 'categories', sortable: true, transformEnumPipe: this.categoryPipeSignature, multi: true },
        { displayName: 'Currency', dataLabel: 'currency', sortable: true, transformEnumPipe: this.currencyPipeSignature },
        { displayName: 'Created At', dataLabel: 'dbCreatedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Updated At', dataLabel: 'dbUpdatedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Name', name: 'name', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'Status', name: 'status', type:ZWPFilterChipInputType.ENUM , enumDefinition: this.brandStatusPipeSignature },
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Deleted At', name: 'dbDeletedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Product Type', name: 'type', type: ZWPFilterChipInputType.ENUM , enumDefinition: this.productTypePipeSignature },
        { displayName: 'Transaction Type', name: 'transactionTypes', type: ZWPFilterChipInputType.ENUM , enumDefinition: this.transactionTypePipeSignature },
        { displayName: 'Delivery Method', name: 'deliveryMethods', type: ZWPFilterChipInputType.ENUM , enumDefinition: this.deliveryMethodPipeSignature },
        { displayName: 'Countries Served', name: 'countriesServed', type: ZWPFilterChipInputType.ENUM , enumDefinition: this.zwpISO3166Alpha2PipeSignature },
        { displayName: 'Categories', name: 'categories', type: ZWPFilterChipInputType.ENUM , enumDefinition: this.categoryPipeSignature },
        { displayName: 'Currency', name: 'currency.currency', type: ZWPFilterChipInputType.ENUM, enumDefinition: this.currencyPipeSignature }
    ]

    ngOnInit() {
        this.brandFacade.resetBrandFilters(false)
        this.brandFacade.listBrands()
    }

    ngOnDestroy() {
        this.brandFacade.resetPagination()
    }

    onInspectorClicked(event: MouseEvent | TouchEvent, row: Model.BrandResponse) {
        event.preventDefault()
        event.stopPropagation()
        this.panelLayoutFacade.addRightPanel({
            id: `${row.id}-brand-details`,
            label: `Brand Details`,
            icon: 'perm_media',
            componentName: 'TilloBrandDetailsRightPanelComponent',
            data: {
                brandId: row.id
            }
        })
    }

    onNavigationClicked(event: MouseEvent | TouchEvent, row: Model.BrandResponse) {
        event.preventDefault()
        event.stopPropagation()
        this.routerFacade.navigate(['merchant-net/tillo', 'brands', row.id])
    }

    onRowClicked(row: Model.BrandResponse) {
        this.routerFacade.navigate(['merchant-net/tillo', 'brands', row.id])
    }

    onDeleteClicked(event: MouseEvent | TouchEvent, row: Model.BrandResponse) {
        event.preventDefault()
        event.stopPropagation()
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Brand',
                message: `Are you sure you want to delete the brand ${row.name}?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete',
                confirmPermanentButtonLabel: 'Delete Permanently'
            },
            () => { this.brandFacade.deleteBrand(row.id) }
        )
    }

    onClipboardClicked(event: MouseEvent | TouchEvent, row: Model.BrandResponse) {
        event.preventDefault()
        event.stopPropagation()
        const rowText = JSON.stringify(row, null, 2)
        this.clipboard.copy(rowText);
    }

    
    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.BrandResponse
        this.sortDirection = sort.direction
        this.brandFacade.listBrands({ 
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey
        })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<Model.Filters.BrandFilters> = handleFilterChipEvent(filterEvent)
        this.brandFacade.updateBrandFilters(filterChange)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.brandFacade.listBrands({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize
        })
    }

}